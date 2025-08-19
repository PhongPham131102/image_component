import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// @ts-ignore - No type definitions available for react-native-image-mapper
import ImageMapper from "react-native-image-mapper";

const getRandomColor = () => {
  // Function to return random color
  // To highlight the mapping area
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
};

export default function ImageMapperScreen() {
  const [selectedAreaId, setSelectedAreaId] = useState<string[]>([]);

  // Human Body Map - Coordinates được điều chỉnh để khớp chính xác với hình ảnh human body
  const HUMAN_BODY_MAP = useMemo(
    () => [
      {
        id: "0",
        name: "Left Foot",
        shape: "rectangle",
        x2: 85, // Chân trái - điều chỉnh vị trí
        y2: 470,
        x1: 65,
        y1: 440,
        prefill: getRandomColor(),
        fill: "blue",
      },
      {
        id: "1",
        name: "Right Foot",
        shape: "rectangle",
        x2: 125,
        y2: 470,
        x1: 105,
        y1: 440,
        prefill: getRandomColor(),
        fill: "blue",
      },
      {
        id: "2",
        name: "Left Knee",
        shape: "rectangle",
        x2: 85,
        y2: 360,
        x1: 65,
        y1: 330,
        prefill: getRandomColor(),
        fill: "blue",
      },
      {
        id: "3",
        name: "Right Knee",
        shape: "rectangle",
        x2: 125,
        y2: 360,
        x1: 105,
        y1: 330,
        prefill: getRandomColor(),
        fill: "blue",
      },
      {
        id: "4",
        name: "Stomach",
        shape: "rectangle",
        x2: 130,
        y2: 205,
        x1: 60,
        y1: 160,
        prefill: getRandomColor(),
        fill: "blue",
      },
      {
        id: "5",
        name: "Left Hand",
        shape: "rectangle",
        x2: 30,
        y2: 280,
        x1: 10,
        y1: 240,
        prefill: getRandomColor(),
        fill: "blue",
      },
      {
        id: "6",
        name: "Right Hand",
        shape: "rectangle",
        x2: 190,
        y2: 280,
        x1: 170,
        y1: 240,
        prefill: getRandomColor(),
        fill: "blue",
      },
      {
        id: "7",
        name: "Face",
        shape: "rectangle",
        x2: 115,
        y2: 60,
        x1: 75,
        y1: 22,
        prefill: getRandomColor(),
        fill: "blue",
      },
      {
        id: "8",
        name: "Head",
        shape: "rectangle",
        x2: 115,
        y2: 20,
        x1: 75,
        y1: 0,
        prefill: getRandomColor(),
        fill: "blue",
      },
    ],
    []
  );

  const resetSelection = useCallback(() => {
    setSelectedAreaId([]);
  }, []);

  const mapperAreaClickHandler = useCallback(
    (item: any, idx: number, event: any) => {
      setSelectedAreaId((prevSelected) => {
        const indexInState = prevSelected.indexOf(item.id);
        if (indexInState !== -1) {
          // Remove from selection
          return [
            ...prevSelected.slice(0, indexInState),
            ...prevSelected.slice(indexInState + 1),
          ];
        } else {
          // Add to selection
          Alert.alert("Body Part Selected", `Bạn đã chọn: ${item.name}`);
          return [...prevSelected, item.id];
        }
      });
    },
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Human Body Mapper</Text>
        <Text style={styles.subtitle}>Multiselect Interactive Demo</Text>
        {selectedAreaId.length > 0 && (
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionText}>
              Selected: {selectedAreaId.length} body parts
            </Text>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetSelection}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.instruction}>
          🫂 Tap vào các bộ phận cơ thể để chọn/bỏ chọn nhiều vùng
        </Text>

        <View style={styles.mapperContainer}>
          <ImageMapper
            imgHeight={480}
            imgWidth={200}
            imgSource={{
              uri: "https://raw.githubusercontent.com/msalo3/react-native-image-mapper/master/Examples/human.png",
            }}
            imgMap={HUMAN_BODY_MAP}
            onPress={mapperAreaClickHandler}
            containerStyle={styles.humanBodyContainer}
            selectedAreaId={selectedAreaId}
            multiselect
          />
        </View>

        {selectedAreaId.length > 0 && (
          <Text style={styles.helpText}>
            💡 Tap lại để bỏ chọn bộ phận đã chọn
          </Text>
        )}
      </View>
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
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 26,
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
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
  },
  selectionText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  resetButton: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  resetButtonText: {
    color: "#FF6B6B",
    fontWeight: "bold",
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  instruction: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "500",
  },
  mapperContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  humanBodyContainer: {
    borderRadius: 15,
    backgroundColor: "#ffffff",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  helpText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 15,
    fontStyle: "italic",
  },
});
