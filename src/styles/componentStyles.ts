import { StyleSheet } from "react-native";

export const componentStyles = StyleSheet.create({
    container: {
        height: 150,
    },
    slide: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    contentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    infoColumn: {
        flex: 1,
        paddingRight: 10,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    headerIcon: {
        marginRight: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "500",
        color: "#2E3A45",
    },
    statsRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 4,
    },
    statLabel: {
        fontSize: 16,
        color: "#2E3A45",
        fontWeight: "400",
    },
    statValue: {
        fontSize: 18,
        color: "#2E3A45",
        fontWeight: "500",
        marginLeft: 4,
    },
    subtitle: {
        fontSize: 14,
        color: "#637381",
    },
    dotsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 5,
    },
});