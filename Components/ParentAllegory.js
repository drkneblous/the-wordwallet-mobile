import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import AllegoryDefinition from './AllegoryDefinition';
import DeviceBackButton from './DeviceBackButton';
import DeviceQuill from './DeviceQuill';

function ParentAllegory({ onBack }) {
    const [editorContent, setEditorContent] = useState(''); // Rich editor content for Allegory Notes
    const storageKey = 'AllegoryNotes'; // Unique key for Allegory Notes

    return (
        <>
            <View style={{ position: 'relative', padding: 20, width: '110%', height: '100%' }}>
                <View style={{ position: 'relative', bottom: '3.75%' }}>
                    <AllegoryDefinition />
                </View>
                <View style={{ position: 'relative', bottom: '2.5%', height: '100%' }}>
                    <View style={{ height: '85.5%' }}>
                        <DeviceQuill
                            editorContent={editorContent}
                            setEditorContent={setEditorContent}
                            storageKey={storageKey}
                            style={{
                                height: '100%',
                                padding: 0, // Remove any default padding
                                margin: 0, // Remove any default margin
                            }}
                            contentStyle={{
                                textAlign: 'left', // Aligns text to the left
                                padding: 0, // Ensures no space at the top
                                margin: 0, // Prevents any margin inside the editor
                                justifyContent: 'flex-start', // Ensures content starts at the top
                                alignItems: 'flex-start', // Aligns content to the top-left
                            }}
                        />
                    </View>
                    <View style={{ position: 'relative', top: '1%', marginTop: '2%', width: '50%' }}>
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
                    <View style={{ position: 'relative', bottom: '5%', left: '20%' }}>
                        <DeviceBackButton onBack={onBack} />
                    </View>
                </View>
            </View>
        </>
    );
}

export default ParentAllegory;