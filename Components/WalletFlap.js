import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Button, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useStorage } from './StorageContext';
import TransLang from './TransLang';
import DictionaryAndThesaurus from './DictionaryAndThesaurus';
import Card from './Card';
import WordList from './WordList';
import InputArea from './InputArea';
import DeviceArea from './DeviceArea';
import ParentFusionForms from './ParentFusionForms';
import ParentWitWisdom from './ParentWitWisdom';
import ParentNicknames from './ParentNicknames';
import ParentTerms from './ParentTerms';  
import ParentAlliteration from './ParentAlliteration';
/*import ParentAllusion from './ParentAllusion';
import ParentAllegory from './ParentAllegory';
import ParentEuphemism from './ParentEuphemism';
import ParentHyperbole from './ParentHyperbole';
import ParentIdiom from './ParentIdiom';
import ParentImagery from './ParentImagery';
import ParentIrony from './ParentIrony';
import ParentJuxtaposition from './ParentJuxtaposition';
import ParentMetaphor from './ParentMetaphor';
import ParentOnomatopoeia from './ParentOnomatopoeia';
import ParentOxymoron from './ParentOxymoron';
import ParentPersonification from './ParentPersonification';
import ParentSimile from './ParentSimile';
import ParentNicknames from './ParentNicknames';
import ParentTerms from './ParentTerms';  */

function WalletFlap() {
  const { loadStoredData, saveData } = useStorage(); // Updated destructure for storage methods
  const classIdentifier = 'walletFlapWords'; // Unique identifier for this component

  const [words, setWords] = useState([]);
  const [selectedCard, setSelectedCard] = useState('Lexicon');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [tempTerm, setTempTerm] = useState('');
  const [tempDefinition, setTempDefinition] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');

  useEffect(() => {
      loadStoredData(classIdentifier).then((data) => {
          setWords(data); // Load WalletFlap-specific words
      });
  }, [classIdentifier]); // Load data when component mounts

  const [lastSavedWords, setLastSavedWords] = useState(null); // Track the last saved state

  useEffect(() => {
      if (words.length > 0 && JSON.stringify(words) !== JSON.stringify(lastSavedWords)) {
          saveData(classIdentifier, words); // Save only if words have changed
          setLastSavedWords(words); // Update the last saved state
      }
  }, [words, saveData, classIdentifier, lastSavedWords]); // Watch for changes

  const handleCardSelect = (card) => {
      setSelectedCard(card);
      setSelectedDevice(''); // Reset device selection when switching cards
      if (card !== selectedCard) {
          setSelectedCard(card);
      } else {
          setSelectedCard('Lexicon');
      }
  };

  const onChangeDevice = (device) => {
      setSelectedDevice(device);
      if (device) {
          setSelectedCard('Device');
      }
  };

  const addStyledWord = (newWord) => {
      const termStyle = { color: selectedCard === 'Lexicon' ? "#2096F3"  : '#8a47ff' };
      const definitionStyle = { fontStyle: 'italic' };
      const newWordEntry = {
          ...newWord,
          termStyle,
          definitionStyle,
      };
      setWords([...words, newWordEntry]);
  };

  const onEditInit = (index) => {
      setEditingIndex(index);
      setTempTerm(words[index].term);
      setTempDefinition(words[index].definition);
  };

  const onEditSave = () => {
      const updatedWord = {
          ...words[editingIndex],
          term: tempTerm,
          definition: tempDefinition,
      };
      const updatedWords = [...words];
      updatedWords[editingIndex] = updatedWord;
      setWords(updatedWords);
      setEditingIndex(-1);
      setTempTerm('');
      setTempDefinition('');
  };

  const onDelete = (index) => {
      const updatedWords = words.filter((_, i) => i !== index);
      setWords(updatedWords);
  };

  const handleBack = () => {
      setSelectedDevice(''); // Resets to device view
      
  };

  


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
            <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.walletFlap}>
                    {selectedDevice === 'Fusion Forms' ? (
                        <ParentFusionForms onBack={handleBack} />
                    ) : selectedDevice === 'Wit & Wisdom' ? (
                        <ParentWitWisdom onBack={handleBack} />
                    ) : selectedDevice === 'Nicknames' ? (
                        <ParentNicknames onBack={handleBack} />
                    ) : selectedDevice === 'Terms' ? (
                        <ParentTerms onBack={handleBack} />
                    ) : selectedDevice === 'Alliteration' ? (
                        <ParentAlliteration onBack={handleBack} />
                /*    ) : selectedDevice === 'Allusion' ? (
                        <ParentAllusion onBack={handleBack} />
                    ) : selectedDevice === 'Allegory' ? (
                        <ParentAllegory onBack={handleBack} />
                    ) : selectedDevice === 'Euphemism' ? (
                        <ParentEuphemism onBack={handleBack} />
                    ) : selectedDevice === 'Hyperbole' ? (
                        <ParentHyperbole onBack={handleBack} />
                    ) : selectedDevice === 'Idiom' ? (
                        <ParentIdiom onBack={handleBack} />
                    ) : selectedDevice === 'Imagery' ? (
                        <ParentImagery onBack={handleBack} />
                    ) : selectedDevice === 'Irony' ? (
                        <ParentIrony onBack={handleBack} />
                    ) : selectedDevice === 'Juxtaposition' ? (
                        <ParentJuxtaposition onBack={handleBack} />
                    ) : selectedDevice === 'Metaphor' ? (
                        <ParentMetaphor onBack={handleBack} />
                    ) : selectedDevice === 'Onomatopoeia' ? (
                        <ParentOnomatopoeia onBack={handleBack} />
                    ) : selectedDevice === 'Oxymoron' ? (
                        <ParentOxymoron onBack={handleBack} />
                    ) : selectedDevice === 'Personification' ? (
                        <ParentPersonification onBack={handleBack} />
                    ) : selectedDevice === 'Simile' ? (
                        <ParentSimile onBack={handleBack} /> */
                    ) : (
                        <>
                            <View style={styles.cardHolder}>
                                <Card style={styles.card} color="#007bff" label="Lexicon" isSelected={selectedCard === 'Lexicon'} onPress={() => handleCardSelect('Lexicon')} />
                                <Card style={styles.card} color="#ff6347" label="Translate" isSelected={selectedCard === 'Translate'} onPress={() => handleCardSelect('Translate')} />
                                <Card style={styles.card} color="#dff13c" label="Device" isSelected={selectedCard === 'Device'} onPress={() => handleCardSelect('Device')} />
                                <Card style={styles.card} color="#28a745" label="Dictionary" isSelected={selectedCard === 'Dictionary'} onPress={() => handleCardSelect('Dictionary') } />
                            </View>
                            {selectedCard === 'Device' ? (
                                <DeviceArea onSaveNote={(item, note) => console.log(item, note)} onChangeDevice={onChangeDevice} />
                            ) : selectedCard === 'Translate' ? (
                                <TransLang onAddWord={addStyledWord} />
                            ) : selectedCard === 'Dictionary' ? (
                                <DictionaryAndThesaurus onAddWord={addStyledWord} />
                            ) : (
                                <>
                                    <WordList
                                        words={words}
                                        onEditInit={onEditInit}
                                        onDelete={onDelete}
                                        onEditSave={onEditSave}
                                        editingIndex={editingIndex}
                                        tempTerm={tempTerm}
                                        setTempTerm={setTempTerm}
                                        tempDefinition={tempDefinition}
                                        setTempDefinition={setTempDefinition}
                                    />
                               
                                    <InputArea onAddWord={addStyledWord} selectedCard={selectedCard} />
                                  <View style={{ position:'relative', bottom:'16.25%', right:'28.5%', overflow:'hidden', borderRadius:5, borderColor:'black', borderWidth:1 }}>
                                    <Button
                                      title="Save List"
                                      onPress={() => {
                                      saveData(classIdentifier, words)
                                      .then(() => {
                                      console.log('Words saved successfully:', words); // Debug log
                                      Alert.alert('Saved', 'Your words have been saved!');
                                      })
                                      .catch((err) => {
                                      console.error('Failed to save words:', err);
                                      Alert.alert('Error', 'Failed to save your words. Please try again.');
                                      });
                                      }}
                                      color="#2096F3" // Optional: Customize button color
                                      />
                                  </View>
                                </>
                            )}
                        </>
                    )}
                </View>
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        width: '100%',
        height: '100%'
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    walletFlap: {
        width: '100%',
        height: '95%',
        maxWidth: 600,
        backgroundColor: '#3827b3',
        borderColor: 'black',
        borderWidth: 2,
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        alignItems: 'center',
    },
    cardHolder: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '105%',
        marginBottom: 20,
        marginTop: 10,
        backgroundColor: 'rgb(36, 95, 141)',
        borderColor:'black',
        borderWidth:1
    },
});


export default WalletFlap;