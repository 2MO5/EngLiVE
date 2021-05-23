import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, } from 'react-native'
import * as Font from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { add } from '../../screens/Main/assets/addFriend.png';
import { request } from '../../screens/Main/assets/request.png';
import { profile } from '../../screens/Main/assets/ProfileView.png';

const Friend = () => {

    const [fontReady, setFontReady] = useState(false);
    const [refreshing, setRefreshing] = useState(true);
    const [requested, setRequested] = useState(false);

    const loadingTheFonts = async () => {
        await Font.loadAsync({
            'Roboto': require('../../assets/fonts/RobotoBold.ttf'),
        });
        setFontReady(true);
        setRefreshing(false);
    };

    const requesting = async () => {
        setRequested(true);
    }
    const cancelling = async () => {
        setRequested(false);
    }

    useEffect(() => {
        loadingTheFonts();
    }, [])


    let width, height, resolution;

    width = Dimensions.get('window').width;
    height = Dimensions.get('window').height;

    resolution = height / width;

    return (
        <View style={styles.container}>
            <View style={styles.containerLeft}>
                <View style={styles.leftCircle}>
                    <Image
                        source={{ uri: 'https://cestrading.ae/wp-content/uploads/2020/05/photo-1494790108377-be9c29b29330.jpg' }}
                        style={styles.leftAvatar}
                    />
                </View>
            </View>

            <View style={styles.containerRight}>
                <View style={styles.rightTop}>
                    <Text style={{ fontFamily: 'Roboto', fontSize: resolution / .10, fontWeight: 'bold', marginTop: resolution / .28, marginLeft: resolution / 0.1 }} >Jake Jack</Text>
                </View>
                <View style={styles.rightBottom}>
                    <View style={{ width: '50%', height: '100%', marginRight: '-5%' }}>


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
                                        style={{ marginTop: '-17%' }}
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

        marginBottom: 10
    },

    containerLeft: {
        height: '100%',
        width: '30%',


        justifyContent: 'center',
        alignItems: 'center',
    },

    leftCircle: {
        width: '70%',
        height: '85%',
        borderRadius: 100,
        borderColor: '#AA9138',
        borderWidth: 1.5
    },

    leftAvatar: {
        width: '80%',
        height: '80%',
        borderRadius: 100,

        position: 'absolute',
        top: 6,
        left: 7,
    },

    containerRight: {
        height: '100%',
        width: '70%',


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
