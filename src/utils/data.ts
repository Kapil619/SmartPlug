import { TopCardItem } from "./types";

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

export const devices = [
    {
        id: "1",
        name: "Living Room Plug",
        status: "On",
        appliance: "Ceiling Fan",
    },
    { id: "2", name: "Bedroom Plug", status: "Off", appliance: null },
    {
        id: "3",
        name: "Kitchen Plug",
        status: "On",
        appliance: "Air Conditioner",
    },
    {
        id: "4",
        name: "Cooler3",
        status: "On",
        appliance: "Cooler",
    },
];