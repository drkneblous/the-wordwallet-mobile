import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

function FusionList({ fusions, onEditInit, onDelete, onEditSave, editingIndex, tempTerm, setTempTerm, onTextTypeChange }) {
    const [selectedTextType, setSelectedTextType] = useState("Create"); // Default Text Type

    const handleTextTypeChange = (newTextType) => {
        setSelectedTextType(newTextType); // Update the selected Text Type for the editing fusion
        onTextTypeChange(newTextType); // Propagate the change to the parent component
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={fusions}
                keyExtractor={(item) => item.id?.toString() || `${Math.random()}`} // Ensure unique keys
                renderItem={({ item, index }) => {
                    const textColor = item.style?.color || 'black'; // Ensure that the color is applied correctly
                    return (
                        <View key={item.id} style={styles.listItem}>
                            {editingIndex === index ? (
                                <View style={styles.editContainer}>
                                    {/* Radio buttons for Text Type selection */}
                                    <View style={styles.radioGroup}>
                                        {["Create", "Discovered", "Common"].map((type) => (
                                            <View key={type} style={styles.radioContainer}>
                                                <TouchableOpacity
                                                    style={styles.radioButton}
                                                    onPress={() => handleTextTypeChange(type)}
                                                >
                                                    <View style={[styles.radioInnerCircle, selectedTextType === type && styles.selectedRadio]} />
                                                </TouchableOpacity>
                                                <Text style={styles.radioLabel}>{type}</Text>
                                            </View>
                                        ))}
                                    </View>
                                    
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
                                        <TouchableOpacity onPress={() => onEditInit(index, item.text)} style={styles.editButton}>
                                            <Text style={styles.buttonText}>Ed</Text>
                                        </TouchableOpacity>
                                        <View style={styles.gap} />
                                        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
                                            <Text style={styles.buttonText}>Dell</Text>
                                        </TouchableOpacity>
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
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#ccc',
        marginRight: 5,
    },
    radioInnerCircle: {
        height: 12,
        width: 12,
        borderRadius: 50,
        backgroundColor: '#ccc',
        margin: 3,
    },
    selectedRadio: {
        backgroundColor: '#2096F3',
    },
    radioLabel: {
        fontSize: 14,
    },
    editButton: {
        backgroundColor: "#2096F3",
        padding: 6,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1
    },
    deleteButton: {
        backgroundColor: '#ff6347',
        padding: 6,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1
    },
    buttonText: {
        fontSize: 14,
        color: 'white'
    },
    gap: {
        width: 5, // Small gap between the "Edit" and "Delete" buttons
    },
});

export default FusionList;