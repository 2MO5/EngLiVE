import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Container, Content, Footer, Header } from 'native-base'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './AuthProvider';
import * as Font from 'expo-font';

import { AntDesign, Ionicons } from '@expo/vector-icons';
import navigation from '.';
;
const DrawerContent = ({ ...props }) => {

    const { user, logout } = useContext(AuthContext);
    const [userImage, setUserImage] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    const [fontReady, setFontReady] = useState(false);
    const [refreshing, setRefreshing] = useState(true);


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

    const loadingTheFonts = async () => {
        await Font.loadAsync({
            'Futura': require('../assets/fonts/FutuMd.ttf')
        });
        setFontReady(true);
        setRefreshing(false);
    }

    useEffect(() => {
        loadingTheUser();
    })


    let height = Dimensions.get('window').height;
    let width = Dimensions.get('window').width;

    const resolution = (height / width);

    return (

        <Container>

            <Header

                style={{ flexDirection: 'row' }}>
                <ImageBackground
                    source={require('../screens/Main/assets/DH1.png')}
                    style={{ width: '103.3%', height: '133%', marginLeft: -10, marginTop: -5 }}
                >

                    <View style={styles.circle} >
                        <Image
                            style={styles.avatar}
                            source={{
                                uri:
                                    userImage
                            }}


                        />
                    </View>

                    <View style={{ position: 'absolute', left: '42%', top: '45%' }}>
                        <Text style={{ fontSize: resolution / .11, textTransform: 'uppercase', color: '#fff', fontFamily: 'Futura', fontWeight: '400', letterSpacing: resolution / .8 }}> {firstName} {lastName} </Text>
                        <Text style={{ fontSize: resolution / .16, marginLeft: 13, color: '#F8E5A4', textTransform: 'uppercase', fontFamily: 'Futura', fontWeight: '100' }}> Delhi, India </Text>
                    </View>

                    <View>
                        <Ionicons
                            style={{ position: 'absolute', left: '92%', marginTop: resolution / .049 }}
                            name="notifications"
                            size={25}
                            color="#fdd18e"
                            onPress={() => props.navigation.navigate('Notifications')}
                        />
                    </View>

                </ImageBackground>
            </Header>
            <Content style={{ marginTop: height / 8 }}>


                <DrawerContentScrollView {...props} >


                    <DrawerItemList {...props} activeTintColor={'#b14f22'} labelStyle={{ color: '#68571B', letterSpacing: resolution / .35, fontFamily: 'Futura', textTransform: 'uppercase', fontWeight: '400', fontSize: resolution / .11, marginLeft: 20, marginTop: resolution / .2 }} />



                </DrawerContentScrollView>
            </Content>
            <View style={{ width: '100%', height: '.13%', backgroundColor: '#dfb8b8', marginBottom: resolution / .040 }}></View>

            <TouchableOpacity
                onPress={() => logout()}
                style={{ marginBottom: resolution / 0.025, marginLeft: resolution / 0.045, flexDirection: 'row', justifyContent: 'space-around', width: '50%', backgroundColor: 'transparent' }}>
                <AntDesign name="logout" size={24} color="#c7c0b4" style={{ transform: [{ rotateY: '180deg' }] }} />
                <Text style={{ textTransform: 'uppercase', color: '#b1a771', fontFamily: 'Futura', fontWeight: '400', letterSpacing: resolution / .8, marginLeft: resolution / .05 }}>Log Out</Text>
            </TouchableOpacity>



        </Container>

    )
}
const styles = StyleSheet.create({

    containerMain: {
        height: "100%",
        width: "100%",

        marginTop: "-2%",


    },

    // details: {
    //     Position: 'abssolute',
    //     top: '10%',
    //     left: '10%'
    // },
    circle: {
        backgroundColor: 'transparent',
        borderColor: '#ffffff',
        borderWidth: 1.5,
        width: '20%',
        height: '85%',

        position: 'absolute',
        top: "30%",
        left: "10%",

        zIndex: 10,
        borderRadius: 500,
        alignContent: 'center',
        alignItems: 'center',



    },
    avatar: {

        marginTop: '8%',
        width: '85%',
        height: '85%',
        borderRadius: 999
    },


});
export default DrawerContent
