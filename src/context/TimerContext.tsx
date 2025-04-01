import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toggleRelayState } from "../utils/firebaseMethods";

interface TimerContextProps {
  startTimer: (userId: string, deviceId: string, durationMs: number) => void;
  cancelTimer: (deviceId: string) => void;
  activeTimers: { [deviceId: string]: string | null }; // Countdown text for each device
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTimers, setActiveTimers] = useState<{
    [deviceId: string]: string | null;
  }>({});
  const timerRefs = useRef<{ [deviceId: string]: NodeJS.Timeout | null }>({});

  // Start a timer
  const startTimer = async (
    userId: string,
    deviceId: string,
    durationMs: number
  ) => {
    // Clear any existing timer for this device
    cancelTimer(deviceId);

    const endTime = Date.now() + durationMs;

    // Save timer state in AsyncStorage
    await AsyncStorage.setItem(
      `timer_${deviceId}`,
      JSON.stringify({ endTime, deviceId, userId })
    );

    // Update countdown text and store interval
    const interval = updateCountdown(deviceId, endTime);

    // Set a timeout to toggle the relay state when the timer expires
    timerRefs.current[deviceId] = setTimeout(async () => {
      await toggleRelayState(userId, deviceId);
      await AsyncStorage.removeItem(`timer_${deviceId}`);
      setActiveTimers((prev) => ({ ...prev, [deviceId]: null }));
      timerRefs.current[deviceId] = null;

      // Clear the interval
      if (timerRefs.current[`interval_${deviceId}`]) {
        clearInterval(
          timerRefs.current[`interval_${deviceId}`] as NodeJS.Timeout
        );
        timerRefs.current[`interval_${deviceId}`] = null;
      }
    }, durationMs);
  };

  // Cancel a timer
  const cancelTimer = (deviceId: string) => {
    if (timerRefs.current[deviceId]) {
      clearTimeout(timerRefs.current[deviceId]!);
      timerRefs.current[deviceId] = null;
    }
    if (timerRefs.current[`interval_${deviceId}`]) {
      clearInterval(
        timerRefs.current[`interval_${deviceId}`] as NodeJS.Timeout
      );
      timerRefs.current[`interval_${deviceId}`] = null;
    }
    setActiveTimers((prev) => ({ ...prev, [deviceId]: null }));
    AsyncStorage.removeItem(`timer_${deviceId}`);
  };

  // Update countdown text
  const updateCountdown = (deviceId: string, endTime: number) => {
    // Initial update
    const updateTimer = () => {
      const remainingMs = endTime - Date.now();
      if (remainingMs <= 0) {
        setActiveTimers((prev) => ({ ...prev, [deviceId]: null }));
        return;
      }
      const remainingSec = Math.floor(remainingMs / 1000);
      const rHours = Math.floor(remainingSec / 3600);
      const rMinutes = Math.floor((remainingSec % 3600) / 60);
      setActiveTimers((prev) => ({
        ...prev,
        [deviceId]: `${rHours}h ${rMinutes}m`,
      }));
    };

    // Update immediately
    updateTimer();

    // Then update every minute
    const interval = setInterval(updateTimer, 60000);

    // Store the interval in timerRefs to clear it later
    if (!timerRefs.current[`interval_${deviceId}`]) {
      timerRefs.current[`interval_${deviceId}`] = interval;
    }

    return interval;
  };

  // Load timers from AsyncStorage on app start
  useEffect(() => {
    const loadTimers = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const timerKeys = keys.filter((key) => key.startsWith("timer_"));

      for (const key of timerKeys) {
        const timerState = await AsyncStorage.getItem(key);
        if (timerState) {
          const { endTime, deviceId, userId } = JSON.parse(timerState);
          const remainingMs = endTime - Date.now();

          if (remainingMs > 0) {
            startTimer(userId, deviceId, remainingMs);
          } else {
            await AsyncStorage.removeItem(key);
          }
        }
      }
    };

    loadTimers();

    // Cleanup on unmount
    return () => {
      Object.keys(timerRefs.current).forEach((key) => {
        if (key.startsWith("interval_")) {
          if (timerRefs.current[key]) {
            clearInterval(timerRefs.current[key]!);
          }
        } else {
          clearTimeout(timerRefs.current[key] as NodeJS.Timeout);
        }
      });
    };
  }, []);

  return (
    <TimerContext.Provider value={{ startTimer, cancelTimer, activeTimers }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = (): TimerContextProps => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};
