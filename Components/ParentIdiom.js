import React, { useState, useEffect } from 'react';
import { useStorage } from './StorageContext';
import IdiomDefinition from './IdiomDefinition'
import IdiomList from './IdiomList'
import IdiomInput from './IdiomInput'
import DeviceBackButton from './DeviceBackButton'
import DeviceDropdown from './DeviceDropdown'
import DeviceQuill from './DeviceQuill'
import { View, Text, Button, Alert } from 'react-native';

function ParentIdiom({ onBack }) {
    const [newEntry, setNewEntry] = useState({ firstPart: '', secondPart: '' });
    const [selectedOption, setSelectedOption] = useState('Create');
    const [displayMode, setDisplayMode] = useState('List');
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editorContent, setEditorContent] =useState('')
    const [tempEntry, setTempEntry] = useState({ firstPart: '', secondPart: '' });
    const { loadStoredData, saveData } = useStorage(); // Updated destructure for storage
    const [entries, setEntries] = useState([]); // Initialize with empty array
    const [lastSavedEntries, setLastSavedEntries] = useState(null); // Track the last saved state 
    const classIdentifier = 'idiomWords'; // Unique identifier for this component
    
    useEffect(() => {
        loadStoredData(classIdentifier).then((data) => {
            setEntries(data); // Load Wit & Wisdom entries
        });
    }, [classIdentifier]);

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
                text: `${newEntry.firstPart} : ${newEntry.secondPart}`,
                style: { color: selectedOption === 'Common' ? '#ff6347' : selectedOption === 'Discovered' ? "#2096F3": '#8a47ff' },
                category: selectedOption,
            };
            setEntries([...entries, newEntryObject]);
            setNewEntry({ firstPart: '', secondPart: '' });
        }
    };

    const handleDelete = (id) => {
        setEntries(entries.filter(entry => entry.id !== id));
    };

    const handleEditSave = (id) => {
        const updatedEntries = entries.map(entry => {
            if (entry.id === id) {
                return { ...entry, text: `${tempEntry.firstPart} : ${tempEntry.secondPart}` };
            }
            return entry;
        });
        setEntries(updatedEntries);
        setEditingIndex(-1);
        setTempEntry({ firstPart: '', secondPart: '' });
    };


    const handleDropdownChange = (value) => {
        setSelectedOption(value);
        setDisplayMode(value === 'Notes' ? 'Notes' : 'List');
    };

    const onEditInit = (index, firstPart, secondPart) => {
        setEditingIndex(index);
        setTempEntry({ firstPart, secondPart: secondPart.replace(/^: /, '') }); // Remove colon and space when starting to edit
    };
    
    const handleBackOne = () => {
        setDisplayMode('List'); // Resets to device view
    };


    return (
        <View style={{ padding: 20, width: '110%', height: '100%' }}>            
            {displayMode === 'List' ? (
                <>
                <View style={{ postion: 'relative', bottom: '3.75%'}}>
                    <IdiomDefinition />
                </View>
                <View style={{width: '105%', backgroundColor: 'white', borderWidth: 1, borderColor: 'black',  height:'53%', maxHeight:500, position: 'relative', right:'2.5%', bottom: '4.5%' }} >
                    <IdiomList 
                    entries={entries}
                    onEditInit={onEditInit}
                    onDelete={handleDelete}
                    onEditSave={handleEditSave}
                    editingIndex={editingIndex}
                    editTempEntry={tempEntry} // Ensure this is the prop you use
                    setEditTempEntry={setTempEntry}
                    />
                </View>
            <View style={{ position: 'relative', marginTop: '1.5%', bottom: '5%' }}>
                <View style={{ position:'relative', height: 65, width: '50%' }}>
                    <DeviceDropdown selectedOption={selectedOption} onChange={handleDropdownChange} />
                </View>
                <View style={{ marginTop: '4%', borderColor:'black' }}>
                    <IdiomInput 
                        entryPair={newEntry} // Changed from entryPair to newEntry
                        setNewEntry={setNewEntry} // Correct function name to match state handler
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
                                Alert.alert('Saved', 'Your idioms list has been saved!');
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
                    <Text>Write down your idiom notes and thoughts here</Text>
                </View>
                    <DeviceQuill editorContent={editorContent} setEditorContent={setEditorContent} storageKey="IdiomNotes" />
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

export default ParentIdiom;