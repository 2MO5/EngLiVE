import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';


import menu from '../../Main/assets/menu2.png';
import map from '../../Main/assets/map.png'
import design from '../../Main/assets/newFriendsDesign.png';
import circle from '../../Main/assets/friendsCircle.png'
import globe from '../../Main/assets/friendsGlobe.png'
import { AuthContext } from '../../../../navigation/AuthProvider';
import Friend from '../../../../components/Friend/New';

const NewFriends = (props) => {

    const [userImage, setUserImage] = useState();

    const { user } = useContext(AuthContext);

    let width, height, resolution;

    width = Dimensions.get('window').width;
    height = Dimensions.get('window').height;

    resolution = height / width;


    const openTheDrawer = () => {
        try {
            props.navigation.openDrawer()
        } catch (error) {
            console.log('This error occurred: ', error);
        }
    }

    const loadingTheUser = async () => {
        firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot(documentSnapshot => {

                const { userImage } = documentSnapshot.data();

                setUserImage(userImage);

            })
    }

    useEffect(() => {
        loadingTheUser();
        console.log('==>', userImage);
    }, [])


    return (
        <View style={styles.container}>
            <Image
                source={map}
                style={{ position: 'absolute', right: resolution * 20, top: resolution * 140, width: resolution / .005 }}
            />

            <View style={styles.containerTop} >

                <Image
                    source={design}
                    style={{ position: 'absolute', top: -resolution * 130, right: -resolution * 80 }}
                />
                <Image
                    source={circle}
                    style={{ position: 'absolute', top: -resolution * 0, right: resolution * 80 }}
                />

                <Image
                    source={{ uri: userImage }}
                    style={{ width: resolution * 55, height: resolution * 55, borderRadius: 100, position: 'absolute', left: resolution * 97, top: resolution * 14 }}

                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={openTheDrawer}
                >
                    <Image source={menu} style={{
                        width: '8%',
                        height: '22%',
                        marginTop: '11%',
                        marginLeft: '3%',
                        zIndex: 100
                    }} />
                </TouchableOpacity>
            </View>
            <View style={styles.containerMid}>
                <Friend />
                <Friend />
                <Friend />
                <Friend />
            </View>
            <View style={styles.containerBottom}>
                <Image
                    source={globe}
                    style={{ position: 'absolute', bottom: resolution * 1, }}
                />
            </View>

        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTop: {
        width: '100%',
        height: '20%',
        //backgroundColor: '#c41'

    },
    containerMid: {
        width: '100%',
        height: '60%',

        marginTop: '1%',
        marginBottom: '-1%',

        justifyContent: 'center',
        alignItems: 'center',

    },
    containerBottom: {
        width: '100%',
        height: '20%',
        marginTop: '-1%',
        //  backgroundColor: '#86523e'
    },

})

export default NewFriends
