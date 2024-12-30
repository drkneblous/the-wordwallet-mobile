const deepEqual = (a, b) => {
    if (a === b) return true;
    if (typeof a !== "object" || typeof b !== "object" || a == null || b == null) {
        return false;
    }
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
            return false;
        }
    }
    return true;
};

import React, { useState, useEffect, useRef } from 'react';
import { useStorage } from './StorageContext';
import { View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import FusionDefinition from './FusionDefinition';
import FusionList from './FusionList';
import DeviceDropdown from './DeviceDropdown';
import NotesDropdown from './NotesDropdown';
import FusionInput from './FusionInput';
import DeviceBackButton from './DeviceBackButton';
import DeviceQuill from './DeviceQuill';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from './NotesContext'; // Import the context hook

function ParentFusionForms({ onBack }) {
    const [newFusion, setNewFusion] = useState('');
    const [selectedOption, setSelectedOption] = useState('Create');
    const [notesOption, setNotesOption] = useState('Null');
    const [displayMode, setDisplayMode] = useState('List');
    const [editingIndex, setEditingIndex] = useState(-1);
    const [tempTerm, setTempTerm] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const { loadStoredData, saveData } = useStorage();
    const classIdentifier = 'fusionFormsData';
    const [fusions, setFusions] = useState([]);
    const [lastSavedFusions, setLastSavedFusions] = useState([]);
    const lastSavedFusionsRef = useRef([]);
    const [notesDataLoaded, setNotesDataLoaded] = useState(false); // New state to track if notes are already loaded

    const hasFusionChanged = () => {
        if (fusions.length !== lastSavedFusionsRef.current.length) {
            return true;
        }
        for (let i = 0; i < fusions.length; i++) {
            if (!deepEqual(fusions[i], lastSavedFusionsRef.current[i])) {
                return true;
            }
        }
        return false;
    };

    useEffect(() => {
        console.log("ParentFusionForms component mounted");

        const loadFusions = async () => {
            try {
                console.log("Attempting to retrieve data from AsyncStorage...");
                const storedData = await AsyncStorage.getItem(classIdentifier);
                console.log("Data retrieved from AsyncStorage:", storedData);
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    if (Array.isArray(parsedData)) {
                        setFusions(parsedData);
                        console.log("State initialized with fusions:", parsedData);
                    } else {
                        console.error("Invalid data format retrieved:", parsedData);
                    }
                }
            } catch (error) {
                console.error("Error loading data from AsyncStorage:", error);
            }
        };

        loadFusions();

        return () => console.log("ParentFusionForms component unmounted");
    }, []);

    useEffect(() => {
        if (!fusions) {
            console.warn('Fusions is null or undefined, skipping save logic.');
            return;
        }

        if (hasFusionChanged()) {
            console.log('Detected changes in fusions. Preparing to save...');
            saveData(classIdentifier, fusions)
                .then(() => {
                    console.log('Fusions auto-saved successfully:', fusions);
                    lastSavedFusionsRef.current = [...fusions];
                    setLastSavedFusions([...fusions]);
                })
                .catch((err) => console.error('Error during auto-save:', err));
        } else {
            console.log('No changes detected in fusions, skipping save.');
        }
    }, [fusions, saveData, classIdentifier]);

    // Load editor content when displayMode changes to Notes
    useEffect(() => {
        if (displayMode === 'Notes' && !notesDataLoaded) { // Check if data is already loaded
            loadStoredData('FusionNotes')
                .then((data) => {
                    setEditorContent(data || '');
                    console.log('Data loaded for FusionNotes:', data);
                    setNotesDataLoaded(true); // Mark data as loaded
                })
                .catch((err) => console.error('Error loading FusionNotes:', err));
        }
    }, [displayMode, loadStoredData, notesDataLoaded]); // Added notesDataLoaded to prevent continuous loading

    useEffect(() => {
        console.log('Fusions state updated:', fusions);
    }, [fusions]);

    const onDelete = (id) => {
        setFusions((prevFusions) => {
            const updatedFusions = prevFusions.filter((fusion) => fusion.id !== id);
            console.log('Deleted fusion with ID:', id, 'Updated fusions:', updatedFusions);
            return updatedFusions;
        });
    };

    const onEditSave = (id) => {
        setFusions((prevFusions) => {
            const updatedFusions = prevFusions.map((fusion) =>
                fusion.id === id ? { ...fusion, text: tempTerm } : fusion
            );
            console.log('Saved edits for fusion with ID:', id, 'Updated fusions:', updatedFusions);
            return updatedFusions;
        });
        setEditingIndex(-1);
        setTempTerm('');
    };

    const handleAddFusion = () => {
        if (newFusion.trim()) {
            const newFusionEntry = {
                id: Date.now().toString(),
                text: newFusion,
                style: {
                    color:
                        selectedOption === 'Common'
                            ? '#ff6347'
                            : selectedOption === 'Discovered'
                            ? '#2096F3'
                            : '#8a47ff',
                },
                category: selectedOption,
                type: 'fusion',
            };
            setFusions((prevFusions) => {
                const updatedFusions = [...prevFusions, newFusionEntry];
                console.log('Added new fusion:', newFusionEntry, 'Updated fusions:', updatedFusions);
                return updatedFusions;
            });
            setNewFusion('');
        }
    };

    const handleStateChange = () => {
        console.log('Switching to Notes mode...');

        // Resetting necessary states when entering Notes
        setNotesOption('Null'); // Or your desired default
        setDisplayMode('Notes');
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

    const handleBackOne = () => {
        console.log('Back button pressed. Current mode:', displayMode);
        if (displayMode !== 'List') {
            setDisplayMode('List');
            console.log('Returning to List mode.');
        } else {
            console.log('Already in List mode, no action required.');
        }
    };

    const handleSaveEditorContent = () => {
        console.log('Attempting to save editor content:', editorContent);
        if (!editorContent.trim()) {
            Alert.alert('Warning', 'Editor content is empty!');
            return;
        }
        saveData('FusionNotes', editorContent)
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
                        <FusionDefinition />
                    </View>
                    <View
                        style={{
                            width: '105%',
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: 'black',
                            height: '69%',
                            maxHeight: 600,
                            position: 'relative',
                            right: '2.5%',
                            bottom: '4.5%',
                        }}
                    >
                        <FusionList 
                            fusions={fusions}
                            onEditInit={(index, term) => {
                                setEditingIndex(index);
                                setTempTerm(term);
                                console.log('Editing fusion at index:', index, 'Term:', term);
                            }}
                            onDelete={onDelete}
                            onEditSave={onEditSave}
                            editingIndex={editingIndex}
                            tempTerm={tempTerm}
                            setTempTerm={setTempTerm}
                        />
                    </View>

                    <View style={{ position: 'relative', marginTop: '1.5%', bottom: '5%' }}>
                        <View style={{ position: 'relative', height: 65, width: '50%' }}>
                        <DeviceDropdown
                            onChange={(value) => handleDropdownChange(value, "Device")}
                            selectedOption={selectedOption}
                        />
                        </View>
                        <View style={{ width:'35%', borderRadius:'50%', left:'32.5%', top:'24%' }}>
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
                    <View style={{ bottom:'13%' }}>
                        <View style={{ position: 'relative', bottom: '13%' }}> 
                            <FusionInput 
                                newFusion={newFusion} 
                                setNewFusion={setNewFusion} 
                                onAdd={handleAddFusion}
                            />
                        </View>

                        <View style={{ position: 'relative', right: '40%', top: '18%', bottom: '6%', marginTop: '4%' }}>
                            <View style={{ position:'relative', bottom:'61%', borderRadius:5, left:'2%' }}>
                                <DeviceBackButton onBack={onBack} />
                            </View>
                            <View style={{ position:'relative', bottom:'111.5%', left:'113%', width:'30%', overflow:'hidden', borderRadius:5, borderWidth:1, borderColor:'black' }}>
                            <Button
                                title="Save"
                                onPress={() => {
                                    if (!fusions || fusions.length === 0) {
                                    Alert.alert('No Fusions', 'There are no fusions to save!');
                                    return;
                                    }

                                saveData(classIdentifier, fusions)
                                .then(() => {
                                Alert.alert('Saved', 'Your fusion forms list has been saved!');
                                setLastSavedFusions([...fusions]);
                                })
                                .catch(() => {
                                Alert.alert('Error', 'An error occurred while saving. Please try again.');
                                });
                                }}
                                color="#2096F3"
                            />
                            </View>
                        </View>
                    </View>
                    </View>
                </>
            ) : (
                <>
                <View style={{ height: '104%' }}>
                    <View style={{ position: 'relative', padding: '2.5%', fontSize: 18, marginBottom: 10, backgroundColor: 'white', borderRadius: 15, bottom: '1.75%' }} >
                        <Text > Write your fusion form notes and thoughts here</Text>
                    </View>
                    <DeviceQuill
                        editorContent={editorContent}
                        setEditorContent={(content) => {
                            if (content !== editorContent) {
                                console.log('DeviceQuill updated editor content:', content);
                                setEditorContent(content);
                            }
                        }}
                        storageKey="FusionNotes"
                    />
                    <View style={{ marginBottom: '2.5%' }}> 
                        <NotesDropdown
                            onChange={(value) => handleDropdownChange(value, "Notes")}
                            selectedOption={notesOption}
                        />
                    </View>
                    <View style={{ position:'relative', bottom:'1.5%', width: '50%', borderRadius: 50 }}>
                        <Button
                            onPress={handleSaveEditorContent}
                            title="Save Notes"
                        />
                    </View>
                    <View style={{ position:'relative', left:'35%', bottom: '7.25%' }}>
                        <DeviceBackButton onPress={handleBackOne}/>
                    </View>
                </View>
                </> 
            )}
        </View>
    );
}

export default ParentFusionForms;