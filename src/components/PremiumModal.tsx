import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useTranslation } from "react-i18next"; // Import translation hook
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import premiumModalStyles from "../styles/componentStyles";

const { height } = Dimensions.get("window");

interface PremiumModalProps {
  visible: boolean;
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ visible, onClose }) => {
  const { t } = useTranslation(); // Initialize translation hook

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
            <Text style={premiumModalStyles.modalTitle}>
              {t("screens.premiumModal.title")}
            </Text>
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
                {t("screens.premiumModal.title")}
              </Text>
              <Text style={[premiumModalStyles.tableHeader, { flex: 1 }]}>
                {t("screens.premiumModal.free")}
              </Text>
              <Text style={[premiumModalStyles.tableHeader, { flex: 1 }]}>
                {t("screens.premiumModal.premium")}
              </Text>
            </View>

            {/* Feature Table */}
            <View style={premiumModalStyles.featureTable}>
              {[
                "realTimeAnalytics",
                "smartScheduling",
                "chatSupport",
                "notifications",
                "customAlerts",
              ].map((featureKey) => (
                <View key={featureKey} style={premiumModalStyles.featureRow}>
                  <View style={premiumModalStyles.featureNameColumn}>
                    <Text style={premiumModalStyles.featureItem}>
                      {t(`screens.premiumModal.features.${featureKey}`)}
                    </Text>
                  </View>
                  <View style={premiumModalStyles.iconColumn}>
                    <Ionicons
                      name="close-circle-outline"
                      size={20}
                      color="red"
                    />
                  </View>
                  <View style={premiumModalStyles.iconColumn}>
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={20}
                      color="green"
                    />
                  </View>
                </View>
              ))}
            </View>

            {/* Subscribe Now Button */}
            <TouchableOpacity onPress={onClose}>
              <LinearGradient
                colors={["#FFB300", "#FFA000"]}
                style={premiumModalStyles.subscribeButtonGradient}
              >
                <Text style={premiumModalStyles.subscribeButtonText}>
                  {t("screens.premiumModal.subscribeNow")}
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
