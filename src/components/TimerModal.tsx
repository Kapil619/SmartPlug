import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

interface TimerModalProps {
  visible: boolean;
  onClose: () => void;
  onStartTimer: (hours: number, minutes: number) => void;
}

const TimerModal: React.FC<TimerModalProps> = ({
  visible,
  onClose,
  onStartTimer,
}) => {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(Platform.OS === "ios");

  const onChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTime(selectedDate);
    }
    if (Platform.OS === "android") {
      setShowPicker(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.bottomSheet}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Set Timer</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>
            Select a time to change your device state automatically.
          </Text>
          {Platform.OS === "android" && !showPicker && (
            <TouchableOpacity
              style={styles.selectTimeButton}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.selectTimeText}>Select Time</Text>
              <Ionicons name="time-outline" size={24} color="#fff" />
            </TouchableOpacity>
          )}
          {showPicker && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={true}
              display="clock"
              onChange={onChange}
              style={styles.dateTimePicker}
            />
          )}
          <TouchableOpacity
            style={[styles.actionButton, styles.startButton]}
            onPress={() => {
              onStartTimer(time.getHours(), time.getMinutes());
              onClose();
            }}
          >
            <Text style={styles.actionButtonText}>Start Timer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TimerModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#578FCA",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: height * 0.3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    color: "#fff",
    marginVertical: 10,
    fontSize: 16,
  },
  selectTimeButton: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
    backgroundColor: "#57B4BA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 10,
  },
  selectTimeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dateTimePicker: {
    width: "100%",
  },
  actionButton: {
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  startButton: {
    backgroundColor: "white",
  },
  actionButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
});
