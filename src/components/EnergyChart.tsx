import React from "react";
import { Dimensions, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { energyStyles } from "../styles/energyStyles";

const { width } = Dimensions.get("window");

type ChartDataItem = { value: number; label: string };

type EnergyChartsProps = {
  timeRange: "daily" | "weekly" | "monthly";
  dailyChartData: ChartDataItem[];
  weeklyChartData: ChartDataItem[];
  monthlyChartData: ChartDataItem[];
};

const EnergyCharts: React.FC<EnergyChartsProps> = ({
  timeRange,
  dailyChartData,
  weeklyChartData,
  monthlyChartData,
}) => {
  if (timeRange === "daily") {
    return (
      <View style={energyStyles.chartCard}>
        <Text style={energyStyles.chartTitle}>Daily Usage (kWh)</Text>
        <BarChart
          data={dailyChartData}
          width={width - 120}
          height={200}
          barWidth={30}
          xAxisColor="#637381"
          yAxisColor="#637381"
          initialSpacing={20}
          barStyle={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
          frontColor="#DE7C7D"
          noOfSections={5}
        />
      </View>
    );
  }
  if (timeRange === "weekly") {
    return (
      <View style={energyStyles.chartCard}>
        <Text style={energyStyles.chartTitle}>Weekly Usage (kWh)</Text>
        <BarChart
          data={weeklyChartData}
          width={width - 120}
          height={200}
          barWidth={35}
          xAxisColor="#637381"
          yAxisColor="#637381"
          initialSpacing={30}
          barStyle={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
          frontColor="#C5705D"
          noOfSections={5}
        />
      </View>
    );
  }
  if (timeRange === "monthly") {
    return (
      <View style={energyStyles.chartCard}>
        <Text style={energyStyles.chartTitle}>Monthly Usage (kWh)</Text>
        <BarChart
          data={monthlyChartData}
          width={width - 120}
          height={200}
          barWidth={30}
          xAxisColor="#637381"
          yAxisColor="#637381"
          initialSpacing={20}
          barStyle={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
          frontColor="#E17564"
          noOfSections={5}
        />
      </View>
    );
  }
  return null;
};

export default EnergyCharts;
