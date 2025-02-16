import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import EnergyCharts from "../components/EnergyChart";
import Header from "../components/Header";
import { energyStyles } from "../styles/energyStyles";

const { width } = Dimensions.get("window");

const Energy: React.FC = () => {
  // State for controlling the active filter/time range (for cost card highlight)
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );

  // Example data arrays
  const dailyUsage = [1.2, 2.4, 1.8, 2.0, 2.1, 3.0, 2.5];
  const weeklyUsage = [15, 14, 12, 17, 18];
  const monthlyUsage = [60, 70, 65, 55, 80];

  // Example cost calculations (currency units)
  const dailyCost = 5.2;
  const weeklyCost = 25.7;
  const monthlyCost = 96.3;

  // Transform usage arrays into chart data objects
  const dailyChartData = dailyUsage.map((value, index) => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return { value, label: days[index] };
  });
  const weeklyChartData = weeklyUsage.map((value, index) => {
    return { value, label: `W${index + 1}` };
  });
  const monthlyChartData = monthlyUsage.map((value, index) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May"];
    return { value, label: months[index] };
  });

  // Cost breakdown data for the cost card chart
  const costChartData = [
    { value: dailyCost, label: "Daily" },
    { value: weeklyCost, label: "Weekly" },
    { value: monthlyCost, label: "Monthly" },
  ];

  return (
    <LinearGradient
      colors={["#578FCA", "#E1F0FF", "#FFFFFF"]}
      style={{ flex: 1 }}
    >
      <Header title="Energy Insights" />
      <SafeAreaView style={energyStyles.container}>
        <ScrollView contentContainerStyle={energyStyles.scrollContent}>
          {/* Header */}
          <View style={energyStyles.headerContainer}>
            <Text style={energyStyles.headerTitle}>Energy Insights</Text>
            <Text style={energyStyles.headerSubtitle}>
              Track your power usage & cost
            </Text>
          </View>

          {/* Filter Buttons: full-width segmented control */}
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

          <EnergyCharts
            timeRange={timeRange}
            dailyChartData={dailyChartData}
            weeklyChartData={weeklyChartData}
            monthlyChartData={monthlyChartData}
          />

          {/* Cost Breakdown Card */}
          <View style={styles.costCard}>
            <View style={energyStyles.costInfo}>
              <Text style={energyStyles.costTitle}>Cost Breakdown</Text>
              <Text style={energyStyles.costValue}>
                {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} Cost: ₹{" "}
                {timeRange === "daily"
                  ? dailyCost.toFixed(2)
                  : timeRange === "weekly"
                  ? weeklyCost.toFixed(2)
                  : monthlyCost.toFixed(2)}
              </Text>
              <Text style={energyStyles.costSubtitle}>
                Energy Cost Comparison
              </Text>
              <BarChart
                data={costChartData}
                width={width - 130}
                height={180}
                barWidth={50}
                xAxisColor="#637381"
                yAxisColor="#637381"
                initialSpacing={20}
                barStyle={{ borderRadius: 4 }}
                frontColor="#578FCA"
                noOfSections={5}
              />
            </View>
          </View>

          {/* Additional Features */}
          <View style={energyStyles.featureCard}>
            <Text style={energyStyles.featureTitle}>Energy Saving Tips</Text>
            <Text style={energyStyles.featureSubtitle}>
              • Turn off idle appliances.{"\n"}• Schedule heavy-usage tasks on
              off-peak hours{"\n"}• Keep track of daily spikes to identify waste
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Energy;

const styles = StyleSheet.create({
  costCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    width: width - 40,
    alignSelf: "center",
  },
});
