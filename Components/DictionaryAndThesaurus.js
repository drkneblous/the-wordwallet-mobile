import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

function DictionaryAndThesaurus({ onAddWord }) {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [synonyms, setSynonyms] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (text) => {
    setWord(text);
  };

  const handleLookup = async () => {
    try {
        const defResponse = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=cb3eb3d3-8f9e-4e34-aba0-37f7c0b79b25`);
        const defData = defResponse.data[0];
        setDefinition(defData.shortdef[0]);
        
        const synResponse = await axios.get(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=70214f0d-9f71-4e02-9195-c560a2227a78`);
        const synData = synResponse.data[0];
        if (synData.meta && synData.meta.syns) {
            setSynonyms(synData.meta.syns[0]);
            console.log("Synonyms received:", synData.meta.syns[0]); // Debugging line
        } else {
            setSynonyms([]);
        }
        setError(null);
    } catch (error) {
        console.error('Error fetching data:', error);
        setError('No definition found. Please ensure correct spelling or try a different word.');
        setDefinition('');
        setSynonyms([]);
    }
};

  const handleClear = () => {
    setWord('');
    setDefinition('');
    setSynonyms([]);
    setError(null);
  };

  const handleAddWord = (term, definition) => {
    if (onAddWord) {
        onAddWord({
            term,
            definition,
            isFromDictionary: true,
            type: 'word'
        });
        Alert.alert('Success', `${term} has been successfully added to your Lexicon!`);
    } else {
        console.error("onAddWord function not passed correctly.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        value={word} 
        onChangeText={handleInputChange} 
        placeholder="Enter a word" 
        style={styles.input} 
      />
      <View style={styles.buttonContainer}>
        <View style={{overflow:'hidden', borderRadius:10}}>
            <Button title="Define" onPress={handleLookup} color='#4A90E2' />
        </View>
        <View style={{overflow:'hidden', borderRadius:10}}>
            <Button title="Clear" onPress={handleClear} color='#ff6347' />
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      {definition && (
        <View style={{backgroundColor: '#3827b3'}}>
          <Text style={styles.definition}><Text style={styles.strong}>Definition:</Text> {definition}</Text>
          <View style={{ width:'65%', overflow:'hidden', borderRadius:10, marginTop:'5%', marginBottom:'6.5%' }}>
            <Button title="Add to Lexicon" onPress={() => handleAddWord(word, definition)} color='#4A90E2' />
          </View>
        </View>
      )}
      {synonyms.length > 0 && (
    <FlatList
    data={synonyms}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item, index }) => (
      <View style={styles.synonymItem}>
        <Text style={styles.synonymText}>{index + 1}. {item}</Text>
        <Button
          title="Add"
          onPress={() => handleAddWord(item, definition)}
          color='#4A90E2'
          style={styles.addButton}
        />
      </View>
    )}
    style={styles.synonymsContainer}
  />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#3827b3',
      padding: 20,
      overflow:'hidden',
      borderRadius:10,
      borderWidth: 1,
      borderColor:'silver'
    },
    input: {
      width: '100%',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: 'white',
      color: 'black',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    error: {
      color: 'red',
      marginVertical: 10,
    },
    definition: {
      color: 'silver',
      fontStyle: 'italic',
      marginTop:'8%'
    },
    strong: {
      fontWeight: 'bold'
    },
    synonymsContainer: {
      width: '100%', // Ensure the container uses full width available
      minHeight: 100, // Define a minimum height to ensure it's visible
      maxHeight: 150, // Keep the maximum height to limit how much space it can take
      overflow: 'auto',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 4,
      backgroundColor: 'white', // Ensure the background is white for consistency
      marginTop:'5% '
    },
    synonymItem: {
        marginBottom: '1%',         // Gives some space between items
        flexDirection: 'row',      // Layout children (text and button) in a horizontal row
        justifyContent: 'space-between', // Space out children to use the full width
      },

      synonymText: {
        flex: 1,                     // Allows the text to expand and fill the space
        color: 'black',              // Ensures text is visible against a light background
        marginRight: 10,             // Adds some space between the text and the button
      },
      
      addButton: {
        overflow:'hidden',
        borderRadius:10

      }
  });

export default DictionaryAndThesaurus;