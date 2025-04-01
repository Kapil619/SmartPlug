import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { toggleRelayState } from "../utils/firebaseMethods";
import { ScheduleItem } from "../utils/types";

interface ScheduleContextProps {
  schedules: ScheduleItem[];
  addSchedule: (schedule: ScheduleItem) => void;
  deleteSchedule: (id: string) => void;
}

const ScheduleContext = createContext<ScheduleContextProps | undefined>(
  undefined
);

export const ScheduleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const scheduleTimeouts = useRef<{ [id: string]: NodeJS.Timeout }>({});

  const executeSchedule = (schedule: ScheduleItem) => {
    const now = new Date();
    const scheduleTime = new Date();
    const currentUserId = FIREBASE_AUTH.currentUser?.uid!;
    scheduleTime.setHours(schedule.hour, schedule.minute, 0, 0);

    if (scheduleTime <= now) {
      scheduleTime.setDate(scheduleTime.getDate() + 1);
    }

    const delay = scheduleTime.getTime() - now.getTime();

    scheduleTimeouts.current[schedule.id] = setTimeout(() => {
      toggleRelayState(currentUserId, schedule.deviceId);
      console.log(`Executed schedule for ${schedule.deviceName}`);

      // If it's a recurring schedule, set up the next execution
      if (schedule.days.length > 0) {
        executeSchedule(schedule);
      }
    }, delay);
  };

  const addSchedule = async (schedule: ScheduleItem) => {
    const newSchedules = [...schedules, schedule];
    setSchedules(newSchedules);
    await AsyncStorage.setItem("schedules", JSON.stringify(newSchedules));
    executeSchedule(schedule);
  };

  const deleteSchedule = async (id: string) => {
    // Clear the timeout for this schedule
    if (scheduleTimeouts.current[id]) {
      clearTimeout(scheduleTimeouts.current[id]);
      delete scheduleTimeouts.current[id];
    }

    const newSchedules = schedules.filter((schedule) => schedule.id !== id);
    setSchedules(newSchedules);
    await AsyncStorage.setItem("schedules", JSON.stringify(newSchedules));
  };

  // Load schedules from AsyncStorage on app start
  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const savedSchedules = await AsyncStorage.getItem("schedules");
        if (savedSchedules) {
          const parsedSchedules = JSON.parse(savedSchedules) as ScheduleItem[];
          setSchedules(parsedSchedules);

          // Set up timeouts for all active schedules
          parsedSchedules.forEach((schedule) => {
            executeSchedule(schedule);
          });
        }
      } catch (error) {
        console.error("Error loading schedules:", error);
      }
    };

    loadSchedules();

    // Cleanup timeouts on unmount
    return () => {
      Object.values(scheduleTimeouts.current).forEach((timeout) => {
        clearTimeout(timeout);
      });
    };
  }, []);

  return (
    <ScheduleContext.Provider
      value={{ schedules, addSchedule, deleteSchedule }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedules = (): ScheduleContextProps => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedules must be used within a ScheduleProvider");
  }
  return context;
};
