import React, { useContext } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Context, { AnimeContext } from "./components/API/Context";
import Tabs from "./components/Tabs";

function App() {
  const { darkTheme } = useContext(AnimeContext);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: darkTheme ? "#282C35" : "white",
      }}
    >
      <Tabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default () => {
  return (
    <Context>
      <App />
    </Context>
  );
};