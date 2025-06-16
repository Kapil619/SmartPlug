import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { get, ref, set, update } from "firebase/database";
import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_RTDB } from "../../firebaseConfig";
import { getDayOfWeek, getWeekKey } from "./helper";
import { DeviceRealtimeStructure, UserProfile } from "./types";

export const signIn = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error) {
        console.error(error);
        throw error;

    }
}

export const signUp = async (email: string, password: string, name: string, deviceCode: string, state: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        const user = userCredential.user;
        await setDoc(doc(FIREBASE_DB, "users", user.uid), {
            username: name,
            email,
            deviceCode,
            state,
            createdAt: serverTimestamp(),
        });
        await setDoc(doc(FIREBASE_DB, "users", user.uid, "devices", deviceCode), {
            metadata: {
                appliance: "Not specified",
                deviceName: "Smartplug 1",
                location: "Not specified",
                deviceCode,
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
        wifi: {
            ssid: "",
            password: "",
        },
        relay: {
            state: "ON",
        },
        reset: {
            resetRequired: false,
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
            state: userData.state,
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
                deviceCode,      // use the device code as a unique identifier
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

export const toggleRelayState = async (userId: string, deviceId: string) => {
    try {
        const relayRef = ref(FIREBASE_RTDB, `users/${userId}/devices/${deviceId}/relay/state`);
        const snapshot = await get(relayRef);
        if (snapshot.exists()) {
            const currentState = snapshot.val();
            const newState = currentState === "ON" ? "OFF" : "ON";
            await set(relayRef, newState);
            console.log(`Relay state toggled to: ${newState}`);
        }
    } catch (error) {
        console.error("Error toggling relay state:", error);
    }
};

export const fetchDevices = async () => {
    try {
        const currentUser = FIREBASE_AUTH.currentUser!;
        const devicesCollectionRef = collection(
            FIREBASE_DB,
            "users",
            currentUser.uid,
            "devices"
        );
        const devicesSnapshot = await getDocs(devicesCollectionRef);
        const devicesList = devicesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data().metadata,
        }));
        return devicesList;
    } catch (error) {
        console.error("Error fetching devices:", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};
export const updateAggregates = async (userId: string, deviceId: string) => {
    try {
        console.log("Started for device:", deviceId);
        const latestRef = ref(FIREBASE_RTDB, `users/${userId}/devices/${deviceId}/latest`);
        const aggregatesRef = ref(FIREBASE_RTDB, `users/${userId}/devices/${deviceId}/aggregates`);

        // Fetch the latest data
        const latestSnapshot = await get(latestRef);
        if (!latestSnapshot.exists()) return;

        const latestData = latestSnapshot.val();
        const { EnergyConsumed, BillingAmount, formatted_timestamp } = latestData;
        if (!formatted_timestamp || isNaN(Date.parse(formatted_timestamp.replace(" ", "T")))) {
            console.log("Invalid timestamp:", formatted_timestamp);
            return;
        }
        // Parse the timestamp
        const date = new Date(formatted_timestamp.replace(" ", "T"));
        const dayKey = date.toISOString().slice(0, 10); // e.g., "2025-04-01"
        const monthKey = date.toISOString().slice(0, 7); // e.g., "2025-04"
        const weekKey = getWeekKey(date); // e.g., "2025-W14"
        const aggregatesSnapshot = await get(aggregatesRef);
        const aggregates = aggregatesSnapshot.exists() ? aggregatesSnapshot.val() : {};

        const updatedAggregates = {
            daily: {
                ...aggregates.daily,
                [dayKey]: {
                    EnergyConsumed: (aggregates.daily?.[dayKey]?.EnergyConsumed || 0) + EnergyConsumed,
                    BillingAmount: (aggregates.daily?.[dayKey]?.BillingAmount || 0) + BillingAmount,
                },
            },
            weekly: {
                ...aggregates.weekly,
                [weekKey]: {
                    EnergyConsumed: (aggregates.weekly?.[weekKey]?.EnergyConsumed || 0) + EnergyConsumed,
                    BillingAmount: (aggregates.weekly?.[weekKey]?.BillingAmount || 0) + BillingAmount,
                },
            },
            monthly: {
                ...aggregates.monthly,
                [monthKey]: {
                    EnergyConsumed: (aggregates.monthly?.[monthKey]?.EnergyConsumed || 0) + EnergyConsumed,
                    BillingAmount: (aggregates.monthly?.[monthKey]?.BillingAmount || 0) + BillingAmount,
                },
            },
        };
        console.log("Updated aggregates:", updatedAggregates);
        // await update(aggregatesRef, updatedAggregates);
    } catch (error) {
        console.error("Error updating aggregates:", error);
    }
};

export const fetchDailyAggregates = async (userId: string, deviceId: string) => {
    try {
        const dailyRef = ref(
            FIREBASE_RTDB,
            `users/${userId}/devices/${deviceId}/aggregates/daily`
        );
        const snapshot = await get(dailyRef);

        if (snapshot.exists()) {
            const dailyData = snapshot.val();
            const barData: any[] = [];
            const lineData: any[] = [];

            // Iterate over the daily data
            Object.keys(dailyData).forEach((dateKey) => {
                const day = getDayOfWeek(dateKey); // Get the day of the week
                const { EnergyConsumed, BillingAmount } = dailyData[dateKey];

                // Push data for Bar Chart (EnergyConsumed)
                barData.push({ value: EnergyConsumed || 0, label: day });

                // Push data for Line Chart (BillingAmount)
                lineData.push({ value: BillingAmount || 0, label: day });
            });

            return { barData, lineData };
        }

        return { barData: [], lineData: [] };
    } catch (error) {
        console.error("Error fetching daily aggregates:", error);
        return { barData: [], lineData: [] };
    }
};

export const fetchWifiCredentials = async (deviceId: string) => {
    const userId = FIREBASE_AUTH.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");
    const wifiRef = ref(FIREBASE_RTDB, `users/${userId}/devices/${deviceId}/wifi`);
    const snapshot = await get(wifiRef);
    if (snapshot.exists()) {
        return snapshot.val();
    }
    return { ssid: "", password: "" };
};

// Save WiFi credentials for a device
export const saveWifiCredentials = async (deviceId: string, ssid: string, password: string) => {
    const userId = FIREBASE_AUTH.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");
    const wifiRef = ref(FIREBASE_RTDB, `users/${userId}/devices/${deviceId}/wifi`);
    await set(wifiRef, { ssid, password });
};

export const setDeviceResetFlag = async (userId: string, deviceId: string) => {
    const resetRef = ref(FIREBASE_RTDB, `users/${userId}/devices/${deviceId}/reset/resetRequired`);
    await set(resetRef, true);
};

export const updateDailyAggregate = async (userId: string, deviceId: string) => {
    try {
        const latestRef = ref(FIREBASE_RTDB, `users/${userId}/devices/${deviceId}/latest`);
        const aggregatesRef = ref(FIREBASE_RTDB, `users/${userId}/devices/${deviceId}/aggregates`);

        // Fetch the latest data
        const latestSnapshot = await get(latestRef);
        if (!latestSnapshot.exists()) return;

        const latestData = latestSnapshot.val();
        const { EnergyConsumed, BillingAmount, formatted_timestamp } = latestData;
        if (!formatted_timestamp || isNaN(Date.parse(formatted_timestamp.replace(" ", "T")))) {
            console.error("Invalid timestamp:", formatted_timestamp);
            return;
        }

        // Parse the date part for the daily key
        const date = new Date(formatted_timestamp.replace(" ", "T"));
        const dayKey = date.toISOString().slice(0, 10); // "2025-04-18"

        // Get previous day's key
        const prevDate = new Date(date);
        prevDate.setDate(prevDate.getDate() - 1);
        const prevDayKey = prevDate.toISOString().slice(0, 10);

        // Fetch previous day's aggregate
        const aggregatesSnapshot = await get(aggregatesRef);
        const aggregates = aggregatesSnapshot.exists() ? aggregatesSnapshot.val() : {};
        const prevDayData = aggregates.daily?.[prevDayKey] || { EnergyConsumed: 0, BillingAmount: 0 };

        // Calculate daily increment
        const dailyEnergy = EnergyConsumed - (prevDayData.EnergyConsumed || 0);
        const dailyCost = BillingAmount - (prevDayData.BillingAmount || 0);

        // Update the daily aggregate for this day
        const updates: any = {};
        updates[`daily/${dayKey}`] = {
            EnergyConsumed: dailyEnergy,
            BillingAmount: dailyCost,
        };

        await update(aggregatesRef, updates);
    } catch (error) {
        console.error("Error updating daily aggregate:", error);
    }
};