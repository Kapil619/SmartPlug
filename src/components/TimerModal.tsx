import React, { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type TimerModalProps = {
  visible: boolean;
  onClose: () => void;
  onStartTimer: (hours: number, minutes: number) => void;
  initialHours?: number;
  initialMinutes?: number;
};

const hoursOptions = Array.from({ length: 13 }, (_, i) => i); // 0 to 12 hours
const minutesOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

const TimerModal: React.FC<TimerModalProps> = ({
  visible,
  onClose,
  onStartTimer,
  initialHours = 1,
  initialMinutes = 0,
}) => {
  const [selectedHour, setSelectedHour] = useState(initialHours);
  const [selectedMinute, setSelectedMinute] = useState(initialMinutes);

  // If modal becomes visible, initialize selections from props.
  useEffect(() => {
    if (visible) {
      setSelectedHour(initialHours);
      setSelectedMinute(initialMinutes);
    }
  }, [visible, initialHours, initialMinutes]);

  const handleStart = () => {
    // we disallow 0 timer duration
    if (selectedHour === 0 && selectedMinute === 0) return;
    onStartTimer(selectedHour, selectedMinute);
    onClose();
  };

  const renderOptions = (
    options: number[],
    selected: number,
    onSelect: (val: number) => void
  ) => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.optionsContainer}
    >
      {options.map((value) => (
        <TouchableOpacity
          key={value}
          style={[
            styles.optionItem,
            selected === value && styles.optionItemActive,
          ]}
          onPress={() => onSelect(value)}
        >
          <Text
            style={[
              styles.optionText,
              selected === value && styles.optionTextActive,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Set Timer</Text>

          <Text style={styles.label}>Hours</Text>
          {renderOptions(hoursOptions, selectedHour, setSelectedHour)}

          <Text style={[styles.label, { marginTop: 10 }]}>Minutes</Text>
          {renderOptions(minutesOptions, selectedMinute, setSelectedMinute)}

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleStart}>
              <Text style={styles.buttonText}>Start Timer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TimerModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#E1F0FF",
    marginRight: 10,
  },
  optionItemActive: {
    backgroundColor: "#007aff",
  },
  optionText: {
    fontSize: 14,
    color: "#007aff",
  },
  optionTextActive: {
    color: "#fff",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#007aff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});
