import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Button from "../components/Button";
import StatePicker from "../components/StatePicker";
import { authStyles } from "../styles/authStyles";
import { signUp } from "../utils/firebaseMethods";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateSpecialCode,
} from "../utils/validator";

export default function Signup() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [specialCode, setSpecialCode] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const handleInfoPress = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };
  const handleSignup = async () => {
    // Validate email
    if (!validateName(name)) {
      setErrorMessage("Please enter a valid Userame.");
      return;
    }
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
    if (!selectedState) {
      setErrorMessage("Please select a state.");
      return;
    }
    setErrorMessage("");
    setIsLoading(true);
    try {
      await signUp(email, password, name, specialCode, selectedState);
      navigation.navigate("Main", { screen: "Home" });
    } catch (error: any) {
      console.log("error", error);
      setErrorMessage(error.message || "Signup failed! Please try again.");
    } finally {
      setIsLoading(false);
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
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
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
              <View style={authStyles.inputRow}>
                <Ionicons name="person-outline" size={20} color="#007aff" />
                <TextInput
                  style={authStyles.input}
                  placeholder="Username"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                  keyboardType="default"
                  autoCapitalize="words"
                />
              </View>
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
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#007aff"
                />
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

              <View style={authStyles.inputRow2}>
                <StatePicker
                  selectedState={selectedState}
                  onValueChange={(value) => setSelectedState(value)}
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
                    fontSize: 16,
                    fontWeight: "800",
                  }}
                >
                  {errorMessage}
                </Text>
              ) : null}
              {/* Sign Up Button */}
              <Button
                title="Sign Up"
                onPress={handleSignup}
                loading={isLoading}
                buttonStyle={authStyles.button}
                textStyle={authStyles.buttonText}
                iconName="log-in-outline"
              />

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
              <TouchableOpacity
                style={authStyles.link}
                onPress={navigateToLogin}
              >
                <Text style={authStyles.linkText}>
                  Already have an account? Log in
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
