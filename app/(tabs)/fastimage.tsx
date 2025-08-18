import { Image } from "expo-image";
import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FastImageScreen() {
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleLoadStart = (imageId: string) => {
    setImageLoading((prev) => ({ ...prev, [imageId]: true }));
  };

  const handleLoadEnd = (imageId: string) => {
    setImageLoading((prev) => ({ ...prev, [imageId]: false }));
  };

  const preloadImages = async () => {
    const imagesToPreload = [
      "https://picsum.photos/400/400?random=1",
      "https://picsum.photos/400/400?random=2",
      "https://picsum.photos/400/400?random=3",
    ];

    try {
      await Image.prefetch(imagesToPreload);
      alert("Images preloaded successfully!");
    } catch (error) {
      console.error("Failed to preload images:", error);
      alert("Failed to preload images");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Fast Image Loading Demo</Text>
          <Text style={styles.subtitle}>
            Sử dụng Expo Image với tối ưu performance (tương thích Fast Image API)
          </Text>
        </View>

        {/* Preload Images Button */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Image Preloading</Text>
          <TouchableOpacity
            style={styles.preloadButton}
            onPress={preloadImages}
          >
            <Text style={styles.preloadButtonText}>Preload Images</Text>
          </TouchableOpacity>
        </View>

        {/* Simple Fast Image */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Basic Fast Image</Text>
          <View style={styles.imageContainer}>
            {imageLoading["image1"] && (
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color="#007AFF"
              />
            )}
            <Image
              style={styles.image}
              source={{ uri: "https://picsum.photos/400/400?random=1" }}
              onLoadStart={() => handleLoadStart("image1")}
              onLoadEnd={() => handleLoadEnd("image1")}
              contentFit="cover"
              transition={200}
            />
          </View>
        </View>

        {/* Different Priority Levels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. High Priority Loading</Text>
          <View style={styles.imageContainer}>
            {imageLoading["image2"] && (
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color="#007AFF"
              />
            )}
            <Image
              style={styles.image}
              source={{
                uri: "https://picsum.photos/400/400?random=2",
                headers: { Authorization: "Bearer demo-token" },
              }}
              onLoadStart={() => handleLoadStart("image2")}
              onLoadEnd={() => handleLoadEnd("image2")}
              contentFit="cover"
              priority="high"
              transition={300}
            />
          </View>
        </View>

        {/* Different Resize Modes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            3. Different Content Fit Modes
          </Text>

          <Text style={styles.subSectionTitle}>Cover (Default)</Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.resizeImage}
              source={{ uri: "https://picsum.photos/600/300?random=3" }}
              contentFit="cover"
              transition={200}
            />
          </View>

          <Text style={styles.subSectionTitle}>Contain</Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.resizeImage}
              source={{ uri: "https://picsum.photos/600/300?random=4" }}
              contentFit="contain"
              transition={200}
            />
          </View>

          <Text style={styles.subSectionTitle}>Fill</Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.resizeImage}
              source={{ uri: "https://picsum.photos/600/300?random=5" }}
              contentFit="fill"
              transition={200}
            />
          </View>
        </View>

        {/* Caching Control */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Caching Control</Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: "https://picsum.photos/400/400?random=6" }}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={200}
            />
          </View>
          <Text style={styles.description}>
            Cached in memory and disk for faster loading
          </Text>
        </View>

        {/* GIF Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Animated GIF Support</Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
              }}
              contentFit="cover"
              transition={200}
            />
          </View>
        </View>

        {/* Border Radius Control */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Border Radius Styling</Text>
          <View style={styles.borderRadiusContainer}>
            <Image
              style={styles.circularImage}
              source={{ uri: "https://picsum.photos/200/200?random=7" }}
              contentFit="cover"
              transition={200}
            />
            <Image
              style={styles.roundedImage}
              source={{ uri: "https://picsum.photos/200/200?random=8" }}
              contentFit="cover"
              transition={200}
            />
          </View>
        </View>

        {/* Callback Functions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Loading Callbacks</Text>
          <View style={styles.imageContainer}>
            {imageLoading["image9"] && (
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color="#007AFF"
              />
            )}
            <Image
              style={styles.image}
              source={{ uri: "https://picsum.photos/400/400?random=9" }}
              onLoadStart={() => {
                handleLoadStart("image9");
                console.log("Image loading started");
              }}
              onLoad={() => {
                console.log("Image loaded successfully");
              }}
              onLoadEnd={() => {
                handleLoadEnd("image9");
                console.log("Image loading finished");
              }}
              onError={() => {
                console.log("Image loading error");
              }}
              contentFit="cover"
              transition={200}
            />
          </View>
          <Text style={styles.description}>
            Check console for loading events
          </Text>
        </View>

        {/* Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Placeholder Image</Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: "https://picsum.photos/400/400?random=10" }}
              placeholder={require("@/assets/images/react-logo.png")}
              contentFit="cover"
              transition={500}
            />
          </View>
          <Text style={styles.description}>Shows React logo while loading</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#007AFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 5,
    opacity: 0.9,
  },
  section: {
    padding: 20,
    backgroundColor: "white",
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 15,
    color: "#666",
  },
  preloadButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  preloadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    position: "relative",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  resizeImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#e0e0e0",
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -20,
    marginLeft: -20,
    zIndex: 1,
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  borderRadiusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  circularImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  roundedImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
});
