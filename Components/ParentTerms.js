import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper'
import DeviceBackButton from './DeviceBackButton'
import DeviceDropdown from './DeviceDropdown'
import NotesDropdown from './NotesDropdown'
import TermsDefinition from './TermsDefinition'
import TermsList from './TermsList'
import TermsInput from './TermsInput'
import DeviceQuill from './DeviceQuill'
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useStorage } from './StorageContext';

function ParentTerms({ onBack }) {
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState({ firstPart: '', secondPart: '' });
    const [selectedOption, setSelectedOption] = useState('Create');
    const [notesOption, setNotesOption] = useState('Null');
    const [displayMode, setDisplayMode] = useState('List');
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editorContent, setEditorContent] = useState(''); // Rich editor content for Fusion Forms
    const [tempEntry, setTempEntry] = useState({ firstPart: '', secondPart: '' });
    const [radioSelection, setRadioSelection] = useState('');
    const { loadStoredData, saveData } = useStorage(); // Import storage methods
    const classIdentifier = 'Termswords'; // Unique identifier for this component
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
        if (displayMode === 'Notes') {
            loadStoredData('TermsNotes')
                .then((data) => {
                    if (data !== editorContent) {
                        setEditorContent(data || '');
                        console.log('Data loaded for TermsNotes:', data);
                    }
                })
                .catch((err) => console.error('Error loading TermsNotes:', err));
        }
    }, [displayMode, editorContent]);

    
    const handleAddEntry = () => {
        if (newEntry.firstPart.trim() && newEntry.secondPart.trim()) {
            const newEntryObject = {
                id: Date.now().toString(),
                text: `${newEntry.firstPart} : ${newEntry.secondPart}`, // No category appended
                style: {
                    color: selectedOption === 'Common' ? '#ff6347' : selectedOption === 'Discovered' ? "#2096F3" : '#8a47ff'
                },
                category: radioSelection,
            };
            setEntries([...entries, newEntryObject]);
            setNewEntry({ firstPart: '', secondPart: '' });  // Reset the input fields.
            setRadioSelection(''); // Reset radio selection
        }
    };

    const handleDelete = (id) => {
        setEntries(entries.filter(entry => entry.id !== id));
    };

    const handleEditSave = (id) => {
        const updatedEntries = entries.map(entry => {
            if (entry.id === id) {
                return {
                    ...entry,
                    text: `${tempEntry.firstPart} : ${tempEntry.secondPart}`, // Remove category from here
                    category: tempEntry.category || entry.category, // Only update the category field
                };
            }
            return entry;
        });
        setEntries(updatedEntries);
        setEditingIndex(-1);
        setTempEntry({ firstPart: '', secondPart: '', category: '' }); // Reset the tempEntry completely
        setRadioSelection('');
    };

    const handleDropdownChange = (value, dropdownType) => {
        console.log(`${dropdownType} Dropdown changed to:`, value);
    
        if (dropdownType === "Notes") {
            setNotesOption(value);
    
            if (value !== "Null" && displayMode === "Notes") {
                setTimeout(() => {
                    setDisplayMode("List");
                    setSelectedOption(value);
                    console.log(
                        "Reverting to List mode and syncing selectedOption with NotesDropdown selection:",
                        value
                    );
                }, 100);
            }
        } else if (dropdownType === "Device") {
            setSelectedOption(value);
    
            if (displayMode === "Notes") {
                setTimeout(() => {
                    setNotesOption(value);
                    console.log(
                        "Syncing NotesDropdown with DeviceDropdown selection:",
                        value
                    );
                }, 100);
            }
        }
    };

    const onEditInit = (index, firstPart, secondPart) => {
        setEditingIndex(index);
        setTempEntry({ firstPart, secondPart: secondPart.replace(/^: /, '') }); // Remove colon and space when starting to edit
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


    const theme = {
        colors: {
          primary: '#4A90E2', // Set the radio button color
        },
      };


    return (
            <View style={{ padding: 20, width: '110%', height: '100%' }}>            
            {displayMode === 'List' ? (
                <>
                <View style={{ postion: 'relative', bottom: '3.75%'}}>
                    <TermsDefinition />
                </View>
            <View style={{width: '105%', backgroundColor: 'white', borderWidth: 1, borderColor: 'black',  height:'53%', maxHeight:500, position: 'relative', right:'2.5%', bottom: '4.5%' }} >
                <TermsList 
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
                    <DeviceDropdown selectedOption={selectedOption} onChange={handleDropdownChange} />
                </View>
                <RadioButton.Group onValueChange={newValue => setRadioSelection(newValue)} value={radioSelection} width='100%'>
                    <View style={{ flexDirection: 'column', position: 'relative', left: '40%' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ position: 'relative', right: '10%', alignItems: 'center' }}>
                                <View style={{ position: 'relative', right:'25%', bottom: '10%', transform: [{ scale: 0.50 }] }}>
                                    <RadioButton theme={theme} value="Technical" backgroundColor='white' />
                                </View>
                                <View style={{ position: 'relative', right: '35%' }}>
                                    <Text style={{ position: 'relative', bottom: '80%', fontSize: 10, textAlign: 'center', color: 'white' }}>Technicall</Text>
                                </View>
                            </View>
                            <View style={{ position: 'relative', right: '5%', alignItems: 'center' }}>  
                                <View style={{ position: 'relative', bottom: '10%', transform: [{ scale: 0.50 }] }}>
                                    <RadioButton theme={theme} value="Scientific" backgroundColor='white' />
                                </View>
                                <View>
                                    <Text style={{ position: 'relative', right: '5%', bottom: '80%', fontSize: 10, color: 'white' }}>Scientificc</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ position: 'relative', left: '5%', alignItems: 'center' }}>  
                                <View style={{ position: 'relative', bottom: '25%', right:'30%', transform: [{ scale: 0.50 }] }}>
                                    <RadioButton theme={theme} backgroundColor='white' value="Social" />
                                </View>
                                <View>
                                    <Text style={{ position: 'relative', right:'40%', bottom: '120%', fontSize: 10, color: 'white' }}>Sociall</Text>
                                </View>
                            </View>
                            <View style={{ position: 'relative', left: '30%', alignItems: 'center' }}>  
                                <View style={{ position: 'relative', bottom: '25%', left:'35%', transform: [{ scale: 0.50 }] }}>
                                    <RadioButton theme={theme} backgroundColor='white' value="Miscellaneous" />
                                </View>
                                <View>
                                    <Text style={{ position: 'relative', left: '30%', bottom: '120%', fontSize: 10, color: 'white' }}>Misc</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </RadioButton.Group>
            </View>
            <View style={{ position: 'relative', bottom: '9%' }}>
                <View style={{ position: 'relative', bottom: '5%', marginTop: '4%', borderColor:'black' }}>
                    <TermsInput 
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
                        bottom: '11%',
                        left:'32.5%'
                        }}
                        onPress={handleStateChange}
                    >
                        <Text style={{ color: 'black', fontSize: 16 }}>Notess</Text>
                    </TouchableOpacity>  
                </View>
                <View style={{ position: 'relative', right: '40%', top: '18%', bottom: '5%', marginTop: '4%' }}>
                            <View style={{ position:'relative', bottom:'135%', borderRadius:5, left:'2%' }}>
                                <DeviceBackButton style={{ borderRadius: 15 }} onBack={onBack} />
                            </View>
                            <View style={{ position:'relative', bottom:'185.5%', left:'113%', width:'30%', overflow:'hidden', borderRadius:5, borderWidth:1, borderColor:'black' }}>
                                <Button
                                title="Save"
                                onPress={() => {
                                saveData(classIdentifier, entries)
                                .then(() => {
                                console.log('List saved successfully:', entries); // Debug log
                                Alert.alert('Saved', 'Your terms list has been saved!');
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
                    <Text>Write down your terms notes and thoughts here</Text>
                </View>
                    <DeviceQuill editorConent={editorContent} setEditorContent={setEditorContent} storageKey="TermsNotes" />
                    <View style={{ marginBottom: '2.5%' }}> 
                        <NotesDropdown
                            onChange={(value) => handleDropdownChange(value, "Notes")}
                            selectedOption={notesOption}
                        />
                    </View>
                            <View style={{ position:'relative', width: '50%', bottom:'1.5%' }}>
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
                            <View style={{ position:'relative', bottom:'7.5%', left:'35%' }}>
                                <DeviceBackButton onPress={handleBackOne}/>
                            </View>
                    </View>
            </>
            )}
        </View>
    );
}

export default ParentTerms;