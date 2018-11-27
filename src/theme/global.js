import { StyleSheet } from 'react-native';
const React = require("react-native");
const { Platform } = React;

export default StyleSheet.create({
    container: {
        backgroundColor: "#F8F8E5"
    },
    primary_color: {
        backgroundColor: "#FFD100"
    },
    form_header: {
        marginBottom: 5
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    list_item_results: {
        flexDirection: "row",
        paddingTop: 2,
        paddingBottom: 2
    },
    picker: {
        fontSize: 17,
        width: "100%",
    },
    picker_placeholder: {
        fontSize: 17,
        color: "#C7C7CD"
    },
    input_mask: {
        fontSize: 17,
        height: 50,
        color: "#000",
        paddingLeft: 7,
        paddingRight: 5,
        flex: 1,
        fontSize: 17
    },
    text_mask: {
        height: 50,
        lineHeight: 50,
        color: "#000",
        paddingLeft: 5,
        paddingRight: 5,
        flex: 1,
        fontSize: 17
    }
});