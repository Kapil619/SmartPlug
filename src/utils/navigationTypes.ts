import { RouteProp } from "@react-navigation/native";
import { Device } from "./types";

export type RootStackParamList = {
    Home: undefined;
    DeviceDetail: {
        device: Device;

    };
    // ... other routes
};
export type HomeNavigationProp = RouteProp<RootStackParamList, "Home">;
export type DeviceDetailNavigationProp = RouteProp<RootStackParamList, "DeviceDetail">;