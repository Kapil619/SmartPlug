import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { addDeviceStyles } from "../styles/addDeviceStyles";

interface AppliancePickerProps {
  selectedAppliance: string;
  onValueChange: (value: string) => void;
  applianceOptions: string[];
  customAppliance: string;
  setCustomAppliance: (value: string) => void;
}

const AppliancePicker: React.FC<AppliancePickerProps> = ({
  selectedAppliance,
  onValueChange,
  applianceOptions,
  customAppliance,
  setCustomAppliance,
}) => {
  return (
    <View>
      <Text style={addDeviceStyles.label}>Appliance Type:</Text>
      <Picker
        selectedValue={selectedAppliance}
        onValueChange={onValueChange}
        style={addDeviceStyles.picker}
      >
        {applianceOptions.map((appliance) => (
          <Picker.Item key={appliance} label={appliance} value={appliance} />
        ))}
      </Picker>
      {selectedAppliance === "Other" && (
        <View style={addDeviceStyles.inputRow}>
          <Ionicons name="pricetag-outline" size={20} color="#007aff" />
          <TextInput
            style={addDeviceStyles.input}
            placeholder="Enter custom appliance type"
            placeholderTextColor="#999"
            value={customAppliance}
            onChangeText={setCustomAppliance}
          />
        </View>
      )}
    </View>
  );
};

export default AppliancePicker;
