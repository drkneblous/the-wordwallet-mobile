                    
import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

function IdiomInput ({ entryPair, setNewEntry, onAdd }) {

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
                    placeholder="an idiom"
                />
            </View>
            <View>
                <TextInput 
                style={styles.input}
                onChangeText={text => handleInputChange('secondPart', text)}
                value={entryPair.secondPart}
                placeholder="Provide context"
                />
            </View>
            <View style={{ position: 'relative', left:'32%', width:'35%', overflow: 'hidden', borderRadius:10,  marginTop: '3%' }} >
                <Button color='orange' title="Add" onPress={onAdd} />
            </View>
        </View>
)

}; 

const styles = StyleSheet.create ({
input: {
    backgroundColor: 'white',
    overflow:'hidden',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: '1%',
    padding: 10,


}}
)

export default IdiomInput;