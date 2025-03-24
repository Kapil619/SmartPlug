//// filepath: /d:/Codes/SmartPlug/src/components/LoadingButton.tsx
import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
interface LoadingButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconName?: string;
}

const Button: React.FC<LoadingButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  buttonStyle,
  textStyle,
  iconName,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled}
      style={buttonStyle}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={textStyle}>{title}</Text>
        {iconName && !loading && (
          <Ionicons
            name={iconName as any}
            style={{ marginLeft: 8 }}
            size={22}
            color="#fff"
          />
        )}
        {loading && (
          <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
