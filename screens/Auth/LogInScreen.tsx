import React, { useContext, useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../navigation/AuthProvider';


const LogInScreen = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { login, googleLogin } = useContext(AuthContext);

    const navigation = useNavigation();

    const navigateTo = () => {
        navigation.navigate('SignUp')
    }


    const Login = () => {
        console.log('Starting login in')
        login(email, password);
    }

    return (
        <View style={styles.container}>


            <ImageBackground
                style={styles.background}
                source={require('./assets/bgAuth.png')}

            >

                <Image
                    source={require('./assets/welcomeLogin.png')}
                    style={styles.logo}
                />

                <Animatable.View
                    style={styles.containerBottom}
                    animation="fadeInUpBig"
                >
                    <ScrollView>


                        <View style={styles.bottomAll}>


                            <View style={styles.email}>
                                <Image
                                    source={require('./assets/mail.png')}
                                />
                                <TextInput
                                    value={email}
                                    onChangeText={(userEmail: any) => setEmail(userEmail)}
                                    placeholder="Email Address"
                                    style={styles.input}
                                    placeholderTextColor={'#DBC98A'}
                                />
                            </View>
                            <View style={styles.password}>
                                <Image
                                    source={require('./assets/key.png')}
                                />
                                <TextInput
                                    value={password}
                                    onChangeText={(userPassword: any) => setPassword(userPassword)}
                                    placeholder="Password"
                                    style={styles.input}
                                    placeholderTextColor={'#DBC98A'}
                                    secureTextEntry={true}
                                />
                            </View>


                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={Login}
                            >
                                <Image
                                    source={require('./assets/Loginbtn.png')}
                                    style={styles.buttonLog}
                                />

                            </TouchableOpacity>


                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={navigateTo}
                            >
                                <Image
                                    source={require('./assets/text1.png')}
                                    style={styles.dontReg}

                                />
                            </TouchableOpacity>
                            <View style={styles.socialReg}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => googleLogin()}
                                >
                                    <Image source={require('./assets/google.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source={require('./assets/fb.png')} style={styles.fb} />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </ScrollView>



                </Animatable.View>
            </ImageBackground>






        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',


        justifyContent: 'center',
        alignItems: 'center'
    },
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',


    },

    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',



    },


    logo: {
        position: 'absolute',
        top: '3%'
    },



    containerBottom: {
        flexGrow: 1,
        width: '98%',
        height: '82%',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        marginTop: '105%',
        marginBottom: '-25%',
        backgroundColor: '#6e6e54',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 55

    },
    bottomAll: {
        marginTop: '5%',
        flexGrow: 1,
        height: '100%'
    },
    email: {
        flexDirection: 'row',

        marginLeft: '5%',
        marginTop: '5%',
        marginBottom: '1%'

    },
    password: {
        flexDirection: 'row',
        marginLeft: '5%',
        marginTop: '3%'
    },

    input: {
        borderColor: '#dbcfa3',
        borderTopWidth: 0,
        borderBottomWidth: 1,
        width: '76%',
        marginBottom: '5%'
    },

    buttonLog: {
        marginLeft: '6%',
        marginTop: '20%',
        width: '90%'
    },

    dontReg: {
        marginLeft: '27%',
        marginTop: '2%',
        marginBottom: '12%'
    },
    socialReg: {
        width: '100%',
        alignItems: 'center',
        paddingLeft: '25%',
        marginBottom: '60%',
        marginTop: '2%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    fb: {
        marginRight: '35%'
    }
});

export default LogInScreen;