import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import React, { useContext, useEffect, useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Container, Content, Footer, Header } from 'native-base'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './AuthProvider';
import { Ionicons } from '@expo/vector-icons';


const DrawerContent = ({ ...props }) => {

    const { user } = useContext(AuthContext);
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


    return (

        <Container>

            <Header

                style={{ flexDirection: 'row' }}>
                <ImageBackground
                    source={require('../screens/Main/assets/DrawerHeader.png')}
                    style={{ width: '103.3%', height: '135%', marginLeft: -10, marginTop: -5 }}
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

                    <View style={{ position: 'absolute', left: '40%', top: '40%' }}>
                        <Text style={{ fontSize: 22, textTransform: 'uppercase', color: '#463071', fontWeight: 'bold' }}> {firstName} {lastName} </Text>
                        <Text style={{ fontSize: 12, marginLeft: 5, color: '#876B67', textTransform: 'uppercase', fontWeight: '100' }}> Delhi, India </Text>
                    </View>

                </ImageBackground>
            </Header>
            <Content />
            <Footer />

            <DrawerContentScrollView {...props} >


                <DrawerItemList {...props} />
                <DrawerItem
                    label="Home"
                    icon={({ focused }) => {
                        <Ionicons name="ios-home-outline" size={24} color="black" />

                    }}
                />


            </DrawerContentScrollView>
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
        borderColor: '#523d03',
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
