import React from 'react';
import { View, TextInput, Button } from 'react-native';

function ImageryInput({ newFusion, setNewFusion, onAdd }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput 
                value={newFusion}
                onChangeText={setNewFusion}
                placeholder="an oxymoron"
                style={{
                    marginTop: '5%',
                    flex: 1,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                    marginRight: 10,
                    backgroundColor: 'white',
                }}
            />
        <View style={{ position:'relative', top: '2.5%' }}>
            <Button color='orange' title="Add" onPress={onAdd} />
        </View>
        </View>
    );
}



export default ImageryInput;