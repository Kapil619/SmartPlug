import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { signUp } from "../utils/firebaseMethods";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialCode, setSpecialCode] = useState("");
  const navigation = useNavigation<any>();

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const handleSignup = async () => {
    try {
      await signUp(email, password);
      navigation.navigate("Home");
      console.log("user signed up");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleScanQRCode = () => {
    // Placeholder for QR code scanning functionality
    console.log("Scan QR Code");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        }}
        style={styles.logo}
      />
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Special Code"
        value={specialCode}
        onChangeText={setSpecialCode}
        placeholderTextColor="#999"
      />

      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Button title="Scan QR Code" onPress={handleScanQRCode} />
      <TouchableOpacity style={styles.link} onPress={navigateToLogin}>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f9fc",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: "#007bff",
    fontSize: 16,
  },
});

export default Signup;
