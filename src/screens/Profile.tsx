import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { users } from "../utils/data";
// Example logout function from your existing code
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { profileStyles } from "../styles/profileStyles";
import { getUserProfile, logOut } from "../utils/firebaseMethods";
import { UserProfile } from "../utils/types";

export default function Profile() {
  const currentUser = users[0];
  const navigation = useNavigation<any>();
  const [profile, setProfile] = useState<UserProfile>();

  // State to toggle secret key visibility per device
  const [visibleSecrets, setVisibleSecrets] = useState<{
    [key: string]: boolean;
  }>({});

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
            <Text style={profileStyles.profileName}>
              {profile?.username || "User"}
            </Text>
            <Text style={profileStyles.profileEmail}>
              {profile?.email || ""}
            </Text>
          </View>

          {/* Personal Info Card */}
          <View style={profileStyles.card}>
            <Text style={profileStyles.cardTitle}>Personal Information</Text>
            <View style={profileStyles.infoItem}>
              <Ionicons name="call-outline" size={20} color="#007aff" />
              <Text style={profileStyles.infoText}>{"+91 8412014492"}</Text>
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
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            }}
            style={profileStyles.logoutButton}
          >
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={profileStyles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
