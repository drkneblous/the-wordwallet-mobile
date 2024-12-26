import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function WitWisdomDefinition() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollableArea}>
                <Text style={styles.introText}>
                    "Wit and Wisdom" captures expressions that offer insightful observations or clever descriptions that enlighten or entertain. Browse through to spark your intellect or tickle your fancy.
                </Text>
                <Text style={styles.examplesTitle}>Examples:</Text>
                <Text style={styles.exampleText}>1. "Better to remain silent and be thought a fool than to speak and to remove all doubt." —Abraham Lincoln (Wisdom)</Text>
                <Text style={styles.exampleText}>2. "I can resist everything except temptation." —Oscar Wilde (Wit)</Text>
                <Text style={styles.exampleText}>3. "The early bird might get the worm, but the second mouse gets the cheese." —Anonymous (Wit)</Text>
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

export default WitWisdomDefinition;
