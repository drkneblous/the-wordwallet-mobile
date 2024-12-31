import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import { useStorage } from './StorageContext';
import DeviceBackButton from './DeviceBackButton';
import DeviceDropdown from './DeviceDropdown';
import NotesDropdown from './NotesDropdown';
import WitWisdomDefinition from './WitWisdomDefinition';
import WitWisdomList from './WitWisdomList';
import WitWisdomInput from './WitWisdomInput';
import DeviceQuill from './DeviceQuill';
import { View, Text, Button, Alert, TouchableOpacity } from 'react-native';

function ParentWitWisdom({ onBack }) {
    const [newEntry, setNewEntry] = useState({ firstPart: '', secondPart: '' });
    const [selectedOption, setSelectedOption] = useState('Create');
    const [notesOption, setNotesOption] = useState('Null');
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

    // Fix: Prevent repeated loading of notes content
    useEffect(() => {
        if (displayMode === 'Notes' && editorContent === '') { // Only load content if it's empty
            loadStoredData('WitWisdomNotes')
                .then((data) => {
                    setEditorContent(data || ''); // Set content once
                    console.log('Data loaded for WitWisdomNotes:', data);
                })
                .catch((err) => console.error('Error loading WitWisdomNotes:', err));
        }
    }, [displayMode, loadStoredData, editorContent]); // Added editorContent as a dependency

    const handleAddEntry = () => {
        if (newEntry.firstPart.trim() && newEntry.secondPart.trim()) {
            const newEntryObject = {
                id: Date.now().toString(),
                text: `${newEntry.firstPart} : ${newEntry.secondPart}`,
                style: {
                    color: selectedOption === 'Common' ? '#ff6347' : 
                           selectedOption === 'Discovered' ? "#2096F3" : 
                           '#8a47ff',
                },
                textType: selectedOption, // Add textType directly
                category: radioSelection, // Save category
            };
            setEntries([...entries, newEntryObject]);
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
                    text: `${tempEntry.firstPart} : ${tempEntry.secondPart}`,
                    textType: tempEntry.textType || entry.textType, // Update textType
                    category: tempEntry.category || entry.category, // Update category
                    style: {
                        color: tempEntry.textType === 'Common' ? '#ff6347' : 
                               tempEntry.textType === 'Discovered' ? "#2096F3" : 
                               '#8a47ff',
                    },
                };
            }
            return entry;
        });
        setEntries(updatedEntries);
        setEditingIndex(-1); // Reset editing index
        setTempEntry({ firstPart: '', secondPart: '', textType: '', category: '' }); // Clear tempEntry
    };

    const handleDropdownChange = (value, dropdownType) => {
        console.log(`${dropdownType} Dropdown changed to:`, value);
    
        if (dropdownType === "Notes") {
            setNotesOption(value);
            if (value !== "Null" && displayMode === "Notes") {
                setDisplayMode("List");
                setSelectedOption(value); // Sync `selectedOption` for textType
                console.log("Syncing selectedOption with NotesDropdown:", value);
            }
        } else if (dropdownType === "Device") {
            if (displayMode === "List") {
                setSelectedOption(value); // Update textType for List mode
            }
    
            if (displayMode === "Notes") {
                setNotesOption(value); // Sync NotesDropdown with DeviceDropdown
                console.log("Syncing NotesDropdown with DeviceDropdown:", value);
            }
        }
    };

    const onEditInit = (index, firstPart, secondPart, category) => {
        setEditingIndex(index); // Track which entry is being edited
        setTempEntry({ firstPart, secondPart, category }); // Populate tempEntry with category
    };

    const handleBackOne = () => {
        setDisplayMode('List'); // Resets to device view
    };

    const handleStateChange = () => {
        console.log('Switching to Notes mode...');
    
        // Resetting necessary states when entering Notes
        setNotesOption('Null'); // Or your desired default
        setDisplayMode('Notes');
    };  


     const handleSaveEditorContent = () => {
            console.log('Attempting to save editor content:', editorContent);
            if (!editorContent.trim()) {
                Alert.alert('Warning', 'Editor content is empty!');
                return;
            }
            saveData('WitWisdomNotes', editorContent)
                .then(() => {
                    console.log('Notes saved successfully:', editorContent);
                    Alert.alert('Saved', 'Your notes have been saved!');
                })
                .catch((err) => console.error('Failed to save notes:', err));
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
                            <DeviceDropdown onChange={(value) => handleDropdownChange(value, "Device")}
                            selectedOption={selectedOption} />
                        </View>
                        <RadioButton.Group
                            onValueChange={(newValue) => setRadioSelection(newValue)}
                            value={radioSelection}
                        >
                            <View style={{ position: 'relative', left: '40%', top:'4.5%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ position:'relative', right:'15%', color: 'white' }}>Wit</Text>
                                    <RadioButton backgroundColor="white" value="Wit" />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ position:'relative', right:'15%', color: 'white' }}>Wisdom</Text>
                                    <RadioButton backgroundColor="white" value="Wisdom" />
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
                        <View>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'silver',
                                    padding: 7,
                                    borderRadius: 5,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    alignItems: 'center',
                                    width: '35%',
                                    bottom: '21%',
                                    left:'32.5%'
                                    }}
                                    onPress={handleStateChange}
                                >
                                <Text style={{ color: 'black', fontSize: 16 }}>Notess</Text>
                            </TouchableOpacity>  
                        </View>
                        <View style={{ position: 'relative', right: '40%', top: '18%', bottom: '5%', marginTop: '4%' }}>
                            <View style={{ position:'relative', bottom:'142%', borderRadius:5, left:'2%' }}>
                                <DeviceBackButton style={{ borderRadius: 15, borderColor:'black', borderWidth:1 }} onBack={onBack} />
                            </View>
                            <View style={{ position:'relative', bottom:'193%', left:'113%', width:'30%', overflow:'hidden', borderRadius:5, borderWidth:1, borderColor:'black' }}>
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
                            <NotesDropdown
                                onChange={(value) => handleDropdownChange(value, "Notes")}
                                selectedOption={notesOption}
                                />
                            </View>
                            <View style={{ position:'relative', bottom:'7%', width: '50%', overFlow:'hidden', borderRadius: 10, borderColor:'black', borderWidth:1 }}>
                                <Button
                                    onPress={handleSaveEditorContent}
                                    title="Save Notes"
                                />
                            </View>
                            <View style={{ position:'relative', bottom:'32%', left:'35%' }}>
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