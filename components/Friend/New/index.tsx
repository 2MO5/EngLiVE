import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, } from 'react-native'
import * as Font from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { add } from '../../screens/Main/assets/addFriend.png';
import { request } from '../../screens/Main/assets/request.png';
import { profile } from '../../screens/Main/assets/ProfileView.png';
import { NewFriendType } from '../../../types';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../navigation/AuthProvider';
import friends from '../../../data/friends';

export type FriendProps = {
    friend: NewFriendType
}


const Friend = ({ friend }: FriendProps) => {

    const { user } = useContext(AuthContext);

    const [fontReady, setFontReady] = useState(false);
    const [refreshing, setRefreshing] = useState(true);
    const [requested, setRequested] = useState(false);

    const friendId = friend.id;
    const usersId = user.uid;
    let isFriendExists: boolean, isRequesting: boolean;
    let requestedArray: any = [];

    const [nameFirst, setNameFirst] = useState();
    const [nameLast, setNameLast] = useState();
    const [image, setImage] = useState()


    const loadingTheFonts = async () => {
        await Font.loadAsync({
            'Roboto': require('../../assets/fonts/RobotoBold.ttf'),
        });
        setFontReady(true);
        setRefreshing(false);
    };

    const requesting = async () => {

        let requestedArray;
        setRequested(true);

        isRequesting = true;

        // 1.Locate the user and the requestedField
        // 2.Take the array out and change it accordingly by using an another array 
        // 3. Put it back up to update that 
        try {
            await
                firestore()
                    .collection('users')
                    .doc(usersId)
                    .get()
                    .then(documentSnapshot => {
                        const { sentRequests } = documentSnapshot.data();

                        requestedArray = sentRequests;

                        requestedArray.push({
                            friendsId: friendId,
                            requestedAt: firestore.Timestamp.fromDate(new Date())
                        })


                        console.log('@68: ', requestedArray);

                    })

            await
                firestore()
                    .collection('users')
                    .doc(usersId)
                    .update({
                        sentRequests: requestedArray
                    }).then(() => {
                        console.log('Added Successfully ')
                    }).catch((e) => {
                        console.log('Error at db update: ', e);
                    })


            await updatingOtherUser();
        } catch (error) {
            console.log(error)
        }

    }

    const cancelling = async () => {
        let cancellingArray: any = [];
        setRequested(false);

        isRequesting = false;
        console.log('@91 friendId: ', friendId);
        try {
            await
                firestore()
                    .collection('users')
                    .doc(usersId)
                    .get()
                    .then(documentSnapshot => {
                        const { sentRequests } = documentSnapshot.data();

                        //take the array 
                        //Go throught it find out if any of the object contain the friendId 
                        //remove the one that does.
                        cancellingArray = sentRequests;

                        console.log('@101: ', cancellingArray);

                        for (let i = 0; i < cancellingArray.length; i++) {
                            let id = cancellingArray[i].friendsId
                            console.log('@105: ', id);

                            if (id === friendId) {
                                console.log('@109 i: ', i);
                                cancellingArray.splice(i, 1);
                                console.log('@110 Done splicing');
                            }
                        }

                        console.log('@114 updated array: ', cancellingArray);
                    })

            await
                firestore()
                    .collection('users')
                    .doc(usersId)
                    .update({
                        sentRequests: cancellingArray
                    }).then(() => {
                        console.log('db updated successfully')
                    }).catch((e) => {
                        console.log('Error updating the db: ', e)
                    })


            await updatingOtherUser();

        } catch (error) {
            console.log(error)
        }

    }

    //showing the like after a reload or a logout
    const checkingIfExists = async () => {

        //1.locate the user and the sentRequest array
        //2. Check if the friendId is there
        //3. Set the state if it does.

        let newArray: any = [];

        try {

            await
                firestore()
                    .collection('users')
                    .doc(usersId)
                    .get()
                    .then(documentSnapshot => {
                        const { sentRequests } = documentSnapshot.data();

                        newArray = sentRequests;

                        for (let i = 0; i < newArray.length; i++) {
                            let theId = newArray[i].friendsId

                            if (theId === friendId) {
                                isFriendExists = true;
                            }
                        }

                    })

            setRequested(isFriendExists);



        } catch (error) {
            console.log(error)
        }
    }

    //adding the request on to the other user as a receivedRequests
    const updatingOtherUser = async () => {
        //1.locate the user; the friend
        //2. Add the logged in users id to receivedRequests
        let newArray: any = [];

        try {

            if (isRequesting === true) {

                await
                    firestore()
                        .collection('users')
                        .doc(friendId)
                        .get()
                        .then(documentSnapshot => {
                            const { receivedRequests } = documentSnapshot.data();

                            newArray = receivedRequests;

                            newArray.push({
                                friendsId: usersId,
                                requestReceievedAt: firestore.Timestamp.fromDate(new Date()),
                            })

                        })

                await firestore()
                    .collection('users')
                    .doc(friendId)
                    .update({
                        receivedRequests: newArray
                    }).then(() => {
                        console.log('Update Successful');
                    }).catch((e) => {
                        console.log(' @updatingOtherUser - Error at updating db', e);
                    })

            } else {

            }




            // if (isRequesting === true) {

            //     await
            //         firestore()
            //             .collection('users')
            //             .doc(friendId)
            //             .update({
            //                 receivedRequests: firestore.FieldValue.arrayUnion(usersId)
            //             })

            // } else {
            //     await
            //         firestore()
            //             .collection('users')
            //             .doc(friendId)
            //             .update({
            //                 receivedRequests: firestore.FieldValue.arrayRemove(usersId)
            //             })
            // }


        } catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {
        fetchingNewFriend();
        loadingTheFonts();
        checkingIfExists();
        console.log('@40: ', friend.id)
        console.log('@41: ', friend.name)
        console.log('@42: ', friend.image)
    }, [])


    let width, height, resolution;

    width = Dimensions.get('window').width;
    height = Dimensions.get('window').height;

    resolution = height / width;

    //taking friends details 


    const fetchingNewFriend = async () => {

        await
            firestore()
                .collection('users')
                .doc(friendId)
                .onSnapshot(documentSnapshot => {

                    const { firstName, lastName, userImage } = documentSnapshot.data();

                    setNameFirst(firstName);
                    setNameLast(lastName);
                    setImage(userImage);

                })
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerLeft}>
                <View style={styles.leftCircle}>
                    <Image
                        source={{ uri: image }}
                        style={styles.leftAvatar}
                    />
                </View>
            </View>

            <View style={styles.containerRight}>
                <View style={styles.rightTop}>
                    <Text style={{ fontFamily: 'Roboto', fontSize: resolution / .10, fontWeight: 'bold', marginTop: resolution / .28, marginLeft: resolution / 0.1 }} >{nameFirst} {nameLast}</Text>
                </View>
                <View style={styles.rightBottom}>
                    <View style={{ width: '50%', height: '100%', marginRight: '7%' }}>


                        {
                            !requested ? (
                                <TouchableOpacity

                                    activeOpacity={0.8}
                                    onPress={requesting}
                                >

                                    <Image

                                        source={require('../../screens/Main/assets/addFriend.png')}
                                    />

                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity

                                    activeOpacity={0.8}
                                    onPress={cancelling}
                                >

                                    <Image
                                        style={{ marginTop: '-24%' }}
                                        source={require('../../screens/Main/assets/request.png')}
                                    />

                                </TouchableOpacity>
                            )
                        }


                    </View>
                    <View style={{ width: '50%', height: '100%', }}>


                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => console.log('view profile!')}
                        >

                            <Image source={require('../../screens/Main/assets/ProfileView.png')} />

                        </TouchableOpacity>
                    </View>


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
        //justifyContent: 'space-between',


        width: '80%',
        height: '20%',

        marginBottom: 15
    },

    containerLeft: {
        height: '100%',
        width: '30%',


        justifyContent: 'center',
        alignItems: 'center',
    },

    leftCircle: {
        width: 50,
        height: 50,
        borderRadius: 100,
        borderColor: '#AA9138',
        borderWidth: 1.5,

        top: '101%'

    },

    leftAvatar: {
        width: '80%',
        height: '80%',
        borderRadius: 100,

        position: 'absolute',
        top: 5,
        left: '10%',
    },

    containerRight: {
        height: '100%',
        width: '70%',
        marginTop: '-5%',



        flexDirection: 'column'
    },

    rightTop: {

    },

    rightBottom: {
        width: '100%',
        height: '70%',

        flexDirection: 'row',
        marginLeft: '7%',
        marginTop: '4%'
    }
})

export default Friend
