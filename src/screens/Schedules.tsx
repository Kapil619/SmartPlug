import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import ScheduleList from "../components/ScheduleList";
import ScheduleModal from "../components/ScheduleModal";
import { deviceStyles } from "../styles/deviceStyles";
import { fetchDevices, toggleRelayState } from "../utils/firebaseMethods";
import { ScheduleItem } from "../utils/types";
export default function SchedulesScreen() {
  const [devices, setDevices] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(devices[0]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const deleteSchedule = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  const addSchedule = (schedule: ScheduleItem) => {
    setSchedules([...schedules, schedule]);
    executeSchedule(schedule);
  };

  const executeSchedule = (schedule: ScheduleItem) => {
    const now = new Date();
    const scheduleTime = new Date();
    console.log("schedule time", scheduleTime);
    scheduleTime.setHours(schedule.hour, schedule.minute, 0, 0);

    if (scheduleTime <= now) {
      scheduleTime.setDate(scheduleTime.getDate() + 1);
    }
    const delay = scheduleTime.getTime() - now.getTime();
    console.log(
      `Schedule for ${schedule.deviceName} will execute in ${delay}ms`
    );
    setTimeout(() => {
      toggleRelayState(FIREBASE_AUTH.currentUser!.uid, schedule.deviceId);
      console.log(`Executed schedule for ${schedule.deviceName}`);
    }, delay);
  };

  useEffect(() => {
    const loadDevices = async () => {
      try {
        const devicesList = await fetchDevices();
        setDevices(devicesList);
        setSelectedDevice(devicesList[0]);
      } catch (error) {
        console.error("Error loading devices:", error);
      }
    };

    loadDevices();
  }, []);

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
          <ScheduleList schedules={schedules} onDelete={deleteSchedule} />
        </ScrollView>
        {/* Floating Button */}
        <TouchableOpacity
          style={deviceStyles.floatingButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
        {/* Modal for Creating a Schedule */}
        <ScheduleModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          devices={devices}
          selectedDevice={selectedDevice}
          setSelectedDevice={setSelectedDevice}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          onSave={addSchedule}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
