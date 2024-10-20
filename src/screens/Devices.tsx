import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Devices = () => {
  const [devices, setDevices] = useState([
    {
      id: "1",
      name: "Smart Plug 1",
      status: true,
      energyUsage: "12 kWh",
      type: "Smart Plug",
      room: "Living Room",
      image: "https://via.placeholder.com/150?text=Smart+Plug+1",
    },
    {
      id: "2",
      name: "Smart Plug 2",
      status: false,
      energyUsage: "8 kWh",
      type: "Smart Plug",
      room: "Bedroom",
      image: "https://via.placeholder.com/150?text=Smart+Plug+1",
    },
    {
      id: "3",
      name: "Smart Plug 3",
      status: true,
      energyUsage: "6 kWh",
      type: "Smart Plug",
      room: "Kitchen",
      image: "https://via.placeholder.com/150?text=Smart+Plug+1",
    },
    {
      id: "4",
      name: "Smart Plug 4",
      status: false,
      energyUsage: "10 kWh",
      type: "Smart Plug",
      room: "Garage",
      image: "https://via.placeholder.com/150?text=Smart+Plug+1",
    },
  ]);

  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleDevice = (id: string) => {
    setDevices(
      devices.map((device) =>
        device.id === id ? { ...device, status: !device.status } : device
      )
    );
  };

  const openDeviceDetails = (device: any) => {
    setSelectedDevice(device);
    setModalVisible(true);
  };

  const renderDevice = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => openDeviceDetails(item)}>
      <View style={styles.deviceCard}>
        <Image source={{ uri: item.image }} style={styles.deviceImage} />
        <View style={styles.deviceInfo}>
          <View>
            <Text style={styles.deviceName}>{item.name}</Text>
            <Text style={styles.deviceDetails}>Room: {item.room}</Text>
            <Text style={styles.deviceDetails}>Energy: {item.energyUsage}</Text>
          </View>
        </View>
        <Switch
          value={item.status}
          onValueChange={() => toggleDevice(item.id)}
          trackColor={{ false: "#d3d3d3", true: "#4CAF50" }}
          thumbColor={item.status ? "#ffffff" : "#ffffff"}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connected Devices</Text>

      {/* Device List */}
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={renderDevice}
        contentContainerStyle={styles.deviceList}
      />

      {/* Add New Device Button */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.addButtonText}>Add Device</Text>
      </TouchableOpacity>

      {/* Device Detail Modal */}
      {selectedDevice && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedDevice.image }}
                style={styles.modalImage}
              />
              <Text style={styles.modalTitle}>{selectedDevice.name}</Text>
              <Text style={styles.modalText}>Type: {selectedDevice.type}</Text>
              <Text style={styles.modalText}>Room: {selectedDevice.room}</Text>
              <Text style={styles.modalText}>
                Energy Usage: {selectedDevice.energyUsage}
              </Text>
              <Text style={styles.modalText}>
                Status: {selectedDevice.status ? "ON" : "OFF"}
              </Text>

              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F7FC",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  deviceList: {
    paddingBottom: 20,
  },
  deviceCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  deviceImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  deviceInfo: {
    flex: 1,
    marginLeft: 15,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  deviceDetails: {
    fontSize: 14,
    color: "#777",
  },
  addButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fffff6",
    height: "60%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
});

export default Devices;
