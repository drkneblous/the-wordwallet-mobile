import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { StorageProvider } from './Components/StorageContext';
import WalletFlap from './Components/WalletFlap';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Ensure AsyncStorage is properly imported

const TestStorage = async () => {
    try {
        await AsyncStorage.setItem('testKey', JSON.stringify({ test: "Hello World" }));
        const value = await AsyncStorage.getItem('testKey');
        console.log('Test value from AsyncStorage:', JSON.parse(value));
    } catch (error) {
        console.error('AsyncStorage test error:', error);
    }
};

const App = () => {
    useEffect(() => {
        TestStorage();  // Testing AsyncStorage functionality
    }, []);

    return (
        <StorageProvider>
            <View style={styles.container}>
                <WalletFlap />
            </View>
        </StorageProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default App;