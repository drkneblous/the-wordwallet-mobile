import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';  // For radio button component

function FusionList({ fusions, onEditInit, onDelete, onEditSave, editingIndex, tempTerm, setTempTerm, selectedOption, setSelectedOption }) {

    const handleOptionChange = (option) => {
        setSelectedOption(option); // Change selected option and color of text
    };

    const getColorForOption = (option) => {
        switch (option) {
            case 'Create':
                return '#8a47ff';
            case 'Discovered':
                return '#2096F3';
            case 'Common':
                return 'green';
            default:
                return 'black'; // Default color
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={fusions}
                keyExtractor={(item) => item.id?.toString() || `${Math.random()}`} // Ensure unique keys
                renderItem={({ item, index }) => {
                    const textColor = getColorForOption(selectedOption); // Get the color for selected option
                    return (
                        <View style={styles.listItem}>
                            {editingIndex === index ? (
                                <View style={styles.editContainer}>
                                   <TextInput
                                        style={styles.input}
                                        value={tempTerm}
                                        onChangeText={setTempTerm}
                                    />
                                    <View style={styles.radioButtonContainer}>
                                        <RadioButton.Group
                                            onValueChange={handleOptionChange}
                                            value={selectedOption}
                                        >
                                            <View style={styles.radioButton}>
                                                <RadioButton value="Create" />
                                                <Text style={{ color: '#8a47ff' }}>Createe</Text>
                                            </View>
                                            <View style={styles.radioButton}>
                                                <RadioButton value="Discovered" />
                                                <Text style={{ color: '#2096F3' }}>Discoveredd</Text>
                                            </View>
                                            <View style={styles.radioButton}>
                                                <RadioButton value="Common" />
                                                <Text style={{ color: 'green' }}>Commonn</Text>
                                            </View>
                                        </RadioButton.Group>
                                    </View>
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
    radioButtonContainer: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5, 
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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