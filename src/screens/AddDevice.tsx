import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
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
import { addDeviceStyles } from "../styles/addDeviceStyles";
import { validateSpecialCode } from "../utils/validator";

// Example list of appliance types
const APPLIANCES = ["Lamp", "Fan", "TV", "AC", "Heater", "Other"];

export default function AddDevice() {
  const [method, setMethod] = useState<"qr" | "code">("qr"); // toggles between QR or code
  const [specialCode, setSpecialCode] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [applianceType, setApplianceType] = useState(APPLIANCES[0]);
  const [errorMessage, setErrorMessage] = useState("");
  const handleScanQR = () => {
    console.log("Scan QR Code logic here");
  };

  const handleAddDevice = () => {
    // Validate fields
    if (!deviceName) {
      console.log("Please enter a device name.");
      return;
    }
    if (method === "code" && !validateSpecialCode(specialCode)) {
      console.log("Please enter a valid 10-digit code.");
      setErrorMessage("Device Code must be exactly 10 digits.");
      return;
    }
    // Proceed with adding device logic
    console.log("Adding device:", { deviceName, specialCode, applianceType });
    // Possibly call an API or your backend
  };

  return (
    <LinearGradient
      colors={["#578FCA", "#E1F0FF", "#FFFFFF"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={addDeviceStyles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView contentContainerStyle={addDeviceStyles.scrollContent}>
            {/* Header */}
            <Animatable.View animation="fadeInDown" delay={200}>
              <Text style={addDeviceStyles.headerTitle}>Add a New Device</Text>
              <Text style={addDeviceStyles.headerSubtitle}>
                Connect a device via QR or a special code
              </Text>
            </Animatable.View>

            {/* Form Container */}
            <Animatable.View
              animation="fadeInUp"
              delay={400}
              style={addDeviceStyles.formContainer}
            >
              {/* Method Switch */}
              <View style={addDeviceStyles.methodSwitchRow}>
                <TouchableOpacity
                  style={[
                    addDeviceStyles.methodButton,
                    method === "qr" && addDeviceStyles.methodButtonActive,
                  ]}
                  onPress={() => setMethod("qr")}
                >
                  <Ionicons
                    name="qr-code-outline"
                    size={20}
                    color={method === "qr" ? "#fff" : "#007aff"}
                  />
                  <Text
                    style={[
                      addDeviceStyles.methodButtonText,
                      method === "qr" && addDeviceStyles.methodButtonTextActive,
                    ]}
                  >
                    QR Code
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    addDeviceStyles.methodButton,
                    method === "code" && addDeviceStyles.methodButtonActive,
                  ]}
                  onPress={() => setMethod("code")}
                >
                  <Ionicons
                    name="key-outline"
                    size={20}
                    color={method === "code" ? "#fff" : "#007aff"}
                  />
                  <Text
                    style={[
                      addDeviceStyles.methodButtonText,
                      method === "code" &&
                        addDeviceStyles.methodButtonTextActive,
                    ]}
                  >
                    Special Code
                  </Text>
                </TouchableOpacity>
              </View>

              {/* QR or Code Section */}
              {method === "qr" ? (
                <TouchableOpacity
                  style={addDeviceStyles.qrButton}
                  onPress={handleScanQR}
                  activeOpacity={0.8}
                >
                  <Ionicons name="qr-code-outline" size={24} color="#fff" />
                  <Text style={addDeviceStyles.qrButtonText}>Scan QR Code</Text>
                </TouchableOpacity>
              ) : (
                <View style={addDeviceStyles.inputRow}>
                  <Ionicons name="key-outline" size={20} color="#007aff" />
                  <TextInput
                    style={addDeviceStyles.input}
                    placeholder="Enter 10-digit code"
                    placeholderTextColor="#999"
                    value={specialCode}
                    onChangeText={setSpecialCode}
                    keyboardType="default"
                    maxLength={10}
                  />
                </View>
              )}

              {/* Device Name */}
              <View style={addDeviceStyles.inputRow}>
                <Ionicons name="pricetag-outline" size={20} color="#007aff" />
                <TextInput
                  style={addDeviceStyles.input}
                  placeholder="Device Name (e.g., Living Room Plug)"
                  placeholderTextColor="#999"
                  value={deviceName}
                  onChangeText={setDeviceName}
                />
              </View>

              {/* Appliance Type Picker (horizontal or vertical) */}
              <Text style={addDeviceStyles.label}>Appliance Type:</Text>
              <ScrollView
                horizontal
                contentContainerStyle={addDeviceStyles.applianceRow}
              >
                {APPLIANCES.map((appliance) => (
                  <TouchableOpacity
                    key={appliance}
                    onPress={() => setApplianceType(appliance)}
                    style={[
                      addDeviceStyles.applianceItem,
                      appliance === applianceType &&
                        addDeviceStyles.applianceItemActive,
                    ]}
                  >
                    <Text
                      style={[
                        addDeviceStyles.applianceText,
                        appliance === applianceType &&
                          addDeviceStyles.applianceTextActive,
                      ]}
                    >
                      {appliance}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Add Device Button */}
              {/* Add Device Button */}
              <TouchableOpacity
                style={addDeviceStyles.addButton}
                onPress={handleAddDevice}
              >
                <Ionicons name="checkmark" size={20} color="#fff" />
                <Text style={addDeviceStyles.addButtonText}>Add Device</Text>
              </TouchableOpacity>
              {errorMessage ? (
                <View style={addDeviceStyles.errorContainer}>
                  <Text style={addDeviceStyles.errorMessage}>
                    {errorMessage}
                  </Text>
                </View>
              ) : null}
            </Animatable.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
