import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: "semibold",
        color: "#fff",
        marginTop: 4
    },
    headerSubtitle: {
        fontSize: 16,
        color: "#fff",
        marginTop: 5,
    },
    headerIcons: {
        flexDirection: "row",
    },
    iconButton: {
        marginLeft: 15,
    },
    applianceName: {
        fontSize: 14,
        color: "black",
        marginTop: 4,
    },
    gradientContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    topCard: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#2E3A45",
        marginBottom: 10,
    },
    devicesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    cardTopRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    // Modify your cardBottom style:
    cardBottom: {
        marginTop: 10,
        flex: 1,
    },
    deviceImage: {
        width: 36,
        height: 36,
        borderRadius: 10,
    },
    powerIcon: {
        // Optional: adjust alignment if needed
    },
    deviceName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2E3A45",
    },
    deviceStatus: {
        fontSize: 14,
        color: "#637381",
        marginTop: 2,
    },
    floatingButton: {
        position: "absolute",
        bottom: 30,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#9EC6F3",
        alignItems: "center",
        justifyContent: "center",
        elevation: 6,
    },
});