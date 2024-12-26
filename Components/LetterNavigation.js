import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

function LetterNavigation({ onSelectLetter }) {
    return (
        <View style={styles.navigationBar}>
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                <View key={letter} style={styles.buttonContainer}>
                    <Button title={letter} onPress={() => onSelectLetter(letter)} />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    navigationBar: {
        marginTop: '5%',
        borderWidth: 1,
        borderColor: 'black',
        flexDirection: 'row',
        flexWrap: 'wrap', // Allows letters to wrap if they don't fit on one line
        justifyContent: 'center', // Centers the letters
        height: 48
    },
    buttonContainer: {
        margin: 2, // Adjust for spacing between buttons
        fontSize: 5
    },
});

export default LetterNavigation;