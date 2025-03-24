import { StyleSheet } from "react-native";

export const addDeviceStyles = StyleSheet.create({
    errorContainer: {
        marginVertical: 10,
    },
    errorMessage: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        marginTop: 30,
    },
    headerSubtitle: {
        fontSize: 14,
        color: "#fff",
        textAlign: "center",
        marginTop: 5,
        marginBottom: 20,
    },
    formContainer: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        elevation: 5,
    },
    methodSwitchRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    methodButton: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginHorizontal: 5,
        alignItems: "center",
        elevation: 2,
    },
    methodButtonActive: {
        backgroundColor: "#007aff",
    },
    methodButtonText: {
        marginLeft: 6,
        color: "#007aff",
        fontSize: 14,
        fontWeight: "500",
    },
    methodButtonTextActive: {
        color: "#fff",
    },
    qrButton: {
        flexDirection: "row",
        backgroundColor: "#007aff",
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    qrButtonText: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 8,
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F8FA",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        height: 50,
        marginLeft: 10,
        color: "#333",
        fontSize: 16,
    },
    label: {
        fontSize: 14,
        color: "#2E3A45",
        fontWeight: "600",
        marginBottom: 10,
    },
    applianceRow: {
        flexDirection: "row",
    },
    applianceItem: {
        backgroundColor: "#E1F0FF",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
        elevation: 2,
    },
    applianceItemActive: {
        backgroundColor: "#007aff",
    },
    applianceText: {
        color: "#007aff",
    },
    applianceTextActive: {
        color: "#fff",
    },
    addButton: {
        flexDirection: "row",
        backgroundColor: "#3E7BFA",
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 8,
    },
    picker: {
        height: 50,
        width: "100%",
        backgroundColor: "#F5F8FA",
        borderWidth: 1,
        borderRadius: 12,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
});
