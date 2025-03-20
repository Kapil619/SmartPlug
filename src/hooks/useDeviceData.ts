// useDeviceData.ts
import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { FIREBASE_RTDB } from "../../firebaseConfig";

interface LatestData {
    BillingAmount: number;
    Current: number;
    EnergyConsumed: number;
    Power: number;
    Voltage: number;
    timestamp: string;
}

export function useDeviceData(userID: string, deviceID: string) {
    const [latestData, setLatestData] = useState<LatestData | null>(null);
    const [baseReading, setBaseReading] = useState<number | null>(null); // EnergyConsumed at period start
    const [dailyUsage, setDailyUsage] = useState<number>(0);

    useEffect(() => {
        // Construct the path to the latest data node (update this path as per your Firebase structure)
        const latestRef = ref(FIREBASE_RTDB, `users/${userID}/devices/${deviceID}/latest`);

        // Attach a realtime listener
        const unsubscribe = onValue(latestRef, (snapshot) => {
            const data: LatestData = snapshot.val();
            if (data) {
                setLatestData(data);

                if (baseReading === null) {
                    // Set the base reading if it's not set yet (could be done at period start)
                    setBaseReading(data.EnergyConsumed);
                } else {
                    // Calculate the daily usage by subtracting the base reading from current cumulative value
                    setDailyUsage(data.EnergyConsumed - baseReading);
                }
            }
        });

        // Cleanup the listener on unmount
        return () => {
            off(latestRef);
        };
    }, [userID, deviceID, baseReading]);

    return { latestData, dailyUsage, baseReading, setBaseReading };
}
