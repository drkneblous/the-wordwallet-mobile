import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function AlliterationDefinition() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollableArea}>
                <Text style={styles.introText}>
                    An allegory is a story, poem, or picture that can be interpreted to reveal a hidden meaning, typically a moral or political one.
                </Text>
                <Text style={styles.examplesTitle}>Examples:</Text>
                <Text style={styles.exampleText}>1. Romeo & Juliet </Text>
                <Text style={styles.exampleText}>2. The Lord of The Rings </Text>
                <Text style={styles.exampleText}>3. Battle for Lemuria: The Order of Lux Archonia </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    scrollableArea: {
        maxHeight: 65, // Set maximum height to control scrollable area (adjust as desired)
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

export default AlliterationDefinition;