import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import background from '../../Main/assets/friendMain.png';
import circle from '../../Main/assets/friendCircle.png';
import circle1 from '../../Main/assets/friendCircle1.png';
import menu from '../../Main/assets/menu2.png';
import dotTop from '../../Main/assets/dotRight.png';
import dotBottom from '../../Main/assets/dotLeft.png';
import newFriends from '../../Main/assets/btnNewFriend.png'
import existingFriends from '../../Main/assets/btnExisFriend.png'

import * as Font from 'expo-font';
import { openDrawer } from 'react-navigation-drawer/lib/typescript/src/routers/DrawerActions';
import { AuthContext } from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const FriendsScreen = (props) => {

    const { user } = useContext(AuthContext);

    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    const resolution = height / width;

    const [refreshing, setRefreshing] = useState(true);
    const [fontReady, setFontReady] = useState(false);

    const [userImage, setUserImage] = useState();


    const loadingTheUser = async () => {
        firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot(documentSnapshot => {

                const { userImage } = documentSnapshot.data();

                setUserImage(userImage);


            })
    }


    const loadingTheFonts = async () => {
        await Font.loadAsync({
            'Roboto': require('../../assets/fonts/RobotoBold.ttf'),
            'Candara': require('../../assets/fonts/Candara.ttf'),
            'Padauk': require('../../assets/fonts/Padauk.ttf')
        });

        setFontReady(true);
        setRefreshing(false);

    }

    useEffect(() => {
        loadingTheFonts();
        loadingTheUser();

    }, [])

    const openTheDrawer = () => {

        try {
            props.navigation.openDrawer()
        } catch (error) {
            console.log('This error occurred: ', error);
        }

    }

    return (

        <View style={styles.container}>
            <Image source={background} style={{ width: '100%', height: '60%', position: 'absolute', right: (resolution * 50), top: (resolution * 110) }} />

            <View style={styles.containerTop}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={openTheDrawer}
                >
                    <Image source={menu} style={{
                        width: '8%',
                        height: '22%',
                        marginTop: '11%',
                        marginLeft: '3%'
                    }} />
                </TouchableOpacity>

                <Image
                    source={dotTop}
                    style={{
                        // width: '25%',
                        // height: '90%',
                        marginTop: '-12%',
                        marginLeft: '75%'

                    }}
                />

            </View>
            <View style={styles.containerMid}>
                <Image
                    source={circle1}
                    style={{
                        width: resolution + (resolution * 120) + (resolution * 40),
                        height: (resolution * 10) + (resolution * 150),
                        position: 'absolute',
                        right: (resolution * 40),
                        top: (resolution * 10 + resolution * 25 - resolution * 54)
                    }}
                />

                <Image
                    source={{ uri: userImage }}
                    style={{
                        width: '35%',
                        height: '50%',
                        borderRadius: 100,


                        position: 'absolute',
                        left: resolution * 87,
                        top: resolution * 10,
                    }}
                />
                <Text
                    style={{
                        fontFamily: 'Padauk',
                        fontWeight: 'bold',
                        color: '#413300',
                        fontSize: resolution / 0.05,

                        letterSpacing: 2,

                        position: 'absolute',
                        right: (resolution * 55),
                        top: (resolution * 60 + resolution * 95)
                    }}>
                    Your Friends
                </Text>

                <Image
                    source={require('../../Main/assets/styleFr.png')}
                    style={{
                        // width: '5%',
                        // height: '10%',
                        position: 'absolute',
                        right: (resolution * 40),
                        top: (resolution * 65 + resolution * 95)
                    }}
                />
                <Image
                    source={require('../../Main/assets/styleFr.png')}
                    style={{

                        position: 'absolute',
                        left: (resolution * 40),
                        top: (resolution * 65 + resolution * 95)
                    }}
                />
            </View>
            <View style={styles.containerBottom}>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.bottomNew}
                    onPress={() => props.navigation.navigate("NewFriends")}
                >

                    <Image source={newFriends} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.bottomExisting}
                    onPress={() => props.navigation.navigate("ExistingFriends")}
                >
                    <Image source={existingFriends} />
                </TouchableOpacity>
                <Image
                    source={dotTop}
                    style={{ marginBottom: -resolution * 25, marginLeft: -resolution * 40 }}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f6f5',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    containerTop: {
        width: '100%',
        height: '20%',

    },
    containerMid: {
        width: '100%',
        height: '40%',
        //backgroundColor: 'blue',

        justifyContent: 'center',
        flexDirection: 'column',
    },
    containerBottom: {
        width: '100%',
        height: '40%',


        justifyContent: 'center',
        paddingTop: '30%',
        padding: 55,

    },

    bottomNew: {
        paddingBottom: 13
    },
    bottomExisting: {
        paddingTop: 13
    }
})

export default FriendsScreen
