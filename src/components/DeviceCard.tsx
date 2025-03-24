import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { homeStyles } from "../styles/homeStyles";
import { useNavigation } from "@react-navigation/native";
import { useUserData } from "../hooks/useUserData";

const { width } = Dimensions.get("window");

interface DeviceCardProps {
  device: any; // realtime device object from RTDB
  userId: string;
  backgroundColor?: string;
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  device,
  userId,
  backgroundColor,
}) => {
  const navigation = useNavigation<any>();
  const metadata = useUserData(userId, device.id);

  // Determine background color based on a simple alternating rule
  // (you can customize this logic if needed)
  // Here we assume the parent passes styling, so we use metadata only.
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("DeviceDetail", { device })}
      style={[
        styles.deviceCard,
        { backgroundColor: backgroundColor || "#fff" },
      ]}
    >
      {/* Top row: Plug image & power icon */}
      <View style={homeStyles.cardTopRow}>
        <Image
          source={require("../../assets/plug.png")}
          style={homeStyles.deviceImage}
        />
        <TouchableOpacity style={homeStyles.powerIcon}>
          <Ionicons
            name={device.status === "On" ? "power-outline" : "power-sharp"}
            size={18}
            color={device.status === "On" ? "white" : "#EEEEEE"}
            style={{
              backgroundColor: device.status === "On" ? "#578FCA" : "#999",
              borderRadius: 50,
              padding: 8,
            }}
          />
        </TouchableOpacity>
      </View>
      {/* Bottom: Device name and status */}
      <View style={homeStyles.cardBottom}>
        <Text style={homeStyles.deviceName}>
          {metadata?.appliance || "Unnamed Device"}
        </Text>
        <Text style={homeStyles.deviceStatus}>
          Status: {device.status || "Off"}
        </Text>
      </View>
      <Text style={homeStyles.applianceName}>
        {metadata?.deviceName || "Appliance name"}
      </Text>
    </TouchableOpacity>
  );
};

export default DeviceCard;

const styles = StyleSheet.create({
  deviceCard: {
    backgroundColor: "#fff",
    width: (width - 60) / 2, // 20 padding + 20 padding + 20 gap = 60
    height: (width - 60) / 2,
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: "space-between",
  },
});
