import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { FIREBASE_RTDB } from "../../firebaseConfig";
import TopCard from "../components/TopCard";
import { useDeviceAggregates } from "../hooks/useAggregates";
import { useDeviceData } from "../hooks/useDeviceData";
import { useDeviceMetadata } from "../hooks/useMetaData";
import { homeStyles } from "../styles/homeStyles";
import { users } from "../utils/data";

const { width } = Dimensions.get("window");
const currentUser = users[0];
const deviceID = "1";
const Home = () => {
  const navigation = useNavigation<any>();
  const [topCardData, setTopCardData] = useState<any[]>([]);
  const [deviceList, setDeviceList] = useState<any[]>([]);
  const { latestData, dailyUsage } = useDeviceData(currentUser.id, deviceID);
  const metadata = useDeviceMetadata(currentUser.id, deviceID);
  const aggregations = useDeviceAggregates(currentUser.id, deviceID);

  useEffect(() => {
    const todayData = {
      type: "today",
      usage: latestData?.EnergyConsumed || 0,
      cost: latestData?.BillingAmount || 0,
    };

    const currentDate = new Date();
    const currentMonthKey = currentDate.toISOString().slice(0, 7); // e.g. "2025-03"

    const previousDate = new Date();
    previousDate.setMonth(previousDate.getMonth() - 1);
    const previousMonthKey = previousDate.toISOString().slice(0, 7); // e.g. "2025-02"

    let currentAggregate = { EnergyConsumed: 0, BillingAmount: 0 };
    let previousAggregate = { EnergyConsumed: 0, BillingAmount: 0 };

    if (aggregations && aggregations.monthly) {
      currentAggregate =
        aggregations.monthly[currentMonthKey] || currentAggregate;
      previousAggregate =
        aggregations.monthly[previousMonthKey] || previousAggregate;
    }

    setTopCardData([
      todayData,
      {
        type: "month",
        usage: currentAggregate.EnergyConsumed,
        cost: currentAggregate.BillingAmount,
      },
      {
        type: "previous",
        usage: previousAggregate.EnergyConsumed,
        cost: previousAggregate.BillingAmount,
      },
    ]);
  }, [latestData, aggregations]);

  useEffect(() => {
    const devicesRef = ref(FIREBASE_RTDB, `users/${currentUser.id}/devices`);
    const unsubscribeDevices = onValue(devicesRef, (snapshot) => {
      if (snapshot.exists()) {
        const devicesObj = snapshot.val();
        // Convert the object to an array
        const devicesArray = Object.keys(devicesObj).map((key) => ({
          id: key,
          ...devicesObj[key],
        }));
        setDeviceList(devicesArray);
      } else {
        setDeviceList([]);
      }
    });
    return () => {
      unsubscribeDevices();
    };
  }, []);

  return (
    <LinearGradient
      colors={["#578FCA", "#E1F0FF", "#FFFFFF"]}
      style={homeStyles.gradientContainer}
    >
      {/* Use SafeAreaView for iOS notch spacing */}
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={homeStyles.headerContainer}>
          <View style={homeStyles.headerTextContainer}>
            <Text style={homeStyles.headerTitle}>
              Hello, {currentUser.name}!
            </Text>
            <Text style={homeStyles.headerSubtitle}>
              Monitor and control your devices
            </Text>
          </View>
          <View style={homeStyles.headerIcons}>
            <TouchableOpacity
              onPress={() => {
                ToastAndroid.show(
                  "Notifications coming soon!",
                  ToastAndroid.SHORT
                );
                // Navigate to notifications screen
              }}
              style={homeStyles.iconButton}
            >
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                ToastAndroid.show("Settings coming soon!", ToastAndroid.SHORT);
                // Navigate to settings screen
              }}
              style={homeStyles.iconButton}
            >
              <Ionicons name="settings-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={homeStyles.scrollContent}>
          {/* Top Card: Total Energy & Cost */}
          <TopCard data={topCardData} />

          {/* Devices List */}
          <Text style={homeStyles.sectionTitle}>Your Devices</Text>
          <View style={homeStyles.devicesContainer}>
            {deviceList.map((device, index) => {
              const row = Math.floor(index / 2);
              const col = index % 2;
              const bgColor =
                row % 2 === 0
                  ? col === 0
                    ? "#fff"
                    : "#E1F0FF"
                  : col === 0
                  ? "#E1F0FF"
                  : "#fff";
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("DeviceDetail", {
                      device,
                    });
                  }}
                  key={device.id}
                  style={[
                    styles.deviceCard,
                    // Alternate card background color for diagonal cards
                    { backgroundColor: bgColor },
                  ]}
                >
                  {/* Top row: Plug image and power icon */}
                  <View style={homeStyles.cardTopRow}>
                    <Image
                      source={require("../../assets/plug.png")}
                      style={homeStyles.deviceImage}
                    />
                    <TouchableOpacity style={homeStyles.powerIcon}>
                      <Ionicons
                        name={
                          device.status === "On"
                            ? "power-outline"
                            : "power-sharp"
                        }
                        size={18}
                        color={device.status === "On" ? "white" : "#EEEEEE"}
                        style={{
                          backgroundColor:
                            device.status === "On" ? "#578FCA" : "#999",
                          borderRadius: 50,
                          padding: 8,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  {/* Bottom: Device name and status */}
                  <View style={homeStyles.cardBottom}>
                    <Text style={homeStyles.deviceName}>
                      {metadata ? metadata.appliance : device.name}
                    </Text>
                    <Text style={homeStyles.deviceStatus}>
                      Status: {device.status || "Off"}
                    </Text>
                  </View>
                  <Text style={homeStyles.applianceName}>
                    {metadata ? metadata.deviceName : device.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Floating Add Device Button */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddDevice");
          }}
          style={homeStyles.floatingButton}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  deviceCard: {
    backgroundColor: "#fff",
    width: (width - 60) / 2, // 20 padding + 20 padding + 20 gap = 60
    height: (width - 60) / 2, // square shape
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
