import { StyleSheet } from "react-native";
const AVATAR_SIZE = 100;

export const profileStyles = StyleSheet.create({
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
        alignItems: "center",
        marginBottom: 20,
    },
    avatarContainer: {
        position: "relative",
    },
    profileImage: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
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
    profileName: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10,
        color: "#2E3A45",
    },
    profileEmail: {
        fontSize: 14,
        color: "#637381",
        marginTop: 2,
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
});