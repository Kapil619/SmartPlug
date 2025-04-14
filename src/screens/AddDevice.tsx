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
import { applianceOptions, locationOptions } from "../utils/data";
import { addNewDevice } from "../utils/firebaseMethods";
import { validateSpecialCode } from "../utils/validator";
import { useTranslation } from "react-i18next"; // Import translation hook

// Example list of appliance types

export default function AddDevice() {
  const { t } = useTranslation(); // Initialize translation hook
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
      setErrorMessage(t("screens.addDevice.error.deviceNameRequired"));
      return;
    }
    if (method === "code" && !validateSpecialCode(specialCode)) {
      setErrorMessage(t("screens.addDevice.error.invalidCode"));
      return;
    }
    const selectedAppliance =
      applianceType === "Other" ? customAppliance : applianceType;
    const selectedLocation = location === "Other" ? customLocation : location;
    if (applianceType === "Other" && !customAppliance) {
      setErrorMessage(t("screens.addDevice.error.customApplianceRequired"));
      return;
    }
    if (location === "Other" && !customLocation) {
      setErrorMessage(t("screens.addDevice.error.customLocationRequired"));
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
      ToastAndroid.show(t("screens.addDevice.success"), ToastAndroid.SHORT);
      navigation.reset({
        index: 0,
        routes: [{ name: "Main", screen: "Home" }],
      });
    } catch (error: any) {
      setErrorMessage(
        error.message || t("screens.addDevice.error.addDeviceFailed")
      );
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
              <Text style={addDeviceStyles.headerTitle}>
                {t("screens.addDevice.headerTitle")}
              </Text>
              <Text style={addDeviceStyles.headerSubtitle}>
                {t("screens.addDevice.headerSubtitle")}
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
                    {t("screens.addDevice.qrCode")}
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
                    {t("screens.addDevice.specialCode")}
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
                  <Text style={addDeviceStyles.qrButtonText}>
                    {t("screens.addDevice.scanQRCode")}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={addDeviceStyles.inputRow}>
                  <Ionicons name="key-outline" size={20} color="#007aff" />
                  <TextInput
                    style={addDeviceStyles.input}
                    placeholder={t("screens.addDevice.enterCodePlaceholder")}
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
                  placeholder={t("screens.addDevice.deviceNamePlaceholder")}
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
                title={t("screens.addDevice.addDeviceButton")}
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
