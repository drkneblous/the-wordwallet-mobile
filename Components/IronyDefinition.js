import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function IronyDefinition() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollableArea}>
                <Text style={styles.introText}>
                    Irony is the expression of one's meaning by using language that normally signifies the opposite, typically for humorous or emphatic effect. Scroll down for examples.
                </Text>
                <Text style={styles.examplesTitle}>Examples:</Text>
                <Text style={styles.exampleText}>1. A firestation burns down.</Text>
                <Text style={styles.exampleText}>2. A policestation gets robbed.</Text>
                <Text style={styles.exampleText}>3. A marriage counsellor files for divorce.</Text>
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

export default IronyDefinition;