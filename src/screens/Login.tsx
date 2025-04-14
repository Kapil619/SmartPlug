import { Feather, Ionicons } from "@expo/vector-icons";
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
// Example signIn function from your code
import Button from "../components/Button";
import i18n, { setAppLanguage } from "../localization/i18n";
import { authStyles } from "../styles/authStyles";
import { signIn } from "../utils/firebaseMethods";
import { validateEmail, validatePassword } from "../utils/validator";

export default function Login() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation(); // Initialize translation hook

  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setErrorMessage(t("screens.login.errorInvalidEmail"));
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage(t("screens.login.errorShortPassword"));
      return;
    }
    setErrorMessage("");
    setIsLoading(true);
    try {
      await signIn(email, password);
      navigation.navigate("Main", { screen: "Home" });
      console.log("user logged in");
    } catch (error: any) {
      console.log("error", error);
      setErrorMessage(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignup = () => {
    navigation.replace("Signup");
  };

  return (
    <LinearGradient
      colors={["#578FCA", "#E1F0FF", "#FFFFFF"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={authStyles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
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
                style={[
                  authStyles.logo,
                  {
                    width: 170,
                    height: 170,
                  },
                ]}
              />

              <Text style={authStyles.title}>
                {t("screens.login.headerTitle")}
              </Text>
              <Text style={authStyles.subtitle}>
                {t("screens.login.headerSubtitle")}
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
              style={[
                authStyles.formContainer,
                {
                  marginTop: 50,
                },
              ]}
            >
              <View style={authStyles.inputRow}>
                <Ionicons name="mail-outline" size={20} color="#007aff" />
                <TextInput
                  style={authStyles.input}
                  placeholder={t("screens.login.emailPlaceholder")}
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={authStyles.inputRow}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#007aff"
                />
                <TextInput
                  style={authStyles.input}
                  placeholder={t("screens.login.passwordPlaceholder")}
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
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

              {/* Login Button */}
              <Button
                title={t("screens.login.loginButton")}
                onPress={handleLogin}
                loading={isLoading}
                buttonStyle={authStyles.button}
                textStyle={authStyles.buttonText}
                iconName="log-in-outline"
              />

              {/* Navigate to Signup */}
              <TouchableOpacity
                style={authStyles.link}
                onPress={navigateToSignup}
              >
                <Text style={authStyles.linkText}>
                  {t("screens.login.signupLink")}
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
