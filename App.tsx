import { StatusBar } from "expo-status-bar";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScheduleProvider } from "./src/context/ScheduleContext";
import { TimerProvider } from "./src/context/TimerContext";
import i18n from "./src/localization/i18n";
import Main from "./src/navigation/Main";
import { globalStyles } from "./src/styles/globalStyles";
import { AuthChanged } from "./src/utils/firebaseMethods";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = AuthChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={"green"} />
      </View>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaView style={globalStyles.safeArea}>
        <TimerProvider>
          <ScheduleProvider>
            <Main user={user} />
            <StatusBar translucent={false} backgroundColor="#578FCA" />
          </ScheduleProvider>
        </TimerProvider>
      </SafeAreaView>
    </I18nextProvider>
  );
}
