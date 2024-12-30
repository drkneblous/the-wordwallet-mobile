import React from 'react';
import { View, TextInput, Button } from 'react-native';

function FusionInput({ newFusion, setNewFusion, onAdd }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput 
                value={newFusion}
                onChangeText={setNewFusion}
                placeholder="a fusion form"
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
        <View style={{ position:'relative', top: '2.5%', overflow: 'hidden',  borderRadius: 10, borderColor:'black', borderWith:1 }}>
            <Button color='orange' title="Add" onPress={onAdd} />
        </View>
        </View>
    );
}



export default FusionInput;