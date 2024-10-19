import React, { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlesignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      console.log("user signed up", userCredential.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlelogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      console.log("user logged in", userCredential.user);
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
