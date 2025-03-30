import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet } from "react-native";

interface StatePickerProps {
  selectedState: string | null;
  onValueChange: (value: string | null) => void;
}

const StatePicker: React.FC<StatePickerProps> = ({
  selectedState,
  onValueChange,
}) => {
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <>
      <Ionicons name="location-outline" size={20} color="#007aff" />
      <Picker
        selectedValue={selectedState}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        <Picker.Item label="Select State" value={null} />
        {states.map((state) => (
          <Picker.Item key={state} label={state} value={state} />
        ))}
      </Picker>
    </>
  );
};

export default StatePicker;

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    color: "#333",
    fontSize: 16,
  },
});
