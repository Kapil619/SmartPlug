import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { logOut } from "../utils/firebaseMethods";

const Profile = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
      {/* Profile Picture */}
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: "https://via.placeholder.com/150",
          }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Ionicons name="pencil-outline" size={20} color="white" />
        </TouchableOpacity>
        <Text style={[styles.profileName, darkMode && styles.darkText]}>
          Chinmay Rathod
        </Text>
        <Text style={[styles.profileEmail, darkMode && styles.darkSubText]}>
          chinmayrathod2003@gmail.com
        </Text>
      </View>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
          Personal Information
        </Text>

        <View style={styles.infoItem}>
          <Ionicons name="person-outline" size={22} color="#03A9F4" />
          <TextInput
            style={[styles.infoText, darkMode && styles.darkSubText]}
            value="Chinmay Rathod"
            editable={false}
          />
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="mail-outline" size={22} color="#03A9F4" />
          <TextInput
            style={[styles.infoText, darkMode && styles.darkSubText]}
            value="chinmayrathod2003@gmail.com"
            editable={false}
          />
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="call-outline" size={22} color="#03A9F4" />
          <TextInput
            style={[styles.infoText, darkMode && styles.darkSubText]}
            value="+91 8412 01 4492"
            editable={false}
          />
        </View>
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
          Account Settings
        </Text>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="lock-closed-outline" size={22} color="#03A9F4" />
          <Text style={[styles.settingText, darkMode && styles.darkText]}>
            Change Password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="notifications-outline" size={22} color="#03A9F4" />
          <Text style={[styles.settingText, darkMode && styles.darkText]}>
            Notification Settings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="globe-outline" size={22} color="#03A9F4" />
          <Text style={[styles.settingText, darkMode && styles.darkText]}>
            Language Preferences
          </Text>
        </TouchableOpacity>
      </View>

      {/* Activity Summary */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
          Activity Summary
        </Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Ionicons name="hardware-chip" size={28} color="#03A9F4" />
            <Text style={[styles.summaryValue, darkMode && styles.darkText]}>
              5 Devices
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Ionicons name="flash-outline" size={28} color="#03A9F4" />
            <Text style={[styles.summaryValue, darkMode && styles.darkText]}>
              30 kWh Used
            </Text>
          </View>
        </View>
      </View>

      {/* Theme Switch */}
      <View style={styles.switchRow}>
        <Text style={[styles.switchLabel, darkMode && styles.darkText]}>
          Dark Mode
        </Text>
        <Switch
          value={darkMode}
          onValueChange={() => setDarkMode(!darkMode)}
          trackColor={{ false: "#767577", true: "#03A9F4" }}
          thumbColor={darkMode ? "#f4f3f4" : "#f4f3f4"}
        />
      </View>

      {/* Log Out */}
      <TouchableOpacity onPress={logOut} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color="white" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#03A9F4",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 5,
    backgroundColor: "#03A9F4",
    borderRadius: 50,
    padding: 5,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  profileEmail: {
    fontSize: 16,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  darkText: {
    color: "#fff",
  },
  darkSubText: {
    color: "#ccc",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  settingText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  summaryCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5252",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 30,
    marginVertical: 35,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: "white",
  },
});

export default Profile;
