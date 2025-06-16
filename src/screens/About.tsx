import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const GITHUB_URL = "https://github.com/Kapil619/SmartPlug"; // <-- Replace with your repo
const DEV_EMAIL = "kapilbadokar321@gmail.com"; // <-- Replace with your email

const About = () => {
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${DEV_EMAIL}?subject=SmartPlug%20App%20Query`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Ionicons
          name="information-circle-outline"
          size={48}
          color="#3E7BFA"
          style={{ marginBottom: 12 }}
        />
        <Text style={styles.title}>Legacy EnergyIQ App</Text>
        <Text style={styles.text}>
          This app was at its best when EnergyIQ devices were actively used. If
          you’d like to see how the app looked and functioned in its prime,
          check out the resources below!
        </Text>
        <Text style={styles.text}>
          You can explore the source code, see screenshots, and learn more about
          the project on GitHub.
        </Text>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => Linking.openURL(GITHUB_URL)}
        >
          <Ionicons
            name="logo-github"
            size={22}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.linkText}>View on GitHub</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <Text style={styles.contactTitle}>Contact the Developer</Text>
        <TouchableOpacity style={styles.emailButton} onPress={handleEmailPress}>
          <Ionicons
            name="mail-outline"
            size={18}
            color="#3E7BFA"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.emailText}>{DEV_EMAIL}</Text>
        </TouchableOpacity>
        <Text
          style={[styles.text, { marginTop: 18, fontSize: 13, color: "#888" }]}
        >
          Thank you for your interest and support!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F7F9FC",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    width: "100%",
    maxWidth: 400,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E3A45",
    marginBottom: 14,
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    color: "#4A5A6A",
    marginBottom: 12,
    textAlign: "center",
    lineHeight: 22,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3E7BFA",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 6,
    shadowColor: "#3E7BFA",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  linkText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E4EA",
    alignSelf: "stretch",
    marginVertical: 18,
    width: "100%",
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2E3A45",
    marginBottom: 8,
    textAlign: "center",
  },
  emailButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F6FF",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 7,
    marginBottom: 4,
  },
  emailText: {
    color: "#3E7BFA",
    fontSize: 15,
    fontWeight: "500",
  },
});

export default About;
