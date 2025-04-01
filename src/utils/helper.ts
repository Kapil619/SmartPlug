import { Device } from "./types";

export const aggregateEnergyAndCost = (devices: Device[]) => {
    const totalDailyEnergy = devices.reduce(
        (acc, device) => acc + (device.currentEnergy || 0),
        0
    );
    const totalDailyCost = devices.reduce(
        (acc, device) => acc + (device.currentCost || 0),
        0
    );

    // For weekly and monthly, multiply by appropriate factors (adjust as needed)
    const totalWeeklyEnergy = totalDailyEnergy * 7;
    const totalWeeklyCost = totalDailyCost * 7;
    const totalMonthlyEnergy = totalDailyEnergy * 30;
    const totalMonthlyCost = totalDailyCost * 30;

    return {
        daily: { usage: totalDailyEnergy, cost: totalDailyCost },
        weekly: { usage: totalWeeklyEnergy, cost: totalWeeklyCost },
        monthly: { usage: totalMonthlyEnergy, cost: totalMonthlyCost },
    };
};

export function getWeekKey(date: Date): string {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7; // Sunday is 0, so set to 7.
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return `${d.getUTCFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
}

export const getDayOfWeek = (dateString: string): string => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(dateString);
    return days[date.getDay()];
};

export const calculateAggregates = (deviceList: any[]) => {
    let totalTodayEnergy = 0;
    let totalTodayCost = 0;
    let totalMonthEnergy = 0;
    let totalMonthCost = 0;
    let totalPrevEnergy = 0;
    let totalPrevCost = 0;

    const now = new Date();
    const currentMonthKey = now.toISOString().slice(0, 7); // e.g. "2025-03"
    const previousDate = new Date();
    previousDate.setMonth(previousDate.getMonth() - 1);
    const previousMonthKey = previousDate.toISOString().slice(0, 7); // e.g. "2025-02"

    deviceList.forEach((device) => {
        totalTodayEnergy += device.latest?.EnergyConsumed || 0;
        totalTodayCost += device.latest?.BillingAmount || 0;

        if (device.aggregates && device.aggregates.monthly) {
            totalMonthEnergy +=
                device.aggregates.monthly[currentMonthKey]?.EnergyConsumed || 0;
            totalMonthCost +=
                device.aggregates.monthly[currentMonthKey]?.BillingAmount || 0;
            totalPrevEnergy +=
                device.aggregates.monthly[previousMonthKey]?.EnergyConsumed || 0;
            totalPrevCost +=
                device.aggregates.monthly[previousMonthKey]?.BillingAmount || 0;
        }
    });

    return [
        { type: "today", usage: totalTodayEnergy, cost: totalTodayCost },
        { type: "month", usage: totalMonthEnergy, cost: totalMonthCost },
        { type: "previous", usage: totalPrevEnergy, cost: totalPrevCost },
    ];
};