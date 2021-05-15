import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Avatar } from 'react-native-elements';
import { View, Text, Image, StyleSheet } from 'react-native';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import data from '../data/post';
import Feed from '../../components/Feed'
import FriendList from '../../components/FriendList'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ProfilePicture from '../../components/ProfilePicture';
import NewPostButton from '../../components/NewPostButton';

import firestore from '@react-native-firebase/firestore';
import { BallIndicator, BarIndicator, MaterialIndicator, PacmanIndicator, PulseIndicator, SkypeIndicator, UIActivityIndicator } from 'react-native-indicators';
import { useFocusEffect } from '@react-navigation/native';

import { useIsFocused } from '@react-navigation/native'

import { useForceUpdate } from '../../components/Feed'
import { AuthContext } from '../../navigation/AuthProvider';


const CommunityScreen = () => {

    const { user } = useContext(AuthContext);
    const [userImage, setUserImage] = useState();
    const [firstName, setFirstName] = useState();

    const [, setTick] = useState(0);


    const [posts, setPosts] = useState(false);
    const [refreshing, setRefreshing] = useState(true);

    const [fontReady, setFontReady] = useState(false);
    const [forceRefresh, setForceRefresh] = useState(1);

    const isFocused = useIsFocused();

    const loadingTheFeed = async () => {
        setPosts(true);
    }

    const loadingTheUser = async () => {
        firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot(documentSnapshot => {

                const { userImage, firstName } = documentSnapshot.data();

                setUserImage(userImage);
                setFirstName(firstName);
            })
    }

    useEffect(() => {
        loadingTheUser();
    })

    useEffect(() => {

        console.log(user.uid);


        const loadingTheFonts = async () => {
            await Font.loadAsync({
                'Candara': require('../../assets/fonts/Candara.ttf'),
            });
            setFontReady(true);
            setRefreshing(false);
        };





        loadingTheFonts();


    }, [])



    return (
        <View style={styles.container}>


            <View style={styles.containerTop}>

                <View style={styles.containerUser}>

                    <Image
                        style={styles.img}
                        source={require('../../assets/images/headerB.png')}
                    />

                    <View style={styles.circle} >
                        <Image
                            style={styles.avatar}
                            source={{
                                uri:
                                    userImage
                            }}


                        />
                    </View>

                    <View style={styles.userDetails}>
                        {!fontReady ? (<BarIndicator color='#c7d2f7' size={25} />) : (<Text style={styles.name}>Hello {firstName}!</Text>)}
                        <Image
                            style={styles.lines}
                            source={require('../../assets/images/lines.png')}

                        />
                    </View>


                </View>

                <View style={styles.containerMembers}>
                    {!fontReady ? (<BarIndicator color='#c7d2f7' size={25} />) : (<Text style={styles.members}>Other Members</Text>)}

                    <View style={styles.friendList}>
                        <FriendList />
                    </View>



                </View>
                <NewPostButton />
            </View>


            <View style={styles.containerBottom}>


                {
                    refreshing ? (<BarIndicator color='#98aef8' size={35} />) : (<Feed />)
                }


            </View>



        </View>
    );



}


const styles = StyleSheet.create({

    container: {
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',

        flexDirection: 'column',


    },

    containerTop: {
        width: '100%',
        height: '40%',
        //backgroundColor: 'red',
    },
    containerUser: {
        width: '100%',
        height: '30%',
        //backgroundColor: 'red',

        alignItems: 'center'
    },

    userDetails: {
        width: '100%',
        height: '100%',


        position: 'absolute',
        top: '182%'
    },

    containerMembers: {
        width: '100%',
        height: '20%',
        //backgroundColor: 'blue',
    },

    containerBottom: {
        width: '100%',
        height: '60%',
        flexGrow: 1,

    },

    containerBottomBtn: {
        position: 'absolute',
        bottom: '10%',
        right: '10%'
    },

    img: {
        height: '540%',
        width: '115%',
        top: 0
    },

    circle: {
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1.5,
        width: '22%',
        height: '116%',

        position: 'absolute',
        top: "50%",

        zIndex: 10,
        borderRadius: 500,
        alignContent: 'center',
        alignItems: 'center',



    },
    avatar: {

        marginTop: '5%',
        width: '85%',
        height: '85%',
        borderRadius: 999
    },

    lines: {
        zIndex: 100,
        position: 'absolute',
        top: "25%",
        left: "32%",
    },

    name: {
        zIndex: 100,
        position: 'absolute',
        top: "2%",
        left: "42%",

        color: "#fff",
        fontFamily: "Candara",
        fontWeight: "200"
    },
    members: {
        zIndex: 100,
        position: 'absolute',
        top: "228%",
        left: "42%",

        color: "#f8f2f2",
        fontFamily: "Candara",
        fontWeight: "100",
        fontSize: 11
    },

    friendList: {
        position: 'absolute',
        left: '11%',
        top: '259%'
    },

    postBtn: {
        position: 'absolute',
        top: '30%'
    }

});

export default CommunityScreen;