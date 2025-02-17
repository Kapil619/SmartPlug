import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { authStyles } from "../styles/authStyles";
import { signUp } from "../utils/firebaseMethods";
import {
  validateEmail,
  validatePassword,
  validateSpecialCode,
} from "../utils/validator";

export default function Signup() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialCode, setSpecialCode] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const handleInfoPress = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };
  const handleSignup = async () => {
    // Validate email
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    // Validate password
    if (!validatePassword(password)) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    // (Optional) Validate special code if necessary
    // After validating email and password...
    if (!validateSpecialCode(specialCode)) {
      setErrorMessage("Device Code must be exactly 10 digits.");
      return;
    }
    setErrorMessage("");
    try {
      await signUp(email, password);
      navigation.navigate("Main", { screen: "Home" });
    } catch (error: any) {
      console.log("error", error);
      setErrorMessage(error.message || "Signup failed! Please try again.");
    }
  };

  const handleScanQRCode = () => {
    console.log("Scan QR Code");
  };

  const navigateToLogin = () => {
    navigation.replace("Login");
  };

  return (
    <LinearGradient
      colors={["#578FCA", "#E1F0FF", "#FFFFFF"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={authStyles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          {/* Header / Logo */}
          <Animatable.View
            animation="fadeInDown"
            delay={200}
            style={authStyles.headerContainer}
          >
            <Image
              source={require("../../assets/realplug.png")}
              style={authStyles.logo}
            />
            <Text style={authStyles.title}>Create Account</Text>
            <Text style={authStyles.subtitle}>Sign up to get started</Text>
          </Animatable.View>

          {/* Form Container */}
          <Animatable.View
            animation="fadeInUp"
            delay={400}
            style={authStyles.formContainer}
          >
            {/* Email */}
            <View style={authStyles.inputRow}>
              <Ionicons name="mail-outline" size={20} color="#007aff" />
              <TextInput
                style={authStyles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View style={authStyles.inputRow}>
              <Ionicons name="lock-closed-outline" size={20} color="#007aff" />
              <TextInput
                style={authStyles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Special Code */}
            <View style={authStyles.inputRow}>
              <Ionicons name="key-outline" size={20} color="#007aff" />
              <TextInput
                style={authStyles.input}
                placeholder="Device Code"
                placeholderTextColor="#999"
                value={specialCode}
                onChangeText={setSpecialCode}
              />
              <Ionicons
                name="information-circle-outline"
                size={24}
                color="green"
                onPress={handleInfoPress}
              />
            </View>
            {showPopup && (
              <Animatable.View
                animation={"fadeInUp"}
                delay={50}
                style={authStyles.popup}
              >
                <Text style={authStyles.popupText}>
                  Device code required. Please see the back of your device for
                  the 10 digit code.
                </Text>
              </Animatable.View>
            )}
            {errorMessage ? (
              <Text
                style={{
                  color: "red",
                  textAlign: "center",
                  marginVertical: 10,
                }}
              >
                {errorMessage}
              </Text>
            ) : null}
            {/* Sign Up Button */}
            <TouchableOpacity style={authStyles.button} onPress={handleSignup}>
              <Text style={authStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* QR Code Scanner */}
            <TouchableOpacity
              style={authStyles.qrButton}
              onPress={handleScanQRCode}
              activeOpacity={0.8}
            >
              <Ionicons name="qr-code-outline" size={20} color="#fff" />
              <Text style={authStyles.qrButtonText}>Scan QR Code</Text>
            </TouchableOpacity>

            {/* Navigate to Login */}
            <TouchableOpacity style={authStyles.link} onPress={navigateToLogin}>
              <Text style={authStyles.linkText}>
                Already have an account? Log in
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
