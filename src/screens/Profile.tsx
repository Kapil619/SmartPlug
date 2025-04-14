import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Updates from "expo-updates";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import PremiumModal from "../components/PremiumModal";
import { profileStyles } from "../styles/profileStyles";
import { getUserProfile, logOut } from "../utils/firebaseMethods";
import { UserProfile } from "../utils/types";

export default function Profile() {
  const navigation = useNavigation<any>();
  const [profile, setProfile] = useState<UserProfile>();
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);
  const [visibleSecrets, setVisibleSecrets] = useState<{
    [key: string]: boolean;
  }>({});
  const [premiumModalVisible, setPremiumModalVisible] = useState(false);

  const checkForUpdates = async () => {
    try {
      setUpdateStatus("Checking for updates...");
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        setUpdateStatus("Downloading update...");
        await Updates.fetchUpdateAsync();
        setUpdateStatus("Update downloaded. Restarting app...");
        Updates.reloadAsync();
      } else {
        setUpdateStatus("App is up to date.");
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
      setUpdateStatus("Failed to check for updates.");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser!;
        const prof = await getUserProfile(currentUser.uid);
        setProfile(prof);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

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
            <View style={profileStyles.headerContent}>
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

              {/* User Details */}
              <View style={profileStyles.userDetails}>
                <Text style={profileStyles.profileName}>
                  {profile?.username || "User"}
                </Text>
                <Text style={profileStyles.profileEmail}>
                  {profile?.email || "Email not specified"}
                </Text>
                <Text style={profileStyles.profileState}>
                  {profile?.state || "State not specified"}
                </Text>
              </View>
            </View>
          </View>

          {/* Account Settings Card */}
          <View style={profileStyles.card}>
            <Text style={profileStyles.cardTitle}>Account Settings</Text>

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

            {/* Smaller Check for Updates Button */}
            <TouchableOpacity
              style={profileStyles.settingItem}
              onPress={checkForUpdates}
            >
              <Ionicons
                name="cloud-download-outline"
                size={20}
                color="#007aff"
              />
              <Text style={profileStyles.settingText}>Check for Updates</Text>
            </TouchableOpacity>

            {/* Update Status Text */}
            {updateStatus && (
              <Text
                style={[
                  profileStyles.updateStatus,
                  { marginLeft: 36, marginTop: 4 },
                ]}
              >
                {updateStatus}
              </Text>
            )}

            {/* Premium Plan Button */}
            <TouchableOpacity onPress={() => setPremiumModalVisible(true)}>
              <LinearGradient
                colors={["#F6DC43", "#FFB433", "#FF9B17"]}
                style={profileStyles.premiumButtonGradient}
              >
                <MaterialCommunityIcons
                  name="crown-outline"
                  size={24}
                  color="#000"
                />
                <Text style={profileStyles.premiumButtonText}>Go Premium</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Activity Summary Card */}
          <View style={profileStyles.card}>
            <Text style={profileStyles.cardTitle}>Your Devices</Text>
            {profile?.devices?.map((device, index) => (
              <View key={device.deviceCode}>
                <View style={profileStyles.deviceRow}>
                  <Text style={profileStyles.deviceName}>
                    {device.deviceName || "Unnamed Device"}
                  </Text>
                  <View style={profileStyles.secretContainer}>
                    <Text style={profileStyles.secretKey}>
                      {visibleSecrets[device.deviceCode]
                        ? device.deviceCode
                        : "••••••••••"}
                    </Text>
                    <TouchableOpacity
                      onPress={() => toggleSecret(device.deviceCode)}
                    >
                      <Ionicons
                        name={
                          visibleSecrets[device.deviceCode]
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={20}
                        color="#007aff"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={profileStyles.statsRow}>
                  <Text style={profileStyles.stat}>Energy: {"--"}</Text>
                  <Text style={profileStyles.stat}>Cost: {"--"}</Text>
                </View>
                {index < profile.devices.length - 1 && (
                  <View style={profileStyles.seperator} />
                )}
              </View>
            ))}
          </View>

          {/* Log Out Button */}
          <TouchableOpacity
            onPress={() => {
              logOut();
              navigation.reset({ index: 0, routes: [{ name: "Login" }] });
            }}
            style={profileStyles.logoutButton}
          >
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={profileStyles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      <PremiumModal
        visible={premiumModalVisible}
        onClose={() => setPremiumModalVisible(false)}
      />
    </LinearGradient>
  );
}
