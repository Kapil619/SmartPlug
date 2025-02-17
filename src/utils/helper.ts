//// filepath: /d:/Codes/SmartPlug/src/utils/aggregators.ts
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