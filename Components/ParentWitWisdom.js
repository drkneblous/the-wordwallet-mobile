import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import { useStorage } from './StorageContext';
import DeviceBackButton from './DeviceBackButton';
import DeviceDropdown from './DeviceDropdown';
import WitWisdomDefinition from './WitWisdomDefinition';
import WitWisdomList from './WitWisdomList';
import WitWisdomInput from './WitWisdomInput';
import DeviceQuill from './DeviceQuill';
import { View, Text, Button, Alert } from 'react-native';

function ParentWitWisdom({ onBack }) {
    const [newEntry, setNewEntry] = useState({ firstPart: '', secondPart: '' });
    const [selectedOption, setSelectedOption] = useState('Create');
    const [displayMode, setDisplayMode] = useState('List');
    const [editingIndex, setEditingIndex] = useState(-1);
    const [tempEntry, setTempEntry] = useState({ firstPart: '', secondPart: '' });
    const [radioSelection, setRadioSelection] = useState('');
    const [editorContent, setEditorContent] = useState(''); // Rich editor content for notes
    const { loadStoredData, saveData } = useStorage(); // Updated destructure for storage
    const [entries, setEntries] = useState([]); // Initialize with empty array
    const [lastSavedEntries, setLastSavedEntries] = useState(null); // Track the last saved state
    const classIdentifier = 'WitWisdomWords'; // Unique identifier for this component

    // Load entries from AsyncStorage
    useEffect(() => {
        loadStoredData(classIdentifier).then((data) => {
            setEntries(data); // Load Wit & Wisdom entries
        });
    }, [classIdentifier]);

    // Save entries to AsyncStorage whenever they change
    useEffect(() => {
        if (entries.length > 0 && JSON.stringify(entries) !== JSON.stringify(lastSavedEntries)) {
            saveData(classIdentifier, entries); // Save only if entries have changed
            setLastSavedEntries(entries); // Update the last saved state
        }
    }, [entries, saveData, classIdentifier, lastSavedEntries]);

    const handleAddEntry = () => {
        if (newEntry.firstPart.trim() && newEntry.secondPart.trim()) {
            const newEntryObject = {
                id: Date.now().toString(),
                text: `${newEntry.firstPart} : ${newEntry.secondPart}`, // No category appended
                style: {
                    color: selectedOption === 'Common' ? '#ff6347' : selectedOption === 'Discovered' ? "#2096F3"  : '#8a47ff',
                },
                category: radioSelection, // Save the category separately
            };
            setEntries([...entries, newEntryObject]); // Add the new entry
            setNewEntry({ firstPart: '', secondPart: '' }); // Reset input fields
            setRadioSelection(''); // Reset radio selection
        }
    };

    const handleDelete = (id) => {
        setEntries(entries.filter((entry) => entry.id !== id));
    };

    const handleEditSave = (id) => {
        const updatedEntries = entries.map((entry) => {
            if (entry.id === id) {
                return {
                    ...entry,
                    text: `${tempEntry.firstPart} : ${tempEntry.secondPart}`, // Update text
                    category: tempEntry.category, // Update category directly from tempEntry
                };
            }
            return entry;
        });
        setEntries(updatedEntries);
        setEditingIndex(-1); // Reset editing index
        setTempEntry({ firstPart: '', secondPart: '', category: '' }); // Clear tempEntry after saving
    };

    const handleDropdownChange = (value) => {
        setSelectedOption(value);
        setDisplayMode(value === 'Notes' ? 'Notes' : 'List');
    };

    const onEditInit = (index, firstPart, secondPart, category) => {
        setEditingIndex(index); // Track which entry is being edited
        setTempEntry({ firstPart, secondPart, category }); // Populate tempEntry with category
    };

    const handleBackOne = () => {
        setDisplayMode('List'); // Resets to device view
    };


    return (
        <View style={{ padding: 20, width: '110%', height: '100%' }}>
            {displayMode === 'List' ? (
                <>
                    <View style={{ position: 'relative', bottom: '3.75%' }}>
                        <WitWisdomDefinition />
                    </View>
                    <View
                        style={{
                            width: '105%',
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: 'black',
                            height: '53%',
                            maxHeight: 500,
                            position: 'relative',
                            right: '2.5%',
                            bottom: '4.5%',
                        }}
                    >
                        <WitWisdomList
                            entries={entries}
                            onEditInit={onEditInit}
                            onDelete={handleDelete}
                            onEditSave={handleEditSave}
                            editingIndex={editingIndex}
                            editTempEntry={tempEntry}
                            setEditTempEntry={setTempEntry}
                        />
                    </View>
                    <View
                        style={{
                            position: 'relative',
                            marginTop: '1.5%',
                            bottom: '10%',
                            flexDirection: 'row',
                            marginVertical: 10,
                        }}
                    >
                        <View style={{ position: 'relative', height: 65, width: '50%' }}>
                            <DeviceDropdown selectedOption={selectedOption} onChange={handleDropdownChange} />
                        </View>
                        <RadioButton.Group
                            onValueChange={(newValue) => setRadioSelection(newValue)}
                            value={radioSelection}
                        >
                            <View style={{ position: 'relative', left: '40%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: 'white' }}>Wit</Text>
                                    <RadioButton color="white" value="Wit" />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: 'white' }}>Wisdom</Text>
                                    <RadioButton color="white" value="Wisdom" />
                                </View>
                            </View>
                        </RadioButton.Group>
                    </View>
                    <View style={{ position: 'relative', bottom: '5%' }}>
                        <View
                            style={{
                                position: 'relative',
                                bottom: '5%',
                                marginTop: '4%',
                                borderColor: 'black',
                            }}
                        >
                            <WitWisdomInput
                                entryPair={newEntry}
                                setNewEntry={setNewEntry}
                                onAdd={handleAddEntry}
                            />
                        </View>
                        <View style={{ position: 'relative', right: '40%', top: '18%', bottom: '5%', marginTop: '4%' }}>
                            <View style={{ position:'relative', bottom:'75%', borderRadius:5, left:'2%' }}>
                                <DeviceBackButton style={{ borderRadius: 15 }} onBack={onBack} />
                            </View>
                            <View style={{ position:'relative', bottom:'125.5%', left:'113%', width:'30%', overflow:'hidden', borderRadius:5, borderWidth:1, borderColor:'black' }}>
                                <Button
                                title="Save"
                                onPress={() => {
                                saveData(classIdentifier, entries)
                                .then(() => {
                                console.log('List saved successfully:', entries); // Debug log
                                Alert.alert('Saved', 'Your wit & wisdoms list has been saved!');
                                })
                                .catch((err) => console.error('Failed to save list:', err));
                                    }}
                                color="#2096F3" // Optional: Customize button color
                                />
                            </View>
                        </View>
                    </View>
                </>
            ) : (
                <>
                    <View style={{ height: '104%' }}>
                        <View
                            style={{
                                position: 'relative',
                                padding: '2.5%',
                                fontSize: 18,
                                marginBottom: 10,
                                backgroundColor: 'white',
                                borderRadius: 15,
                                bottom: '1.75%',
                            }}
                        >
                            <Text>Write down your witticisms or wisdom notes and thoughts here</Text>
                        </View>
                        <DeviceQuill
                            editorContent={editorContent}
                            setEditorContent={setEditorContent}
                            storageKey="WitWisdomNotes"
                        />
                        <View>
                            <View style={{ marginBottom: '2.5%' }}>
                                <DeviceDropdown selectedOption={selectedOption} onChange={handleDropdownChange} />
                            </View>
                            <View style={{ position:'relative', top:'15%', width: '50%' }}>
                                <Button
                                    onPress={() => {
                                    if (!editorContent.trim()) {
                                    Alert.alert('Warning', 'Editor content is empty!');
                                    return;
                                    }
                                    console.log('Saving content:', editorContent); // Debug log
                                    }}
                                    title="Save Notes"
                                />
                            </View>
                            <View style={{ position:'relative', bottom:'10%', left:'20%' }}>
                                <DeviceBackButton onPress={handleBackOne}/>
                            </View>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}

export default ParentWitWisdom;