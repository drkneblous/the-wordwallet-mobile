import React from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

function AlliterationList({ alliterations, onEditInit, onDelete, onEditSave, editingIndex, tempAlliteration, setTempAlliteration }) {
    return (
        <View style={styles.alliterationList}>
            <FlatList
                data={alliterations}
                renderItem={({ item, index }) => (
                    <View style={styles.wordItem} key={item.id || index.toString()}>
                        {editingIndex === index ? (
                            <View style={styles.editControls}>
                                <TextInput
                                    value={tempAlliteration}
                                    onChangeText={text => setTempAlliteration(text)}
                                    style={styles.input}
                                />
                                <Button title="Save" onPress={() => onEditSave(index)} />
                            </View>
                        ) : (
                            <View style={styles.wordDisplay}>
                                <Text style={[styles.wordText, {color: item.style?.color || 'black'}]}>
                                    {`${index + 1}. ${item.term}`}
                                </Text>
                                <View style={styles.controlButtons}>
                                    <Button title="Ed" onPress={() => onEditInit(index, item)} color='#4A90E2'  />
                                    <View style={styles.gap} />
                                    <Button title="Del" onPress={() => onDelete(index)} color="#2096F3" />
                                </View>
                            </View>
                        )}
                    </View>
                )}
                keyExtractor={(item, index) => item.id || index.toString()}
                extraData={editingIndex} // Make sure to pass extraData to ensure updates
            />
        </View>
    );
}

const styles = StyleSheet.create({
    alliterationList: {
        flex: 1, // Use flex to ensure the list uses all available space
        padding: 20,
    },
    wordItem: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#f5f5f5',
        width: '100%',
    },
    editControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 8,
    },
    input: {
        flex: 1, // Allow input to expand and fill available space
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 8,
        marginRight: 10, // Add some space between input and button
    },
    wordDisplay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    wordText: {
        flex: 1, // Allow text to take up available space, ensuring it doesn't push buttons off screen
    },
    controlButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    gap: {
        width: 2, // Small gap between the "Edit" and "Delete" buttons
    }
});

export default AlliterationList;