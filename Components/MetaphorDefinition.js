import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function JuxtapositionDefinition() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollableArea}>
                <Text style={styles.introText}>
                    A metaphor is a figure of speech in which a word or phrase is applied to an object or action to which it is not literally applicable. A thing regarded as representative or symbolic of something else. Scroll down for more examples.
                </Text>
                <Text style={styles.examplesTitle}>Examples:</Text>
                <Text style={styles.exampleText}>1. My mother has a heart of gold.</Text>
                <Text style={styles.exampleText}>2. His hands were icicles from the cold.</Text>
                <Text style={styles.exampleText}>3. The boy is a lark in the choir.</Text>
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