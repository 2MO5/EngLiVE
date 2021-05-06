import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const NotificationScreen = () => {
    return (
        <View style={styles.container}>
            <Text>This is the notification screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f4f4f4',

        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default NotificationScreen
