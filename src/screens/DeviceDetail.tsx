import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Import translation hook
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
import DailyChart from "../components/Chart";
import EditDeviceModal from "../components/EditDeviceModal";
import Header from "../components/Header";
import TimerModal from "../components/TimerModal";
import { useTimer } from "../context/TimerContext";
import { useDeviceData } from "../hooks/useDeviceData";
import { useUserData } from "../hooks/useUserData";
import { deviceDetailstyles } from "../styles/deviceDetailStyles";
import {
  setDeviceResetFlag,
  toggleRelayState,
  updateDailyAggregate,
} from "../utils/firebaseMethods";
import { DeviceDetailNavigationProp } from "../utils/navigationTypes";

const { width } = Dimensions.get("window");

const DeviceDetail: React.FC = () => {
  const route = useRoute<DeviceDetailNavigationProp>();
  const { device } = route.params;
  const deviceID = device.id;
  const currentUser = FIREBASE_AUTH.currentUser!;
  const { startTimer, cancelTimer, activeTimers } = useTimer();
  const [selectedUsage, setSelectedUsage] = useState(1);
  const [timerModalVisible, setTimerModalVisible] = useState(false);
  const deviceLocation = device.location || "Unknown Location";
  const [relayState, setRelayState] = useState<string>("OFF");
  const [aggregated, setAggregated] = useState({
    energy: 0,
    cost: 0,
    current: 0,
    voltage: 0,
  });
  const { latestData, dailyUsage } = useDeviceData(currentUser.uid, deviceID);
  const metadata = useUserData(currentUser.uid, device.id);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { t } = useTranslation(); // Initialize translation hook
  const [resetting, setResetting] = useState(false);
  const [showMoreStats, setShowMoreStats] = useState(false);

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

  const handleStartTimer = async (
    hours: number,
    minutes: number,
    seconds: number
  ) => {
    const durationMs = (hours * 3600 + minutes * 60 + seconds) * 1000;
    startTimer(currentUser.uid, deviceID, durationMs);
  };

  useEffect(() => {
    setAggregated({
      energy: latestData?.EnergyConsumed || 0,
      cost: latestData?.BillingAmount || 0,
      current: latestData?.Current || 0,
      voltage: latestData?.Voltage || 0,
    });
  }, [latestData?.EnergyConsumed]);

  useEffect(() => {
    updateDailyAggregate(currentUser.uid, deviceID);
  }, [deviceID]);
  return (
    <SafeAreaView style={deviceDetailstyles.container}>
      <Header title={t("screens.deviceDetail.header")} />
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => setEditModalVisible(true)}
                  style={deviceDetailstyles.editIcon}
                >
                  <Ionicons name="pencil-outline" size={20} color="#007aff" />
                </TouchableOpacity>
              </View>
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
            <TouchableOpacity
              onPress={async () => {
                setResetting(true);
                await setDeviceResetFlag(currentUser.uid, deviceID);
                setResetting(false);
              }}
              disabled={resetting}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "green",
                borderRadius: 20,
                paddingVertical: 6,
                paddingHorizontal: 14,
                backgroundColor: "#fff",
                opacity: resetting ? 0.6 : 1,
                marginTop: 8,
                alignSelf: "flex-start", // ensures it only takes needed width
              }}
              accessibilityLabel={t("screens.deviceDetail.resetDevice")}
            >
              <Text
                style={{
                  color: "green",
                  fontSize: 14,
                  fontWeight: "800",
                  marginRight: 8,
                }}
              >
                {resetting
                  ? t("screens.deviceDetail.resetting") || "Resetting..."
                  : t("screens.deviceDetail.resetDevice") || "Reset Device"}
              </Text>
              <Ionicons
                name={resetting ? "refresh-circle" : "refresh"}
                size={22}
                color="green"
                style={
                  resetting
                    ? { marginLeft: 4, transform: [{ rotate: "90deg" }] }
                    : {}
                }
              />
            </TouchableOpacity>
            {activeTimers[deviceID] && (
              <View style={deviceDetailstyles.timerInfoContainer}>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={deviceDetailstyles.timerText}>Timer Active</Text>
                  <Text style={deviceDetailstyles.timerInfoText}>
                    {activeTimers[deviceID]} left
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => cancelTimer(deviceID)}
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
        <View
          style={[
            deviceDetailstyles.powerContainer,
            {
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              toggleRelayState(currentUser.uid, deviceID);
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 35,
              backgroundColor: relayState === "ON" ? "#4CAF50" : "#E74C3C",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
              marginBottom: 8,
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="power" size={38} color="#fff" />
          </TouchableOpacity>
          <Text
            style={{
              color: relayState === "ON" ? "#4CAF50" : "#E74C3C",
              fontWeight: "bold",
              fontSize: 16,
              marginTop: 2,
              letterSpacing: 1,
            }}
          >
            {relayState === "ON"
              ? t("screens.deviceDetail.powerOn") || "ON"
              : t("screens.deviceDetail.powerOff") || "OFF"}
          </Text>
        </View>

        {/* Runtime / Usage Card */}
        <View style={deviceDetailstyles.runtimeCard}>
          <Text style={deviceDetailstyles.runtimeCardTitle}>
            {t("screens.deviceDetail.aggregatedConsumption")}
          </Text>
          <View>
            <View style={deviceDetailstyles.runtimeStats}>
              <View style={styles.runtimeRow}>
                <Text style={deviceDetailstyles.runtimeValue}>
                  {aggregated.energy.toFixed(2)}
                </Text>
                <Text style={deviceDetailstyles.runtimeLabel}>
                  {t("screens.deviceDetail.energy")}
                </Text>
              </View>
              <View style={deviceDetailstyles.divider} />
              <View style={styles.runtimeRow}>
                <Text style={deviceDetailstyles.runtimeValue}>
                  {aggregated.cost.toFixed(3)}
                </Text>
                <Text style={deviceDetailstyles.runtimeLabel}>
                  {t("screens.deviceDetail.cost")}
                </Text>
              </View>
            </View>
            {/* Expand/Collapse Button */}

            {/* Second row: Current & Voltage */}
            {showMoreStats && (
              <View style={deviceDetailstyles.runtimeStats}>
                <View style={styles.runtimeRow}>
                  <Text style={deviceDetailstyles.runtimeValue}>
                    {aggregated.current.toFixed(2)}
                  </Text>
                  <Text style={deviceDetailstyles.runtimeLabel}>
                    {t("screens.deviceDetail.currentUsage")}
                  </Text>
                </View>
                <View style={deviceDetailstyles.divider} />
                <View style={styles.runtimeRow}>
                  <Text style={deviceDetailstyles.runtimeValue}>
                    {aggregated.voltage.toFixed(2)}
                  </Text>
                  <Text style={deviceDetailstyles.runtimeLabel}>
                    {t("screens.deviceDetail.voltageUsage")}
                  </Text>
                </View>
              </View>
            )}
            <TouchableOpacity
              style={{
                alignItems: "center",
                marginTop: 6,
                flexDirection: "row",
                justifyContent: "center",
              }}
              onPress={() => setShowMoreStats((prev) => !prev)}
            >
              <Text style={{ color: "gray", fontWeight: "500", fontSize: 13 }}>
                {showMoreStats
                  ? t("screens.deviceDetail.collapse") || "Show Less"
                  : t("screens.deviceDetail.expand") || "Show More"}
              </Text>
              <Ionicons
                name={showMoreStats ? "chevron-up" : "chevron-down"}
                size={18}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={deviceDetailstyles.usageCard}>
          <Text style={deviceDetailstyles.usageCardTitle}>
            {selectedUsage === 1
              ? t("screens.deviceDetail.energyOverview")
              : t("screens.deviceDetail.costOverview")}
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
          <DailyChart
            deviceId={deviceID}
            userId={currentUser.uid}
            selectedUsage={selectedUsage}
          />
        </View>

        {/* Quick Actions: Schedule, Timer, Away */}
        <View style={deviceDetailstyles.quickActionsContainer}>
          {activeTimers[deviceID] ? (
            <TouchableOpacity style={deviceDetailstyles.quickActionItem}>
              <Ionicons name="time-sharp" size={24} color="gray" />
              <Text
                style={[
                  deviceDetailstyles.quickActionLabel,
                  { color: "#D35400", fontWeight: "800" },
                ]}
              >
                {t("screens.deviceDetail.timerActive")}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setTimerModalVisible(true)}
              style={deviceDetailstyles.quickActionItem}
            >
              <Ionicons name="time-outline" size={24} color="#007aff" />
              <Text style={deviceDetailstyles.quickActionLabel}>
                {t("screens.deviceDetail.timer")}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={deviceDetailstyles.quickActionItem}>
            <Ionicons name="airplane-outline" size={24} color="#007aff" />
            <Text style={deviceDetailstyles.quickActionLabel}>
              {t("screens.deviceDetail.away")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Help & Feedback */}
        <View style={deviceDetailstyles.settingsCard}>
          <Text style={deviceDetailstyles.settingsTitle}>
            {t("screens.deviceDetail.helpFeedback")}
          </Text>
          <Text style={deviceDetailstyles.settingsSubtitle}>
            {t("screens.deviceDetail.supportSubtitle")}
          </Text>
          <TouchableOpacity style={deviceDetailstyles.settingsButton}>
            <Text style={deviceDetailstyles.settingsButtonText}>
              {t("screens.deviceDetail.support")}
            </Text>
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
    width: (cardWidth - 10) / 2, // 3 columns in the row
  },
});
