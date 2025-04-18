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
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");
const cardWidth = width - 45;

const TopCard: React.FC<TopCardProps> = ({ data }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();
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

  //get previous month too
  const now = new Date();
  const previousDate = new Date();
  previousDate.setMonth(now.getMonth() - 1);
  const previousMonth = previousDate.toLocaleString("default", {
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
        contentContainerStyle={{ gap: 5 }} // <-- Add this line
      >
        {data.map((item, index) => (
          <View
            key={index}
            style={[componentStyles.slide, { width: cardWidth }]} // <-- No margin here
          >
            <View style={componentStyles.contentRow}>
              <View style={componentStyles.infoColumn}>
                <View style={componentStyles.headerRow}>
                  <Ionicons
                    name="stats-chart"
                    size={24}
                    color="#9EC6F3"
                    style={componentStyles.headerIcon}
                  />
                  <Text style={componentStyles.title}>
                    {item.type === "today"
                      ? `${t("screens.topCard.today")} (${currentTime})`
                      : item.type === "month"
                      ? `${t("screens.topCard.currentMonth")} (${currentMonth})`
                      : item.type === "previous"
                      ? item.month ||
                        `${t(
                          "screens.topCard.previousMonth"
                        )} (${previousMonth})`
                      : item.title}
                  </Text>
                </View>
                <View style={componentStyles.statsRow}>
                  {item.usage != null ? (
                    <>
                      <Text style={componentStyles.statLabel}>
                        {t("screens.topCard.usage")}
                      </Text>
                      <Text style={componentStyles.statValue}>
                        {item.usage.toFixed(2)} kWh
                      </Text>
                    </>
                  ) : (
                    <Text style={componentStyles.statValue}>
                      {t("screens.topCard.usageNoData")}
                    </Text>
                  )}
                </View>
                {item.cost != null ? (
                  <View style={componentStyles.statsRow}>
                    <Text style={componentStyles.statLabel}>
                      {t("screens.topCard.cost")}
                    </Text>
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
                  <Text style={componentStyles.subtitle}>
                    {t("screens.topCard.costNoData")}
                  </Text>
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
            color={i === activeIndex ? "#9EC6F3" : "#ccc"}
            style={{ marginHorizontal: 3 }}
          />
        ))}
      </View>
    </View>
  );
};

export default TopCard;
