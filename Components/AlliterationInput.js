import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

function AlliterationInput({ startingLetter, inputAlliteration, onLetterChange, onAlliterationChange, onAdd }) {
    return (
        <View style={styles.alliterationArea}>
            <TextInput
                value={startingLetter}
                onChangeText={onLetterChange}
                placeholder="Click a letter"
                maxLength={1}
                style={styles.inputOne} // Adjusted styles for horizontal layout
            />
            <TextInput
                value={inputAlliteration}
                onChangeText={onAlliterationChange}
                placeholder="an alliteration"
                style={styles.inputTwo} // Adjusted styles for horizontal layout
            />
            <View style={{ marginLeft: 12, overFlow:'hidden', borderRadius:10}} >
                <Button color='orange' title="Add" onPress={onAdd} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    alliterationArea: { 
        width: '100%',
        flexDirection: 'row', // Changed from 'column' to 'row'
        padding: 10,
        alignItems: 'center' // Ensure vertical alignment is centered
    },
    inputOne: {
        backgroundColor: 'white',
        height: 55, // Approximating height based on typical device dimensions
        width: '10%', // Adjusted width to fit side by side
        marginRight: 8, // Add some space between the two inputs
        padding: 8,
        overflow:'hidden',
        borderRadius:5,
    },
    inputTwo: {
        backgroundColor: 'white',
        height: 55, // Make height consistent with the first input
        width: '70%', // Take remaining space
        padding: 8,
        overflow:'hidden',
        borderRadius:5,
    },
});

export default AlliterationInput;