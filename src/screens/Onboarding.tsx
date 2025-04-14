import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window");
const slides = [
  {
    title: "Welcome to SmartPlug",
    description: "Control your devices from anywhere!",
    image: require("../../assets/realplug.png"),
  },
  {
    title: "Track Usage",
    description: "Monitor power consumption with real-time values.",
    image: require("../../assets/onboard_1.png"),
  },
  {
    title: "Automate",
    description: "Set schedules and timers for full automation.",
    image: require("../../assets/onboard_2.png"),
  },
  {
    title: "Cut Costs",
    description: "Save money with energy-efficient settings.",
    image: require("../../assets/onboard_3.png"),
  },
  {
    title: "Unlock Premium",
    description:
      "Enjoy advanced features and enhanced control with our premium subscription.",
    image: require("../../assets/realplug.png"), // Replace with your premium image
  },
];

export default function Onboarding() {
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / width);
    setActiveIndex(currentIndex);
  };

  const handleNextSlide = () => {
    if (activeIndex < slides.length - 1) {
      scrollRef.current?.scrollTo({
        x: (activeIndex + 1) * width,
        y: 0,
        animated: true,
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
      <StatusBar style="dark" backgroundColor="#E1F0FF" />

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={onScrollEnd}
        showsHorizontalScrollIndicator={false}
      >
        {slides.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Animatable.Image
              source={item.image}
              style={styles.image}
              animation="bounceIn"
              delay={100 * index}
            />
            <Animatable.Text animation="fadeInDown" style={styles.title}>
              {item.title}
            </Animatable.Text>
            <Animatable.Text animation="fadeInUp" style={styles.description}>
              {item.description}
            </Animatable.Text>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, activeIndex === i ? styles.activeDot : null]}
          />
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNextSlide}>
        <Text style={styles.nextButtonText}>
          {activeIndex < slides.length - 1 ? "Next" : "Done"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1F0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  skipButton: {
    zIndex: 3,
    position: "absolute",
    top: 50,
    right: 20,
    padding: 6,
  },
  skipButtonText: {
    fontSize: 16,
    color: "#007aff",
  },
  slide: {
    width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: "80%",
    height: "50%",
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E3A45",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#637381",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 40,
  },
  paginationContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 90,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#007aff",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  nextButton: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "#007aff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
