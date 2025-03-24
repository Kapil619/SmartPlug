import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_RTDB } from "../../firebaseConfig";
import DeviceCard from "../components/DeviceCard";
import TopCard from "../components/TopCard";
import { useDeviceAggregates } from "../hooks/useAggregates";
import { useDeviceData } from "../hooks/useDeviceData";
import { homeStyles } from "../styles/homeStyles";
import { getUserProfile } from "../utils/firebaseMethods";
import { UserProfile } from "../utils/types";

const { width } = Dimensions.get("window");

const Home = () => {
  const currentUser = FIREBASE_AUTH.currentUser!;
  const navigation = useNavigation<any>();
  const [topCardData, setTopCardData] = useState<any[]>([]);
  const [deviceList, setDeviceList] = useState<any[]>([]);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [primaryDeviceId, setPrimaryDeviceId] = useState<string | null>(null);

  const getPrimaryDeviceId = (devices: any[]): string | null => {
    console.log("Devices", devices[0].id);
    return devices.length > 0 ? devices[0].id : null;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile(currentUser.uid);
        setUserData(profile);
        console.log("User profile:", profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchProfile();
  }, [currentUser.uid]);

  useEffect(() => {
    const devicesRef = ref(FIREBASE_RTDB, `users/${currentUser.uid}/devices`);
    const unsubscribeDevices = onValue(devicesRef, (snapshot) => {
      if (snapshot.exists()) {
        const devicesObj = snapshot.val();
        // Convert the object to an array
        const devicesArray = Object.keys(devicesObj).map((key) => ({
          id: key,
          ...devicesObj[key],
        }));
        setDeviceList(devicesArray);
        const primaryId = getPrimaryDeviceId(devicesArray);
        setPrimaryDeviceId(primaryId);
      } else {
        setDeviceList([]);
        setPrimaryDeviceId(null);
      }
    });
    return () => {
      unsubscribeDevices();
    };
  }, []);
  const { latestData, dailyUsage } = useDeviceData(
    currentUser.uid,
    primaryDeviceId || ""
  );
  const aggregations = useDeviceAggregates(
    currentUser.uid,
    primaryDeviceId || ""
  );
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
    console.log("TopCardData", topCardData);
  }, [latestData, aggregations]);

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
              Hello, {userData?.username}!
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
                <DeviceCard
                  key={device.id}
                  device={device}
                  userId={currentUser.uid}
                  backgroundColor={bgColor}
                />
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
