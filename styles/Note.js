import {StyleSheet} from "react-native";

export const STYLES = StyleSheet.create({
    card: {
        padding: 14,
        marginVertical: 6,
        borderRadius: 14,
        shadowOpacity: 0.18,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
        borderLeftWidth: 4,
        borderWidth: 1,
        borderColor: "transparent",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerIcons: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },
    meta: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
    },
    body: {
        marginTop: 10,
    },
    content: {
        fontSize: 14,
        marginBottom: 12,
        lineHeight: 20,
    },
    tagsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10,
    },
    tagChip: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
        marginRight: 6,
        marginBottom: 6,
    },
    tagText: {
        fontSize: 12,
        fontWeight: "600",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    action: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 18,
    },
    actionText: {
        fontSize: 14,
        color: "#1F2937",
        marginLeft: 6,
    },
});