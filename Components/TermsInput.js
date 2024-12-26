                    
import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

function TermsInput ({ entryPair, setNewEntry, onAdd }) {

    const handleInputChange = (field, value) => {
        setNewEntry({
            ...entryPair,
            [field]: value
        });
    };

    return (
        <View>
            <View>
                <TextInput 
                    style={styles.input}
                    onChangeText={text => handleInputChange('firstPart', text)}
                    value={entryPair.firstPart}
                    placeholder="a term"
                />
            </View>
            <View>
                <TextInput 
                style={styles.input}
                onChangeText={text => handleInputChange('secondPart', text)}
                value={entryPair.secondPart}
                placeholder="definition:"
                />
            </View>
            <View style={{ position: 'relative', left: '32%', marginTop: '1%', overflow: 'hidden', borderRadius: 10, width:'35%' }} >
                <Button color='orange' title="Add" onPress={onAdd} />
            </View>
        </View>
)

}; 

const styles = StyleSheet.create ({
input: {
    backgroundColor: 'white',
    overflow:'hidden',
    borderRadius:5,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: '1%',
    padding: 10,


}}
)

export default TermsInput;