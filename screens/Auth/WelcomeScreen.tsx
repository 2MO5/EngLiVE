import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native'
import { Text, StyleSheet } from 'react-native'

const WelcomeScreen = () => {

    const navigation = useNavigation();

    const register = () => {
        navigation.navigate('SignUp');
    }

    const login = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.background}
                source={require('./assets/bgWelcome.png')}

            >

                <Image
                    source={require('./assets/info.png')}
                />
                <View style={styles.containerBtns}>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={register}
                    >
                        <Image
                            source={require('./assets/RegisterbtnW.png')}
                            style={{ marginBottom: 10 }}

                        />
                    </TouchableOpacity>


                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={login}
                    >


                        <Image
                            source={require('./assets/LoginbtnW.png')}

                        />
                    </TouchableOpacity>


                </View>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f4f4f4',

        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '-10%'



    },
    containerBtns: {
        position: 'absolute',
        bottom: '10%',
        // left: '20%',
        // width: '180%',
    }

});

export default WelcomeScreen
