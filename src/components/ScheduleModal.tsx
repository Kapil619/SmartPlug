import DateTimePicker from "@react-native-community/datetimepicker";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { deviceStyles } from "../styles/deviceStyles";
import { DAYS } from "../utils/data";

interface ScheduleModalProps {
  visible: boolean;
  onClose: () => void;
  devices: any[];
  selectedDevice: any;
  setSelectedDevice: (device: any) => void;
  selectedDays: string[];
  setSelectedDays: (days: string[]) => void;
  onSave: (schedule: any) => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  visible,
  onClose,
  devices,
  selectedDevice,
  setSelectedDevice,
  selectedDays,
  setSelectedDays,
  onSave,
}) => {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [usageLimit, setUsageLimit] = useState<number>(0);
  const [costLimit, setCostLimit] = useState<number>(0);

  const onTimeChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setSelectedTime(selectedDate);
    }
    setShowTimePicker(false);
  };

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSave = () => {
    const schedule = {
      id: Date.now().toString(),
      deviceId: selectedDevice.id,
      deviceName: selectedDevice.deviceName,
      days: selectedDays,
      hour: selectedTime.getHours(),
      minute: selectedTime.getMinutes(),
      usageLimit,
      costLimit,
    };
    onSave(schedule);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={deviceStyles.modalOverlay}>
        <View style={deviceStyles.modalContainer}>
          <Text style={deviceStyles.modalTitle}>Create Schedule</Text>

          {/* Device Picker */}
          <ScrollView horizontal contentContainerStyle={{ marginVertical: 10 }}>
            {devices.map((dev) => (
              <TouchableOpacity
                key={dev.id}
                onPress={() => setSelectedDevice(dev)}
                style={[
                  deviceStyles.devicePickerItem,
                  dev.id === selectedDevice?.id &&
                    deviceStyles.devicePickerItemActive,
                ]}
              >
                <Text
                  style={[
                    deviceStyles.devicePickerText,
                    dev.id === selectedDevice?.id &&
                      deviceStyles.devicePickerTextActive,
                  ]}
                >
                  {dev.deviceName || "Unnamed Device"}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Day of Week Selection */}
          <Text style={deviceStyles.label}>Days of Week:</Text>
          <View style={deviceStyles.daysRow}>
            {DAYS.map((day) => {
              const isSelected = selectedDays.includes(day);
              return (
                <TouchableOpacity
                  key={day}
                  style={[
                    deviceStyles.dayItem,
                    isSelected && deviceStyles.dayItemSelected,
                  ]}
                  onPress={() => toggleDay(day)}
                >
                  <Text
                    style={[
                      deviceStyles.dayItemText,
                      isSelected && deviceStyles.dayItemTextSelected,
                    ]}
                  >
                    {day.slice(0, 3)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Time Picker */}
          <Text style={deviceStyles.label}>Time to Execute:</Text>
          <TouchableOpacity
            style={deviceStyles.timePickerButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={deviceStyles.timePickerText}>
              {selectedTime.getHours().toString().padStart(2, "0")}:
              {selectedTime.getMinutes().toString().padStart(2, "0")}
            </Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              is24Hour={true}
              display="clock"
              onChange={onTimeChange}
            />
          )}

          {/* Usage/Cost Limits */}
          <Text style={deviceStyles.label}>
            Usage Limit (kWh): {usageLimit.toFixed(1)}
          </Text>
          <Slider
            style={{ width: "100%" }}
            minimumValue={0}
            maximumValue={50}
            step={0.5}
            value={usageLimit}
            onSlidingComplete={(val) => setUsageLimit(val)}
            minimumTrackTintColor="#007aff"
            maximumTrackTintColor="#ccc"
          />
          <Text style={deviceStyles.label}>
            Cost Limit (₹): {costLimit.toFixed(2)}
          </Text>
          <Slider
            style={{ width: "100%" }}
            minimumValue={0}
            maximumValue={1000}
            step={10}
            value={costLimit}
            onSlidingComplete={(val) => setCostLimit(val)}
            minimumTrackTintColor="#007aff"
            maximumTrackTintColor="#ccc"
          />

          {/* Action Buttons */}
          <View style={deviceStyles.modalButtonsRow}>
            <TouchableOpacity
              style={[deviceStyles.modalButton, { backgroundColor: "#ccc" }]}
              onPress={onClose}
            >
              <Text style={deviceStyles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[deviceStyles.modalButton, { backgroundColor: "#007aff" }]}
              onPress={handleSave}
            >
              <Text style={[deviceStyles.modalButtonText, { color: "#fff" }]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ScheduleModal;
