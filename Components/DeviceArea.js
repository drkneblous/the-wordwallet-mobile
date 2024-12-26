import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useStorage } from './StorageContext'; // Import useStorage

function DeviceArea({ onChangeDevice }) {
    const [selectedDevice, setSelectedDevice] = useState('');
    const [note, setNote] = useState('');
    const { saveData, loadStoredData } = useStorage(); // Extract save and load methods from useStorage

    // Load the saved note only when the component mounts
    useEffect(() => {
        const fetchSavedNote = async () => {
            const savedNote = await loadStoredData('MiscellaneousNote'); // Load the saved note
            if (savedNote) {
                setNote(savedNote); // Restore the saved note to the TextInput
                console.log('Loaded Note:', savedNote); // Debug log
            }
        };
        fetchSavedNote();
    }, []); // Empty dependency array ensures this only runs once on mount

    // Save note using useStorage
    const handleSaveNote = async () => {
        // Save the note even if it's empty (reflecting the deleted state)
        try {
            const key = `MiscellaneousNote`; // Fixed key for miscellaneous notes
            await saveData(key, note); // Save note to storage
            Alert.alert('Success', 'Your miscellaneous notes have been saved!');
            console.log('Saved Note:', note); // Debug log
        } catch (error) {
            console.error('Failed to save note:', error);
            Alert.alert('Error', 'Failed to save your note. Please try again.');
        }
    };

    return (
        <View style={styles.deviceArea}>
            <Picker
                selectedValue={selectedDevice}
                onValueChange={(device) => {
                    console.log('Device Selected:', device); // Debug log
                    setSelectedDevice(device);
                    onChangeDevice(device); // Propagate change to parent
                }}
                style={styles.dropdownList}
            >
                <Picker.Item label="Devices..." value="" />
                <Picker.Item label="Fusion Forms" value="Fusion Forms" />
                <Picker.Item label="Wit & Wisdom" value="Wit & Wisdom" />
                <Picker.Item label="Nicknames" value="Nicknames" />
                <Picker.Item label="Terms" value="Terms" />
                <Picker.Item label="Alliteration" value="Alliteration" />
                <Picker.Item label="Allusion" value="Allusion" />
                <Picker.Item label="Allegory" value="Allegory" />
                <Picker.Item label="Euphemism" value="Euphemism" />
                <Picker.Item label="Hyperbole" value="Hyperbole" />
                <Picker.Item label="Idiom" value="Idiom" />
                <Picker.Item label="Imagery" value="Imagery" />
                <Picker.Item label="Irony" value="Irony" />
                <Picker.Item label="Juxtaposition" value="Juxtaposition" />
                <Picker.Item label="Metaphor" value="Metaphor" />
                <Picker.Item label="Onomatopoeia" value="Onomatopoeia" />
                <Picker.Item label="Oxymoron" value="Oxymoron" />
                <Picker.Item label="Personification" value="Personification" />
                <Picker.Item label="Simile" value="Simile" />
            </Picker>
            <TextInput
                style={styles.deviceTextarea}
                value={note}
                onChangeText={setNote} // Directly updates the note state
                placeholder="Miscellaneous notes..."
                multiline
            />
            <View style={styles.buttonContainer}>
                <Button title="Save Note" onPress={handleSaveNote} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    deviceArea: {
        width: '100%',
    },
    dropdownList: {
        backgroundColor: 'white',
        width: '50%',
        marginBottom: 10,
        fontSize: 10,
        overflow: 'hidden',
        borderRadius: 10,
    },
    deviceTextarea: {
        width: '100%',
        height: '60%', // Approximating 35vh for cross-device compatibility
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'white',
        marginBottom: '3%',
        marginTop: '1.5%',
        borderRadius: 5,
        paddingHorizontal: 10,
        textAlignVertical: 'top', // Ensures text starts at the top
    },
    buttonContainer: {
        marginTop: 10,
        borderRadius: 20,
        width: '35%',
        position: 'relative',
        bottom: '2%',
    },
});

export default DeviceArea;