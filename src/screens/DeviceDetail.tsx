import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EnergyTrendsChart from "../components/Chart";
import Header from "../components/Header";
import TimerModal from "../components/TimerModal";
import { deviceDetailstyles } from "../styles/deviceDetailStyles";
import { DeviceDetailNavigationProp } from "../utils/navigationTypes";
const { width } = Dimensions.get("window");

const DeviceDetail: React.FC = () => {
  const route = useRoute<DeviceDetailNavigationProp>();
  const { device } = route.params;
  const [selectedUsage, setSelectedUsage] = useState(0);
  const [deviceOn, setDeviceOn] = useState(device.status === "On");
  // Timer modal state
  const [timerModalVisible, setTimerModalVisible] = useState(false);
  // Countdown text (in hours, as a string)
  const [timerCountdown, setTimerCountdown] = useState<string | null>(null);
  const [timerEndTime, setTimerEndTime] = useState<number | null>(null);
  // Reference to the timer timeout
  const timerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  // For demonstration, we’ll assume some placeholder data.
  const deviceLocation = device.location || "Unknown Location";
  const isDeviceOn = device.status === "On";

  useEffect(() => {
    return () => {
      if (timerTimeoutRef.current) clearTimeout(timerTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const handleStartTimer = (hours: number, minutes: number) => {
    // Clear any existing timer intervals
    if (timerTimeoutRef.current) clearTimeout(timerTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    const ms = (hours * 3600 + minutes * 60) * 1000;
    const endTime = Date.now() + ms;
    setTimerEndTime(endTime);

    // Set a timeout to turn off the device when time expires
    timerTimeoutRef.current = setTimeout(() => {
      setDeviceOn(false);
      setTimerCountdown(null);
      setTimerEndTime(null);
    }, ms);

    // Update countdown every minute
    timerIntervalRef.current = setInterval(() => {
      const now = Date.now();
      const remainingMs = endTime - now;
      if (remainingMs <= 0) {
        clearInterval(timerIntervalRef.current!);
        setTimerCountdown("0h 0m");
      } else {
        const remainingSec = Math.floor(remainingMs / 1000);
        const rHours = Math.floor(remainingSec / 3600);
        const rMinutes = Math.floor((remainingSec % 3600) / 60);
        setTimerCountdown(`${rHours}h ${rMinutes}m`);
      }
    }, 60000);

    const remainingSec = Math.floor(ms / 1000);
    const rHours = Math.floor(remainingSec / 3600);
    const rMinutes = Math.floor((remainingSec % 3600) / 60);
    setTimerCountdown(`${rHours}h ${rMinutes}m`);
  };
  let initHours = 1,
    initMinutes = 0;
  if (timerEndTime) {
    const remainingSec = Math.max(
      0,
      Math.floor((timerEndTime - Date.now()) / 1000)
    );
    initHours = Math.floor(remainingSec / 3600);
    initMinutes = Math.floor((remainingSec % 3600) / 60);
    // Default to 1h 0m if expired
    if (initHours === 0 && initMinutes === 0) {
      initHours = 1;
      initMinutes = 0;
    }
  }

  return (
    <SafeAreaView style={deviceDetailstyles.container}>
      <Header title={"Device Detail"} />
      <ScrollView contentContainerStyle={deviceDetailstyles.scrollContent}>
        {/* Top Section: Device Icon & Name */}
        <View style={deviceDetailstyles.topSection}>
          <Image
            source={require("../../assets/realplug.png")}
            style={deviceDetailstyles.realPlugImage}
          />
          <View style={deviceDetailstyles.deviceInfo}>
            <Text style={deviceDetailstyles.deviceName}>
              {device.name || "Smart Switch"}
            </Text>
            <View style={deviceDetailstyles.locationRow}>
              <Ionicons name="location-outline" size={16} color="green" />
              <Text style={deviceDetailstyles.deviceLocation}>
                {deviceLocation}
              </Text>
            </View>
            {timerCountdown && (
              <View style={deviceDetailstyles.timerInfoContainer}>
                <Ionicons name="time-outline" size={20} color="blue" />
                <View style={{ flexDirection: "column" }}>
                  <Text style={deviceDetailstyles.timerText}>Timer active</Text>
                  <Text style={deviceDetailstyles.timerInfoText}>
                    {timerCountdown} left
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Power Toggle */}
        <View style={deviceDetailstyles.powerContainer}>
          <Text style={deviceDetailstyles.powerLabel}>Power</Text>
          <TouchableOpacity style={deviceDetailstyles.powerButton}>
            <Ionicons
              name={isDeviceOn ? "power-outline" : "power-sharp"}
              size={28}
              color={isDeviceOn ? "#4CAF50" : "#999"}
            />
          </TouchableOpacity>
        </View>

        {/* Runtime / Usage Card */}
        <View style={deviceDetailstyles.runtimeCard}>
          <Text style={deviceDetailstyles.runtimeCardTitle}>Runtime</Text>
          <View style={deviceDetailstyles.runtimeStats}>
            <View style={styles.runtimeRow}>
              <Text style={deviceDetailstyles.runtimeValue}>
                {device.currentEnergy !== null ? device.currentEnergy : "--"}
              </Text>
              <Text style={deviceDetailstyles.runtimeLabel}>Energy (kWh)</Text>
            </View>
            <View style={deviceDetailstyles.divider} />
            <View style={styles.runtimeRow}>
              <Text style={deviceDetailstyles.runtimeValue}>
                {device.currentPower !== null ? device.currentPower : "--"}
              </Text>
              <Text style={deviceDetailstyles.runtimeLabel}>Power (Watt)</Text>
            </View>
            <View style={deviceDetailstyles.divider} />
            <View style={styles.runtimeRow}>
              <Text style={deviceDetailstyles.runtimeValue}>
                {device.currentCost !== null ? device.currentCost : "--"}
              </Text>
              <Text style={deviceDetailstyles.runtimeLabel}>Cost (₹)</Text>
            </View>
          </View>
        </View>

        <View style={deviceDetailstyles.usageCard}>
          <Text style={deviceDetailstyles.usageCardTitle}>
            {selectedUsage === 0
              ? "Current Overview"
              : selectedUsage === 1
              ? "Energy Overview"
              : "Cost Overview"}
          </Text>
          <View style={deviceDetailstyles.usageIconsContainer}>
            <TouchableOpacity
              onPress={() => setSelectedUsage(0)}
              style={[
                deviceDetailstyles.usageIconButton,
                selectedUsage === 0 && deviceDetailstyles.usageIconActive,
              ]}
            >
              <Ionicons
                name="flash-outline"
                size={24}
                color={selectedUsage === 0 ? "#fff" : "#007aff"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedUsage(1)}
              style={[
                deviceDetailstyles.usageIconButton,
                selectedUsage === 1 && deviceDetailstyles.usageIconActive,
              ]}
            >
              <Octicons
                name="plug"
                size={24}
                color={selectedUsage === 1 ? "#fff" : "maroon"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedUsage(2)}
              style={[
                deviceDetailstyles.usageIconButton,
                selectedUsage === 2 && deviceDetailstyles.usageIconActive,
              ]}
            >
              <MaterialIcons
                name="currency-rupee"
                size={24}
                color={selectedUsage === 2 ? "#fff" : "green"}
              />
            </TouchableOpacity>
          </View>
          {/* Energy Trends Chart Component */}
          <EnergyTrendsChart selectedUsage={selectedUsage} />
        </View>

        {/* Quick Actions: Schedule, Timer, Away */}
        <View style={deviceDetailstyles.quickActionsContainer}>
          {timerCountdown ? (
            <TouchableOpacity style={deviceDetailstyles.quickActionItem}>
              <Ionicons name="time-sharp" size={24} color="#D35400" />
              <Text
                style={[
                  deviceDetailstyles.quickActionLabel,
                  { color: "#D35400" },
                ]}
              >
                Timer Active
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setTimerModalVisible(true)}
              style={deviceDetailstyles.quickActionItem}
            >
              <Ionicons name="time-outline" size={24} color="#007aff" />
              <Text style={deviceDetailstyles.quickActionLabel}>Timer</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={deviceDetailstyles.quickActionItem}>
            <Ionicons name="airplane-outline" size={24} color="#007aff" />
            <Text style={deviceDetailstyles.quickActionLabel}>Away</Text>
          </TouchableOpacity>
        </View>

        {/* Help & Feedback */}
        <View style={deviceDetailstyles.settingsCard}>
          <Text style={deviceDetailstyles.settingsTitle}>Help & Feedback</Text>
          <Text style={deviceDetailstyles.settingsSubtitle}>
            Get support or submit your feedback
          </Text>
          <TouchableOpacity style={deviceDetailstyles.settingsButton}>
            <Text style={deviceDetailstyles.settingsButtonText}>Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TimerModal
        visible={timerModalVisible}
        onClose={() => setTimerModalVisible(false)}
        onStartTimer={handleStartTimer}
        initialHours={initHours}
        initialMinutes={initMinutes}
      />
    </SafeAreaView>
  );
};

export default DeviceDetail;

const cardWidth = width - 40; // for consistent card sizing if needed

const styles = StyleSheet.create({
  runtimeRow: {
    alignItems: "center",
    width: (cardWidth - 20) / 3, // 3 columns in the row
  },
});
