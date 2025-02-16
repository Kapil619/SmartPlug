import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Example logout function from your existing code
import { profileStyles } from "../styles/profileStyles";
import { logOut } from "../utils/firebaseMethods";

const { width } = Dimensions.get("window");

export default function Profile() {
  // Example user data
  const userName = "Chinmay Rathod";
  const userEmail = "chinmayrathod2003@gmail.com";
  const userPhone = "+91 8412 01 4492";

  // Dummy device data with secret keys (10 characters)
  const devices = [
    { id: "1", name: "Living Room Plug", secret: "ABCDEF1234" },
    { id: "2", name: "Bedroom Plug", secret: "XYZ9876543" },
  ];

  // State to toggle secret key visibility per device
  const [visibleSecrets, setVisibleSecrets] = useState<{
    [key: string]: boolean;
  }>({
    "1": false,
    "2": false,
  });

  const toggleSecret = (id: string) => {
    setVisibleSecrets((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <LinearGradient
      colors={["#578FCA", "#E1F0FF", "#FFFFFF"]}
      style={profileStyles.gradientContainer}
    >
      <SafeAreaView style={profileStyles.container}>
        <ScrollView contentContainerStyle={profileStyles.scrollContent}>
          {/* Header / Profile Info */}
          <View style={profileStyles.headerSection}>
            <View style={profileStyles.avatarContainer}>
              <Image
                source={{
                  uri: "https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
                }}
                style={profileStyles.profileImage}
              />
              <TouchableOpacity style={profileStyles.editIcon}>
                <Ionicons name="pencil-outline" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={profileStyles.profileName}>{userName}</Text>
            <Text style={profileStyles.profileEmail}>{userEmail}</Text>
          </View>

          {/* Personal Info Card */}
          <View style={profileStyles.card}>
            <Text style={profileStyles.cardTitle}>Personal Information</Text>
            <View style={profileStyles.infoItem}>
              <Ionicons name="call-outline" size={20} color="#007aff" />
              <Text style={profileStyles.infoText}>{userPhone}</Text>
            </View>
          </View>

          {/* Account Settings Card */}
          <View style={profileStyles.card}>
            <Text style={profileStyles.cardTitle}>Account Settings</Text>
            <TouchableOpacity style={profileStyles.settingItem}>
              <Ionicons name="lock-closed-outline" size={20} color="#007aff" />
              <Text style={profileStyles.settingText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={profileStyles.settingItem}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#007aff"
              />
              <Text style={profileStyles.settingText}>
                Notification Settings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={profileStyles.settingItem}>
              <Ionicons name="globe-outline" size={20} color="#007aff" />
              <Text style={profileStyles.settingText}>
                Language Preferences
              </Text>
            </TouchableOpacity>
          </View>

          {/* Activity Summary Card */}
          <View style={profileStyles.card}>
            <Text style={profileStyles.cardTitle}>Activity Summary</Text>
            {devices.map((device) => (
              <View key={device.id} style={profileStyles.deviceRow}>
                <Text style={profileStyles.deviceName}>{device.name}</Text>
                <View style={profileStyles.secretContainer}>
                  <Text style={profileStyles.secretKey}>
                    {visibleSecrets[device.id] ? device.secret : "••••••••••"}
                  </Text>
                  <TouchableOpacity onPress={() => toggleSecret(device.id)}>
                    <Ionicons
                      name={
                        visibleSecrets[device.id]
                          ? "eye-off-outline"
                          : "eye-outline"
                      }
                      size={20}
                      color="#007aff"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Log Out Button */}
          <TouchableOpacity onPress={logOut} style={profileStyles.logoutButton}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={profileStyles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
