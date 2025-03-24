import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { ref, set } from "firebase/database";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_RTDB } from "../../firebaseConfig";
import { getWeekKey } from "./helper";
import { DeviceRealtimeStructure } from "./types";

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

