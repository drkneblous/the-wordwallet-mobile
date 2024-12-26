import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function ImageryDefinition() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollableArea}>
                <Text style={styles.introText}>
                    Imagery involves visually descriptive or figurative language, especially in literary work, that appeals to the senses. Scroll down for examples.
                </Text>
                <Text style={styles.examplesTitle}>Examples:</Text>
                <Text style={styles.exampleText}> 1. The air smelled salty, reminding me of the nearby beach.</Text>
                <Text style={styles.exampleText}> 2. The warm doughnut tasted sweet with hints of vanilla and strawberry.</Text>
                <Text style={styles.exampleText}> 3. The baby's hair is soft and downy.</Text>
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

export default ImageryDefinition;