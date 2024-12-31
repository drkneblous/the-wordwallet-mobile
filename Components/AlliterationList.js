import React from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

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
                                <View style={styles.buttonContainer}>
                                    <View>
                                        <TouchableOpacity onPress={() => onEditInit(index, item)} style={{ backgroundColor: '#4A90E2', padding:6, overFlow:'hidden', borderRadius:10, borderColor:'black', borderWidth:1   }}>
                                            <Text style={{fontSize:14, color:'white' }}>Ed</Text>
                                        </TouchableOpacity>                                            
                                    </View>
                                    <View style={styles.gap} />
                                    <View>
                                        <TouchableOpacity  onPress={() => onDelete(index)} style={{ backgroundColor: '#ff6347', padding:6, overFlow:'hidden', borderRadius:10, borderColor:'black', borderWidth:1 }}>
                                            <Text style={{fontSize:14, color:'white' }}>Dell</Text>
                                        </TouchableOpacity>
                                    </View>
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
        textWrap:'wrap'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    gap: {
        width: 2, // Small gap between the "Edit" and "Delete" buttons
    }
});

export default AlliterationList;