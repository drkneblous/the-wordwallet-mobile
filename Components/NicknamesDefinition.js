import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function NicknamesDefinition() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollableArea}>
                <Text style={styles.introText}>
                    "Nicknames" stores all your favorite nicknames, from most despised of adversaries to most loved of all lovers and everything in between. Everyone deserves a memorable alias. Scroll down for examples.
                </Text>
                <Text style={styles.examplesTitle}>Examples:</Text>
                <Text style={styles.exampleText}>1. Silly Sally - my sister (Playful)</Text>
                <Text style={styles.exampleText}>2. Furblong fairie - Jack Smith (Snarky) </Text>
                <Text style={styles.exampleText}>3. Starshine daisy-duke - Love of my life, Peach (Pleasant)</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: '5%'
    },
    scrollableArea: {
        maxHeight: 45, // Set maximum height to control scrollable area (adjust as desired)
        width: '100%',
    },
    scrollContainer: {
        paddingBottom: 10,
    },
    introText: {
        fontSize: 16,
        marginBottom: 10,
    },
    examplesTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    exampleText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default NicknamesDefinition;
