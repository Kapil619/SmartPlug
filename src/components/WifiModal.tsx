import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  fetchWifiCredentials,
  saveWifiCredentials,
} from "../utils/firebaseMethods";

interface WifiCredentialsModalProps {
  visible: boolean;
  onClose: () => void;
  deviceId: string;
}

export default function WifiCredentialsModal({
  visible,
  onClose,
  deviceId,
}: WifiCredentialsModalProps) {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (visible && deviceId) {
      setLoading(true);
      fetchWifiCredentials(deviceId)
        .then((data) => {
          setSsid(data.ssid || "");
          setPassword(data.password || "");
          setLoading(false);
        })
        .catch(() => {
          setSsid("");
          setPassword("");
          setLoading(false);
        });
    }
  }, [visible, deviceId]);

  const handleSave = async () => {
    setSaving(true);
    await saveWifiCredentials(deviceId, ssid, password);
    setSaving(false);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>WiFi Credentials</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#007aff" />
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#007aff"
              style={{ marginTop: 30 }}
            />
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="SSID"
                value={ssid}
                onChangeText={setSsid}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Ionicons name="save-outline" size={20} color="#fff" />
                    <Text style={styles.saveButtonText}>Save</Text>
                  </>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modal: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007aff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E1F0FF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#F5F8FA",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007aff",
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: "center",
    marginTop: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
});
