import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function WitWisdomDefinition() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollableArea}>
                <Text style={styles.introText}>
                    A euphemism is a mild or indirect word or expression substituted for one considered to be too harsh or blunt. Scroll down for examples.
                </Text>
                <Text style={styles.examplesTitle}>Examples:</Text>
                <Text style={styles.exampleText}>1. Someone died: Kicked the bucket.</Text>
                <Text style={styles.exampleText}>2. Having sex: Knocking boots.</Text>
                <Text style={styles.exampleText}>3. Making lots of money: Bringing home the bacon.</Text>
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
