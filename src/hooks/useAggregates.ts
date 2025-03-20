import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { FIREBASE_RTDB } from "../../firebaseConfig";

export interface DeviceAggregate {
    EnergyConsumed: number;
    BillingAmount: number;
    // Any other aggregate fields you might have
}

export interface DeviceAggregates {
    daily?: { [date: string]: DeviceAggregate };
    monthly?: { [month: string]: DeviceAggregate };
    // Optionally add weekly or other keys if needed
}

export function useDeviceAggregates(userID: string, deviceID: string) {
    const [aggregates, setAggregates] = useState<DeviceAggregates | null>(null);

    useEffect(() => {
        const aggRef = ref(FIREBASE_RTDB, `users/${userID}/devices/${deviceID}/aggregates`);
        const unsubscribe = onValue(aggRef, (snapshot) => {
            if (snapshot.exists()) {
                setAggregates(snapshot.val());
            } else {
                setAggregates(null);
            }
        });
        return () => {
            off(aggRef);
        };
    }, [userID, deviceID]);

    return aggregates;
}