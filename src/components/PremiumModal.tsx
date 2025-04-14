import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import premiumModalStyles from "../styles/componentStyles";

const { height } = Dimensions.get("window");

interface PremiumModalProps {
  visible: boolean;
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={premiumModalStyles.bottomSheetContainer}>
        <View
          style={[
            premiumModalStyles.bottomSheetContent,
            { backgroundColor: "#FFF9E5" },
          ]}
        >
          {/* Header Row with Title and Close Button */}
          <View style={premiumModalStyles.modalHeaderRow}>
            <Text style={premiumModalStyles.modalTitle}>Premium Benefits</Text>
            <TouchableOpacity
              style={premiumModalStyles.closeButton}
              onPress={onClose}
            >
              <Ionicons name="close-circle-outline" size={30} color="#578FCA" />
            </TouchableOpacity>
          </View>

          {/* Scrollable content */}
          <ScrollView style={{ flex: 1, width: "100%" }}>
            {/* Premium Image */}
            <View style={premiumModalStyles.modalHeaderContainer}>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/110079/pexels-photo-110079.jpeg",
                }}
                style={premiumModalStyles.premiumImage}
              />
            </View>

            {/* Table Header */}
            <View style={premiumModalStyles.tableHeaderRow}>
              <Text style={[premiumModalStyles.tableHeader, { flex: 2 }]}>
                Feature
              </Text>
              <Text style={[premiumModalStyles.tableHeader, { flex: 1 }]}>
                Free
              </Text>
              <Text style={[premiumModalStyles.tableHeader, { flex: 1 }]}>
                Premium
              </Text>
            </View>

            {/* Feature Table */}
            <View style={premiumModalStyles.featureTable}>
              <View style={premiumModalStyles.featureRow}>
                <View style={premiumModalStyles.featureNameColumn}>
                  <Text style={premiumModalStyles.featureItem}>
                    Real-Time Analytics
                  </Text>
                </View>
                <View style={premiumModalStyles.iconColumn}>
                  <Ionicons name="close-circle-outline" size={20} color="red" />
                </View>
                <View style={premiumModalStyles.iconColumn}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color="green"
                  />
                </View>
              </View>
              <View style={premiumModalStyles.featureRow}>
                <View style={premiumModalStyles.featureNameColumn}>
                  <Text style={premiumModalStyles.featureItem}>
                    Smart Scheduling
                  </Text>
                </View>
                <View style={premiumModalStyles.iconColumn}>
                  <Ionicons name="close-circle-outline" size={20} color="red" />
                </View>
                <View style={premiumModalStyles.iconColumn}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color="green"
                  />
                </View>
              </View>
              <View style={premiumModalStyles.featureRow}>
                <View style={premiumModalStyles.featureNameColumn}>
                  <Text style={premiumModalStyles.featureItem}>
                    24/7 Chat Support
                  </Text>
                </View>
                <View style={premiumModalStyles.iconColumn}>
                  <Ionicons name="close-circle-outline" size={20} color="red" />
                </View>
                <View style={premiumModalStyles.iconColumn}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color="green"
                  />
                </View>
              </View>
              <View style={premiumModalStyles.featureRow}>
                <View style={premiumModalStyles.featureNameColumn}>
                  <Text style={premiumModalStyles.featureItem}>
                    Notifications support
                  </Text>
                </View>
                <View style={premiumModalStyles.iconColumn}>
                  <Ionicons name="close-circle-outline" size={20} color="red" />
                </View>
                <View style={premiumModalStyles.iconColumn}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color="green"
                  />
                </View>
              </View>
              <View style={premiumModalStyles.featureRow}>
                <View style={premiumModalStyles.featureNameColumn}>
                  <Text style={premiumModalStyles.featureItem}>
                    Customizable Alerts
                  </Text>
                </View>
                <View style={premiumModalStyles.iconColumn}>
                  <Ionicons name="close-circle-outline" size={20} color="red" />
                </View>
                <View style={premiumModalStyles.iconColumn}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color="green"
                  />
                </View>
              </View>
            </View>

            {/* Subscribe Now Button */}
            <TouchableOpacity onPress={onClose}>
              <LinearGradient
                colors={["#FFB300", "#FFA000"]}
                style={premiumModalStyles.subscribeButtonGradient}
              >
                <Text style={premiumModalStyles.subscribeButtonText}>
                  Subscribe Now
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default PremiumModal;
