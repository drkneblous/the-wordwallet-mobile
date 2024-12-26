import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function JuxtapositionDefinition() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollableArea}>
                <Text style={styles.introText}>
                    Personification is a literary device where human qualities are given to animals, objects, or ideas. Scroll down for examples.
                </Text>
                <Text style={styles.examplesTitle}>Examples:</Text>
                <Text style={styles.exampleText}>1. The sun kissed me while I was clicking a picture.</Text>
                <Text style={styles.exampleText}>2. The flowers danced to the wind.</Text>
                <Text style={styles.exampleText}>3. The breeze whispered in my ear.</Text>
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

export default JuxtapositionDefinition;