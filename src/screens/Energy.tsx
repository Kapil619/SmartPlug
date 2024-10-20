import React from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { LineChart, BarChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";

const Energy = () => {
  // Placeholder data for charts
  const energyData = [
    { label: "Mon", value: 10 },
    { label: "Tue", value: 20 },
    { label: "Wed", value: 30 },
    { label: "Thu", value: 15 },
    { label: "Fri", value: 25 },
    { label: "Sat", value: 20 },
    { label: "Sun", value: 30 },
  ];

  const deviceEnergyData = [
    { id: "1", name: "Smart Plug 1", energyUsage: "12 kWh", cost: "$3.5" },
    { id: "2", name: "Smart Plug 2", energyUsage: "8 kWh", cost: "$2.1" },
    { id: "3", name: "Smart Plug 3", energyUsage: "6 kWh", cost: "$1.8" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Energy Overview */}
      <Text style={styles.title}>Energy Overview</Text>
      <View style={styles.overview}>
        <View style={styles.overviewCard}>
          <Ionicons name="flash-outline" size={28} color="#fff" />
          <Text style={styles.overviewText}>Today</Text>
          <Text style={styles.overviewValue}>24 kWh</Text>
        </View>
        <View style={styles.overviewCard}>
          <Ionicons name="calendar-outline" size={28} color="#fff" />
          <Text style={styles.overviewText}>This Week</Text>
          <Text style={styles.overviewValue}>120 kWh</Text>
        </View>
        <View style={styles.overviewCard}>
          <Ionicons name="wallet-outline" size={28} color="#fff" />
          <Text style={styles.overviewText}>Total Cost</Text>
          <Text style={styles.overviewValue}>$30.75</Text>
        </View>
      </View>

      {/* Energy Usage Trends */}
      <Text style={styles.sectionTitle}>Energy Trends</Text>
      <LineChart
        data={energyData}
        width={300}
        height={200}
        color="#03A9F4"
        backgroundColor="#fff"
        dataPointsColor="red"
      />

      {/* Energy Breakdown by Device */}
      <Text style={styles.sectionTitle}>Energy by Device</Text>
      <FlatList
        data={deviceEnergyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deviceCard}>
            <Text style={styles.deviceName}>{item.name}</Text>
            <Text style={styles.deviceDetails}>Usage: {item.energyUsage}</Text>
            <Text style={styles.deviceDetails}>Cost: {item.cost}</Text>
          </View>
        )}
      />

      {/* Bar Chart for Comparison */}
      <Text style={styles.sectionTitle}>Device Comparison</Text>
      <BarChart
        data={energyData}
        width={300}
        height={200}
        barWidth={20}
        barBorderRadius={4}
        frontColor="#FF5252"
        backgroundColor="#fff"
      />

      {/* Energy Saving Tips */}
      <Text style={styles.sectionTitle}>Energy Saving Tips</Text>
      <View style={styles.tipsCard}>
        <Ionicons name="bulb-outline" size={24} color="#4CAF50" />
        <Text style={styles.tipText}>
          Turn off devices when not in use to save energy.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  overview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  overviewCard: {
    backgroundColor: "#03A9F4",
    padding: 15,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
  },
  overviewText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
  overviewValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    color: "#333",
  },
  chart: {
    marginVertical: 10,
  },
  deviceCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deviceDetails: {
    fontSize: 14,
    color: "#666",
  },
  tipsCard: {
    backgroundColor: "#e8f5e9",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  tipText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#4CAF50",
  },
});

export default Energy;
