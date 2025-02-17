import { Appliance, Device, TopCardItem, User } from "./types";

export const topCardData: TopCardItem[] = [
    {
        type: "month",
        title: "Monthly Statistics",
        // current month will be shown via UI; this can help for consistency
        month: "August 2025",
        usage: 135, // kWh consumed in current month
        cost: 525.75,
    },
    {
        type: "today",
        title: "Today's Statistics",
        date: "2025-08-15T14:30", // if needed later but UI now shows current time
        usage: 8,
        cost: 31.20,
    },
    {
        type: "previous",
        title: "Previous Month Statistics",
        month: "July 2025",
        usage: 120,
        cost: 480.50,
    },
];

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


export const appliances: Appliance[] = [
    {
        id: "app1",
        name: "Lamp",
        iconUrl: "https://example.com/icons/lamp.png",
        description: "Bright LED Lamp",
    },
    {
        id: "app2",
        name: "Fan",
        iconUrl: "https://example.com/icons/fan.png",
        description: "Ceiling Fan",
    },
    {
        id: "app3",
        name: "TV",
        iconUrl: "https://example.com/icons/tv.png",
        description: "Smart TV",
    },
    {
        id: "app4",
        name: "AC",
        iconUrl: "https://example.com/icons/ac.png",
        description: "Air Conditioner",
    },
    {
        id: "app5",
        name: "Heater",
        iconUrl: "https://example.com/icons/heater.png",
        description: "Room Heater",
    },
];

// Devices
export const devices: Device[] = [
    {
        id: "1",
        name: "Living Room Plug",
        status: "On",
        appliance: appliances.find((a) => a.name === "Fan") || null,
        location: "Living Room",
        deviceToken: "TOKEN123456",
        currentPower: 100, // Example: watts
        currentEnergy: 135, // Example: kWh
        currentCost: 525.75, // Example: cost in currency
    },
    {
        id: "2",
        name: "Bedroom Plug",
        status: "Off",
        appliance: null,
        location: "Bedroom",
        deviceToken: "TOKEN654321",
        currentPower: null,
        currentEnergy: null,
        currentCost: null,
    },
    {
        id: "3",
        name: "Kitchen Plug",
        status: "On",
        appliance: appliances.find((a) => a.name === "AC") || null,
        location: "Kitchen",
        deviceToken: "TOKEN789012",
        currentPower: 1500,
        currentEnergy: 120,
        currentCost: 480.5,
    },
    {
        id: "4",
        name: "Cooler3",
        status: "On",
        appliance: appliances.find((a) => a.name === "Heater") || null,
        location: "Living Room",
        deviceToken: "TOKEN345678",
        currentPower: 4000,
        currentEnergy: 90,
        currentCost: 360.0,
    },
];

// Users
export const users: User[] = [
    {
        id: "u1",
        name: "Chinmay ",
        email: "chinmayrathod2003@gmail.com",
        phone: "+91 8412 01 4492",
        devices: [...devices],
    },
];