import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User } from "firebase/auth";
import React from "react";
import AddDevice from "../screens/AddDevice";
import DeviceDetail from "../screens/DeviceDetail";
import Energy from "../screens/Energy";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import Devices from "../screens/Schedules";
import Signup from "../screens/Signup";

// Navigator Declarations
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type MainProps = {
  user: User | null;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({
          focused,
          color,
          size,
        }: {
          focused: boolean;
          color: string;
          size: number;
        }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Schedules") {
            iconName = focused ? "hardware-chip" : "hardware-chip-outline";
          } else if (route.name === "Energy") {
            iconName = focused ? "flash" : "flash-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Schedules"
        component={Devices}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Energy"
        component={Energy}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Main = ({ user }: MainProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Main" : "Login"}>
        <>
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DeviceDetail"
            component={DeviceDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddDevice"
            component={AddDevice}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
