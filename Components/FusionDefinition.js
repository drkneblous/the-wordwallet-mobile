import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function FusionDefinition() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollableArea}>
                <Text style={styles.introText}>
                    A fusion form is a unique expression that blends multiple literary devices or defies simple categorization. Scroll down for examples.
                </Text>
                <Text style={styles.examplesTitle}>Examples:</Text>
                <Text style={styles.exampleText}>1. He moved like a tempest, whispering storms into the night. (Simile + Personification)</Text>
                <Text style={styles.exampleText}>2. Her laughter painted colors on a canvas of silence. (Metaphor + Imagery)</Text>
                <Text style={styles.exampleText}>3. Shadows danced in the sun’s reluctant embrace. (Oxymoron + Personification)</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        borderColor:'black',
        borderWidth:1,
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

export default FusionDefinition;