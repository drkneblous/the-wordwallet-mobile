import React from 'react';
import { RadioButton } from 'react-native-paper'
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

function WitWisdomList({ entries, onEditInit, onDelete, onEditSave, editingIndex, editTempEntry, setEditTempEntry }) {
    return (
        <ScrollView style={styles.listContainer}>
           {entries.map((entry, index) => {
    const [firstPart, secondPart, category] = entry.text.split(' : ');

    return (
        <View key={entry.id} style={styles.entryItem}>
            {editingIndex === index ? (
                <View style={styles.editControls}>
                    <TextInput
                        style={styles.input}
                        value={editTempEntry.firstPart}
                        onChangeText={(text) => setEditTempEntry({ ...editTempEntry, firstPart: text })}
                        placeholder="Enter witticism or wisdom"
                    />
                    <TextInput
                        style={styles.input}
                        value={editTempEntry.secondPart}
                        onChangeText={(text) => setEditTempEntry({ ...editTempEntry, secondPart: text })}
                        placeholder="Enter author"
                    />
                    <RadioButton.Group onValueChange={newValue => setEditTempEntry({...editTempEntry, category: newValue})} value={editTempEntry.category || category}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton color='blue' value="Technical" />
                            <Text>Technicall</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton color='green' value="Scientific" />
                            <Text>Scientificc</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton color='blue' value="Social" />
                            <Text>Sociall</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton color='green' value="Miscellaneous" />
                            <Text>Misc</Text>
                        </View>
                    </RadioButton.Group>
                    <Button title="Save" onPress={() => onEditSave(entry.id)} />
                </View>
            ) : (
                <View style={styles.wordDisplay}>
                    <Text style={[styles.wordText, {color: entry.style.color}]}>
                        {index + 1}. {firstPart} : {secondPart} {entry.category && `(${entry.category})`}
                    </Text>
                    <View style={styles.controlButtons}>
                        <Button title="Ed" onPress={() => onEditInit(index, firstPart, secondPart, category)} color="#2096F3"  />
                        <View style={styles.gap} />
                        <Button title="Del" onPress={() => onDelete(entry.id)} color='#ff6347' />
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
        padding: 10,
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
        alignItems: 'flex-start',
    },
    input: {
        width: '100%',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
    wordDisplay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wordText: {
        flex: 1,
    },
    controlButtons: {
        flexDirection: 'row',
    },

    gap: {
        width: 2, // Small gap between the "Edit" and "Delete" buttons
    }
});

export default WitWisdomList;