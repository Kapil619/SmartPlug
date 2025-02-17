import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from "react-native";
import { componentStyles } from "../styles/componentStyles";
import { TopCardProps } from "../utils/types";

const { width } = Dimensions.get("window");
const cardWidth = width - 40;

const TopCard: React.FC<TopCardProps> = ({ data }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % data.length;
      setActiveIndex(nextIndex);
      scrollRef.current?.scrollTo({
        x: nextIndex * cardWidth,
        y: 0,
        animated: true,
      });
    }, 5000); // 5-second interval for gentle transitions
    return () => clearInterval(timer);
  }, [activeIndex, data.length]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
    setActiveIndex(slide);
  };

  const currentTime = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Format Indian currency
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  return (
    <View style={componentStyles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        snapToInterval={cardWidth}
        decelerationRate="fast"
      >
        {data.map((item, index) => (
          <View
            key={index}
            style={[componentStyles.slide, { width: cardWidth }]}
          >
            <View style={componentStyles.contentRow}>
              <View style={componentStyles.infoColumn}>
                <View style={componentStyles.headerRow}>
                  <Ionicons
                    name="stats-chart"
                    size={24}
                    color="#007aff"
                    style={componentStyles.headerIcon}
                  />
                  <Text style={componentStyles.title}>
                    {item.type === "today"
                      ? `Today (${currentTime})`
                      : item.type === "month"
                      ? `Current Month (${currentMonth})`
                      : item.type === "previous"
                      ? item.month || "Previous Month"
                      : item.title}
                  </Text>
                </View>
                <View style={componentStyles.statsRow}>
                  {item.usage != null ? (
                    <>
                      <Text style={componentStyles.statLabel}>Usage:</Text>
                      <Text style={componentStyles.statValue}>
                        {item.usage} kWh
                      </Text>
                    </>
                  ) : (
                    <Text style={componentStyles.statValue}>
                      Usage: No data
                    </Text>
                  )}
                </View>
                {item.cost != null ? (
                  <View style={componentStyles.statsRow}>
                    <Text style={componentStyles.statLabel}>Cost: </Text>
                    <Text
                      style={[
                        componentStyles.statValue,
                        {
                          color: item.cost < 100 ? "#BE3144" : "green",
                        },
                      ]}
                    >
                      {formatCurrency(item.cost)}
                    </Text>
                  </View>
                ) : (
                  <Text style={componentStyles.subtitle}>Cost: No data</Text>
                )}
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
      <View style={componentStyles.dotsContainer}>
        {data.map((_, i) => (
          <Ionicons
            key={i}
            name="ellipse"
            size={8}
            color={i === activeIndex ? "#007aff" : "#ccc"}
            style={{ marginHorizontal: 3 }}
          />
        ))}
      </View>
    </View>
  );
};

export default TopCard;
