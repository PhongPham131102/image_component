// React Native Full Screen Background Image
// Dựa trên ví dụ từ AboutReact

import React from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function FullScreenBackgroundScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{ flex: 1 }}
        source={{
          uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/crystal_background.jpg",
        }}
        // có thể set image từ project folder
        // require('./images/background_image.jpg')
      >
        <View style={styles.container}>
          <Text style={styles.titleStyle}>
            React Native Full Screen Background Image
          </Text>
          <View style={styles.centerContentStyle}>
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png",
              }}
              style={{
                width: 40,
                height: 40,
                marginTop: 90,
              }}
            />
            <Text style={styles.textStyle}>AboutReact</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    color: "white",
  },
  centerContentStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
});
