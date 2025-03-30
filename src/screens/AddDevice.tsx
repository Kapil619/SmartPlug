import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import AppliancePicker from "../components/AppliancePicker";
import Button from "../components/Button";
import LocationPicker from "../components/LocationPicker";
import { addDeviceStyles } from "../styles/addDeviceStyles";
import { addNewDevice } from "../utils/firebaseMethods";
import { validateSpecialCode } from "../utils/validator";

// Example list of appliance types
const applianceOptions = [
  "Lamp",
  "TV",
  "AC",
  "Refrigerator",
  "Washing Machine",
  "Iron",
  "Vacuum Cleaner",
  "Water Heater",
  "Dishwasher",
  "Other",
];
const locationOptions = [
  "Not specified",
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Basement",
  "Hallway",
  "Other",
];
export default function AddDevice() {
  const [method, setMethod] = useState<"qr" | "code">("qr"); // toggles between QR or code
  const [specialCode, setSpecialCode] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [applianceType, setApplianceType] = useState(applianceOptions[0]);
  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState(locationOptions[0]);
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [customAppliance, setCustomAppliance] = useState("");
  const [customLocation, setCustomLocation] = useState("");

  const handleScanQR = () => {
    ToastAndroid.show("Scan QR Code logic here", ToastAndroid.SHORT);
    console.log("Scan QR Code logic here");
  };

  const handleAddDevice = async () => {
    // Validate fields
    if (!deviceName) {
      setErrorMessage("Please enter a device name.");
      console.log("Please enter a device name.");
      return;
    }
    if (method === "code" && !validateSpecialCode(specialCode)) {
      console.log("Please enter a valid 10-digit code.");
      setErrorMessage("Device Code must be exactly 10 digits.");
      return;
    }
    const selectedAppliance =
      applianceType === "Other" ? customAppliance : applianceType;
    const selectedLocation = location === "Other" ? customLocation : location;
    if (applianceType === "Other" && !customAppliance) {
      setErrorMessage("Please enter a custom appliance type.");
      return;
    }
    if (location === "Other" && !customLocation) {
      setErrorMessage("Please enter a custom location.");
      return;
    }
    const deviceCodeToUse =
      method === "code" ? specialCode : Date.now().toString();
    try {
      setIsLoading(true);
      setErrorMessage("");
      const currentUser = FIREBASE_AUTH.currentUser!;
      await addNewDevice(
        currentUser.uid,
        deviceCodeToUse,
        deviceName,
        selectedAppliance,
        selectedLocation
      );
      ToastAndroid.show("Device added successfully!", ToastAndroid.SHORT);
      navigation.reset({
        index: 0,
        routes: [{ name: "Main", screen: "Home" }],
      });
    } catch (error: any) {
      setErrorMessage(error.message || "Error adding device!");
    } finally {
      setIsLoading(false);
    }
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
                  placeholder="Device Name (e.g.,Bedroom Plug)"
                  placeholderTextColor="#999"
                  value={deviceName}
                  onChangeText={setDeviceName}
                />
              </View>

              <AppliancePicker
                selectedAppliance={applianceType}
                onValueChange={(value) => setApplianceType(value)}
                applianceOptions={applianceOptions}
                customAppliance={customAppliance}
                setCustomAppliance={setCustomAppliance}
              />

              <LocationPicker
                selectedLocation={location}
                onValueChange={(value) => setLocation(value)}
                locationOptions={locationOptions}
                customLocation={customLocation}
                setCustomLocation={setCustomLocation}
              />
              <Button
                title="Add Device"
                iconName="checkmark"
                onPress={handleAddDevice}
                loading={isLoading}
                buttonStyle={addDeviceStyles.addButton}
                textStyle={addDeviceStyles.addButtonText}
              />
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

export const styles = StyleSheet.create({});
