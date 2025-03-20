//// filepath: d:\Codes\SmartPlug\src\hooks\useDeviceMetadata.ts
import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { FIREBASE_RTDB } from "../../firebaseConfig";

export interface DeviceMetadata {
    deviceName: string;
    location: string;
    appliance: string;
}

export function useDeviceMetadata(userID: string, deviceID: string) {
    const [metadata, setMetadata] = useState<DeviceMetadata | null>(null);

    useEffect(() => {
        const metaRef = ref(FIREBASE_RTDB, `users/u1/devices/1/metadata`);
        const unsubscribe = onValue(metaRef, (snapshot) => {
            if (snapshot.exists()) {
                setMetadata(snapshot.val());
            }
        });
        return () => {
            off(metaRef);
        };
    }, [userID, deviceID]);

    return metadata;
}