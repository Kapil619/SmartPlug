import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { signIn, signUp } from "../utils/firebaseMethods";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation<any>();

  const handlesignup = async () => {
    try {
      await signUp(email, password);
      navigation.navigate("Home");
      console.log("user signed up");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlelogin = async () => {
    try {
      await signIn(email, password);
      navigation.navigate("Home");
      console.log("user logged in");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          margin: 10,
          fontSize: 20,
        }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          margin: 10,
          fontSize: 20,
        }}
      />
      <TouchableOpacity onPress={handlesignup}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            backgroundColor: "red",
            color: "white",
            padding: 10,
          }}
        >
          Signup
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlelogin}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            backgroundColor: "red",
            color: "white",
            padding: 10,
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default Login;
