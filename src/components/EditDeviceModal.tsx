import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FIREBASE_DB } from "../../firebaseConfig";
import { applianceOptions, locationOptions } from "../utils/data";
import { setDeviceResetFlag } from "../utils/firebaseMethods"; // Import the reset flag function
import AppliancePicker from "./AppliancePicker";
import LocationPicker from "./LocationPicker";

interface EditDeviceModalProps {
  visible: boolean;
  onClose: () => void;
  metadata: any;
  currentUser: any;
}

const EditDeviceModal: React.FC<EditDeviceModalProps> = ({
  visible,
  onClose,
  metadata,
  currentUser,
}) => {
  const [deviceName, setDeviceName] = useState(metadata?.deviceName || "");
  const [applianceType, setApplianceType] = useState(
    metadata?.appliance || "Other"
  );
  const [customAppliance, setCustomAppliance] = useState("");
  const [location, setLocation] = useState(metadata?.location || "Other");
  const [customLocation, setCustomLocation] = useState("");

  useEffect(() => {
    if (metadata) {
      setDeviceName(metadata.deviceName || "");
      setApplianceType(metadata.appliance || "Other");
      setLocation(metadata.location || "Other");
      setCustomAppliance("");
      setCustomLocation("");
    }
  }, [metadata]);

  const handleSave = async () => {
    try {
      const deviceCode = metadata.deviceCode;
      const updatedFields: any = {};
      let applianceChanged = false;

      if (deviceName !== metadata.deviceName) {
        updatedFields["deviceName"] = deviceName;
      }
      if (applianceType !== metadata.appliance) {
        updatedFields["appliance"] =
          applianceType === "Other" ? customAppliance : applianceType;
        applianceChanged = true; // Mark that the appliance was changed
      }
      if (location !== metadata.location) {
        updatedFields["location"] =
          location === "Other" ? customLocation : location;
      }

      if (Object.keys(updatedFields).length > 0) {
        await updateDoc(
          doc(FIREBASE_DB, "users", currentUser.uid, "devices", deviceCode),
          {
            [`metadata`]: {
              ...metadata, // Keep existing metadata
              ...updatedFields, // Apply only the updated fields
            },
          }
        );

        // Send the reset flag if the appliance was changed
        if (applianceChanged) {
          await setDeviceResetFlag(currentUser.uid, deviceCode);
        }
      }

      onClose();
    } catch (error) {
      console.error("Error updating device:", error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Device</Text>
          <TextInput
            style={styles.input}
            placeholder="Device Name"
            placeholderTextColor="#999"
            value={deviceName}
            onChangeText={setDeviceName}
          />
          <AppliancePicker
            selectedAppliance={applianceType}
            onValueChange={setApplianceType}
            applianceOptions={applianceOptions}
            customAppliance={customAppliance}
            setCustomAppliance={setCustomAppliance}
          />
          <LocationPicker
            selectedLocation={location}
            onValueChange={setLocation}
            locationOptions={locationOptions}
            customLocation={customLocation}
            setCustomLocation={setCustomLocation}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={[styles.buttonText, { color: "gray" }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditDeviceModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#E1F0FF",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#E1F0FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "#007aff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
