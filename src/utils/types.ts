export interface TopCardItem {
    type: "month" | "today" | "previous";
    title: string;
    month?: string;
    date?: string;
    usage: number | null;
    cost: number | null;
}

export interface TopCardProps {
    data: TopCardItem[];
}

export interface ScheduleItem {
    id: string;
    deviceId: string;
    deviceName: string;
    days: string[]; // e.g. ["Mon", "Wed", "Fri"]
    hour: number; // 0-23
    minute: number; // 0-59
    turnOn: boolean; // whether it turns device on or off
    usageLimit?: number; // e.g. kWh
    costLimit?: number; // e.g. currency limit
}