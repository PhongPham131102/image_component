import { Image } from "expo-image";
import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function FullScreenBackgroundScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Full Screen Background Image Example */}
        <ImageBackground
          style={styles.fullScreenBackground}
          source={{
            uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/crystal_background.jpg",
          }}
        >
          <View style={styles.overlay}>
            <Text style={styles.titleStyle}>
              React Native Full Screen Background Image
            </Text>
            <View style={styles.centerContentStyle}>
              <Image
                source={{
                  uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png",
                }}
                style={styles.logoStyle}
              />
              <Text style={styles.textStyle}>AboutReact Demo</Text>
            </View>
          </View>
        </ImageBackground>

        {/* Local Image Background Example */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Local Image Background</Text>
          <ImageBackground
            style={styles.localBackground}
            source={require("@/assets/images/react-logo.png")}
            resizeMode="cover"
          >
            <View style={styles.localOverlay}>
              <Text style={styles.localText}>Local Asset Background</Text>
            </View>
          </ImageBackground>
        </View>

        {/* Network Image with Headers */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Network Image với Headers</Text>
          <ImageBackground
            style={styles.networkBackground}
            source={{
              uri: "https://picsum.photos/400/300",
              headers: { Authorization: "Bearer token123" },
            }}
          >
            <View style={styles.networkOverlay}>
              <Text style={styles.networkText}>Network Image with Auth</Text>
            </View>
          </ImageBackground>
        </View>

        {/* Multiple Background Styles */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Gradient Overlay Effect</Text>
          <ImageBackground
            style={styles.gradientBackground}
            source={{
              uri: "https://picsum.photos/400/250",
            }}
          >
            <View style={styles.gradientOverlay}>
              <Text style={styles.gradientText}>Gradient Overlay</Text>
              <Text style={styles.gradientSubtext}>
                Beautiful background effect
              </Text>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  fullScreenBackground: {
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  centerContentStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoStyle: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  textStyle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  localBackground: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  localOverlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
    borderRadius: 10,
  },
  localText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  networkBackground: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
  networkOverlay: {
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 15,
    borderRadius: 10,
  },
  networkText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  gradientBackground: {
    height: 160,
    justifyContent: "flex-end",
    borderRadius: 20,
    overflow: "hidden",
  },
  gradientOverlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
  },
  gradientText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  gradientSubtext: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
});
