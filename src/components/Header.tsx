import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title?: string;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="chevron-back-sharp" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      <View style={{ width: 24 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: "#E8E8E8",
    borderRadius: 41,
    width: 31,
    height: 31,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    color: "black",
    fontFamily: "GeneralSans-SemiBold",
  },
});

export default Header;
