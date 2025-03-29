import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { onValue, ref } from "firebase/database";
import { FIREBASE_RTDB } from "../../firebaseConfig";
import { useUserData } from "../hooks/useUserData";
import { homeStyles } from "../styles/homeStyles";
import { toggleRelayState } from "../utils/firebaseMethods";

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
  const [relayState, setRelayState] = useState<string>("OFF");
  // Determine background color based on a simple alternating rule
  // (you can customize this logic if needed)
  // Here we assume the parent passes styling, so we use metadata only.
  useEffect(() => {
    const relayRef = ref(
      FIREBASE_RTDB,
      `users/${userId}/devices/${device.id}/relay/state`
    );
    const unsubscribe = onValue(relayRef, (snapshot) => {
      if (snapshot.exists()) {
        setRelayState(snapshot.val());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [userId, device.id]);
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
        <TouchableOpacity
          onPress={() => {
            toggleRelayState(userId, device.id);
          }}
          style={homeStyles.powerIcon}
        >
          <Ionicons
            name={relayState === "ON" ? "power-outline" : "power-sharp"}
            size={18}
            color={relayState === "ON" ? "white" : "#EEEEEE"}
            style={{
              backgroundColor: relayState === "ON" ? "#4CAF50" : "#F95454",
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
          Status: {relayState === "ON" ? "On" : "Off"}
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
