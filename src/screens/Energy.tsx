import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import useAggregatedEnergyData from "../hooks/useAggregatedData";
import { energyStyles } from "../styles/energyStyles";
import { getMonthName } from "../utils/helper";

const { width } = Dimensions.get("window");

const Energy: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );
  const { aggregatedData, loading, error } = useAggregatedEnergyData();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#578FCA" />
        <Text style={styles.loadingText}>Loading Energy Data...</Text>
      </View>
    );
  }

  if (error || !aggregatedData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || "Something went wrong."}</Text>
      </View>
    );
  }

  const chartData =
    timeRange === "daily"
      ? aggregatedData.daily.labels.map((label, index) => ({
          label, // Convert date to day of the week
          value: aggregatedData.daily.usage[index], // Use the aggregated value for this key
        }))
      : timeRange === "weekly"
      ? aggregatedData.weekly.labels.map((label, index) => ({
          label, // Keep the week format as is
          value: aggregatedData.weekly.usage[index], // Use the aggregated value for this key
        }))
      : aggregatedData.monthly.labels.map((label, index) => ({
          label: getMonthName(label), // Convert month key to month name
          value: aggregatedData.monthly.usage[index], // Use the aggregated value for this key
        }));

  const totalCost =
    timeRange === "daily"
      ? aggregatedData.daily.cost.reduce((sum, cost) => sum + cost, 0) // Sum of all daily costs
      : timeRange === "weekly"
      ? aggregatedData.weekly.cost.reduce((sum, cost) => sum + cost, 0) // Sum of all weekly costs
      : aggregatedData.monthly.cost.reduce((sum, cost) => sum + cost, 0); // Sum of all monthly costs

  return (
    <LinearGradient
      colors={["#578FCA", "#E1F0FF", "#FFFFFF"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={energyStyles.container}>
        <ScrollView contentContainerStyle={energyStyles.scrollContent}>
          {/* Header */}
          <View style={energyStyles.headerContainer}>
            <Text style={energyStyles.headerTitle}>Energy Insights</Text>
            <Text style={energyStyles.headerSubtitle}>
              Monitor your energy usage and cost
            </Text>
          </View>
          {/* Filter Buttons */}
          <View style={energyStyles.filterRow}>
            {(["daily", "weekly", "monthly"] as const).map((range) => (
              <TouchableOpacity
                key={range}
                style={[
                  energyStyles.filterButton,
                  timeRange === range && energyStyles.filterButtonActive,
                ]}
                onPress={() => setTimeRange(range)}
              >
                <Text
                  style={[
                    energyStyles.filterButtonText,
                    timeRange === range && energyStyles.filterButtonTextActive,
                  ]}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Energy Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>
              {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} Usage
              (kWh)
            </Text>
            <BarChart
              data={chartData}
              width={width - 120}
              height={250}
              spacing={40}
              barWidth={40}
              xAxisColor="#637381"
              yAxisLabelSuffix="kWh"
              yAxisTextStyle={{
                fontWeight: "500",
                color: "#637381",
              }}
              initialSpacing={20}
              barStyle={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
              frontColor="#578FCA"
              sideColor={"#3D90D7"}
              topColor={"#3D90D7"}
              noOfSections={5}
              xAxisLabelTextStyle={{
                color: "#637381",
                fontSize: 12,
                fontWeight: "bold",
              }}
              isAnimated={true}
              isThreeD={true}
            />
          </View>

          {/* Cost Breakdown */}
          <View style={styles.costCard}>
            <Ionicons name="wallet" size={30} color="#578FCA" />
            <Text style={styles.costTitle}>Total Cost</Text>
            <Text style={styles.costValue}>₹ {totalCost}</Text>
            <Text style={styles.costSubtitle}>
              This is the total cost for the selected time range.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Energy;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1F0FF",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#637381",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1F0FF",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  summaryCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    width: width - 40,
    alignSelf: "center",
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E3A45",
    marginTop: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#637381",
    marginTop: 5,
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    width: width - 40,
    alignSelf: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E3A45",
    marginBottom: 10,
    textAlign: "center",
  },
  costCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    width: width - 40,
    alignSelf: "center",
    alignItems: "center",
  },
  costTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E3A45",
    marginTop: 10,
  },
  costValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#578FCA",
    marginTop: 10,
  },
  costSubtitle: {
    fontSize: 14,
    color: "#637381",
    marginTop: 5,
    textAlign: "center",
  },
});
