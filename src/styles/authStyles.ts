import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        alignItems: "center",
        marginTop: 30,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 15,
        borderRadius: 60,
    },
    popup: {
        position: "absolute",
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: "#A4B465",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    popupText: {
        color: "black",
        fontSize: 16,
        fontWeight: "semibold",
        textAlign: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 20,
    },
    formContainer: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        flex: 1,
        marginTop: 20,
        elevation: 5,
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
    button: {
        backgroundColor: "#007aff",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    qrButton: {
        flexDirection: "row",
        backgroundColor: "#3E7BFA",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    qrButtonText: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 8,
    },
    link: {
        marginTop: 20,
        alignItems: "center",
    },
    linkText: {
        color: "#007aff",
        fontSize: 16,
    },
});