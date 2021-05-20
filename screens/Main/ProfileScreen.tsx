import { LinearGradient } from 'expo-linear-gradient'
import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AuthContext } from '../../navigation/AuthProvider'
import firestore from '@react-native-firebase/firestore';
import { DrawerActions } from 'react-navigation-drawer'

import { DrawerNavigation } from '../../navigation/MainStack';


const ProfileScreen = (props) => {

    const { user, logout } = useContext(AuthContext)

    const [userImage, setUserImage] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    const loadingTheUser = async () => {
        firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot(documentSnapshot => {

                const { userImage, firstName, lastName } = documentSnapshot.data();

                setUserImage(userImage);
                setFirstName(firstName);
                setLastName(lastName);
            })
    }

    useEffect(() => {
        loadingTheUser();
    })


    const loadTheDrawer = () => {

        console.log('@39 :  ', props);

        try {
            props.navigation.openDrawer();
        } catch (error) {
            console.log('This error occurred: ', error);
        }

    }

    return (
        <View style={styles.container}>




            <LinearGradient
                style={styles.containerGradient}
                colors={['#000000', '#68571B', '#1F1A00']}
            >
                {/* <Text> Hello {user.uid}</Text>
                <Text> This is the profile screen</Text>
                <TouchableOpacity
                    onPress={() => logout()}
                >
                    <Text> Log out!</Text>
                </TouchableOpacity> */}

                <View style={{ width: '100%', height: '15%' }}>


                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{ width: '30%', height: '100%' }}
                        onPress={loadTheDrawer}
                    >
                        <Image
                            source={require('../Main/assets/MenuBars.png')}
                            style={styles.menuBar}
                        />
                    </TouchableOpacity>

                </View>
                <Image
                    source={require('../Main/assets/userDesgin.png')}
                    style={{ position: 'absolute', top: '1%', zIndex: 0, marginTop: '1%', width: '86%' }}
                />

                <View style={styles.mainContainer}>
                    <View style={styles.containerCircle}>
                        <Image
                            style={styles.circleAvatar}
                            source={{ uri: userImage }}
                        />
                    </View>

                    <View style={styles.circleUserDetails}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff', marginTop: 7 }}> {firstName} {lastName}</Text>
                        <Text style={{ fontSize: 15, marginLeft: '5%', fontWeight: '100', color: '#BBB08E', marginTop: 10 }}> From China</Text>
                    </View>

                    <View style={styles.circleDetails}>
                        <View style={styles.detailsPosts}>
                            <Text style={styles.detailsNumber}> 30</Text>
                            <Text style={styles.detailsText}> Posts</Text>
                        </View>
                        <View style={styles.detailsFriends}>
                            <Text style={styles.detailsNumber}> 124</Text>
                            <Text style={styles.detailsText}> Friends</Text>
                        </View>
                    </View>

                </View>

                <View style={styles.postContainer}>

                    <Text style={{ color: '#e4f8ae' }}> Posts</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => console.warn('To the posts')}
                    >
                        <Image
                            source={require('../Main/assets/postArrow.png')}
                        />
                    </TouchableOpacity>
                </View>

            </LinearGradient>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'

    },

    containerGradient: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },

    menuBar: {
        // position: 'absolute',
        // left: '-15%',
        // top: '-3%'

        marginTop: 35,
        marginLeft: 20,
        zIndex: 100
    },

    mainContainer: {
        width: '100%',
        height: '30%',
        //backgroundColor: 'red',

        marginTop: 65,

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerCircle: {
        width: 120,
        height: 120.,
        borderRadius: 99,
        borderColor: '#CDBA77',
        borderWidth: 2,

    },
    circleAvatar: {
        marginTop: '10%',
        marginLeft: '10%',
        width: '80%',
        height: '80%',
        borderRadius: 999,

    },
    circleUserDetails: {

        flexDirection: 'column'
    },


    circleDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        marginTop: '10%',
        alignItems: 'center'

    },
    detailsPosts: {
        marginRight: '10%',
        alignItems: 'center'
    },
    detailsFriends: {
        marginLeft: '10%',
        alignItems: 'center'
    },

    detailsText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',

        marginTop: '20%',
    },

    detailsNumber: {
        color: '#F8E5A4',
        fontSize: 12,
    },
    postContainer: {

        width: '18%',
        marginTop: '40%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },


});

export default ProfileScreen
