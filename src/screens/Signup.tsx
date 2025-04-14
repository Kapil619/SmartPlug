import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Import translation hook
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
import i18n, { setAppLanguage } from "../localization/i18n";
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
  const { t } = useTranslation(); // Initialize translation hook

  const handleInfoPress = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };
  const handleSignup = async () => {
    // Validate name
    if (!validateName(name)) {
      setErrorMessage(t("screens.signup.invalidUsername"));
      return;
    }
    // Validate email
    if (!validateEmail(email)) {
      setErrorMessage(t("screens.signup.invalidEmail"));
      return;
    }
    // Validate password
    if (!validatePassword(password)) {
      setErrorMessage(t("screens.signup.errorShortPassword"));
      return;
    }
    // Validate special code
    if (!validateSpecialCode(specialCode)) {
      setErrorMessage(t("screens.signup.invalidCode"));
      return;
    }
    // Validate state
    if (!selectedState) {
      setErrorMessage(t("screens.signup.selectState"));
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
              <TouchableOpacity
                onPress={() => navigation.navigate("Onboarding")}
                style={{
                  position: "absolute",
                  right: 15,
                  padding: 5,
                }}
              >
                <Feather name="help-circle" size={24} color="#fff" />
              </TouchableOpacity>
              <Image
                source={require("../../assets/realplug.png")}
                style={authStyles.logo}
              />
              <Text style={authStyles.title}>
                {t("screens.signup.headerTitle")}
              </Text>
              <Text style={authStyles.subtitle}>
                {t("screens.signup.headerSubtitle")}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  const newLang = i18n.language === "en" ? "mr" : "en";
                  setAppLanguage(newLang);
                }}
                style={authStyles.languageBtn}
              >
                <Text style={authStyles.languageBtnText}>
                  {i18n.language === "en" ? "मराठीत बदला" : "Switch to English"}
                </Text>
              </TouchableOpacity>
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
                  placeholder={t("screens.signup.namePlaceholder")}
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
                  placeholder={t("screens.signup.emailPlaceholder")}
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
                  placeholder={t("screens.signup.passwordPlaceholder")}
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
                  placeholder={t("screens.signup.deviceCodePlaceholder")}
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
                  animation={"fadeInDown"}
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
                title={t("screens.signup.signupButton")}
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
                <Text style={authStyles.qrButtonText}>
                  {t("screens.signup.scanQRCode")}
                </Text>
              </TouchableOpacity>

              {/* Navigate to Login */}
              <TouchableOpacity
                style={authStyles.link}
                onPress={navigateToLogin}
              >
                <Text style={authStyles.linkText}>
                  {t("screens.signup.haveAccount")}
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
