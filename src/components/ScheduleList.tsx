import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
        <AntDesign name="clockcircleo" size={100} color="#578FCA" />
        <Text style={deviceStyles.emptyText}>No schedules created yet</Text>
        <Text style={styles.emptySubText}>
          Tap the + button below to create a new schedule
        </Text>
      </View>
    );
  }

  const isScheduleExpired = (schedule: ScheduleItem) => {
    const now = new Date();
    const scheduleTime = new Date();
    scheduleTime.setHours(schedule.hour, schedule.minute, 0, 0);
    return scheduleTime < now;
  };

  return (
    <>
      {schedules.map((schedule) => {
        const expired = isScheduleExpired(schedule);
        return (
          <View
            key={schedule.id}
            style={[styles.scheduleCard, expired && styles.expiredCard]}
          >
            <View style={styles.cardContent}>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                  {schedule.hour.toString().padStart(2, "0")}:
                  {schedule.minute.toString().padStart(2, "0")}
                </Text>
                {expired && <Text style={styles.expiredBadge}>Executed</Text>}
              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.deviceInfo}>
                  <Ionicons name="flash" size={16} color="#578FCA" />
                  <Text style={styles.deviceName}>{schedule.deviceName}</Text>
                </View>

                <View style={styles.daysContainer}>
                  <View style={styles.daysIconContainer}>
                    <Ionicons
                      name="calendar-outline"
                      size={14}
                      color="#637381"
                    />
                  </View>
                  <Text
                    style={styles.daysText}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {schedule.days.length
                      ? schedule.days.map((day) => day.slice(0, 3)).join(", ")
                      : "One-time schedule"}
                  </Text>
                </View>

                {((schedule.usageLimit ?? 0) > 0 ||
                  (schedule.costLimit ?? 0) > 0) && (
                  <View style={styles.limitsContainer}>
                    {(schedule.usageLimit ?? 0) > 0 && (
                      <View style={styles.limitBadge}>
                        <Text style={styles.limitText}>
                          {schedule.usageLimit}kWh limit
                        </Text>
                      </View>
                    )}
                    {(schedule.costLimit ?? 0) > 0 && (
                      <View style={[styles.limitBadge, styles.costBadge]}>
                        <Text style={styles.limitText}>
                          ₹{schedule.costLimit} limit
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>

              <TouchableOpacity
                onPress={() => onDelete(schedule.id)}
                style={styles.deleteButton}
              >
                <Ionicons name="trash-outline" size={24} color="#D35400" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  scheduleCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  expiredCard: {
    opacity: 0.7,
    backgroundColor: "#F8F9FA",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeContainer: {
    alignItems: "center",
    marginRight: 15,
    minWidth: 65,
  },
  timeText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#578FCA",
  },
  expiredBadge: {
    fontSize: 10,
    color: "#000",
    backgroundColor: "#E9ECEF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 4,
  },
  detailsContainer: {
    flex: 1,
  },
  deviceInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E3A45",
    marginLeft: 6,
  },
  daysContainer: {
    flexDirection: "row",
    alignItems: "flex-start", // Changed from center to flex-start
    marginTop: 4,
    paddingRight: 30, // Add padding for trash icon
  },
  daysIconContainer: {
    paddingTop: 2, // Align icon with first line of text
    marginRight: 6,
  },
  daysText: {
    flex: 1, // Allow text to take remaining space
    fontSize: 13,
    color: "#637381",
    fontWeight: "700",
    flexWrap: "wrap", // Enable text wrapping
  },
  deleteButton: {
    padding: 8,
    position: "absolute", // Position the delete button absolutely
    right: 0,
    top: "50%", // Center vertically
    transform: [{ translateY: -20 }], // Adjust vertical position
  },
  limitsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 8,
  },
  limitBadge: {
    backgroundColor: "#E1F0FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  costBadge: {
    backgroundColor: "#FFF3E0",
  },
  limitText: {
    fontSize: 12,
    color: "#578FCA",
    fontWeight: "500",
  },
  emptySubText: {
    fontSize: 14,
    color: "#637381",
    marginTop: 8,
    textAlign: "center",
  },
});

export default ScheduleList;
