import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

function DeviceBackButton({ onBack, onPress }) {
    return (
        <View style={styles.buttonContainer}>
            <Button title="Back" onPress={onBack || onPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '30%',
        alignSelf: 'center',
        overflow: 'hidden',
        borderRadius:5,
        borderColor:'black',
        borderWidth:1
    },
});

export default DeviceBackButton;