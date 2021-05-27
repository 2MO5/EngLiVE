import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import * as Font from 'expo-font';
import accept from '../../../screens/Main/assets/btnAccept.png'
import reject from '../../../screens/Main/assets/btnReject.png'

import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import { AuthContext } from '../../../navigation/AuthProvider';

const RequestedFriends = ({ requestedFriend }) => {

    const [fontReady, setFontReady] = useState(false);
    const [refreshing, setRefreshing] = useState(true);

    const { user } = useContext(AuthContext);

    let width, height, resolution;

    let id: string, firstName: string, lastName: string, timestamp: string, image: string;

    width = Dimensions.get('window').width;
    height = Dimensions.get('window').height;

    resolution = height / width;

    id = requestedFriend.id;
    firstName = requestedFriend.firstName;
    lastName = requestedFriend.lastName;
    timestamp = requestedFriend.requestedAt;
    image = requestedFriend.userImage;

    const [country, setCountry] = useState();



    const loadingTheFonts = async () => {
        await Font.loadAsync({
            // 'Roboto': require('../../assets/fonts/Roboto/Roboto-Light-300.ttf'),
            'Padauk': require('../../assets/fonts/Padauk.ttf'),
            'Poppins': require('../../assets/fonts/Poppins.ttf'),
        });
        setFontReady(true);

    };

    const loadingTheCountry = async () => {

        await
            firestore()
                .collection('users')
                .doc(id)
                .onSnapshot(documentSnapshot => {
                    const { country } = documentSnapshot.data()

                    setCountry(country);

                })

    }

    useEffect(() => {
        loadingTheFonts();
        loadingTheCountry();
        console.log('id: ', id)
        console.log('firstName: ', firstName)
        console.log('lastName: ', lastName)
        console.log('image: ', image)
        console.log('timestamp: ', timestamp)
    }, [])


    const removing = async () => {

        let theNewArray: any = [];
        //1.find the user
        //2. Get the requested array
        //3. Remove the object that contains the id of the requested user

        try {
            await firestore()
                .collection('users')
                .doc(user.uid)
                .get()
                .then(documentSnapshot => {
                    const { receivedRequests } = documentSnapshot.data();

                    theNewArray = receivedRequests;


                    for (let i = 0; i < theNewArray.length; i++) {

                        let idFriend = theNewArray[i].friendsId;

                        if (idFriend === id) {
                            console.log('@95 idFriend: ', idFriend);
                            theNewArray.splice(i, 1);
                            console.log("@96 splicing done");
                        }

                        console.log('@99: ', theNewArray);
                    }




                })

            //updating
            await
                firestore()
                    .collection('users')
                    .doc(user.uid)
                    .update({
                        receivedRequests: theNewArray
                    }).then(() => {
                        console.log('DB Updated')
                    }).catch((e) => {
                        console.log('@removing- Error updating the db due to ==>  ', e)
                    })

        } catch (error) {
            console.log('This error occurred: ', error);
        }
    }

    const adding = async () => {
        // 1.Get the user
        // 2.Locate the friends and take it out
        // 3. Break it down and put it back up

        let friendsArray: any = [];
        try {
            await firestore()
                .collection('users')
                .doc(user.uid)
                .get()
                .then(documentSnapshot => {
                    const { friends } = documentSnapshot.data();

                    friendsArray = friends;
                    friendsArray.push({
                        friendsId: id,
                        friendSince: firestore.Timestamp.fromDate(new Date())


                    })

                    console.log('@149: ', friendsArray)
                })


            await firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    friends: friendsArray
                }).then(() => {
                    console.log('Successfully updated')
                }).catch((e) => {
                    console.log('@adding- Error due to: ', e)
                })


        } catch (error) {
            console.log('This error occurred: ', error)
        }
    }

    const acceptRequest = () => {
        console.warn('accept request')
        // 1.Remove the request from the requested array
        // 2. Add it to friends array

        removing();
        adding();
    }

    const rejectRequest = () => {
        console.warn('reject request')
        // 1.Remove the request from the requested array
        // 2. Add it to friends array
        removing();
    }


    return (
        <View style={styles.container}>
            <View style={styles.containerLeft}>
                <View style={styles.leftTop}>
                    <View style={styles.leftCircle}>
                        <Image
                            source={{ uri: image }}
                            style={styles.leftAvatar}
                        />

                        <Text style={{ marginTop: '110%', textAlign: 'center', fontSize: resolution * 5, width: '100%', color: '#856602', fontFamily: 'Poppins', fontWeight: '800' }}>{moment(timestamp.toDate()).fromNow()}</Text>
                    </View>
                </View>
                <View style={styles.leftBottom}></View>
            </View>
            <View style={styles.containerRight}>
                <View style={styles.rightTop}>
                    <Text style={{ fontSize: resolution * 15, fontFamily: 'Padauk', fontWeight: '200', color: '#AD8C18', marginTop: '1.5%' }}>{firstName} {lastName}</Text>
                    <Text style={{ fontSize: resolution * 6.6, color: '#bba765', marginTop: '6%', marginLeft: '3%' }}>From {country}</Text>
                </View>
                <View style={styles.rightBottom}>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={acceptRequest}

                    >
                        <Image source={accept} style={{ marginRight: '-6%' }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={rejectRequest}

                    >

                        <Image source={reject} style={{ marginRight: '-6%' }} />
                    </TouchableOpacity>



                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

        width: '90%',
        height: '20%',
        marginTop: 60,

        zIndex: 1000

    },
    containerLeft: {
        width: '30%',
        height: '100%',
        marginTop: '-1%',

        justifyContent: 'center',
        alignItems: 'center',

        flexDirection: 'column'
    },
    leftTop: {

    },
    leftCircle: {
        width: 70,
        height: 70,
        borderRadius: 100,
        borderColor: '#707070',
        borderWidth: 1.5,



    },

    leftAvatar: {
        width: '80%',
        height: '80%',
        borderRadius: 100,

        position: 'absolute',
        top: 5,
        left: '10%',
    },
    leftBottom: {},
    containerRight: {
        width: '70%',
        height: '100%',


        justifyContent: 'center',
        alignItems: 'center',
    },
    rightTop: {
        flexDirection: 'row',
        marginBottom: '-5%',
        marginTop: '4%',
        marginLeft: '-10%'
    },
    rightBottom: {
        flexDirection: 'row',
        marginTop: '5%'
    },
})

export default RequestedFriends
