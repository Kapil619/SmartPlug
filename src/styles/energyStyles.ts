import { StyleSheet } from "react-native";

export const energyStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
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
    filterRow: {
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: "center",
    },
    filterButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: "blue",
        borderRadius: 25,
        paddingVertical: 12,
        marginHorizontal: 5,
        backgroundColor: "transparent",
    },
    filterButtonActive: {
        backgroundColor: "#578FCA",
        shadowColor: "#578FCA",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    filterButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "black",
        textAlign: "center",
    },
    filterButtonTextActive: {
        color: "#fff",
    },
    chartCard: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
        alignItems: "center",
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2E3A45",
        marginBottom: 10,
    },

    costInfo: {
        flex: 1,
    },
    costTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2E3A45",
        marginBottom: 8,
    },
    costValue: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2E3A45",
        marginBottom: 12,
    },
    costSubtitle: {
        fontSize: 16,
        color: "#637381",
        marginBottom: 10,
    },
    featureCard: {
        backgroundColor: "#e8f5e9",
        borderRadius: 15,
        padding: 10,
        marginBottom: 20,
        elevation: 2,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2E3A45",
        marginBottom: 10,
    },
    featureSubtitle: {
        fontSize: 14,
        color: "#4cAF50",
        lineHeight: 25,
    },
});
