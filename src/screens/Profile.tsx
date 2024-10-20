import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { logOut } from "../utils/firebaseMethods";

const Profile = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "orange",
          padding: 10,
          borderRadius: 10,
          margin: 10,
        }}
        onPress={() => {
          logOut();
          console.log("Logout");
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
