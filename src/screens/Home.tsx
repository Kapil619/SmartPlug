import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import DeviceCard from "../components/DeviceCard";
import TopCard from "../components/TopCard";
import useDevices from "../hooks/useDevices";
import { homeStyles } from "../styles/homeStyles";
import { getUserProfile, updateAggregates } from "../utils/firebaseMethods";
import { calculateAggregates } from "../utils/helper";
import { UserProfile } from "../utils/types";

const { width } = Dimensions.get("window");

const Home = () => {
  const { t } = useTranslation();
  const currentUser = FIREBASE_AUTH.currentUser!;
  const navigation = useNavigation<any>();
  const [topCardData, setTopCardData] = useState<any[]>([]);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const { deviceList } = useDevices(currentUser.uid);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile(currentUser.uid);
        setUserData(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchProfile();
  }, [currentUser.uid]);

  useEffect(() => {
    if (deviceList.length > 0) {
      const aggregates = calculateAggregates(deviceList);
      setTopCardData(aggregates);
    }
  }, [deviceList]);

  const hasUpdatedAggregates = useRef(false);

  useEffect(() => {
    const updateAllDeviceAggregates = async () => {
      if (deviceList.length === 0 || hasUpdatedAggregates.current) return;
      console.log("Updating aggregates for all devices...");
      for (const device of deviceList) {
        await updateAggregates(currentUser.uid, device.id);
      }
      hasUpdatedAggregates.current = true;
    };

    updateAllDeviceAggregates();
  }, [deviceList]);

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
              {t("screens.home.welcome")} {userData?.username}!
            </Text>
            <Text style={homeStyles.headerSubtitle}>
              {t("screens.home.subtitle")}
            </Text>
          </View>
          <View style={homeStyles.headerIcons}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Onboarding");
              }}
              style={homeStyles.iconButton}
            >
              <Ionicons
                name="information-circle-outline"
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={homeStyles.scrollContent}>
          {/* Top Card: Total Energy & Cost */}
          <TopCard data={topCardData} />

          {/* Devices List */}
          <Text style={homeStyles.sectionTitle}>
            {t("screens.home.devices")}
          </Text>
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
          <Ionicons name="add" size={30} color="#000" />
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
