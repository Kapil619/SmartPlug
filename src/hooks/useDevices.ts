import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { FIREBASE_RTDB } from "../../firebaseConfig";

const useDevices = (userId: string) => {
    const [deviceList, setDeviceList] = useState<any[]>([]);
    const [primaryDeviceId, setPrimaryDeviceId] = useState<string | null>(null);

    const getPrimaryDeviceId = (devices: any[]): string | null => {
        return devices.length > 0 ? devices[0].id : null;
    };

    useEffect(() => {
        const devicesRef = ref(FIREBASE_RTDB, `users/${userId}/devices`);
        const unsubscribeDevices = onValue(devicesRef, (snapshot) => {
            if (snapshot.exists()) {
                const devicesObj = snapshot.val();
                const devicesArray = Object.keys(devicesObj).map((key) => ({
                    id: key,
                    ...devicesObj[key],
                }));
                setDeviceList(devicesArray);
                const primaryId = getPrimaryDeviceId(devicesArray);
                setPrimaryDeviceId(primaryId);
            } else {
                setDeviceList([]);
                setPrimaryDeviceId(null);
            }
        });

        return () => {
            unsubscribeDevices();
        };
    }, [userId]);

    return { deviceList, primaryDeviceId };
};

export default useDevices;