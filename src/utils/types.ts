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