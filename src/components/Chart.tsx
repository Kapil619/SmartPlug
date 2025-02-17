import React from "react";
import { Dimensions } from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";

type EnergyTrendsChartProps = {
  selectedUsage: number;
};

const EnergyTrendsChart: React.FC<EnergyTrendsChartProps> = ({
  selectedUsage,
}) => {
  const screenWidth = Dimensions.get("window").width - 130;

  // Sample data for each chart type:
  const lineChartData =
    selectedUsage === 0
      ? [
          { value: 10, label: "1" },
          { value: 20, label: "2" },
          { value: 15, label: "3" },
          { value: 30, label: "4" },
          { value: 25, label: "5" },
        ]
      : [
          { value: 2, label: "Jan" },
          { value: 4, label: "Feb" },
          { value: 3, label: "Mar" },
          { value: 5, label: "Apr" },
          { value: 4, label: "May" },
        ];

  const barChartData = [
    { value: 5, label: "Mon" },
    { value: 15, label: "Tue" },
    { value: 10, label: "Wed" },
    { value: 20, label: "Thu" },
    { value: 15, label: "Fri" },
  ];

  return selectedUsage === 1 ? (
    <BarChart
      data={barChartData}
      width={screenWidth}
      height={200}
      barWidth={30}
      xAxisColor="#637381"
      yAxisColor="#637381"
      initialSpacing={20}
      barStyle={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
      frontColor="skyblue"
      noOfSections={5}
    />
  ) : (
    <LineChart
      data={lineChartData}
      width={screenWidth}
      height={200}
      yAxisColor="#637381"
      xAxisColor="#637381"
      initialSpacing={20}
      color="skyblue"
      hideDataPoints
      showArrows={true}
      thickness={2}
      noOfSections={5}
    />
  );
};

export default EnergyTrendsChart;
