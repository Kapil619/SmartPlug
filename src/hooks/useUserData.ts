import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";

export interface DeviceMetadata {
    appliance?: string;
    deviceName?: string;
    location?: string;
    // add any additional static fields here
}

export const useUserData = (userId: string, deviceId: string) => {
    const [metadata, setMetadata] = useState<DeviceMetadata | null>(null);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const deviceDocRef = doc(FIREBASE_DB, "users", userId, "devices", deviceId);
                const snapshot = await getDoc(deviceDocRef);
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    setMetadata(data.metadata || null);
                }
            } catch (error) {
                console.error("Error fetching device metadata:", error);
            }
        };
        fetchMetadata();
    }, [userId, deviceId]);

    return metadata;
};