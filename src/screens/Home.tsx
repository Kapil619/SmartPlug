import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
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
import TopCard from "../components/TopCard";
import { homeStyles } from "../styles/homeStyles";
import { devices, topCardData } from "../utils/data";

const { width } = Dimensions.get("window");

const Home = () => {
  const navigation = useNavigation<any>();
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
            <Text style={homeStyles.headerTitle}>Hello, User!</Text>
            <Text style={homeStyles.headerSubtitle}>
              Monitor and control your devices
            </Text>
          </View>
          <View style={homeStyles.headerIcons}>
            <TouchableOpacity
              onPress={() => {
                // Navigate to notifications screen
              }}
              style={homeStyles.iconButton}
            >
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
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
            {devices.map((device, index) => {
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
                    <Text style={homeStyles.deviceName}>{device.name}</Text>
                    <Text style={homeStyles.deviceStatus}>
                      Status: {device.status}
                    </Text>
                  </View>
                  <Text style={homeStyles.applianceName}>
                    {device.appliance ? device.appliance : "No appliance"}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Floating Add Device Button */}
        <TouchableOpacity style={homeStyles.floatingButton}>
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
