//// filepath: d:\Codes\SmartPlug\src\utils\databaseSetup.ts
import { FIREBASE_RTDB } from "../../firebaseConfig"; // Your firebase config file with FIREBASE_RTDB exported
import { ref, set } from "firebase/database";

export function initializeDatabaseStructure() {
    const structure = {
        users: {
            "u1": {
                devices: {
                    "1": {
                        metadata: {
                            deviceName: "Living Room Plug",
                            location: "Living Room",
                        },
                        latest: {
                            BillingAmount: 0,
                            Current: 0,
                            EnergyConsumed: 0,
                            Power: 0,
                            Voltage: 0,
                            timestamp: "", // Empty for now
                            formatted_timestamp: "", // Empty for now
                        },
                        aggregates: {
                            daily: {
                                "2023-04-01": {
                                    EnergyConsumed: 10,
                                    BillingAmount: 2,
                                    ActiveTime: 3600, // in seconds
                                },
                            },
                            weekly: {
                                "2023-W14": { EnergyConsumed: 70, BillingAmount: 14 },
                            },
                            monthly: {
                                "2023-04": { EnergyConsumed: 300, BillingAmount: 60 },
                            },
                        },
                    },
                },
            },
        },
    };

    // Write the entire structure at the root of the database
    set(ref(FIREBASE_RTDB, "/"), structure)
        .then(() => {
            console.log("Database structure initialized successfully.");
        })
        .catch((error) => {
            console.error("Error initializing database structure:", error);
        });
}