import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

function InputArea({ onAddWord, selectedCard }) {
    const [term, setTerm] = useState('');
    const [definition, setDefinition] = useState('');

    const handleSubmit = () => {
        onAddWord({ term, definition, cardType: selectedCard }); // Include card type for conditional styling
        setTerm('');
        setDefinition('');
    };

    return (
        <View style={styles.inputArea}>
            <TextInput
                style={styles.input}
                value={term}
                onChangeText={text => setTerm(text)}
                placeholder="Enter a word"
            />
            <TextInput
                style={styles.input}
                value={definition}
                onChangeText={text => setDefinition(text)}
                placeholder="Enter the definition"
            />
            <View style={styles.buttonContainer}>
                <Button color="#2096F3"  title="Submit" onPress={handleSubmit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputArea: {
        height: '23%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgb(219, 220, 250)',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginBottom: '15%',
        marginTop: '2.5%',

    },
    input: {
        width: '90%',
        height: 40, // Approximating 5vh for consistent look across devices
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginBottom:'2.5%',
        paddingHorizontal: 10,
        textAlign: 'center',
        backgroundColor: 'white',
    },
    buttonContainer: {
        position: 'relative:',
        right:'35%',
        bottom:'5%',
        width: '30%',
        marginTop: '5%',
        borderRadius: 5,
        borderWith:1,
        borderColor: 'black',
        overflow: 'hidden', // Helps to maintain border radius on Button
        position: 'relative',
    },
});

export default InputArea;