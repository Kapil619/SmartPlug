import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Home = () => {
  const devices = [
    { id: "1", name: "Smart Plug 1", status: "On" },
    { id: "2", name: "Smart Plug 2", status: "Off" },
    { id: "3", name: "Smart Plug 3", status: "Off" },
    { id: "4", name: "Smart Plug 4", status: "Off" },
    { id: "5", name: "Smart Plug 5", status: "Off" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Greeting */}
      <Text style={styles.greeting}>Hello, {"User"}!</Text>

      {/* Overview Section */}
      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.overview}>
        <View style={styles.smallCard}>
          <Ionicons name="hardware-chip" size={28} color="white" />
          <Text style={styles.cardText}>Devices</Text>
          <Text style={styles.cardValue}>{devices.length}</Text>
        </View>
        <View style={styles.smallCard}>
          <Ionicons name="flash" size={28} color="white" />
          <Text style={styles.cardText}>Usage</Text>
          <Text style={styles.cardValue}>24 kWh</Text>
        </View>
        <View style={styles.smallCard}>
          <Ionicons name="power" size={28} color="white" />
          <Text style={styles.cardText}>Active</Text>
          <Text style={styles.cardValue}>1</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="add-circle-outline" size={28} color="white" />
          <Text style={styles.actionText}>Add Device</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="list" size={28} color="white" />
          <Text style={styles.actionText}>View Devices</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activity */}
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      {devices.map((item) => (
        <View key={item.id} style={styles.activityCard}>
          <Ionicons
            name={item.status === "On" ? "power-outline" : "power-sharp"}
            size={22}
            color={item.status === "On" ? "#4CAF50" : "#FF5252"}
          />
          <View style={styles.activityDetails}>
            <Text style={styles.activityText}>
              {item.name} - {item.status}
            </Text>
            <Text style={styles.activityTime}>Today, 5:30 PM</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  greeting: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    color: "#333",
  },
  overview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  smallCard: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: 15,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
  cardValue: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "#03A9F4",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  actionText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  activityCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  activityDetails: {
    marginLeft: 10,
  },
  activityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activityTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
});

export default Home;
