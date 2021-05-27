import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { set } from 'react-native-reanimated';

const FriendProfile = (props) => {
    let id: string;

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [avatar, setAvatar] = useState();
    const [country, setCountry] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        id = props.route.params.id;
        console.log('@8: ', id);
        console.log('@81: ', props)

        fetchingTheFriend()
    }, [])

    const fetchingTheFriend = async () => {

        try {
            await firestore()
                .collection('users')
                .doc(id)
                .onSnapshot(documentSnapshot => {
                    const { firstName, lastName, userImage, country } = documentSnapshot.data()

                    setFirstName(firstName);
                    setLastName(lastName);
                    setAvatar(userImage);
                    setCountry(country);

                })

        } catch (error) {
            console.log('This error occurred: ', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text>{firstName}'s Profile</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    }
})

export default FriendProfile
