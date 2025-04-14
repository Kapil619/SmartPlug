import { Dimensions, StyleSheet } from "react-native";

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

const { width, height } = Dimensions.get("window");

const premiumModalStyles = StyleSheet.create({
    bottomSheetContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    bottomSheetContent: {
        height: height * 0.7,
        width: width,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        position: "relative",
    },
    modalHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        flex: 1,
    },
    closeButton: {
        marginLeft: 10,
    },
    modalHeaderContainer: {
        alignItems: "center",
        marginBottom: 10,
    },
    premiumImage: {
        width: "90%",
        height: 120,
        borderRadius: 10,
        resizeMode: "cover",
        marginBottom: 15,
        alignSelf: "center",
    },
    tableHeaderRow: {
        flexDirection: "row",
        backgroundColor: "#F2F2F2",
        borderRadius: 8,
        paddingVertical: 8,
        width: "95%",
        alignSelf: "center",
        marginBottom: 6,
        paddingHorizontal: 8,
    },
    tableHeader: {
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
        fontSize: 14,
    },
    featureTable: {
        width: "95%",
        alignSelf: "center",
        marginBottom: 20,
    },
    featureRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingVertical: 10,
        marginVertical: 4,
        elevation: 1,
    },
    featureNameColumn: {
        flex: 2,
        paddingLeft: 15,
    },
    iconColumn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    featureItem: {
        fontSize: 15,
        color: "#333",
    },
    subscribeButtonGradient: {
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 30,
        alignSelf: "center",
        elevation: 3,
        marginBottom: 20,
    },
    subscribeButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },
});

export default premiumModalStyles;