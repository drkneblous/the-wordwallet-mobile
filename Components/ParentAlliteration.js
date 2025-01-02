import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button, TouchableOpacity } from 'react-native';
import { useStorage } from './StorageContext';
import AlliterationDefinition from './AlliterationDefinition';
import AlliterationList from './AlliterationList';
import AlliterationInput from './AlliterationInput';
import LetterNavigation from './LetterNavigation';
import DeviceDropdown from './DeviceDropdown';
import NotesDropdown from './NotesDropdown';
import DeviceBackButton from './DeviceBackButton';
import DeviceQuill from './DeviceQuill';

function ParentAlliteration({ onBack }) {
    const [alliterations, setAlliterations] = useState([]); // Global list of alliterations
    const [localAlliterations, setLocalAlliterations] = useState(Array(26).fill([])); // Grouped by letter
    const [currentLetter, setCurrentLetter] = useState(0); // Selected letter index
    const [editingIndex, setEditingIndex] = useState(-1); // Index for editing
    const [tempAlliteration, setTempAlliteration] = useState(''); // Temporary alliteration for editing
    const [startingLetter, setStartingLetter] = useState('A'); // Letter navigation
    const [inputAlliteration, setInputAlliteration] = useState(''); // Input for new alliteration
    const [selectedOption, setSelectedOption] = useState('Create'); // Dropdown selection
    const [notesOption, setNotesOption] = useState('Null');
    const [displayMode, setDisplayMode] = useState('List'); // Display mode: List or Notes
    const [editorContent, setEditorContent] = useState(''); // Tracks content of DeviceQuill
    const { loadStoredData, saveData } = useStorage();
    const classIdentifier = 'AlliterationWords'; // Unique identifier for storage
    const [lastSavedAlliterations, setLastSavedAlliterations] = useState(null); // Tracks last saved state

    // Load alliterations from storage on mount
    useEffect(() => {
        loadStoredData(classIdentifier).then((data) => {
            if (data && Array.isArray(data)) {
                setAlliterations(data);
            }
        });
    }, [classIdentifier]);

    // Save alliterations whenever they change
    useEffect(() => {
        if (JSON.stringify(alliterations) !== JSON.stringify(lastSavedAlliterations)) {
            saveData(classIdentifier, alliterations);
            setLastSavedAlliterations(alliterations);
        }
    }, [alliterations, saveData, classIdentifier, lastSavedAlliterations]);

    // Update local alliterations grouped by letters when global list changes
    useEffect(() => {
        const groupedAlliterations = Array.from({ length: 26 }, (_, i) =>
            alliterations.filter(
                (alliteration) =>
                    alliteration.term &&
                    alliteration.term[0].toUpperCase() === String.fromCharCode(65 + i)
            )
        );
        setLocalAlliterations(groupedAlliterations);
    }, [alliterations]);

   useEffect(() => {
           if (displayMode === 'Notes' && editorContent === '') { // Only load content if it's empty
               loadStoredData('AlliterationNotes')
                   .then((data) => {
                       setEditorContent(data || ''); // Set content once
                       console.log('Data loaded for AlliterationNotes:', data);
                   })
                   .catch((err) => console.error('Error loading AlliterationNotes:', err));
           }
       }, [displayMode, loadStoredData, editorContent]); // Added editorContent as a dependency

    // Handle adding a new alliteration
    const handleAddClick = () => {
        if (inputAlliteration.charAt(0).toUpperCase() !== startingLetter) {
            Alert.alert('Error', 'Letter must start with the selected letter');
            return;
        }
        const newAlliterationStyle = {
            color: selectedOption === 'Common' ? 'green' : selectedOption === 'Discovered' ? "#2096F3": '#8a47ff',
        };
        const newAlliteration = {
            term: inputAlliteration,
            type: 'alliteration',
            style: newAlliterationStyle,
        };

        const updatedAlliterations = [...alliterations, newAlliteration];
        setAlliterations(updatedAlliterations); // Update the global list
        setInputAlliteration(''); // Reset the input field
    };

    // Handle deleting an alliteration
    const onDelete = (index) => {
        const updatedAlliterations = alliterations.filter(
            (_, i) => !(i === index && alliterations[i].term[0].toUpperCase() === startingLetter)
        );
        setAlliterations(updatedAlliterations);
    };

    // Handle saving an edited alliteration
    const onEditSave = (index) => {
        const updatedAlliterations = [...alliterations];
        if (updatedAlliterations[index]) {
            updatedAlliterations[index] = {
                ...updatedAlliterations[index],
                term: tempAlliteration,
            };
        }
        setAlliterations(updatedAlliterations);
        setEditingIndex(-1); // Reset editing index
        setTempAlliteration(''); // Clear the temporary storage
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

    const handleSaveEditorContent = () => {
        if (!editorContent.trim()) {
            Alert.alert('Warning', 'Editor content is empty!');
            return;
        }
        saveData('AlliterationNotes', editorContent).then(() => {
            console.log('Data saved to AlliterationNotes:', editorContent); // Debug log
            Alert.alert('Saved', 'Your notes have been saved!');
        }).catch((err) => console.error('Failed to save notes:', err));
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


    return (
        <View style={{ padding: 20, width: '110%', height: '100%' }}>
            {displayMode === 'List' ? (
                <>
                    <View style={{ postion: 'relative', bottom: '4%' }}>
                        <AlliterationDefinition />
                    </View>
                    <View
                        style={{
                            width: '105%',
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: 'black',
                            height: '50%',
                            maxHeight: 600,
                            position: 'relative',
                            right: '2.5%',
                            bottom: '5%',
                        }}
                    >
                        <AlliterationList
                            alliterations={localAlliterations[currentLetter]}
                            onEditInit={(index, item) => {
                                setEditingIndex(index);
                                setTempAlliteration(item.term);
                            }}
                            onDelete={(index) => onDelete(index)}
                            onEditSave={onEditSave}
                            editingIndex={editingIndex}
                            tempAlliteration={tempAlliteration}
                            setTempAlliteration={setTempAlliteration}
                        />
                    </View>
                    <View style={{ width: '100%', position: 'relative', bottom: '5%' }}>
                        <View style={{ position: 'relative', height: 65, width: '50%', marginBottom: '2.5%' }}>
                            <DeviceDropdown
                                onChange={(value) => handleDropdownChange(value, "Device")}
                                selectedOption={selectedOption}
                            />
                        </View>
                        <View style={{ position: 'relative', right: '3%', bottom:'3%' }}>
                            <AlliterationInput
                                startingLetter={startingLetter}
                                inputAlliteration={inputAlliteration}
                                onLetterChange={(letter) => setStartingLetter(letter.toUpperCase())}
                                onAlliterationChange={(text) => setInputAlliteration(text)}
                                onAdd={handleAddClick}
                            />
                        </View>
                        <View style={{ width:'35%', borderRadius:'50%', left:'32.5%', top:'36.25%' }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'silver',
                                    padding: 7,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    borderColor:'black',
                                    borderWidth:1,
                                    }}
                                    onPress={handleStateChange}
                                >
                                    <Text style={{ color: 'black', fontSize: 16 }}>Notess</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ position: 'relative', bottom: '20%',  }}>
                            <LetterNavigation
                                onSelectLetter={(letter) => {
                                    const index = letter.charCodeAt(0) - 'A'.charCodeAt(0);
                                    setCurrentLetter(index);
                                    setStartingLetter(letter);
                                }}
                            />
                        </View>
                        <View style={{ position: 'relative', right: '40%', top:'3%', marginTop: '4%' }}>
                            <View style={{ position:'relative', bottom:'5%', borderRadius:5 }}>
                                <DeviceBackButton style={{ borderRadius: 15 }} onBack={onBack} />
                            </View>
                            <View style={{ position:'relative', bottom:'56.5%', left:'115%', width:'30%', overflow:'hidden', borderRadius:5, borderWidth:1, borderColor:'black' }}>
                                <Button
                                title="Save"
                                onPress={() => {
                                saveData(classIdentifier, alliterations)
                                .then(() => {
                                console.log('List saved successfully:', alliterations); // Debug log
                                Alert.alert('Saved', 'Your alliterations list has been saved!');
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
                    <Text > Write your alliteration notes and thoughts here</Text>
                </View>
                <DeviceQuill editorContent={editorContent} setEditorContent={setEditorContent} storageKey="AlliterationNotes" />
                <View >
                    <View style={{ marginBottom: '2.5%', borderColor:'black', borderWidth:1 }}> 
                        <NotesDropdown
                            onChange={(value) => handleDropdownChange(value, "Notes")}
                            selectedOption={notesOption}
                        />
                    </View>
                    <View style={{ position:'relative', bottom:'7.5%', width: '50%', borderColor:'black', borderWidth:1, overFlow:'hidden', borderRadius:5 }}>
                                <Button
                                    onPress={handleSaveEditorContent}
                                    title="Save Notes"
                                />
                            </View>
                            <View style={{ position:'relative', bottom:'33%', left:'35%', }}>
                                <DeviceBackButton onPress={handleBackOne}/>
                            </View>
                </View>
            </View>
            </> 
            )}
        </View>
    );
}

export default ParentAlliteration;