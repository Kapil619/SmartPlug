import { StyleSheet } from "react-native";
const AVATAR_SIZE = 100;

export const profileStyles = StyleSheet.create({
    updateButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#007aff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
    },
    updateButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 10,
    },
    updateStatus: {
        fontSize: 12,
        color: "#666",
        marginTop: 4,
    },
    gradientContainer: {
        flex: 1,
    },

    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    headerSection: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 15,
        marginBottom: 20,
        elevation: 2,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    avatarContainer: {
        position: "relative",
        marginRight: 15, // Adds spacing between the image and details
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#ccc",
    },
    editIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#007aff",
        borderRadius: 12,
        padding: 5,
    },
    userDetails: {
        flex: 1,
        marginLeft: 10,
    },
    profileName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2E3A45",
        marginBottom: 5,
    },
    profileEmail: {
        fontSize: 14,
        color: "#637381",
        marginBottom: 5,
    },
    profileState: {
        fontSize: 14,
        color: "#666",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2E3A45",
        marginBottom: 10,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F8FA",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    infoText: {
        marginLeft: 10,
        fontSize: 15,
        color: "#2E3A45",
    },
    settingItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    settingText: {
        marginLeft: 10,
        fontSize: 15,
        color: "#2E3A45",
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FF5252",
        paddingVertical: 12,
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 10,
    },
    logoutText: {
        marginLeft: 8,
        fontSize: 16,
        color: "#fff",
    },
    deviceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#F5F8FA",
    },
    deviceName: {
        fontSize: 15,
        color: "#2E3A45",
        flex: 1,
    },
    secretContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    secretKey: {
        fontSize: 15,
        color: "#2E3A45",
        marginRight: 5,
        letterSpacing: 2,
    },
    seperator: {
        height: 1,
        backgroundColor: "#D0DDD0",
        marginVertical: 12,
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
    },
    stat: {
        fontSize: 14,
        color: "#2E3A45",
        fontWeight: "500",
    },
    premiumButtonGradient: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: "100%",
        alignSelf: "center",
        marginTop: 10,
        shadowColor: "#FFD700", // subtle gold shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    premiumButtonText: {
        color: "black",
        fontSize: 16,
        marginLeft: 10,
        fontWeight: "600",
    },
    languageText: {
        marginLeft: 20,
        fontSize: 15,
        color: "#007aff",
        fontWeight: "500",
    },
    languageToggleContainer: {
        flexDirection: "row",
        marginLeft: "auto",
        backgroundColor: "#E1F0FF",
        borderRadius: 20,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#007aff",
    },
    languageButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "transparent",
    },
    languageButtonActive: {
        backgroundColor: "#007aff",
    },
    languageButtonText: {
        fontSize: 14,
        color: "#007aff",
        fontWeight: "500",
    },
    languageButtonTextActive: {
        color: "#fff",
    },
});