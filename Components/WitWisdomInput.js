                    
import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

function WitWisdomInput ({ entryPair, setNewEntry, onAdd }) {

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
                    placeholder="witticism or wisdom"
                />
            </View>
            <View>
                <TextInput 
                style={styles.input}
                onChangeText={text => handleInputChange('secondPart', text)}
                value={entryPair.secondPart}
                placeholder="enter author"
                />
            </View>
            <View style={{ position: 'relative', left: '32%', overflow:'hidden', borderRadius:10, marginTop: '2.5%', width: '35%' }} >
                <Button color='orange' title="Add" onPress={onAdd} />
            </View>
        </View>
)

}; 

const styles = StyleSheet.create ({
input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: '1%',
    overflow:'hidden',
    borderRadius:5,
    padding: 10,


}}
)

export default WitWisdomInput;