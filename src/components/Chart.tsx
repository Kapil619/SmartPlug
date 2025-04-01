import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { fetchDailyAggregates } from "../utils/firebaseMethods";

type EnergyTrendsChartProps = {
  selectedUsage: number;
  userId: string;
  deviceId: string;
};

const EnergyTrendsChart: React.FC<EnergyTrendsChartProps> = ({
  selectedUsage,
  userId,
  deviceId,
}) => {
  const screenWidth = Dimensions.get("window").width - 130;

  const [barChartData, setBarChartData] = useState<any[]>([]);
  const [lineChartData, setLineChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const { barData, lineData } = await fetchDailyAggregates(
        userId,
        deviceId
      );
      setBarChartData(barData);
      setLineChartData(lineData);
    };

    fetchChartData();
  }, [userId, deviceId]);

  return selectedUsage === 1 ? (
    <BarChart
      yAxisLabelSuffix="kWh"
      yAxisTextStyle={{
        fontWeight: "500",
        color: "#637381",
      }}
      data={barChartData}
      width={screenWidth}
      height={200}
      barWidth={30}
      xAxisColor="#637381"
      yAxisColor="#637381"
      initialSpacing={20}
      barStyle={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
      frontColor="#57B4BA"
      sideColor={"#015551"}
      topColor={"#143D60"}
      capColor={"green"}
      backgroundColor={"#F2F2F2"}
      noOfSections={5}
      isAnimated={true}
      isThreeD={true}
    />
  ) : (
    <LineChart
      yAxisLabelSuffix="₹"
      areaChart
      data={lineChartData}
      width={screenWidth}
      height={200}
      startOpacity={0.8}
      backgroundColor={"#F2F2F2"}
      startFillColor="rgb(117, 176, 160)"
      endFillColor="rgb(46, 217, 255)"
      endOpacity={0.3}
      yAxisColor="#637381"
      xAxisColor="#637381"
      initialSpacing={20}
      color="skyblue"
      hideDataPoints
      showArrows={true}
      thickness={2}
      noOfSections={5}
      animateTogether={true}
      isAnimated={true}
      animateOnDataChange={true}
    />
  );
};

export default EnergyTrendsChart;
