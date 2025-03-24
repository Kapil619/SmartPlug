import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { ref, set } from "firebase/database";
import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_RTDB } from "../../firebaseConfig";
import { getWeekKey } from "./helper";
import { DeviceRealtimeStructure, UserProfile } from "./types";

export const signIn = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error) {
        console.error(error);
        throw error;

    }
}

export const signUp = async (email: string, password: string, name: string, deviceCode: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        const user = userCredential.user;
        await setDoc(doc(FIREBASE_DB, "users", user.uid), {
            username: name,
            email,
            deviceCode,
            createdAt: serverTimestamp(),
        });
        await setDoc(doc(FIREBASE_DB, "users", user.uid, "devices", deviceCode), {
            metadata: {
                appliance: "Not specified",
                deviceName: "Smartplug 1",
                location: "Not specified",
            },
            createdAt: serverTimestamp(),
        });
        await initializeDeviceRealtimeData(user.uid, deviceCode);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const logOut = async () => {
    try {
        await signOut(FIREBASE_AUTH);
        console.log("Logged out");
    } catch (error) {
        console.error(error);
        throw error;

    }
}

export const AuthChanged = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(FIREBASE_AUTH, callback);
}

export const initializeDeviceRealtimeData = async (userId: string, deviceId: string) => {
    const currentDate = new Date();
    const currentDayKey = currentDate.toISOString().slice(0, 10);
    const currentMonthKey = currentDate.toISOString().slice(0, 7);
    const weekKey = getWeekKey(currentDate);
    const structure: DeviceRealtimeStructure = {
        latest: {
            BillingAmount: 0,
            Current: 0,
            EnergyConsumed: 0,
            Power: 0,
            Voltage: 0,
            timestamp: "",
            formatted_timestamp: "",
        },
        aggregates: {
            daily: {
                [currentDayKey]: { EnergyConsumed: 0, BillingAmount: 0, ActiveTime: 0 },
            },
            weekly: {
                [weekKey]: { EnergyConsumed: 0, BillingAmount: 0 },
            },
            monthly: {
                [currentMonthKey]: { EnergyConsumed: 0, BillingAmount: 0 },
            },
        },
    };

    await set(ref(FIREBASE_RTDB, `users/${userId}/devices/${deviceId}`), structure);
};

export const getUserProfile = async (userID: string): Promise<UserProfile> => {
    try {
        // Fetch the user document from the "users" collection.
        const userDocRef = doc(FIREBASE_DB, "users", userID);
        const userSnapshot = await getDoc(userDocRef);
        if (!userSnapshot.exists()) {
            throw new Error("User not found");
        }
        const userData = userSnapshot.data();

        // Fetch the devices subcollection.
        const devicesCollectionRef = collection(FIREBASE_DB, "users", userID, "devices");
        const devicesSnapshot = await getDocs(devicesCollectionRef);
        const devices = devicesSnapshot.docs.map((docSnapshot) => {
            const data = docSnapshot.data();
            return {
                id: docSnapshot.id,
                ...(data.metadata || {}), // extract metadata from the device document
                createdAt: data.createdAt,
            };
        });

        return {
            username: userData.username,
            email: userData.email,
            deviceCode: userData.deviceCode,
            devices,
        };
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};

export const addNewDevice = async (
    userId: string,
    deviceCode: string,
    deviceName: string,
    appliance: string,
    location: string = "Not specified"
) => {
    try {

        await setDoc(doc(FIREBASE_DB, "users", userId, "devices", deviceCode), {
            metadata: {
                appliance,       // use the provided appliance type
                deviceName,      // use the name entered by the user
                location,        // location (or default "Not specified")
            },
            createdAt: serverTimestamp(),
        });
        // Initialize the realtime data structure separate from the static metadata.
        await initializeDeviceRealtimeData(userId, deviceCode);
    } catch (error) {
        console.error("Error adding new device:", error);
        throw error;
    }
};