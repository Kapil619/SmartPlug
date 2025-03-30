import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { deviceStyles } from "../styles/deviceStyles";
import { ScheduleItem } from "../utils/types";

interface ScheduleListProps {
  schedules: ScheduleItem[];
  onDelete: (id: string) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({ schedules, onDelete }) => {
  if (!schedules.length) {
    return (
      <View style={deviceStyles.emptyState}>
        <AntDesign name="clockcircleo" size={100} color="black" />
        <Text style={deviceStyles.emptyText}>No schedules created</Text>
      </View>
    );
  }

  return (
    <>
      {schedules.map((schedule) => (
        <View key={schedule.id} style={deviceStyles.scheduleCard}>
          <View style={deviceStyles.scheduleHeader}>
            <Text style={deviceStyles.scheduleDevice}>
              {schedule.deviceName}
            </Text>
            <TouchableOpacity onPress={() => onDelete(schedule.id)}>
              <Ionicons name="close" size={24} color="#D35400" />
            </TouchableOpacity>
          </View>
          <Text style={deviceStyles.scheduleTime}>
            {schedule.hour.toString().padStart(2, "0")}:
            {schedule.minute.toString().padStart(2, "0")}
          </Text>
          <Text style={deviceStyles.scheduleDays}>
            {schedule.days.length
              ? schedule.days.join(", ")
              : "No specific days"}
          </Text>
        </View>
      ))}
    </>
  );
};

export default ScheduleList;
