import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AuthContext } from '../../navigation/AuthProvider'

const ProfileScreen = () => {

    const { user, logout } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <Text> Hello {user.uid}</Text>
            <Text> This is the profile screen</Text>
            <TouchableOpacity
                onPress={() => logout()}
            >
                <Text> Log out!</Text>
            </TouchableOpacity>
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

export default ProfileScreen
