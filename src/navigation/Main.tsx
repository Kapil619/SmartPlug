import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import About from "../screens/About";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();
const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            title: "About",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
