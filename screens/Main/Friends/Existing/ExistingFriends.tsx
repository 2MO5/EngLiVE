import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import menu from '../../Main/assets/menu2.png';
import Design from '../../Main/assets/desginExis.png';
import design from '../../Main/assets/flyingarrows.png';
import map from '../../Main/assets/map.png'
import circle from '../../Main/assets/circleExis.png'

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../../navigation/AuthProvider';
import FriendExisting from '../../../../components/Friend/Existing';

const ExistingFriends = (props) => {

    const { user } = useContext(AuthContext);
    const [userImage, setUserImage] = useState();

    let width, height, resolution;

    width = Dimensions.get('window').width;
    height = Dimensions.get('window').height;

    resolution = height / width;

    const loadingTheUser = async () => {
        firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot(documentSnapshot => {

                const { userImage } = documentSnapshot.data();

                setUserImage(userImage);

            })
    }

    const openTheDrawer = () => {
        try {
            props.navigation.openDrawer()
        } catch (error) {
            console.log('This error occurred: ', error);
        }
    }

    useEffect(() => {
        loadingTheUser();
    }, [])

    return (
        <View style={styles.container}>
            <Image
                source={map}
                style={{ position: 'absolute', right: resolution * 20, top: resolution * 100, width: resolution / .005 }}
            />
            <View style={styles.containerTop}>


                <Image
                    source={circle}
                    style={{ position: 'absolute', top: -resolution * 0, right: resolution * 30 }}
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
                        height: '20%',
                        marginTop: '12%',
                        marginLeft: '3%',
                        zIndex: 100
                    }} />
                </TouchableOpacity>
            </View>

            <View style={styles.containerMid}>
                <FriendExisting />
                <FriendExisting />
                <FriendExisting />
                <FriendExisting />
            </View>
            <View style={styles.containerBottom}>
                <Image source={Design} style={{ position: 'absolute', bottom: resolution * -131, right: resolution * -65 }} />
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },

    containerTop: {
        width: '100%',
        height: '20%',
        //backgroundColor: 'black'
    },
    containerMid: {
        width: '100%',
        height: '60%',

        marginTop: '5%'
    },
    containerBottom: {
        width: '100%',
        height: '20%',

        marginTop: '-2%'
    }
})

export default ExistingFriends;
