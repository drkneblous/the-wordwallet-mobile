import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper'
import DeviceBackButton from './DeviceBackButton'
import DeviceDropdown from './DeviceDropdown'
import NotesDropdown from './NotesDropdown'
import NicknamesDefinition from './NicknamesDefinition'
import NicknamesList from './NicknamesList'
import NicknamesInput from './NicknamesInput'
import DeviceQuill from './DeviceQuill'
import { View, Text, TouchableOpacity, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import { useStorage } from './StorageContext';

function ParentNicknames({ onBack }) {
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState({ firstPart: '', secondPart: '' });
    const [selectedOption, setSelectedOption] = useState('Create');
    const [notesOption, setNotesOption] = useState('Null');
    const [displayMode, setDisplayMode] = useState('List');
    const [editingIndex, setEditingIndex] = useState(-1);
    const [tempEntry, setTempEntry] = useState({ firstPart: '', secondPart: '' });
    const [radioSelection, setRadioSelection] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const { loadStoredData, saveData } = useStorage(); // Import storage methods
    const classIdentifier = 'NicknamesWords'; // Unique identifier for this component
    const [lastSavedEntries, setLastSavedEntries] = useState(null); // Track last saved state

    useEffect(() => {
        loadStoredData(classIdentifier).then((data) => {
            setEntries(data || []); // Load Nicknames entries or initialize with an empty array
        });
    }, [classIdentifier]);

    // Save data when entries change
    useEffect(() => {
        if (entries.length > 0 && JSON.stringify(entries) !== JSON.stringify(lastSavedEntries)) {
            saveData(classIdentifier, entries); // Save only if entries have changed
            setLastSavedEntries(entries); // Update the last saved state
        }
    }, [entries, saveData, classIdentifier, lastSavedEntries]);

    useEffect(() => {
        // Check if we're in 'Notes' mode and editorContent is not yet loaded
        if (displayMode === 'Notes' && !editorContent) {
            loadStoredData('NicknamesNotes')
                .then((data) => {
                    setEditorContent(data || ''); // Default to empty string if no data
                    console.log('Data loaded for NicknamesNotes:', data);
                })
                .catch((err) => {
                    console.error('Error loading NicknamesNotes:', err);
                    setEditorContent(''); // Ensure we handle errors gracefully
                });
        }
    }, [displayMode, loadStoredData, editorContent]);

    const handleAddEntry = () => {
        if (newEntry.firstPart.trim() && newEntry.secondPart.trim()) {
            const newEntryObject = {
                id: Date.now().toString(),
                text: `${newEntry.firstPart} : ${newEntry.secondPart}`,
                style: {
                    color: selectedOption === 'Common' ? 'green' : 
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
        setEntries(entries.filter(entry => entry.id !== id));
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


    const onEditInit = (index, firstPart, secondPart) => {
        setEditingIndex(index);
        setTempEntry({ firstPart, secondPart: secondPart.replace(/^: /, '') }); // Remove colon and space when starting to edit
    };

    const theme = {
        colors: {
            primary: '#4A90E2', // Set the radio button color
        },
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
        
        // Ensure editorContent is always a string before calling .trim()
        const content = editorContent ? editorContent.toString() : ''; // Fallback to an empty string if undefined or null
        
        if (!content.trim()) {
            Alert.alert('Warning', 'Editor content is empty!');
            return;
        }
        
        saveData('NicknamesNotes', content)
            .then(() => {
                console.log('Notes saved successfully:', content);
                Alert.alert('Saved', 'Your notes have been saved!');
            })
            .catch((err) => console.error('Failed to save notes:', err));
    };

    

    return (
            <View style={{ padding: 20, width: '110%', height: '100%' }}>            
            {displayMode === 'List' ? (
                <>
                <View style={{ postion: 'relative', bottom: '3.75%'}}>
            <       NicknamesDefinition />
                </View>
            <View style={{width: '105%', backgroundColor: 'white', borderWidth: 1, borderColor: 'black',  height:'53%', maxHeight:500, position: 'relative', right:'2.5%', bottom: '4.5%' }} >
                <NicknamesList 
                    entries={entries}
                    onEditInit={onEditInit}
                    onDelete={handleDelete}
                    onEditSave={handleEditSave}
                    editingIndex={editingIndex}
                    editTempEntry={tempEntry} // Ensure this is the prop you use
                    setEditTempEntry={setTempEntry}
                />
            </View>
            <View style={{ position: 'relative', marginTop: '1.5%', bottom: '10%', flexDirection: 'row', marginVertical: 10  }}>
                <View style={{ position:'relative', height: 65, width: '50%' }}>
                    <DeviceDropdown
                        onChange={(value) => handleDropdownChange(value, "Device")}
                        selectedOption={selectedOption}
                    />
                </View>
                <RadioButton.Group onValueChange={newValue => setRadioSelection(newValue)} value={radioSelection} width='100%'>
                    <View style={{ flexDirection: 'column', position: 'relative', left: '40%' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ position: 'relative', right: '10%', alignItems: 'center' }}>
                                <View style={{ position: 'relative', bottom: '10%', transform: [{ scale: 0.50 }] }}>
                                    <RadioButton theme={theme} value="Pleasant" backgroundColor='white' />
                                </View>
                                <View style={{ position: 'relative', right: '15%' }}>
                                    <Text style={{ position: 'relative', bottom: '80%', fontSize: 10, textAlign: 'center', color: 'white' }}>Pleasantt</Text>
                                </View>
                            </View>
                            <View style={{ position: 'relative', left: '50%', alignItems: 'center' }}>  
                                <View style={{ position: 'relative', bottom: '10%', transform: [{ scale: 0.50 }] }}>
                                    <RadioButton theme={theme} value="Snide" backgroundColor='white' />
                                </View>
                                <View>
                                    <Text style={{ position: 'relative', right: '5%', bottom: '80%', fontSize: 10, color: 'white' }}>Snidee</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ position: 'relative', left: '5%', alignItems: 'center' }}>  
                                <View style={{ position: 'relative', bottom: '25%', right:'10%', transform: [{ scale: 0.50 }] }}>
                                    <RadioButton theme={theme} backgroundColor='white' value="Playful" />
                                </View>
                                <View>
                                    <Text style={{ position: 'relative', right:'25%', bottom: '120%', fontSize: 10, color: 'white' }}>Playfull</Text>
                                </View>
                            </View>
                            <View style={{ position: 'relative', left: '55%', alignItems: 'center' }}>  
                                <View style={{ position: 'relative', bottom: '25%', left:'30%', transform: [{ scale: 0.50 }] }}>
                                    <RadioButton theme={theme} backgroundColor='white' value="Foul" />
                                </View>
                                <View>
                                    <Text style={{ position: 'relative', left: '25%', bottom: '120%', fontSize: 10, color: 'white' }}>Foull</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </RadioButton.Group>
            </View>
            <View style={{ position: 'relative', bottom: '9%' }}>
                <View style={{ position: 'relative', bottom: '5%', marginTop: '4%', borderColor:'black' }}>
                    <NicknamesInput 
                        entryPair={newEntry} // Changed from entryPair to newEntry
                        setNewEntry={setNewEntry} // Correct function name to match state handler
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
                            bottom: '10%',
                            left:'32.5%'
                            }}
                            onPress={handleStateChange}
                            >
                            <Text style={{ color: 'black', fontSize: 16 }}>Notess</Text>
                        </TouchableOpacity>  
                    </View>
                    <View style={{ position: 'relative', right: '40%', top: '18%', bottom: '5%', marginTop: '4%' }}>
                            <View style={{ position:'relative', bottom:'135.5%', borderRadius:5, left:'2%' }}>
                                <DeviceBackButton style={{ borderRadius: 15 }} onBack={onBack} />
                            </View>
                            <View style={{ position:'relative', bottom:'185.5%', left:'113%', width:'30%', overflow:'hidden', borderRadius:5, borderWidth:1, borderColor:'black' }}>
                                <Button
                                title="Save"
                                onPress={() => {
                                saveData(classIdentifier, entries)
                                .then(() => {
                                console.log('List saved successfully:', entries); // Debug log
                                Alert.alert('Saved', 'Your nicknames list has been saved!');
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
                <View style={{ position: 'relative', padding: '2.5%', fontSize: 18, marginBottom: 10, backgroundColor: 'white', borderRadius: 15, bottom: '1.75%' }} >
                    <Text>Write down your nickname inspirations or thoughts here</Text>
                </View>
                    <DeviceQuill editorContent={editorContent} setEditorContent={setEditorContent} storageKey="NicknamesNotes" />
                <View>
                    <View style={{ position:'relative', bottom:'2%', marginBottom: '2.5%' }}> 
                        <NotesDropdown
                            onChange={(value) => handleDropdownChange(value, "Notes")}
                            selectedOption={notesOption}
                        />
                    </View>
                    <View style={{ position:'relative', bottom:'6.5%', width: '50%', borderColor:'black', borderWidth:1, borderRadius:5 }}>
                        <Button
                            onPress={handleSaveEditorContent}
                            title="Save Notes"
                        />
                    </View>
                    <View style={{ position:'relative', bottom:'31.5%', left:'35%' }}>
                        <DeviceBackButton onPress={handleBackOne}/>
                    </View>
                </View>
            </View>
            </>
            )}
        </View>
    );
}

export default ParentNicknames;