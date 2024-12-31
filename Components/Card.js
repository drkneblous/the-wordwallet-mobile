import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

function Card({ color, label, onPress, isSelected, style }) {
  const animation = useRef(new Animated.Value(0)).current; // Uses a ref to persist the value

  useEffect(() => {
    Animated.spring(animation, {
      toValue: isSelected ? 1 : 0, // Use positive values for toValue
      useNativeDriver: true,
      tension: 200, // Similar to your original tension config
      friction: 20, // Similar to your original friction config
    }).start();
  }, [isSelected, animation]);

  const handlePress = () => {
    onPress(label);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.card, style]}>
      <Animated.View
        style={[
          styles.cardContent,
          {
            backgroundColor: color,
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1], // Input range must be in ascending order
                  outputRange: [0, -27.5] // Adjust based on desired movement
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

    card: {
        width: '95%', // Make the card wider to appear more elongated
        height: 45, // Fixed height to make it rectangular
        borderColor:'black',
        borderWidth:1,
        borderRadius: 10, // Rounded corners
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10, // Spacing between cards
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
      },

  cardContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 10
  },
  label: {
    fontSize: 16, // Adjusted font size for better appearance
    color: 'black', // Set the desired text color
    position: 'relative',
    left: '35%',
    borderRadius: 10
  },
});

export default Card;