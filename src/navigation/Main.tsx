import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import About from "../screens/About";
import Home from "../screens/Home";
import Login from "../screens/Login";
import { User } from "firebase/auth";

const Stack = createNativeStackNavigator();

type MainProps = {
  user: User | null;
};

const Main = ({ user }: MainProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
        {user ? (
          <>
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
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Login",
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
