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
    usageLimit?: number; // e.g. kWh
    costLimit?: number; // e.g. currency limit
}

export interface Appliance {
    id: string;
    name: string;
    iconUrl?: string;
    description?: string;
}

// Device Schema
export interface Device {
    id: string;
    name: string;
    status: "On" | "Off";
    appliance: Appliance | null;
    location: string;
    deviceToken: string;
    currentPower: number | null; // e.g., in Watts
    currentEnergy: number | null; // e.g., in kWh
    currentCost: number | null; // e.g., in currency units
}

// User Schema
export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    devices: Device[];
}

export interface DeviceRealtimeStructure {
    latest: {
        BillingAmount: number;
        Current: number;
        EnergyConsumed: number;
        Power: number;
        Voltage: number;
        timestamp: string;
        formatted_timestamp: string;
    };
    aggregates: {
        daily: { [date: string]: { EnergyConsumed: number; BillingAmount: number; ActiveTime?: number } };
        weekly: { [week: string]: { EnergyConsumed: number; BillingAmount: number } };
        monthly: { [month: string]: { EnergyConsumed: number; BillingAmount: number } };
    };
    relay: {
        state: "ON" | "OFF";
    }
    wifi: {
        ssid: string;
        password: string;
    }
}

export interface DeviceMetadata {
    deviceName: string;
    location: string;
    appliance: string;
    createdAt: any;
    deviceCode: string;
}
export interface UserProfile {
    username: string;
    email: string;
    deviceCode: string;
    state: string;
    devices: DeviceMetadata[];
}