import { Image } from "expo-image";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface ImageItem {
  id: string;
  uri: string;
  title: string;
  category: string;
  tags: string[];
  likes: number;
  liked: boolean;
}

const sampleImages: ImageItem[] = [
  {
    id: "1",
    uri: "https://picsum.photos/400/300?random=1",
    title: "Mountain View",
    category: "Nature",
    tags: ["mountain", "landscape"],
    likes: 24,
    liked: false,
  },
  {
    id: "2",
    uri: "https://picsum.photos/400/500?random=2",
    title: "City Life",
    category: "Urban",
    tags: ["city", "building"],
    likes: 18,
    liked: false,
  },
  {
    id: "3",
    uri: "https://picsum.photos/400/400?random=3",
    title: "Ocean Waves",
    category: "Nature",
    tags: ["ocean", "water"],
    likes: 32,
    liked: true,
  },
  {
    id: "4",
    uri: "https://picsum.photos/400/300?random=4",
    title: "Forest Trail",
    category: "Nature",
    tags: ["forest", "path"],
    likes: 27,
    liked: false,
  },
  {
    id: "5",
    uri: "https://picsum.photos/400/600?random=5",
    title: "Architecture",
    category: "Urban",
    tags: ["building", "modern"],
    likes: 15,
    liked: false,
  },
  {
    id: "6",
    uri: "https://picsum.photos/400/400?random=6",
    title: "Sunset Sky",
    category: "Nature",
    tags: ["sunset", "sky"],
    likes: 41,
    liked: true,
  },
  {
    id: "7",
    uri: "https://picsum.photos/400/350?random=7",
    title: "Street Art",
    category: "Art",
    tags: ["art", "street"],
    likes: 19,
    liked: false,
  },
  {
    id: "8",
    uri: "https://picsum.photos/400/450?random=8",
    title: "Garden Bloom",
    category: "Nature",
    tags: ["flower", "garden"],
    likes: 36,
    liked: false,
  },
  {
    id: "9",
    uri: "https://picsum.photos/400/300?random=9",
    title: "Night Lights",
    category: "Urban",
    tags: ["night", "lights"],
    likes: 22,
    liked: false,
  },
  {
    id: "10",
    uri: "https://picsum.photos/400/550?random=10",
    title: "Abstract Art",
    category: "Art",
    tags: ["abstract", "colorful"],
    likes: 28,
    liked: true,
  },
  {
    id: "11",
    uri: "https://picsum.photos/400/400?random=11",
    title: "Beach Scene",
    category: "Nature",
    tags: ["beach", "sand"],
    likes: 33,
    liked: false,
  },
  {
    id: "12",
    uri: "https://picsum.photos/400/320?random=12",
    title: "Urban Jungle",
    category: "Urban",
    tags: ["city", "green"],
    likes: 17,
    liked: false,
  },
  {
    id: "13",
    uri: "https://picsum.photos/400/480?random=13",
    title: "Wildlife",
    category: "Nature",
    tags: ["animal", "wild"],
    likes: 39,
    liked: false,
  },
  {
    id: "14",
    uri: "https://picsum.photos/400/380?random=14",
    title: "Geometric",
    category: "Art",
    tags: ["geometry", "pattern"],
    likes: 21,
    liked: false,
  },
  {
    id: "15",
    uri: "https://picsum.photos/400/420?random=15",
    title: "River Flow",
    category: "Nature",
    tags: ["river", "flow"],
    likes: 30,
    liked: false,
  },
  {
    id: "16",
    uri: "https://picsum.photos/400/350?random=16",
    title: "Modern Design",
    category: "Art",
    tags: ["design", "modern"],
    likes: 25,
    liked: true,
  },
];

const categories = ["All", "Nature", "Urban", "Art"];

export default function GridImageGalleryScreen() {
  const [images, setImages] = useState<ImageItem[]>(sampleImages);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [gridColumns, setGridColumns] = useState(2);
  const [sortBy, setSortBy] = useState<"likes" | "title">("likes");

  const filteredImages = useMemo(() => {
    let filtered = images;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((img) => img.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (img) =>
          img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          img.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Sort images
    filtered.sort((a, b) => {
      if (sortBy === "likes") {
        return b.likes - a.likes;
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [images, selectedCategory, searchQuery, sortBy]);

  const toggleLike = (imageId: string) => {
    setImages((prevImages) =>
      prevImages.map((img) =>
        img.id === imageId
          ? {
              ...img,
              liked: !img.liked,
              likes: img.liked ? img.likes - 1 : img.likes + 1,
            }
          : img
      )
    );
  };

  const openModal = (image: ImageItem) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const getItemSize = (numColumns: number) => {
    const spacing = 10;
    const totalSpacing = spacing * (numColumns + 1);
    return (screenWidth - totalSpacing) / numColumns;
  };

  const renderGridItem = ({
    item,
    index,
  }: {
    item: ImageItem;
    index: number;
  }) => {
    const itemSize = getItemSize(gridColumns);

    return (
      <TouchableOpacity
        style={[styles.gridItem, { width: itemSize, height: itemSize * 1.2 }]}
        onPress={() => openModal(item)}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: item.uri }}
          style={styles.gridImage}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.gridOverlay}>
          <View style={styles.gridInfo}>
            <Text style={styles.gridTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.gridCategory}>{item.category}</Text>
          </View>
          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => toggleLike(item.id)}
          >
            <Text style={[styles.likeIcon, item.liked && styles.likedIcon]}>
              {item.liked ? "♥" : "♡"}
            </Text>
            <Text style={styles.likeCount}>{item.likes}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderStaggeredItem = ({
    item,
    index,
  }: {
    item: ImageItem;
    index: number;
  }) => {
    const itemWidth = (screenWidth - 30) / 2;
    const itemHeight = 150 + (index % 3) * 50; // Staggered heights

    return (
      <TouchableOpacity
        style={[styles.staggeredItem, { width: itemWidth, height: itemHeight }]}
        onPress={() => openModal(item)}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: item.uri }}
          style={styles.staggeredImage}
          contentFit="cover"
        />
        <View style={styles.staggeredOverlay}>
          <Text style={styles.staggeredTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.staggeredMeta}>
            <Text style={styles.staggeredCategory}>{item.category}</Text>
            <View style={styles.staggeredLikes}>
              <Text style={[styles.likeIcon, { fontSize: 12 }]}>♥</Text>
              <Text style={styles.staggeredLikeCount}>{item.likes}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8E44AD" />

      <ScrollView stickyHeaderIndices={[1]}>
        <View style={styles.header}>
          <Text style={styles.title}>Grid Image Gallery</Text>
          <Text style={styles.subtitle}>Khám phá bộ sưu tập ảnh đẹp</Text>
        </View>

        {/* Search and Filter Header */}
        <View style={styles.filterContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search images..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.activeCategoryButton,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.activeCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.controlsContainer}>
            <View style={styles.sortContainer}>
              <Text style={styles.controlLabel}>Sort by:</Text>
              <TouchableOpacity
                style={[
                  styles.sortButton,
                  sortBy === "likes" && styles.activeSortButton,
                ]}
                onPress={() => setSortBy("likes")}
              >
                <Text
                  style={[
                    styles.sortText,
                    sortBy === "likes" && styles.activeSortText,
                  ]}
                >
                  Likes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortButton,
                  sortBy === "title" && styles.activeSortButton,
                ]}
                onPress={() => setSortBy("title")}
              >
                <Text
                  style={[
                    styles.sortText,
                    sortBy === "title" && styles.activeSortText,
                  ]}
                >
                  Title
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.gridControlsContainer}>
              <Text style={styles.controlLabel}>Columns:</Text>
              {[1, 2, 3].map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[
                    styles.gridButton,
                    gridColumns === num && styles.activeGridButton,
                  ]}
                  onPress={() => setGridColumns(num)}
                >
                  <Text
                    style={[
                      styles.gridText,
                      gridColumns === num && styles.activeGridText,
                    ]}
                  >
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Regular Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Regular Grid ({filteredImages.length} images)
          </Text>
          <FlatList
            data={filteredImages}
            renderItem={renderGridItem}
            keyExtractor={(item) => item.id}
            numColumns={gridColumns}
            key={gridColumns} // Force re-render when columns change
            scrollEnabled={false}
            contentContainerStyle={styles.gridContainer}
            columnWrapperStyle={gridColumns > 1 ? styles.gridRow : null}
          />
        </View>

        {/* Staggered Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Staggered Layout</Text>
          <View style={styles.staggeredContainer}>
            <View style={styles.staggeredColumn}>
              {filteredImages
                .filter((_, index) => index % 2 === 0)
                .map((item, index) => (
                  <View key={item.id} style={styles.staggeredItemWrapper}>
                    {renderStaggeredItem({ item, index: index * 2 })}
                  </View>
                ))}
            </View>
            <View style={styles.staggeredColumn}>
              {filteredImages
                .filter((_, index) => index % 2 === 1)
                .map((item, index) => (
                  <View key={item.id} style={styles.staggeredItemWrapper}>
                    {renderStaggeredItem({ item, index: index * 2 + 1 })}
                  </View>
                ))}
            </View>
          </View>
        </View>

        {/* Compact Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compact View</Text>
          <FlatList
            data={filteredImages.slice(0, 12)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.compactItem}
                onPress={() => openModal(item)}
              >
                <Image
                  source={{ uri: item.uri }}
                  style={styles.compactImage}
                  contentFit="cover"
                />
                <View style={styles.compactInfo}>
                  <Text style={styles.compactTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.compactMeta}>
                    {item.category} • {item.likes} ♥
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            numColumns={4}
            scrollEnabled={false}
            contentContainerStyle={styles.compactContainer}
          />
        </View>
      </ScrollView>

      {/* Full Screen Modal */}
      <Modal
        visible={modalVisible}
        transparent={false}
        animationType="fade"
        onRequestClose={closeModal}
      >
        {selectedImage && (
          <View style={styles.modalContainer}>
            <StatusBar hidden />

            {/* Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
              <View style={styles.modalHeaderInfo}>
                <Text style={styles.modalTitle}>{selectedImage.title}</Text>
                <Text style={styles.modalCategory}>
                  {selectedImage.category}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalLikeButton}
                onPress={() => toggleLike(selectedImage.id)}
              >
                <Text
                  style={[
                    styles.modalLikeIcon,
                    selectedImage.liked && styles.modalLikedIcon,
                  ]}
                >
                  {selectedImage.liked ? "♥" : "♡"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Image */}
            <View style={styles.modalImageContainer}>
              <Image
                source={{ uri: selectedImage.uri }}
                style={styles.modalImage}
                contentFit="contain"
                transition={300}
              />
            </View>

            {/* Info */}
            <View style={styles.modalInfo}>
              <View style={styles.modalTags}>
                {selectedImage.tags.map((tag) => (
                  <View key={tag} style={styles.modalTag}>
                    <Text style={styles.modalTagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.modalStats}>
                <Text style={styles.modalStatsText}>
                  {selectedImage.likes} likes • {selectedImage.category}
                </Text>
              </View>
            </View>
          </View>
        )}
      </Modal>
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
    backgroundColor: "#8E44AD",
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
  filterContainer: {
    backgroundColor: "white",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  categoryContainer: {
    marginBottom: 15,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  activeCategoryButton: {
    backgroundColor: "#8E44AD",
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeCategoryText: {
    color: "white",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 10,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
  },
  activeSortButton: {
    backgroundColor: "#8E44AD",
  },
  sortText: {
    fontSize: 12,
    color: "#666",
  },
  activeSortText: {
    color: "white",
  },
  gridControlsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  gridButton: {
    width: 30,
    height: 30,
    marginLeft: 5,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  activeGridButton: {
    backgroundColor: "#8E44AD",
  },
  gridText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "bold",
  },
  activeGridText: {
    color: "white",
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
  gridContainer: {
    paddingTop: 10,
  },
  gridRow: {
    justifyContent: "space-between",
  },
  gridItem: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridImage: {
    width: "100%",
    flex: 1,
  },
  gridOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gridInfo: {
    flex: 1,
  },
  gridTitle: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  gridCategory: {
    color: "white",
    fontSize: 10,
    opacity: 0.8,
  },
  likeButton: {
    alignItems: "center",
  },
  likeIcon: {
    fontSize: 16,
    color: "white",
  },
  likedIcon: {
    color: "#FF4757",
  },
  likeCount: {
    color: "white",
    fontSize: 10,
    marginTop: 2,
  },
  staggeredContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  staggeredColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  staggeredItemWrapper: {
    marginBottom: 10,
  },
  staggeredItem: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  staggeredImage: {
    width: "100%",
    flex: 1,
  },
  staggeredOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 8,
  },
  staggeredTitle: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  staggeredMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  staggeredCategory: {
    color: "white",
    fontSize: 10,
    opacity: 0.8,
  },
  staggeredLikes: {
    flexDirection: "row",
    alignItems: "center",
  },
  staggeredLikeCount: {
    color: "white",
    fontSize: 10,
    marginLeft: 2,
  },
  compactContainer: {
    paddingTop: 10,
  },
  compactItem: {
    flex: 1,
    margin: 2,
    aspectRatio: 1,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
  },
  compactImage: {
    width: "100%",
    height: "70%",
  },
  compactInfo: {
    padding: 4,
    height: "30%",
    justifyContent: "center",
  },
  compactTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
  },
  compactMeta: {
    fontSize: 8,
    color: "#666",
    marginTop: 1,
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
  modalHeaderInfo: {
    flex: 1,
    alignItems: "center",
  },
  modalTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalCategory: {
    color: "white",
    fontSize: 14,
    opacity: 0.8,
    marginTop: 2,
  },
  modalLikeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  modalLikeIcon: {
    fontSize: 24,
    color: "white",
  },
  modalLikedIcon: {
    color: "#FF4757",
  },
  modalImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: screenWidth,
    height: screenHeight - 200,
  },
  modalInfo: {
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  modalTag: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  modalTagText: {
    color: "white",
    fontSize: 12,
  },
  modalStats: {
    alignItems: "center",
  },
  modalStatsText: {
    color: "white",
    fontSize: 14,
    opacity: 0.8,
  },
});
