import React from 'react';
import { RadioButton } from 'react-native-paper';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

function WitWisdomList({
    entries,
    onEditInit,
    onDelete,
    onEditSave,
    editingIndex,
    editTempEntry,
    setEditTempEntry
}) {
    return (
        <ScrollView style={styles.listContainer}>
            {entries.map((entry, index) => {
                const [firstPart, secondPart, category] = entry.text.split(' : ');

                // Determine color based on textType
                const getColorForTextType = (textType) => {
                    switch (textType) {
                        case 'Create':
                            return '#8a47ff';
                        case 'Discovered':
                            return '#2096F3';
                        case 'Common':
                            return 'green';
                        default:
                            return '#000'; // Default to black
                    }
                };

                const entryColor = getColorForTextType(entry.textType);

                return (
                    <View key={entry.id} style={styles.entryItem}>
                        {editingIndex === index ? (
                            <View style={styles.editControls}>
                                {/* First Part Input */}
                                <TextInput
                                    style={styles.input}
                                    value={editTempEntry.firstPart}
                                    onChangeText={(text) =>
                                        setEditTempEntry({ ...editTempEntry, firstPart: text })
                                    }
                                    placeholder="Enter witticism or wisdom"
                                />

                                {/* Second Part Input */}
                                <TextInput
                                    style={styles.input}
                                    value={editTempEntry.secondPart}
                                    onChangeText={(text) =>
                                        setEditTempEntry({ ...editTempEntry, secondPart: text })
                                    }
                                    placeholder="Enter author"
                                />
                               <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                {/* Category Column */}
                                <View style={{ marginHorizontal: 20 }}>
                                <Text>Category:</Text>
                                <RadioButton.Group
                                    onValueChange={(newValue) =>
                                    setEditTempEntry({ ...editTempEntry, category: newValue })
                                    }
                                    value={editTempEntry.category || category}
                                >
                                    <View style={styles.radioGroup}>
                                        <RadioButton value="Wit" />
                                            <Text>Wit</Text>
                                    </View>
                                    <View style={styles.radioGroup}>
                                        <RadioButton value="Wisdom" />
                                            <Text>Wisdom</Text>
                                    </View>
                                </RadioButton.Group>
                                </View>

                                {/* Text Column */}
                                <View style={{ marginHorizontal: 20 }}>
                                <Text>Text Type:</Text>
                                <RadioButton.Group
                                    onValueChange={(newValue) =>
                                    setEditTempEntry({ ...editTempEntry, textType: newValue })
                                }   
                                    value={editTempEntry.textType || entry.textType}
                                >
                                    <View style={styles.radioGroup}>
                                        <RadioButton value="Create" />
                                            <Text style={{ color:"#8a47ff" }}>Createe</Text>
                                    </View>
                                    <View style={styles.radioGroup}>
                                        <RadioButton value="Discovered" />
                                            <Text style={{ color: "#2096F3" }}>Discoveredd</Text>
                                    </View>
                                    <View style={styles.radioGroup}>
                                        <RadioButton value="Common" />
                                            <Text style={{ color:"green" }}>Common</Text>
                                    </View>
                                </RadioButton.Group>
                                </View>
                                </View>
                                <View style={{ overFLow:'hidden', borderColor:'black', borderWidth:1, borderRadius:5, marginBottom:'5%', alignItems: 'center'  }}>
                                    <Button title="Save" onPress={() => onEditSave(entry.id)} />
                                </View>
                            </View>
                        ) : (
                            <View style={styles.wordDisplay}>
                                {/* Display Text */}
                                <Text
                                    style={[
                                    styles.wordText,
                                    { color: getColorForTextType(entry.textType) } // Use dynamic color
                                ]}
                                >
                                    {index + 1}. "{firstPart}" {entry.category && `(${entry.category})`} - {secondPart}
                                </Text>

                                {/* Control Buttons */}
                                <View style={styles.controlButtons}>
                                <TouchableOpacity
                                    onPress={() =>
                                    onEditInit(index, firstPart, secondPart, entry.category, entry.textType)
                                }
                                    style={styles.editButton}
                                >
                                        <Text style={styles.buttonText}>Ed</Text>
                                </TouchableOpacity>
                                    <View style={styles.gap} />
                                    <TouchableOpacity
                                        onPress={() => onDelete(entry.id)}
                                        style={styles.deleteButton}
                                    >
                                        <Text style={styles.buttonText}>Del</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        padding: 10
    },
    entryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#f5f5f5'
    },
    editControls: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    input: {
        width: '100%',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    wordDisplay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    wordText: {
        flex: 1
    },
    controlButtons: {
        flexDirection: 'row'
    },
    editButton: {
        backgroundColor: '#2096F3',
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
        width: 5
    },

    gapTwo:{

        width:20
    }
});

export default WitWisdomList;