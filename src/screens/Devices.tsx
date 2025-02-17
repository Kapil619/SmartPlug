import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { deviceStyles } from "../styles/deviceStyles";
import { DAYS, devices } from "../utils/data";
import { ScheduleItem } from "../utils/types";
export default function SchedulesScreen() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Form states
  const [selectedDevice, setSelectedDevice] = useState(devices[0]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState(8);
  const [selectedMinute, setSelectedMinute] = useState(30);
  const [turnOn, setTurnOn] = useState(true);
  const [usageLimit, setUsageLimit] = useState<number>(0);
  const [costLimit, setCostLimit] = useState<number>(0);

  const deleteSchedule = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };
  // Toggle day-of-week selection
  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const addSchedule = () => {
    const newSchedule: ScheduleItem = {
      id: Date.now().toString(),
      deviceId: selectedDevice.id,
      deviceName: selectedDevice.name,
      days: selectedDays,
      hour: selectedHour,
      minute: selectedMinute,
      turnOn,
      usageLimit,
      costLimit,
    };
    setSchedules([...schedules, newSchedule]);
    setModalVisible(false);
    // Reset form
    setSelectedDays([]);
    setSelectedHour(8);
    setSelectedMinute(30);
    setTurnOn(true);
    setUsageLimit(0);
    setCostLimit(0);
  };

  return (
    <LinearGradient
      colors={["#578FCA", "#E1F0FF", "#FFFFFF"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={deviceStyles.container}>
        <ScrollView contentContainerStyle={deviceStyles.scrollContent}>
          <View style={deviceStyles.headerContainer}>
            <Text style={deviceStyles.headerTitle}>Schedules & Automation</Text>
            <Text style={deviceStyles.headerSubtitle}>
              Schedule your devices
            </Text>
          </View>
          {schedules.length === 0 ? (
            <View style={deviceStyles.emptyState}>
              <AntDesign name="clockcircleo" size={100} color="black" />
              <Text style={deviceStyles.emptyText}>No schedules created</Text>
            </View>
          ) : (
            schedules.map((schedule) => (
              <View key={schedule.id} style={deviceStyles.scheduleCard}>
                <View style={deviceStyles.scheduleHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={deviceStyles.scheduleDevice}>
                      {schedule.deviceName}
                    </Text>
                    <Text style={deviceStyles.scheduleTime}>
                      {schedule.hour.toString().padStart(2, "0")}:
                      {schedule.minute.toString().padStart(2, "0")}{" "}
                      {schedule.turnOn ? "ON" : "OFF"}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteSchedule(schedule.id)}>
                    <Ionicons name="close" size={24} color="#D35400" />
                  </TouchableOpacity>
                </View>
                <Text style={deviceStyles.scheduleDays}>
                  {schedule.days.length
                    ? schedule.days.join(", ")
                    : "No specific days"}
                </Text>
                {((schedule.usageLimit ?? 0) > 0 ||
                  (schedule.costLimit ?? 0) > 0) && (
                  <Text style={deviceStyles.limitInfo}>
                    {(schedule.usageLimit ?? 0) > 0
                      ? `Usage Limit: ${(schedule.usageLimit ?? 0).toFixed(
                          1
                        )} kWh  `
                      : ""}
                    {(schedule.costLimit ?? 0) > 0
                      ? `Cost Limit: ₹ ${(schedule.costLimit ?? 0).toFixed(2)}`
                      : ""}
                  </Text>
                )}
              </View>
            ))
          )}
        </ScrollView>

        {/* Floating Button */}
        <TouchableOpacity
          style={deviceStyles.floatingButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>

        {/* Modal for Creating a Schedule */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={deviceStyles.modalOverlay}>
            <View style={deviceStyles.modalContainer}>
              <Text style={deviceStyles.modalTitle}>Create Schedule</Text>

              {/* Device Picker (simple row of device names) */}
              <ScrollView
                horizontal
                contentContainerStyle={{ marginVertical: 10 }}
              >
                {devices.map((dev) => (
                  <TouchableOpacity
                    key={dev.id}
                    onPress={() => setSelectedDevice(dev)}
                    style={[
                      deviceStyles.devicePickerItem,
                      dev.id === selectedDevice.id &&
                        deviceStyles.devicePickerItemActive,
                    ]}
                  >
                    <Text
                      style={[
                        deviceStyles.devicePickerText,
                        dev.id === selectedDevice.id &&
                          deviceStyles.devicePickerTextActive,
                      ]}
                    >
                      {dev.name}
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
                        {day}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Time Sliders (Hours / Minutes) */}
              <Text style={deviceStyles.label}>Time to Execute:</Text>
              <View style={{ marginBottom: 10 }}>
                <Text style={deviceStyles.timeText}>
                  {selectedHour.toString().padStart(2, "0")}:
                  {selectedMinute.toString().padStart(2, "0")}
                </Text>
                <Text style={deviceStyles.subLabel}>Hour</Text>
                <Slider
                  style={{ width: "100%" }}
                  minimumValue={0}
                  maximumValue={23}
                  step={1}
                  value={selectedHour}
                  onSlidingComplete={(val) => setSelectedHour(val)}
                  minimumTrackTintColor="#007aff"
                  maximumTrackTintColor="#ccc"
                />
                <Text style={deviceStyles.subLabel}>Minute</Text>
                <Slider
                  style={{ width: "100%" }}
                  minimumValue={0}
                  maximumValue={59}
                  step={1}
                  value={selectedMinute}
                  onSlidingComplete={(val) => setSelectedMinute(val)}
                  minimumTrackTintColor="#007aff"
                  maximumTrackTintColor="#ccc"
                />
              </View>

              {/* Toggle On/Off */}
              <View style={deviceStyles.toggleRow}>
                <Text style={deviceStyles.label}>Turn Device:</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ marginRight: 5 }}>
                    {turnOn ? "ON" : "OFF"}
                  </Text>
                  <Switch
                    value={turnOn}
                    onValueChange={(val) => setTurnOn(val)}
                  />
                </View>
              </View>

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
                  style={[
                    deviceStyles.modalButton,
                    { backgroundColor: "#ccc" },
                  ]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={deviceStyles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    deviceStyles.modalButton,
                    { backgroundColor: "#007aff" },
                  ]}
                  onPress={addSchedule}
                >
                  <Text
                    style={[deviceStyles.modalButtonText, { color: "#fff" }]}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}
