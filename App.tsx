import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import Main from "./src/navigation/Main";
import { AuthChanged } from "./src/utils/firebaseMethods";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "./src/styles/globalStyles";

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
    <SafeAreaView style={globalStyles.safeArea}>
      <Main user={user} />
    </SafeAreaView>
  );
}
