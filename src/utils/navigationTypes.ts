import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
    Home: undefined;
    DeviceDetail: {
        device: {
            id: string;
            name: string;
            status: string;
            appliance: string | null;
            current: number | null;
            energy: number | null;
            cost: number | null;
            location: string;
        };
    };
    // ... other routes
};
export type HomeNavigationProp = RouteProp<RootStackParamList, "Home">;
export type DeviceDetailNavigationProp = RouteProp<RootStackParamList, "DeviceDetail">;