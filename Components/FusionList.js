import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';
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
                                    <TextInput
                                        style={styles.input}
                                        value={tempTerm}
                                        onChangeText={setTempTerm}
                                    />
                                <RadioButton.Group
                                        onValueChange={(newValue) =>
                                        handleTextTypeChange(newValue) // Ensure this handles the selected type update correctly
                                    }
                                        value={selectedTextType} // This should correspond to the state that holds the selected type
                                    >
                                    <View style={styles.radioGroup}>
                                        <RadioButton value="Create" />
                                            <Text style={[styles.radioLabel, { color: "#8a47ff" }]}>Createe</Text>
                                    </View>
                                    <View style={styles.radioGroup}>
                                        <RadioButton value="Discovered" />
                                            <Text style={[styles.radioLabel, { color: "#2096F3" }]}>Discoveredd</Text>
                                    </View>
                                    <View style={styles.radioGroup}>
                                         <RadioButton value="Common" />
                                            <Text style={[styles.radioLabel, { color: "green" }]}>Common</Text>
                                    </View>
                                </RadioButton.Group>
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
        flexDirection: 'row', // Align the buttons horizontally
        justifyContent: 'space-between', // Space out the buttons
        marginTop: 10, // Space above the buttons
    },
    editContainer: {
        flexDirection: 'column', // Stack the elements vertically (TextInput above Radio buttons)
        alignItems: 'flex-start', // Align items to the start
        justifyContent: 'flex-start', // Align to the top
        marginBottom: 15, // Spacing at the bottom of the container
    },
    input: {
        flex: 1, // Allow text input to take the remaining space
        marginBottom: 10, // Space between the input and radio buttons
        height: 40, // Height of the input field
        borderColor: '#ccc', // Border color for the input
        borderWidth: 1, // Border width
        borderRadius: 5, // Rounded corners for the input
        paddingLeft: 10, // Padding inside the input
        width:'100%'
    },

    radioGroup: {
        flexDirection: 'row', // Keep radio buttons aligned horizontally
        alignItems: 'center', // Vertically center the radio buttons and label
        marginRight: 10, // Space between radio buttons
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
        marginLeft: 5, // Space between radio button and label
        fontSize: 14, // Font size for radio button label
        whiteSpace: 'nowrap', // Prevent text from wrapping
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