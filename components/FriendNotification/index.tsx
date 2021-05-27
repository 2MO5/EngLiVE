import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AuthContext } from '../../navigation/AuthProvider'
import firestore from '@react-native-firebase/firestore';

const FriendNotification = ({ onPress }) => {

    let length, value: number;
    let fontSizeMultiplier: number;

    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState();

    const newFriendCount = async () => {
        firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then(documentSnapshot => {
                const { receivedRequests } = documentSnapshot.data();

                const newArray = receivedRequests;

                const numberOfRequests = newArray.length
                setRequests(numberOfRequests)

                length = numberOfRequests;





            })


    }



    useEffect(() => {
        newFriendCount();
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPress}
            >
                <Text style={{ color: '#fff', fontSize: 15, marginRight: 5 }}> {requests} </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FC0000',
        width: 45,
        height: 45,
        borderRadius: 999,

        marginLeft: '65%',
        marginTop: '-85%',

        justifyContent: 'center',
        alignItems: 'center',

        zIndex: 1000
    }
})


export default FriendNotification
