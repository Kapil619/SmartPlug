import { StyleSheet } from "react-native";

export const deviceDetailstyles = StyleSheet.create({
    applianceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    deviceAppliance: {
        fontSize: 16,
        color: "#637381",
        marginLeft: 5,
    },
    container: {
        flex: 1,
        backgroundColor: "#F7F9FC",
    },
    scrollContent: {
        padding: 20,
    },
    topSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    realPlugImage: {
        width: 120,
        height: 120,
        resizeMode: "contain",
        borderRadius: 8,
        marginRight: 25,
    },
    deviceInfo: {
        marginLeft: 25,
        flex: 1,
    },
    deviceName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2E3A45",
    },
    deviceLocation: {
        fontSize: 14,
        color: "#637381",
        marginLeft: 5,
    },
    powerContainer: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 2,
        marginBottom: 20,
    },
    powerLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2E3A45",
    },
    powerButton: {
        backgroundColor: "#E1F0FF",
        borderRadius: 25,
        padding: 10,
    },
    runtimeCardTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2E3A45",
        marginBottom: 10,
    },
    runtimeCard: {
        backgroundColor: "#fff",
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 20,
        elevation: 2,
    },
    runtimeStats: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    runtimeValue: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2E3A45",
        marginBottom: 4,
    },
    runtimeLabel: {
        fontSize: 12,
        color: "#637381",
    },
    divider: {
        width: 1,
        height: "60%",
        backgroundColor: "#E6E8EB",
    },
    quickActionsContainer: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        elevation: 2,
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    quickActionItem: {
        alignItems: "center",
    },
    quickActionLabel: {
        fontSize: 14,
        color: "#007aff",
        marginTop: 5,
    },
    settingsCard: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
    },
    settingsTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2E3A45",
        marginBottom: 5,
    },
    settingsSubtitle: {
        fontSize: 14,
        color: "#637381",
        marginBottom: 10,
    },
    settingsButton: {
        backgroundColor: "#E1F0FF",
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    settingsButtonText: {
        color: "#007aff",
        fontSize: 14,
        fontWeight: "500",
    },
    usageCard: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
    },
    usageIconsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 15,
    },
    usageIconButton: {
        backgroundColor: "#E1F0FF",
        padding: 12,
        borderRadius: 30,
    },
    usageIconActive: {
        backgroundColor: "#007aff",
    },
    usageCardTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2E3A45",
        marginBottom: 10,
    },
    timerInfoContainer: {
        flexDirection: "row",
        backgroundColor: "#FFF4E5", // light orange background
        borderRadius: 8,
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
        gap: 10,
        marginTop: 8,
        alignSelf: "flex-start",
    },
    timerInfoText: {
        color: "#D35400",
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 4,
    },
    timerText: {
        color: "black",
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 4,
    },
});
