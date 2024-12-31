import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

function WordList({ words, onEditInit, onDelete, onEditSave, editingIndex, tempTerm, setTempTerm, tempDefinition, setTempDefinition }) {
    const renderItem = (item, index) => (
        <View style={styles.wordItem} key={item.id || index}>
            {editingIndex === index ? (
                <View style={styles.editControls}>
                    <TextInput
                        style={styles.input}
                        value={tempTerm}
                        onChangeText={text => setTempTerm(text)}
                        placeholder="Edit term"
                    />
                    <TextInput
                        style={styles.input}
                        value={tempDefinition}
                        onChangeText={text => setTempDefinition(text)}
                        placeholder="Edit definition"
                    />
                    <View style={styles.saveButtonContainer}>
                        <Button title="Save" onPress={() => onEditSave(index)} />
                    </View>
                </View>
            ) : (
                <View style={styles.wordDisplay}>
                    <Text style={styles.wordText}>
                        {index + 1}.{' '}
                        <Text style={{ color: item.isFromDictionary ? '#8a47ff'  : item.termStyle?.color }}>
                            {item.term}
                        </Text>: <Text style={{ fontStyle: 'italic', color: 'black' }}>{item.definition}</Text>
                    </Text>
                    <View style={styles.controlButtons}>
                        <View style={styles.controlButtonsEdit}>
                            <Button color="#2096F3"  title="Ed" onPress={() => onEditInit(index, item.term, item.definition, item.id)} />
                        </View>
                        <View style={styles.controlButtonsDelete}>
                            <Button color='#ff6347' title="Del" onPress={() => onDelete(index)} />
                        </View>
                    </View>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.wordListContainer}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {words.map((item, index) => renderItem(item, index))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wordListContainer: {
        width: '110%',
        height:'35%',
        maxHeight: 290, // Maximum height for the list
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black',
        overflow: 'hidden', // Prevents content from spilling out
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 10, // Extra space at the bottom
    },
    wordItem: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    editControls: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        gap: 8,
    },
    input: {
        width: '100%',
        borderRadius: 5,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 8,
    },
    saveButtonContainer: {
        alignSelf: 'flex-end',
    },
    wordDisplay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    wordText: {
        flex: 1,
        marginRight: 10,
    },
    controlButtons: {
        flexDirection: 'row',
        gap: 4,
    },
    controlButtonsEdit: {
        overflow: 'hidden',
        borderRadius: 10,
        borderColor:'black',
        borderWidth:1
    },
    controlButtonsDelete: {
        overflow: 'hidden',
        borderRadius: 10,
        borderColor:'black',
        borderWidth:1
    },
});

export default WordList;