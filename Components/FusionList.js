import React from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

function FusionList({ fusions, onEditInit, onDelete, onEditSave, editingIndex, tempTerm, setTempTerm }) {
    return (
        <View style={styles.container}>
            <FlatList
                data={fusions}
                keyExtractor={(item) => item.id?.toString() || `${Math.random()}`} // Ensure unique keys
                renderItem={({ item, index }) => {
                    const textColor = item.style?.color || 'black'; // Ensure text color is set
                    return (
                        <View style={styles.listItem}>
                            {editingIndex === index ? (
                                <View style={styles.editContainer}>
                                    <TextInput
                                        style={styles.input}
                                        value={tempTerm}
                                        onChangeText={setTempTerm}
                                    />
                                    <Button title="Save" onPress={() => onEditSave(item.id)} />
                                </View>
                            ) : (
                                <View style={styles.contentContainer}>
                                    <Text style={[styles.itemText, { color: textColor }]}>
                                        {index + 1}. {item.text || 'No text available'}
                                    </Text>
                                    <View style={styles.buttonContainer}>
                                        <Button
                                            title="Ed"
                                            onPress={() => onEditInit(index, item.text)}
                                            color="#2096F3" // Smaller blue button for Edit
                                        />
                                        <View style={styles.gap} />
                                        <Button
                                            title="Del"
                                            onPress={() => onDelete(item.id)}
                                            color="#ff6347" // Smaller red button for Delete
                                        />
                                    </View>
                                </View>
                            )}
                        </View>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    listItem: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#f5f5f5',
        flexDirection: 'column',
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
        flex: 1, // Allow text to take up available space
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
    },
    gap: {
        width: 2, // Small gap between the "Edit" and "Delete" buttons
    },
    emptyComponent: {
        marginTop: 20,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    },
});

export default FusionList;