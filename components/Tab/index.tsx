import React from 'react'
import { StyleSheet, View } from 'react-native'

const Tab = (css) => {
    return (
        <View style={[styles.container, css]}>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '75%',
        height: '5%',
        backgroundColor: '#BBB08E',
        marginLeft: '15.5%',

    }
});


export default Tab
