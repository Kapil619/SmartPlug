import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_RTDB } from "../../firebaseConfig";

type AggregatedData = {
    daily: { usage: number[]; cost: number[]; labels: string[] };
    weekly: { usage: number[]; cost: number[]; labels: string[] };
    monthly: { usage: number[]; cost: number[]; labels: string[] };
};

const useAggregatedEnergyData = () => {
    const [aggregatedData, setAggregatedData] = useState<AggregatedData | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAggregatedData = async () => {
            try {
                setLoading(true);
                const currentUser = FIREBASE_AUTH.currentUser!;
                const devicesRef = ref(FIREBASE_RTDB, `users/${currentUser.uid}/devices`);
                const snapshot = await get(devicesRef);

                if (!snapshot.exists()) {
                    throw new Error("No devices found.");
                }

                const devices = snapshot.val();
                const dailyUsageByKey: Record<string, number> = {};
                const dailyCostByKey: Record<string, number> = {};
                const weeklyUsageByKey: Record<string, number> = {};
                const weeklyCostByKey: Record<string, number> = {};
                const monthlyUsageByKey: Record<string, number> = {};
                const monthlyCostByKey: Record<string, number> = {};

                Object.values(devices).forEach((device: any) => {
                    const { aggregates } = device;
                    if (!aggregates) return;

                    // Aggregate daily data
                    Object.entries(aggregates.daily || {}).forEach(([date, data]: any) => {
                        if (!dailyUsageByKey[date]) {
                            dailyUsageByKey[date] = 0;
                            dailyCostByKey[date] = 0;
                        }
                        dailyUsageByKey[date] += data.EnergyConsumed || 0;
                        dailyCostByKey[date] += data.BillingAmount || 0;
                    });

                    // Aggregate weekly data
                    Object.entries(aggregates.weekly || {}).forEach(([week, data]: any) => {
                        if (!weeklyUsageByKey[week]) {
                            weeklyUsageByKey[week] = 0;
                            weeklyCostByKey[week] = 0;
                        }
                        weeklyUsageByKey[week] += data.EnergyConsumed || 0;
                        weeklyCostByKey[week] += data.BillingAmount || 0;
                    });

                    // Aggregate monthly data
                    Object.entries(aggregates.monthly || {}).forEach(([month, data]: any) => {
                        if (!monthlyUsageByKey[month]) {
                            monthlyUsageByKey[month] = 0;
                            monthlyCostByKey[month] = 0;
                        }
                        monthlyUsageByKey[month] += data.EnergyConsumed || 0;
                        monthlyCostByKey[month] += data.BillingAmount || 0;
                    });
                });

                setAggregatedData({
                    daily: {
                        usage: Object.values(dailyUsageByKey),
                        cost: Object.values(dailyCostByKey),
                        labels: Object.keys(dailyUsageByKey),
                    },
                    weekly: {
                        usage: Object.values(weeklyUsageByKey),
                        cost: Object.values(weeklyCostByKey),
                        labels: Object.keys(weeklyUsageByKey),
                    },
                    monthly: {
                        usage: Object.values(monthlyUsageByKey),
                        cost: Object.values(monthlyCostByKey),
                        labels: Object.keys(monthlyUsageByKey),
                    },
                });
            } catch (err) {
                console.error("Error fetching aggregated data:", err);
                setError("Failed to load energy data.");
            } finally {
                setLoading(false);
            }
        };

        fetchAggregatedData();
    }, []);

    return { aggregatedData, loading, error };
};

export default useAggregatedEnergyData;