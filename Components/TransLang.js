import React, { useState, useEffect } from 'react';
import { translateText } from './translatetextmodule';
import { debounce } from 'lodash';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';


function TransLang({ onAddWord }) {
    const [languages, setLanguages] = useState([]);
    const [sourceLang, setSourceLang] = useState('');
    const [targetLang, setTargetLang] = useState('');
    const [translateOption, setTranslateOption] = useState('');
    const [inputWord, setInputWord] = useState('');
    const [inputWords, setInputWords] = useState('');
    const [translatedWord, setTranslatedWord] = useState('');
    const [error, setError] = useState(null);
    const [showAddLexicon, setShowAddLexicon] = useState(false);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url:  'https://api.cognitive.microsofttranslator.com/languages?api-version=3.0&scope=translation',
                    headers: {
                        'Ocp-Apim-Subscription-Key': '9b1b61cc4eca4636bc326e4fb09bd331',
                        'Ocp-Apim-Subscription-Region': 'canadacentral'
                    },
                    timeout: 10000 // Set timeout to 10000 milliseconds (10 seconds)
                });
                const langs = Object.entries(response.data.translation).map(([code, { name }]) => ({
                    code: code,
                    label: name
                }));
                setLanguages(langs);
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx and possibly additional details
                    console.error('Error status:', error.response.status);
                    console.error('Error data:', error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('Error request:', error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error message:', error.message);
                }
                console.error('Error config:', error.config);
            }
        };
        fetchLanguages();
    }, []);

    useEffect(() => {
        const debouncedTranslate = debounce(async (text) => {
            if (!text || !sourceLang || !targetLang) {
                setTranslatedWord('');
                return;
            }
            try {
                const translation = await translateText(text, sourceLang, targetLang);
                setTranslatedWord(translation);
            } catch (error) {
                console.error('Error translating text:', error);
                setTranslatedWord('Translation failed');
            }
        }, 300);

        if (translateOption === 'words' && inputWords) {
            debouncedTranslate(inputWords);
        }

        return () => {
            debouncedTranslate.cancel();
        };
    }, [inputWords, sourceLang, targetLang, translateOption]);

    const clearInputWord = () => {
        setInputWord('');
        setTranslatedWord('');
        setShowAddLexicon(false);  // This will hide the "Add to Lexicon" button
    };
    
    const clearInputWords = () => {
        setInputWords('');
        setTranslatedWord('');
        setShowAddLexicon(false);  // This will hide the "Add to Lexicon" button
    };

    const handleTranslation = async () => {
        if (!inputWord || !sourceLang || !targetLang) {
            setError("Please complete all fields before translating.");
            return;
        }
        
        if (translateOption === 'word' && inputWord.trim().includes(" ")) {
            Alert.alert("Translation Error", "Must type one word");
            return;
        }

        try {
            const translation = await translateText(inputWord, sourceLang, targetLang);
            setTranslatedWord(translation);
            setShowAddLexicon(true);
            setError(null);
        } catch (error) {
            console.error('Error translating text:', error);
            setTranslatedWord('Translation failed');
            setError('Failed to translate. Please check your input and try again.');
        }
    };

    const handleAddToLexicon = () => {
        if (translatedWord) {
            const term = `${inputWord.charAt(0).toUpperCase() + inputWord.slice(1)}`;
            const definition = `${translatedWord} [${targetLang.toUpperCase()}]`;
            onAddWord({ term, definition, cardType: 'Translate' });
            setShowAddLexicon(false);
            Alert.alert('Lexicon Update', 'Word added to Lexicon!');
            setInputWord('');
        }
    };

    const handleOptionChange = (option) => {
        setTranslateOption(option);
        setInputWord('');
        setInputWords('');
        setTranslatedWord('');
        setShowAddLexicon(false);
    };

    const theme = {
        colors: {
          primary: "#2096F3" , // Set the radio button color
        },
      };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Translate a language</Text>
            </View>
            <View style={styles.languageSelect}>
                <Picker
                    selectedValue={sourceLang}
                    onValueChange={itemValue => setSourceLang(itemValue)}
                    style={styles.picker}>
                    <Picker.Item label="Language" value="" />
                    {languages.map(lang => (
                    <Picker.Item key={lang.code} label={lang.label} value={lang.code} />
                    ))}
                </Picker>
                <Button
                    title="⇄"
                    onPress={() => {
                    const temp = sourceLang;
                    setSourceLang(targetLang);
                    setTargetLang(temp);
                    }}
                    color="#2096F3" 
                />
                <Picker
                    selectedValue={targetLang}
                    onValueChange={itemValue => setTargetLang(itemValue)}
                    style={styles.picker}>
                    <Picker.Item label="Language" value="" />
                    {languages.map(lang => (
                    <Picker.Item key={lang.code} label={lang.label} value={lang.code} />
                    ))}
                </Picker>
                </View>
                    {sourceLang && targetLang && (
                    <View>
                        <RadioButton.Group
                            onValueChange={newValue => handleOptionChange(newValue)}
                            value={translateOption}>
                        <View style={{flexDirection: 'row', width:'100%', color: 'white' }}>
                            <View style={styles.radioButtonContainerOne}>
                                <Text style={styles.radioText}>Single Word</Text>
                                <RadioButton theme={theme} position='relative' right= '50%' backgroundColor='white' value="word" />
                        </View>
                        <View style={styles.radioButtonContainerTwo}>
                                <Text style={styles.radioText}>Multi Word</Text>
                                <RadioButton theme={theme} position='relative' right='40%' backgroundColor='white' value="words" />
                            </View>
                        </View>
                </RadioButton.Group>
            </View>
            )}
            {translateOption === 'word' && (
                <View style={styles.inputContainerOne}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setInputWord(text)}
                            value={inputWord}
                            placeholder="Enter word"
                        />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ borderWidth:1, borderColor:'black', overflow:'hidden', width: '40%', marginBottom:'5%', borderRadius:5 }}>
                            <Button
                                title="Translate"
                                onPress={handleTranslation}
                                color="#2096F3" 
                            />
                        </View>
                        <View width='5.5%'/>
                        <View style={{ borderWidth:1, borderColor:'black', width:'29%', overflow:'hidden', marginBottom:'5%', borderRadius:5 }}>
                            <Button
                                title="Clear"
                                onPress={clearInputWord}
                                color="#4A90E2"
                            />
                        </View>
                    </View>
                    <View>
                    {translatedWord && <Text style={styles.translationOne}>Translation: {translatedWord}</Text>}
                    {error && <Text style={styles.error}>{error}</Text>}
                    {showAddLexicon && (
                        <View style={{ borderWidth:1, borderColor:'black', width:'55%', overflow:'hidden', borderRadius:5, marginBottom:'20%'  }}>
                            <Button
                                title="Add to Lexicon"
                                onPress={handleAddToLexicon}
                                color="#2096F3" 
                                style={{ height:25 }}
                            />
                        </View>
                    )}
                    </View>    
                </View>
            )}
            {translateOption === 'words' && (
                <View style={styles.inputContainerTwo}>
                    <TextInput
                        style={styles.textArea}
                        onChangeText={text => setInputWords(text)}
                        value={inputWords}
                        placeholder="Enter words"
                        placeholderTextColor="gray"  // Ensures the placeholder text is visible
                        multiline={true}
                        textAlignVertical="top"  // Works only on Android
                        maxLength={1000}
                    />
                    <View style={{ width:'35%', borderWidth: 1, borderColor: 'black' }}>
                        <Button
                            title="Clear"
                            onPress={clearInputWords}
                            color="#2096F3" 
                        />
                    </View>
                    <View>
                        <Text style={styles.translationTwo}>Translation: {translatedWord}</Text>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '1%',
        overflowY:'auto',
        padding: 20,
        backgroundColor: '#3827b3',
        borderRadius: 8,
        borderWidth:2,
        borderColor:"#2096F3" ,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        position: 'relative',
        bottom: '2%'

    },

    header: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#3827b3',
        borderRadius: 8,
        textAlign: 'center',
        borderColor:"#2096F3" ,
        borderWidth:2 
    },
    headerText: {
        color: 'silver',
        fontSize: 20
    },
    languageSelect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        color: 'white',
        borderColor: "#2096F3" ,
        padding: 5,
        borderRadius: 8,
    },
    picker: {
        width: '45%',
        height: 45,
        borderWidth: 1,
        borderColor: 'black',
        color: 'white',
    },
    toText: {
        color: 'white',
        width: '10%',
        textAlign: 'center',
        fontSize: 19,
        fontWeight: 'bold'
    },

    radioText: {
        color: 'silver', // Adjust the text color as needed
        fontSize: 10
    },
   
    radioButtonContainerOne: {
        flexDirection: 'row',
        color: 'white'

    },

    
    radioButtonContainerTwo: {
        flexDirection: 'row',
        color: 'white'
    },

    inputContainerOne: {
        marginBottom: 10,
        height:'40%'
    },

    inputContainerTwo: {
        marginBottom: 10,
        height: '35%',
    },


    input: {
        borderColor:'black',
        borderWidth: 1,
        borderRadius:5,
        marginTop: '10%',
        marginBottom: '5%',
        textAlign: 'center',
        width: '100%',
        height: '30%',
        fontSize: 16,
        backgroundColor: 'white'
    },
    textArea: {
        color:'black',
        backgroundColor:'white',
        borderColor: 'black',
        borderWidth: 1,
        height: 200,
        maxHeight: 200,
        width: 315,
        maxwidth: 315,
        padding: 10,
        fontSize: 16,
        overflow: 'hidden',
        marginBottom: '5%',
        marginTop:'5%',
        overflowY: 'auto',
        overFlowX:'auto',
        textAlign: 'left'
    },
    translationOne: {
        color: 'silver',
        marginBottom: '5%',
        fontSize: 16,
        position:'relative',
        bottom:'2.5%'
    },

    translationTwo: {
        color: 'silver',
        marginBottom: '20%',
        marginTop:'5%',
        fontSize: 19
    },
    error: {
        fontSize: 24,
        color: 'red',
        marginBottom: 10
    }
});

export default TransLang;
