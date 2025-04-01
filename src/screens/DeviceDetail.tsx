import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { onValue, ref } from "firebase/database";
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
import { FIREBASE_AUTH, FIREBASE_RTDB } from "../../firebaseConfig";
import EnergyTrendsChart from "../components/Chart";
import EditDeviceModal from "../components/EditDeviceModal";
import Header from "../components/Header";
import TimerModal from "../components/TimerModal";
import { useDeviceData } from "../hooks/useDeviceData";
import { useUserData } from "../hooks/useUserData";
import { deviceDetailstyles } from "../styles/deviceDetailStyles";
import { toggleRelayState } from "../utils/firebaseMethods";
import { DeviceDetailNavigationProp } from "../utils/navigationTypes";
const { width } = Dimensions.get("window");

const DeviceDetail: React.FC = () => {
  const route = useRoute<DeviceDetailNavigationProp>();
  const { device } = route.params;
  const deviceID = device.id;
  const currentUser = FIREBASE_AUTH.currentUser!;
  // const currentUser = { uid: "u1" };
  const [selectedUsage, setSelectedUsage] = useState(1);
  const [timerModalVisible, setTimerModalVisible] = useState(false);
  // Countdown text (in hours, as a string)
  const [timerCountdown, setTimerCountdown] = useState<string | null>(null);
  const [timerEndTime, setTimerEndTime] = useState<number | null>(null);
  // Reference to the timer timeout
  const timerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const deviceLocation = device.location || "Unknown Location";
  const [relayState, setRelayState] = useState<string>("OFF");

  useEffect(() => {
    const relayRef = ref(
      FIREBASE_RTDB,
      `users/${currentUser.uid}/devices/${deviceID}/relay/state`
    );
    const unsubscribe = onValue(relayRef, (snapshot) => {
      if (snapshot.exists()) {
        setRelayState(snapshot.val());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [currentUser.uid, deviceID]);
  useEffect(() => {
    return () => {
      if (timerTimeoutRef.current) {
        clearTimeout(timerTimeoutRef.current);
        timerTimeoutRef.current = null;
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, []);

  const handleStartTimer = (
    hours: number,
    minutes: number,
    seconds: number
  ) => {
    if (timerTimeoutRef.current) {
      clearTimeout(timerTimeoutRef.current);
      timerTimeoutRef.current = null; // Reset the reference
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null; // Reset the reference
    }

    const ms = (hours * 3600 + minutes * 60 + seconds) * 1000;
    const endTime = Date.now() + ms;
    setTimerEndTime(endTime);

    // Set a timeout to turn off the device when time expires
    timerTimeoutRef.current = setTimeout(() => {
      toggleRelayState(currentUser.uid, deviceID);
      setTimerCountdown(null);
      setTimerEndTime(null);
      timerTimeoutRef.current = null; // Reset the reference
    }, ms);

    // Update countdown every minute
    timerIntervalRef.current = setInterval(() => {
      const now = Date.now();
      const remainingMs = endTime - now;
      if (remainingMs <= 0) {
        clearInterval(timerIntervalRef.current!);
        setTimerCountdown(null);
        setTimerEndTime(null);
        timerIntervalRef.current = null; // Reset the reference
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

  const [aggregated, setAggregated] = useState({ energy: 0, cost: 0 });
  const { latestData, dailyUsage } = useDeviceData(currentUser.uid, deviceID);
  const metadata = useUserData(currentUser.uid, device.id);
  const [editModalVisible, setEditModalVisible] = useState(false);
  useEffect(() => {
    setAggregated({
      energy: latestData?.EnergyConsumed || 0,
      cost: latestData?.BillingAmount || 0,
    });
  }, [latestData?.EnergyConsumed]);

  const cancelTimer = () => {
    if (timerTimeoutRef.current) {
      clearTimeout(timerTimeoutRef.current);
      timerTimeoutRef.current = null; // Reset the reference
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null; // Reset the reference
    }
    setTimerCountdown(null); // Clear the countdown
    setTimerEndTime(null); // Clear the end time
  };

  return (
    <SafeAreaView style={deviceDetailstyles.container}>
      <Header title={"Device Detail"} />
      <StatusBar style="dark" backgroundColor="#F7F9FC" />
      <ScrollView contentContainerStyle={deviceDetailstyles.scrollContent}>
        {/* Top Section: Device Icon & Name */}
        <View style={deviceDetailstyles.topSection}>
          <Image
            source={require("../../assets/realplug.png")}
            style={deviceDetailstyles.realPlugImage}
          />
          <View style={deviceDetailstyles.deviceInfo}>
            <View style={deviceDetailstyles.deviceHeader}>
              <Text style={deviceDetailstyles.deviceName}>
                {metadata?.deviceName || "Smart Switch"}
              </Text>
              <TouchableOpacity
                onPress={() => setEditModalVisible(true)}
                style={deviceDetailstyles.editIcon}
              >
                <Ionicons name="pencil-outline" size={20} color="#007aff" />
              </TouchableOpacity>
            </View>
            <View style={deviceDetailstyles.locationRow}>
              <Ionicons name="location-outline" size={16} color="green" />
              <Text style={deviceDetailstyles.deviceLocation}>
                {metadata?.location || deviceLocation}
              </Text>
            </View>
            <View style={deviceDetailstyles.applianceRow}>
              <Ionicons name="construct-outline" size={16} color="#007aff" />
              <Text style={deviceDetailstyles.deviceAppliance}>
                {metadata?.appliance || "Unknown Appliance"}
              </Text>
            </View>
            {timerCountdown && (
              <View style={deviceDetailstyles.timerInfoContainer}>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={deviceDetailstyles.timerText}>Timer Active</Text>
                  <Text style={deviceDetailstyles.timerInfoText}>
                    {timerCountdown} left
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={cancelTimer}
                  style={deviceDetailstyles.cancelTimerButton}
                >
                  <Ionicons name="close-circle" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <EditDeviceModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          metadata={metadata}
          currentUser={currentUser}
        />

        {/* Power Toggle */}
        <View style={deviceDetailstyles.powerContainer}>
          <Text style={deviceDetailstyles.powerLabel}>Power</Text>
          <TouchableOpacity
            onPress={() => {
              toggleRelayState(currentUser.uid, deviceID);
            }}
            style={deviceDetailstyles.powerButton}
          >
            <Ionicons
              name={relayState === "ON" ? "power-outline" : "power-sharp"}
              size={28}
              color={relayState === "ON" ? "#4CAF50" : "red"}
            />
          </TouchableOpacity>
        </View>

        {/* Runtime / Usage Card */}
        <View style={deviceDetailstyles.runtimeCard}>
          <Text style={deviceDetailstyles.runtimeCardTitle}>
            Device Aggregated Consumption
          </Text>
          <View style={deviceDetailstyles.runtimeStats}>
            <View style={styles.runtimeRow}>
              <Text style={deviceDetailstyles.runtimeValue}>
                {aggregated.energy}
              </Text>
              <Text style={deviceDetailstyles.runtimeLabel}>Energy (kWh)</Text>
            </View>
            <View style={deviceDetailstyles.divider} />
            <View style={styles.runtimeRow}>
              <Text style={deviceDetailstyles.runtimeValue}>
                {aggregated.cost.toFixed(3)}
              </Text>
              <Text style={deviceDetailstyles.runtimeLabel}>Cost (₹)</Text>
            </View>
            <View style={deviceDetailstyles.divider} />

            <View style={styles.runtimeRow}>
              <Text style={deviceDetailstyles.runtimeValue}>{37.5}</Text>
              <Text style={deviceDetailstyles.runtimeLabel}>Active Time</Text>
            </View>
          </View>
        </View>

        <View style={deviceDetailstyles.usageCard}>
          <Text style={deviceDetailstyles.usageCardTitle}>
            {selectedUsage === 1 ? "Energy Overview" : "Cost Overview"}
          </Text>
          <View style={deviceDetailstyles.usageIconsContainer}>
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
          <EnergyTrendsChart
            deviceId={deviceID}
            userId={currentUser.uid}
            selectedUsage={selectedUsage}
          />
        </View>

        {/* Quick Actions: Schedule, Timer, Away */}
        <View style={deviceDetailstyles.quickActionsContainer}>
          {timerCountdown ? (
            <TouchableOpacity style={deviceDetailstyles.quickActionItem}>
              <Ionicons name="time-sharp" size={24} color="gray" />
              <Text
                style={[
                  deviceDetailstyles.quickActionLabel,
                  { color: "#D35400", fontWeight: "800" },
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
