import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { RichToolbar, RichEditor, actions } from 'react-native-pell-rich-editor';
import { useStorage } from './StorageContext';

const DeviceQuill = ({ editorContent, setEditorContent, storageKey }) => {
    const { loadStoredData, saveData } = useStorage();
    const richTextRef = useRef(null); // Ref for the RichEditor
    const lastSavedRef = useRef(''); // Tracks the last saved content to prevent redundant saves
    const isInitializingRef = useRef(true); // Tracks initialization phase

    // Load content from AsyncStorage on mount
    useEffect(() => {
        if (isInitializingRef.current) {
            loadStoredData(storageKey).then((data) => {
                console.log(`Data loaded for ${storageKey}:`, data);
                const initialContent = data || '<p><br></p>'; // Default to empty editor content
                lastSavedRef.current = initialContent;
                setEditorContent(initialContent);

                if (richTextRef.current) {
                    richTextRef.current.setContentHTML(initialContent); // Initialize the editor
                }

                isInitializingRef.current = false; // Mark initialization complete
            });
        }
    }, [loadStoredData, setEditorContent, storageKey]);

    // Save content to AsyncStorage when it changes
    const handleContentChange = (content) => {
        if (isInitializingRef.current) return; // Skip saving during initialization
        if (content === lastSavedRef.current) return; // Prevent redundant saves

        console.log(`Content changed for ${storageKey}:`, content);
        setEditorContent(content);

        saveData(storageKey, content)
            .then(() => {
                console.log(`Content saved to AsyncStorage for ${storageKey}:`, content);
                lastSavedRef.current = content; // Update last saved reference
            })
            .catch((err) => console.error('Failed to save data:', err));
    };

    // Manual save handler
    const handleSavePress = () => {
        if (!editorContent.trim() || editorContent === '<p><br></p>') {
            Alert.alert('Warning', 'Editor content is empty!');
            return;
        }

        saveData(storageKey, editorContent)
            .then(() => {
                console.log(`Manual save successful for ${storageKey}:`, editorContent);
                Alert.alert('Saved', 'Your notes have been saved!');
            })
            .catch((err) => console.error('Failed to manually save data:', err));
    };

    return (
        <View style={styles.container}>
            {/* RichEditor */}
            <RichEditor
                ref={richTextRef}
                style={styles.editor}
                placeholder="Start typing here..."
                initialContentHTML={editorContent}
                onChange={handleContentChange}
            />

            {/* RichToolbar */}
            <RichToolbar
                editor={richTextRef}
                style={styles.toolbar}
                actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.setUnderline,
                    actions.insertOrderedList,
                    actions.insertBulletsList,
                    actions.alignLeft,
                    actions.alignCenter,
                    actions.alignRight,
                    actions.undo,
                    actions.redo,
                ]}
                iconTint="#000"
                selectedIconTint="#2096F3"
                disabledIconTint="#bfbfbf"
            />
            
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        height: '75%',
        maxHeight: 900
    },
    editor: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10, // Space for the toolbar
    },
    toolbar: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#f9f9f9',
        paddingVertical: 5,
    },
});

export default DeviceQuill;