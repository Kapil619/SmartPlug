import { Ionicons } from "@expo/vector-icons";
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
// Example signIn function from your code
import Button from "../components/Button";
import { authStyles } from "../styles/authStyles";
import { signIn } from "../utils/firebaseMethods";
import { validateEmail, validatePassword } from "../utils/validator";

export default function Login() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage("Password must be at least 6 characters long.");
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
          {/* Header / Logo */}
          <Animatable.View
            animation="fadeInDown"
            delay={200}
            style={authStyles.headerContainer}
          >
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
            <Text style={authStyles.title}>Welcome</Text>
            <Text style={authStyles.subtitle}>Sign in to continue</Text>
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
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

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

            {/* Login Button */}
            <Button
              title="Login"
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
                Don't have an account? Sign up
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
