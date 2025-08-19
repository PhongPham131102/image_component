import { Image } from "expo-image";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface ImageItem {
  id: string;
  uri: string;
  title: string;
  description: string;
}

const sampleImages: ImageItem[] = [
  {
    id: "1",
    uri: "https://picsum.photos/800/600?random=1",
    title: "Beautiful Landscape",
    description: "Amazing mountain view with crystal clear lake",
  },
  {
    id: "2",
    uri: "https://picsum.photos/800/600?random=2",
    title: "City Skyline",
    description: "Modern architecture and urban lifestyle",
  },
  {
    id: "3",
    uri: "https://picsum.photos/800/600?random=3",
    title: "Ocean Waves",
    description: "Peaceful ocean view with gentle waves",
  },
  {
    id: "4",
    uri: "https://picsum.photos/800/600?random=4",
    title: "Forest Path",
    description: "Mysterious forest trail in autumn colors",
  },
  {
    id: "5",
    uri: "https://picsum.photos/800/600?random=5",
    title: "Desert Sunset",
    description: "Golden hour in the vast desert landscape",
  },
  {
    id: "6",
    uri: "https://picsum.photos/800/600?random=6",
    title: "Mountain Peak",
    description: "Snow-covered mountain top under blue sky",
  },
  {
    id: "7",
    uri: "https://picsum.photos/800/600?random=7",
    title: "Garden Flowers",
    description: "Colorful flower garden in full bloom",
  },
  {
    id: "8",
    uri: "https://picsum.photos/800/600?random=8",
    title: "Night Sky",
    description: "Starry night with milky way galaxy",
  },
];

export default function SliderImageGalleryScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const modalFlatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  const openModal = (index: number) => {
    setModalImageIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const nextImage = () => {
    if (modalImageIndex < sampleImages.length - 1) {
      const newIndex = modalImageIndex + 1;
      setModalImageIndex(newIndex);
      modalFlatListRef.current?.scrollToIndex({
        index: newIndex,
        animated: true,
      });
    }
  };

  const prevImage = () => {
    if (modalImageIndex > 0) {
      const newIndex = modalImageIndex - 1;
      setModalImageIndex(newIndex);
      modalFlatListRef.current?.scrollToIndex({
        index: newIndex,
        animated: true,
      });
    }
  };

  const renderSliderItem = ({
    item,
    index,
  }: {
    item: ImageItem;
    index: number;
  }) => (
    <TouchableOpacity
      style={styles.sliderItem}
      onPress={() => openModal(index)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.uri }}
        style={styles.sliderImage}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.sliderOverlay}>
        <Text style={styles.sliderTitle}>{item.title}</Text>
        <Text style={styles.sliderDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderThumbnail = ({
    item,
    index,
  }: {
    item: ImageItem;
    index: number;
  }) => (
    <TouchableOpacity
      style={[
        styles.thumbnail,
        currentIndex === index && styles.activeThumbnail,
      ]}
      onPress={() => scrollToIndex(index)}
    >
      <Image
        source={{ uri: item.uri }}
        style={styles.thumbnailImage}
        contentFit="cover"
      />
    </TouchableOpacity>
  );

  const renderModalItem = ({
    item,
    index,
  }: {
    item: ImageItem;
    index: number;
  }) => (
    <View style={styles.modalImageContainer}>
      <Image
        source={{ uri: item.uri }}
        style={styles.modalImage}
        contentFit="contain"
        transition={200}
      />
      <View style={styles.modalInfo}>
        <Text style={styles.modalTitle}>{item.title}</Text>
        <Text style={styles.modalDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2C3E50" />

      <ScrollView>
        {/* Main Image Slider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Main Image Slider</Text>
          <View style={styles.sliderContainer}>
            <FlatList
              ref={flatListRef}
              data={sampleImages}
              renderItem={renderSliderItem}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              getItemLayout={(data, index) => ({
                length: screenWidth - 40,
                offset: (screenWidth - 40) * index,
                index,
              })}
            />

            {/* Pagination Dots */}
            <View style={styles.pagination}>
              {sampleImages.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.paginationDot,
                    currentIndex === index && styles.activeDot,
                  ]}
                  onPress={() => scrollToIndex(index)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Thumbnail Navigation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Thumbnail Navigation</Text>
          <FlatList
            data={sampleImages}
            renderItem={renderThumbnail}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailContainer}
          />
        </View>

        {/* Compact Slider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Compact Slider</Text>
          <View style={styles.compactSliderContainer}>
            <FlatList
              data={sampleImages.slice(0, 4)}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.compactItem}
                  onPress={() => openModal(index)}
                >
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.compactImage}
                    contentFit="cover"
                  />
                  <Text style={styles.compactTitle}>{item.title}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.compactContainer}
            />
          </View>
        </View>

        {/* Card Style Slider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Card Style Gallery</Text>
          <FlatList
            data={sampleImages.slice(0, 5)}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.cardItem}
                onPress={() => openModal(index)}
              >
                <Image
                  source={{ uri: item.uri }}
                  style={styles.cardImage}
                  contentFit="cover"
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardContainer}
          />
        </View>

        {/* Auto-play Slider Demo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Auto-play Demo</Text>
          <Text style={styles.description}>
            This slider automatically changes images every 3 seconds
          </Text>
          <AutoPlaySlider images={sampleImages.slice(0, 4)} />
        </View>

        {/* Instructions */}
        <View style={styles.section}></View>
      </ScrollView>

      {/* Full Screen Modal */}
      <Modal
        visible={modalVisible}
        transparent={false}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <StatusBar hidden />

          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalCounter}>
              {modalImageIndex + 1} / {sampleImages.length}
            </Text>
          </View>

          {/* Image Slider */}
          <FlatList
            ref={modalFlatListRef}
            data={sampleImages}
            renderItem={renderModalItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={modalImageIndex}
            getItemLayout={(data, index) => ({
              length: screenWidth,
              offset: screenWidth * index,
              index,
            })}
            onViewableItemsChanged={({ viewableItems }) => {
              if (viewableItems.length > 0 && viewableItems[0].index !== null) {
                setModalImageIndex(viewableItems[0].index);
              }
            }}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          />

          {/* Navigation Buttons */}
          <View style={styles.modalNavigation}>
            <TouchableOpacity
              style={[
                styles.navButton,
                modalImageIndex === 0 && styles.disabledButton,
              ]}
              onPress={prevImage}
              disabled={modalImageIndex === 0}
            >
              <Text style={styles.navButtonText}>‹</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                modalImageIndex === sampleImages.length - 1 &&
                  styles.disabledButton,
              ]}
              onPress={nextImage}
              disabled={modalImageIndex === sampleImages.length - 1}
            >
              <Text style={styles.navButtonText}>›</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Auto-play Slider Component
const AutoPlaySlider = ({ images }: { images: ImageItem[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length]);

  return (
    <View style={styles.autoPlayContainer}>
      <Image
        source={{ uri: images[currentIndex].uri }}
        style={styles.autoPlayImage}
        contentFit="cover"
        transition={500}
      />
      <View style={styles.autoPlayOverlay}>
        <Text style={styles.autoPlayTitle}>{images[currentIndex].title}</Text>
        <View style={styles.autoPlayDots}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.autoPlayDot,
                currentIndex === index && styles.activeAutoPlayDot,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#2C3E50",
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
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
    fontStyle: "italic",
  },
  sliderContainer: {
    height: 280,
  },
  sliderItem: {
    width: screenWidth - 40,
    height: 250,
    marginRight: 0,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
  },
  sliderImage: {
    width: "100%",
    height: "100%",
  },
  sliderOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 15,
  },
  sliderTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sliderDescription: {
    color: "white",
    fontSize: 14,
    opacity: 0.9,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#2C3E50",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  thumbnailContainer: {
    paddingVertical: 10,
  },
  thumbnail: {
    width: 80,
    height: 60,
    marginRight: 10,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  activeThumbnail: {
    borderColor: "#2C3E50",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  compactSliderContainer: {
    height: 120,
  },
  compactContainer: {
    paddingVertical: 10,
  },
  compactItem: {
    width: 100,
    marginRight: 15,
    alignItems: "center",
  },
  compactImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  compactTitle: {
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
    color: "#333",
    fontWeight: "500",
  },
  cardContainer: {
    paddingVertical: 10,
  },
  cardItem: {
    width: 200,
    marginRight: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
  },
  autoPlayContainer: {
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  autoPlayImage: {
    width: "100%",
    height: "100%",
  },
  autoPlayOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 15,
    alignItems: "center",
  },
  autoPlayTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  autoPlayDots: {
    flexDirection: "row",
  },
  autoPlayDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 3,
  },
  activeAutoPlayDot: {
    backgroundColor: "white",
  },
  instruction: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    paddingLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalCounter: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  modalImageContainer: {
    width: screenWidth,
    height: screenHeight - 200,
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: screenWidth,
    height: screenHeight - 300,
  },
  modalInfo: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 15,
    borderRadius: 10,
  },
  modalTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalDescription: {
    color: "white",
    fontSize: 14,
    opacity: 0.9,
  },
  modalNavigation: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.3,
  },
  navButtonText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});
