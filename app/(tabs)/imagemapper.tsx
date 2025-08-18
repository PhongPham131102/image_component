import { Image } from "expo-image";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// const { width: screenWidth } = Dimensions.get('window'); // Unused for now

export default function ImageMapperScreen() {
  const [selectedArea, setSelectedArea] = useState<string>("");

  // Map areas for house floor plan
  const houseMapAreas = [
    {
      id: "1",
      name: "living_room",
      shape: "rect",
      coords: [50, 50, 200, 150],
      fillColor: "rgba(255, 0, 0, 0.3)",
      strokeColor: "red",
      strokeWidth: 2,
    },
    {
      id: "2",
      name: "kitchen",
      shape: "rect",
      coords: [220, 50, 350, 120],
      fillColor: "rgba(0, 255, 0, 0.3)",
      strokeColor: "green",
      strokeWidth: 2,
    },
    {
      id: "3",
      name: "bedroom",
      shape: "rect",
      coords: [50, 170, 200, 280],
      fillColor: "rgba(0, 0, 255, 0.3)",
      strokeColor: "blue",
      strokeWidth: 2,
    },
    {
      id: "4",
      name: "bathroom",
      shape: "rect",
      coords: [220, 140, 300, 200],
      fillColor: "rgba(255, 255, 0, 0.3)",
      strokeColor: "orange",
      strokeWidth: 2,
    },
  ];

  // Unused worldMapAreas removed to fix linting

  const handleAreaPress = (item: any, index: number, event: any) => {
    const areaName = item.name.replace("_", " ").toUpperCase();
    setSelectedArea(areaName);
    Alert.alert(
      "Area Selected",
      `You selected: ${areaName}\nArea ID: ${
        item.id
      }\nCoordinates: ${item.coords.join(", ")}`,
      [{ text: "OK" }]
    );
  };

  const resetSelection = () => {
    setSelectedArea("");
  };

  // Custom simple image mapper component for demonstration
  const SimpleImageMapper = ({ children, areas, onPress }: any) => {
    return (
      <View style={styles.mapperContainer}>
        {children}
        {areas.map((area: any, index: number) => (
          <TouchableOpacity
            key={area.id}
            style={[
              styles.clickableArea,
              {
                position: "absolute",
                left: area.coords[0],
                top: area.coords[1],
                width: area.coords[2] - area.coords[0],
                height: area.coords[3] - area.coords[1],
                backgroundColor: area.fillColor,
                borderColor: area.strokeColor,
                borderWidth: area.strokeWidth,
              },
            ]}
            onPress={(event) => onPress(area, index, event)}
          >
            <Text style={styles.areaLabel}>{area.name.replace("_", " ")}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Image Mapper Demo</Text>
          <Text style={styles.subtitle}>Tạo vùng clickable trên hình ảnh</Text>
          {selectedArea && (
            <View style={styles.selectionInfo}>
              <Text style={styles.selectionText}>Selected: {selectedArea}</Text>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetSelection}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* House Floor Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. House Floor Plan Mapper</Text>
          <Text style={styles.description}>
            Tap các phòng để xem thông tin chi tiết
          </Text>

          <SimpleImageMapper areas={houseMapAreas} onPress={handleAreaPress}>
            <View style={styles.houseContainer}>
              <View style={styles.houseBackground}>
                <Text style={styles.houseTitle}>HOUSE FLOOR PLAN</Text>
                <View style={styles.floorPlan}>
                  {/* This represents a simple house layout */}
                  <View style={styles.room1}>
                    <Text style={styles.roomText}>Living Room</Text>
                  </View>
                  <View style={styles.room2}>
                    <Text style={styles.roomText}>Kitchen</Text>
                  </View>
                  <View style={styles.room3}>
                    <Text style={styles.roomText}>Bedroom</Text>
                  </View>
                  <View style={styles.room4}>
                    <Text style={styles.roomText}>Bathroom</Text>
                  </View>
                </View>
              </View>
            </View>
          </SimpleImageMapper>
        </View>

        {/* Product Hotspots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Product Hotspot Mapper</Text>
          <Text style={styles.description}>
            Interactive product image with clickable features
          </Text>

          <View style={styles.productContainer}>
            <Image
              style={styles.productImage}
              source={{ uri: "https://picsum.photos/400/300?random=product" }}
              contentFit="cover"
            />

            {/* Hotspot buttons */}
            <TouchableOpacity
              style={[styles.hotspot, { top: 50, left: 100 }]}
              onPress={() =>
                Alert.alert(
                  "Feature 1",
                  "Premium camera lens with 4K recording"
                )
              }
            >
              <Text style={styles.hotspotText}>1</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.hotspot, { top: 120, right: 80 }]}
              onPress={() =>
                Alert.alert("Feature 2", "Wireless charging capability")
              }
            >
              <Text style={styles.hotspotText}>2</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.hotspot, { bottom: 60, left: 150 }]}
              onPress={() => Alert.alert("Feature 3", "Water resistant design")}
            >
              <Text style={styles.hotspotText}>3</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Interactive Map */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. World Map Regions</Text>
          <Text style={styles.description}>
            Click on different continents for information
          </Text>

          <View style={styles.worldMapContainer}>
            <View style={styles.worldMapBackground}>
              <Text style={styles.mapTitle}>WORLD MAP</Text>

              {/* Simulated continents */}
              <TouchableOpacity
                style={[styles.continent, styles.northAmerica]}
                onPress={() =>
                  Alert.alert(
                    "North America",
                    "Population: 579 million\nCountries: 23"
                  )
                }
              >
                <Text style={styles.continentText}>NA</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.continent, styles.europe]}
                onPress={() =>
                  Alert.alert(
                    "Europe",
                    "Population: 748 million\nCountries: 44"
                  )
                }
              >
                <Text style={styles.continentText}>EU</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.continent, styles.asia]}
                onPress={() =>
                  Alert.alert("Asia", "Population: 4.6 billion\nCountries: 48")
                }
              >
                <Text style={styles.continentText}>AS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Custom Polygon Areas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Custom Shape Areas</Text>
          <Text style={styles.description}>
            Complex polygon and circular clickable areas
          </Text>

          <View style={styles.customMapContainer}>
            <Image
              style={styles.customMapImage}
              source={{ uri: "https://picsum.photos/400/250?random=shapes" }}
              contentFit="cover"
            />

            {/* Circular area */}
            <TouchableOpacity
              style={[styles.circularArea, { top: 40, left: 50 }]}
              onPress={() =>
                Alert.alert(
                  "Circular Area",
                  "This is a circular clickable area"
                )
              }
            >
              <Text style={styles.areaText}>Circle</Text>
            </TouchableOpacity>

            {/* Triangular area simulation */}
            <TouchableOpacity
              style={[styles.triangularArea, { top: 80, right: 60 }]}
              onPress={() =>
                Alert.alert("Triangle Area", "This simulates a triangular area")
              }
            >
              <Text style={styles.areaText}>△</Text>
            </TouchableOpacity>

            {/* Star area simulation */}
            <TouchableOpacity
              style={[styles.starArea, { bottom: 50, left: 120 }]}
              onPress={() =>
                Alert.alert("Star Area", "Custom star-shaped clickable area")
              }
            >
              <Text style={styles.areaText}>★</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Usage Instructions</Text>
          <Text style={styles.instruction}>
            • Tap any colored area to see information
          </Text>
          <Text style={styles.instruction}>
            • Each area has custom coordinates and styling
          </Text>
          <Text style={styles.instruction}>
            • Support for rectangular, circular, and polygon shapes
          </Text>
          <Text style={styles.instruction}>
            • Perfect for floor plans, maps, and product demos
          </Text>
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
    backgroundColor: "#FF6B6B",
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
  selectionInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
  },
  selectionText: {
    color: "white",
    fontWeight: "bold",
  },
  resetButton: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  resetButtonText: {
    color: "#FF6B6B",
    fontWeight: "bold",
  },
  section: {
    padding: 20,
    backgroundColor: "white",
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
    fontStyle: "italic",
  },
  mapperContainer: {
    position: "relative",
  },
  clickableArea: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  areaLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  houseContainer: {
    height: 300,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
  },
  houseBackground: {
    flex: 1,
    padding: 20,
  },
  houseTitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 16,
  },
  floorPlan: {
    flex: 1,
    position: "relative",
  },
  room1: {
    position: "absolute",
    left: 50,
    top: 50,
    width: 150,
    height: 100,
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    borderWidth: 2,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  room2: {
    position: "absolute",
    right: 50,
    top: 50,
    width: 130,
    height: 70,
    backgroundColor: "rgba(0, 255, 0, 0.1)",
    borderWidth: 2,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  room3: {
    position: "absolute",
    left: 50,
    bottom: 50,
    width: 150,
    height: 80,
    backgroundColor: "rgba(0, 0, 255, 0.1)",
    borderWidth: 2,
    borderColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  room4: {
    position: "absolute",
    right: 100,
    bottom: 80,
    width: 80,
    height: 60,
    backgroundColor: "rgba(255, 255, 0, 0.1)",
    borderWidth: 2,
    borderColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  roomText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  productContainer: {
    position: "relative",
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  hotspot: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hotspotText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  worldMapContainer: {
    height: 250,
    backgroundColor: "#E8F4FD",
    borderRadius: 10,
    overflow: "hidden",
  },
  worldMapBackground: {
    flex: 1,
    padding: 20,
    position: "relative",
  },
  mapTitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  continent: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  northAmerica: {
    top: 60,
    left: 40,
    width: 80,
    height: 60,
    backgroundColor: "#FF6B6B",
  },
  europe: {
    top: 50,
    left: 150,
    width: 70,
    height: 50,
    backgroundColor: "#4ECDC4",
  },
  asia: {
    top: 40,
    right: 40,
    width: 90,
    height: 70,
    backgroundColor: "#45B7D1",
  },
  continentText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  customMapContainer: {
    position: "relative",
    height: 250,
    borderRadius: 10,
    overflow: "hidden",
  },
  customMapImage: {
    width: "100%",
    height: "100%",
  },
  circularArea: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 107, 107, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  triangularArea: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "rgba(78, 205, 196, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    transform: [{ rotate: "45deg" }],
  },
  starArea: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "rgba(255, 193, 7, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 25,
  },
  areaText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  instruction: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    paddingLeft: 10,
  },
});
