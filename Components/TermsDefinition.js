import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function TermsDefinition() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollableArea}>
                <Text style={styles.introText}>
                    Terms creates storage room for novel terminology in several categories including technical, scientific, social and miscellanious.
                </Text>
                <Text style={styles.examplesTitle}>Examples:</Text>
                <Text style={styles.exampleText}>1. Compound association: an association or result comprised of several pertinent components (technical)</Text>
                <Text style={styles.exampleText}>2. Common sentience: the notion that we all are sentient (social) </Text>
                <Text style={styles.exampleText}>3. Fugaze: a person or situation who is false (social)  </Text>
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

export default TermsDefinition;
