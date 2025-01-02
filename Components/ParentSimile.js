import React, { useState, useEffect } from 'react';
import { useStorage } from './StorageContext';
import { View, Text, Button, Alert } from 'react-native';
import SimileDefinition from './SimileDefinition';
import SimileList from './SimileList';
import SimileInput from './SimileInput';
import DeviceDropdown from './DeviceDropdown';
import DeviceBackButton from './DeviceBackButton';
import DeviceQuill from './DeviceQuill'; 

function ParentSimile({ onBack }) {
    const [newFusion, setNewFusion] = useState('');
    const [selectedOption, setSelectedOption] = useState('Create');
    const [displayMode, setDisplayMode] = useState('List');
    const [editingIndex, setEditingIndex] = useState(-1);
    const [tempTerm, setTempTerm] = useState('');
    const [editorContent, setEditorContent] = useState(''); // Rich editor content for Fusion Forms
    const { loadStoredData, saveData } = useStorage(); // Updated destructure for storage
    const classIdentifier = 'simileFormsData'; // Unique identifier for this component
    const [lastSavedAllusions, setLastSavedAllusions] = useState(null); // Track the last saved state
    const [fusions, setFusions] = useState([]);

    useEffect(() => {
        loadStoredData(classIdentifier).then((data) => {
            setFusions(data); // Initialize fusions state
        });
    }, [classIdentifier]);

    useEffect(() => {
        if (fusions.length > 0 && JSON.stringify(fusions) !== JSON.stringify(lastSavedAllusions)) {
            saveData(classIdentifier, fusions); // Save only if fusions have changed
            setLastSavedAllusions(fusions); // Update the last saved state
        }
    }, [fusions, saveData, classIdentifier, lastSavedAllusions]);

    const onDelete = (id) => {
        setFusions((prevFusions) => prevFusions.filter((fusion) => fusion.id !== id));
    };

    const onEditSave = (id) => {
        setFusions((prevFusions) =>
            prevFusions.map((fusion) =>
                fusion.id === id ? { ...fusion, text: tempTerm } : fusion
            )
        );
        setEditingIndex(-1);
        setTempTerm('');
    };

    const handleAddFusion = () => {
        if (newFusion.trim()) {
            const newFusionEntry = { 
                id: Date.now().toString(),
                text: newFusion,  // Ensure 'text' field is correctly set
                style: { color: selectedOption === 'Common' ? 'green' : selectedOption === 'Discovered' ? "#2096F3" : '#8a47ff' },
                category: selectedOption,
                type: 'fusion' 
            };
            setFusions((prevFusions) => [...prevFusions, newFusionEntry]);
            setNewFusion('');
        }
    };

    const handleDropdownChange = (value) => {
        setSelectedOption(value);
        setDisplayMode(value === 'Notes' ? 'Notes' : 'List');
    };

    const handleBackOne = () => {
        setDisplayMode('List'); // Resets to device view
    };



    return (
        <View style={{ padding: 20, width: '110%', height: '100%' }}>
        {displayMode === 'List' ? (
            <>
            <View style={{ postion: 'relative', bottom: '3.75%'}}>
                <SimileDefinition />
            </View>
                <View style={{width: '105%', backgroundColor: 'white', borderWidth: 1, borderColor: 'black',  height:'69%', maxHeight:600, position: 'relative', right:'2.5%', bottom: '4.5%' }} >
                    <SimileList 
                        fusions={fusions} 
                        onEditInit={(index, term) => {
                            setEditingIndex(index);
                            setTempTerm(term);
                        }}
                        onDelete={onDelete}
                        onEditSave={onEditSave}
                        editingIndex={editingIndex}
                        tempTerm={tempTerm}
                        setTempTerm={setTempTerm}
                    />
                </View>
              
            <View style={{ position: 'relative', marginTop: '1.5%', bottom: '5%' }}>
                <View style={{ position:'relative', height: 65, width: '50%' }}>
                    <DeviceDropdown onChange={handleDropdownChange} selectedOption={selectedOption} />
                </View>
                <View style={{ position:'relative', bottom: '3.5%' }}> 
                    <SimileInput 
                        newFusion={newFusion} 
                        setNewFusion={setNewFusion} 
                        onAdd={handleAddFusion}
                    />
                </View>
               
                <View style={{ position: 'relative', right: '40%', top: '18%', bottom: '5%', marginTop: '4%' }}>
                            <View style={{ position:'relative', bottom:'55%', borderRadius:5, left:'2%' }}>
                                <DeviceBackButton style={{ borderRadius: 15 }} onBack={onBack} />
                            </View>
                            <View style={{ position:'relative', bottom:'105.5%', left:'113%', width:'30%', overflow:'hidden', borderRadius:5, borderWidth:1, borderColor:'black' }}>
                                <Button
                                title="Save"
                                onPress={() => {
                                saveData(classIdentifier, fusions)
                                .then(() => {
                                console.log('List saved successfully:', fusions); // Debug log
                                Alert.alert('Saved', 'Your similes list has been saved!');
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
                    <Text > Write your fusion form notes or thoughts here</Text>
                </View>
                <DeviceQuill editorContent={editorContent} setEditorContent={setEditorContent} storageKey="SimileNotes"  />
                <View >
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

export default ParentSimile;