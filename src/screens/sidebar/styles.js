const React = require("react-native");
const { Platform } = React;

export default {
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#fff",
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
  },
  subitem: {
    marginLeft: 15
  }
};
