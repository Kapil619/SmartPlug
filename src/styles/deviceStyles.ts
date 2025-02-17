import { StyleSheet } from "react-native";

export const deviceStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerContainer: {
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2E3A45",
    },
    headerSubtitle: {
        fontSize: 14,
        color: "white",
        marginTop: 5,
    },
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: "40%",
        paddingHorizontal: 20,

    },
    emptyText: {
        fontSize: 18,
        color: "black",
        marginTop: 10,
        textAlign: "center",
    },
    scrollContent: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 80,
    },
    scheduleCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
    },
    scheduleHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    scheduleDevice: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2E3A45",
    },
    scheduleTime: {
        fontSize: 14,
        color: "#637381",
    },
    scheduleDays: {
        fontSize: 14,
        color: "#637381",
        marginTop: 2,
    },
    limitInfo: {
        fontSize: 12,
        color: "#D35400",
        marginTop: 5,
    },
    floatingButton: {
        position: "absolute",
        bottom: 30,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#3E7BFA",
        alignItems: "center",
        justifyContent: "center",
        elevation: 6,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
    },
    modalContainer: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        borderRadius: 12,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#2E3A45",
        marginBottom: 10,
    },
    devicePickerItem: {
        backgroundColor: "#E1F0FF",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 10,
    },
    devicePickerItemActive: {
        backgroundColor: "#007aff",
    },
    devicePickerText: {
        color: "#007aff",
    },
    devicePickerTextActive: {
        color: "#fff",
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#2E3A45",
        marginTop: 10,
    },
    daysRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 5,
    },
    dayItem: {
        backgroundColor: "#E1F0FF",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 8,
        marginBottom: 8,
    },
    dayItemSelected: {
        backgroundColor: "#007aff",
    },
    dayItemText: {
        color: "#007aff",
    },
    dayItemTextSelected: {
        color: "#fff",
    },
    timeText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2E3A45",
        marginBottom: 5,
    },
    subLabel: {
        fontSize: 12,
        color: "#637381",
        marginVertical: 5,
    },
    toggleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    },
    modalButtonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    modalButton: {
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: "600",
    },
});