import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker'

function DeviceDropdown({ onChange, selectedOption }) {
    return (
        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginVertical: 10 }}>
            <Picker
                selectedValue={selectedOption}
                onValueChange={(itemValue) => onChange(itemValue)}
                style={{ height: 50, backgroundColor: 'white' }}
            >
                <Picker.Item label="Create" value="Create" color="#8a47ff" />
                <Picker.Item label='Discovered' value='Discovered' color="#2096F3"  />
                <Picker.Item label="Common" value="Common" color='#ff6347' />
                <Picker.Item label="Notes" value="Notes" color='black' />
            </Picker>
        </View>
    );
}

export default DeviceDropdown;