import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { addDeviceStyles } from "../styles/addDeviceStyles";

interface LocationPickerProps {
  selectedLocation: string;
  onValueChange: (value: string) => void;
  locationOptions: string[];
  customLocation: string;
  setCustomLocation: (value: string) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  selectedLocation,
  onValueChange,
  locationOptions,
  customLocation,
  setCustomLocation,
}) => {
  return (
    <View>
      <Text style={addDeviceStyles.label}>Location:</Text>
      <Picker
        selectedValue={selectedLocation}
        onValueChange={onValueChange}
        style={addDeviceStyles.picker}
      >
        {locationOptions.map((location) => (
          <Picker.Item key={location} label={location} value={location} />
        ))}
      </Picker>
      {selectedLocation === "Other" && (
        <View style={addDeviceStyles.inputRow}>
          <Ionicons name="location-outline" size={20} color="#007aff" />
          <TextInput
            style={addDeviceStyles.input}
            placeholder="Enter custom location"
            placeholderTextColor="#999"
            value={customLocation}
            onChangeText={setCustomLocation}
          />
        </View>
      )}
    </View>
  );
};

export default LocationPicker;
