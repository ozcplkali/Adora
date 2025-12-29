import { useState, useRef } from 'react';
import { StyleSheet, Dimensions, Animated, PanResponder, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width, height } = Dimensions.get('window');

const CARDS_DATA = [
  { id: '1', title: 'Profile 1', description: 'This is an amazing profile!' },
  { id: '2', title: 'Profile 2', description: 'Discover new connections' },
  { id: '3', title: 'Profile 3', description: 'Swipe to connect' },
  { id: '4', title: 'Profile 4', description: 'Meet new people' },
  { id: '5', title: 'Profile 5', description: 'Find your match' },
];

export default function SwipeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const colorScheme = useColorScheme();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          swipeRight();
        } else if (gesture.dx < -120) {
          swipeLeft();
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: width + 100, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex((prev) => prev + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -width - 100, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex((prev) => prev + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, width / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-width / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  if (currentIndex >= CARDS_DATA.length) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.endContainer}>
          <ThemedText type="title">No More Profiles</ThemedText>
          <ThemedText style={styles.endText}>Check back later for more!</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  const currentCard = CARDS_DATA[currentIndex];

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Swipe</ThemedText>
      </ThemedView>

      <View style={styles.cardContainer}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.card,
            {
              backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff',
              transform: [
                { translateX: position.x },
                { translateY: position.y },
                { rotate: rotate },
              ],
            },
          ]}
        >
          <Animated.View style={[styles.likeLabel, { opacity: likeOpacity }]}>
            <ThemedText style={styles.likeLabelText}>LIKE</ThemedText>
          </Animated.View>
          
          <Animated.View style={[styles.nopeLabel, { opacity: nopeOpacity }]}>
            <ThemedText style={styles.nopeLabelText}>NOPE</ThemedText>
          </Animated.View>

          <ThemedView style={styles.cardContent}>
            <ThemedText type="title" style={styles.cardTitle}>
              {currentCard.title}
            </ThemedText>
            <ThemedText style={styles.cardDescription}>
              {currentCard.description}
            </ThemedText>
          </ThemedView>
        </Animated.View>
      </View>

      <ThemedView style={styles.footer}>
        <ThemedText style={styles.instruction}>
          Swipe left or right
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width - 40,
    height: height * 0.7,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardTitle: {
    marginBottom: 16,
  },
  cardDescription: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.8,
  },
  likeLabel: {
    position: 'absolute',
    top: 50,
    left: 40,
    zIndex: 1,
    borderWidth: 3,
    borderColor: '#4ade80',
    borderRadius: 10,
    padding: 10,
    transform: [{ rotate: '-30deg' }],
  },
  likeLabelText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4ade80',
  },
  nopeLabel: {
    position: 'absolute',
    top: 50,
    right: 40,
    zIndex: 1,
    borderWidth: 3,
    borderColor: '#ef4444',
    borderRadius: 10,
    padding: 10,
    transform: [{ rotate: '30deg' }],
  },
  nopeLabelText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  instruction: {
    fontSize: 16,
    opacity: 0.7,
  },
  endContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  endText: {
    fontSize: 18,
    opacity: 0.7,
  },
});
