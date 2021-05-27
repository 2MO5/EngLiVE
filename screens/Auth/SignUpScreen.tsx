import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext, useEffect, } from 'react'
import { ImageBackground, StyleSheet, Text, Image, TouchableOpacity, View, TextInput, ScrollView, Animated, Dimensions, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import * as Font from 'expo-font';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

import { AuthContext } from '../../navigation/AuthProvider';

const { width, height } = Dimensions.get('screen');


const SignUpScreen = () => {

    const screenHeight = Dimensions.get('window').height

    const [imagePresent, setImagePresent] = useState(false);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [nameValid, setNameValid] = useState(true);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        passowrd: '',
        confirmPassword: '',

        checkInputChange: false,
        secureTextEntry: true,
        confirmSecureTextEntry: true
    })



    const [barUp, setBarUp] = useState(false);


    const { register, googleLogin } = useContext(AuthContext);

    const navigation = useNavigation();

    const navigateTo = () => {
        navigation.navigate('Login');
        console.log('navigate');
    }

    const [fontReady, setFontReady] = useState(false);


    const [alignment] = useState(new Animated.Value(0))

    const actionSheetUp = () => {
        Animated.timing(alignment, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false
        }).start();

        setBarUp(true);
    }
    const actionSheetDown = () => {
        Animated.timing(alignment, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
    }

    const sheetIntropolate = alignment.interpolate({
        inputRange: [0, 1],
        outputRange: [-height / 2.5 + 65, 0]
    });

    const sheetStyles = {
        bottom: sheetIntropolate
    }




    const handlingGesture = (e: any) => {
        if (e.nativeEvent.contentOffset.y > 0) actionSheetUp();
        //else actionSheetDown()
        //else if (e.nativeEvent.contentOffset.y == 0) actionSheetDown();
        else if (e.nativeEvent.contentOffset.y < 0) actionSheetDown();
    }

    const handlingGestureTab = () => {
        actionSheetDown();
        setBarUp(false);
    }


    // 1. Take the image
    //2. Crop it
    // 3. Put it to db with other values 


    // 1.Take all the given details.
    // 2.Error if no image is provide.
    // 3. Else push it to the db

    const addAvatar = () => {
        console.warn('Add avatar');

        ImagePicker.openPicker({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7,
        }).then((image) => {
            console.log(image);
            const imageURI = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageURI);
            console.log(imageURI)
            setImagePresent(true);

        }).catch((e) => {
            Alert.alert(
                'You must insert an image here!'
            );
        })

    }

    const imageUpload = async () => {
        const uploadURI = image;
        let imageName = uploadURI.substring(uploadURI.lastIndexOf('/') + 1);
        const reference = storage().ref(imageName);

        //adding the time for extension
        const extension = imageName.split('.').pop();
        const name = imageName.split('.').slice(0, -1).join('.');
        imageName = name + Date.now() + '.' + extension;

        setUploading(true);

        const storageReference = storage().ref(`userImage/${imageName}`);
        const theTask = storageReference.putFile(uploadURI);


        try {

            // auth().signInAnonymously();

            await theTask;

            const downURL = await storageReference.getDownloadURL();
            const reference = storage().ref(imageName);
            await reference.putFile(uploadURI);

            setUploading(false);
            setImage(null);
            return downURL;
            // console.log(downURL);
            // console.log(image);

        } catch (error) {
            console.log('This happened:', error);
            return null;
        }
    }

    const userRegistration = async () => {


        if (image === null) {
            Alert.alert(
                'You must provide an image'
            );
        }


        else {

            const avatar = await imageUpload();
            register(email, password, avatar, firstName, lastName, country);
        }
    }

    const googleRegistration = () => {
        if (image === null) {
            Alert.alert(
                'You must provide an image'
            )
        } else {
            googleLogin()
        }
    }


    useEffect(() => {

        const loadingTheFonts = async () => {
            await Font.loadAsync({
                'Poppins': require('../../assets/fonts/Poppins.ttf'),
                'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
                'Candara': require('../../assets/fonts/Candara.ttf'),
                'RocknRollOne': require('../../assets/fonts/RocknRollOne-Regular.ttf'),
            });
            setFontReady(true);
        }
        loadingTheFonts();
    }, [])


    //Form validation
    // registration:
    //1.check if the lengthes are right
    //2.if right display the error message else show the icon

    //1.check if the passwords match with each other
    //2. Match? display succes message. Else show error

    //1. Check if the user exists in the db by comparing the emails
    //2. Exists? Display error. Else let it pass through




    return (

        <View style={styles.container}>


            {/* <ImageBackground
                style={styles.background}
                source={require('./assets/bgAuth.png')}

            > */}
            <LinearGradient

                colors={['#997D11', '#022235']}

            >

                <View style={{ zIndex: 1 }}>
                    <TouchableOpacity
                        onPress={addAvatar}
                    >
                        {
                            !imagePresent ? (
                                <Image
                                    source={require('./assets/Avatar.png')}
                                    style={{ marginLeft: '33%', marginTop: '15%' }}
                                />
                            ) : (


                                <Image
                                    source={{ uri: image }}
                                    style={{ marginLeft: '33%', marginTop: '15%', width: 100, height: 100, borderRadius: 999 }}
                                />

                            )
                        }
                    </TouchableOpacity>
                </View>

                <Video
                    source={require('./assets/video-3.mp4')}
                    style={styles.video}
                    // rate={ }
                    // volume={ }
                    // muted={ }
                    resizeMode={'cover'}
                    repeat

                />

                {/* <Image
                    source={require('./assets/regLogo1.png')}
                    style={styles.logo}
                /> */}

                <Animated.View
                    style={[styles.containerBottom, sheetStyles]}
                // animation="fadeInUpBig"
                >
                    <ScrollView
                        onScrollEndDrag={(e) => handlingGesture(e)}
                    >
                        <View style={styles.bottomAll}>


                            {
                                !barUp ? (
                                    <TouchableOpacity
                                        style={styles.bar}

                                    >
                                        <View ></View>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity

                                        onPress={handlingGestureTab}
                                        style={styles.pin}
                                    >
                                        <Image

                                            source={require('./assets/pin1.png')}
                                        >

                                        </Image>
                                    </TouchableOpacity>
                                )
                            }


                            <View style={styles.email}>
                                <Image
                                    source={require('./assets/name.png')}
                                />
                                <TextInput
                                    value={firstName}
                                    // onEndEditing={(e) => handleName(e.nativeEvent.Text)}
                                    onChangeText={(userName: any) => setFirstName(userName)}
                                    placeholder="First Name"
                                    style={styles.input}

                                    //value={value}
                                    placeholderTextColor={'#DBC98A'}
                                />

                                {!nameValid ? (
                                    <Text style={{ marginLeft: -215, color: '#fff' }}> We need your name!!</Text>
                                ) : (
                                    null
                                )
                                }
                            </View>
                            <View style={styles.email}>
                                <Image
                                    source={require('./assets/name.png')}
                                />
                                <TextInput
                                    value={lastName}
                                    onChangeText={(value: string) => setLastName(value)}
                                    placeholder="Last Name"
                                    style={styles.input}

                                    //value={value}
                                    placeholderTextColor={'#DBC98A'}
                                />
                            </View>
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
                            <View style={styles.email}>
                                <Image
                                    source={require('./assets/location.png')}
                                />
                                <TextInput
                                    value={country}
                                    onChangeText={(userLocation: any) => setCountry(userLocation)}
                                    placeholder="Country"
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
                            <View style={styles.password}>
                                <Image
                                    source={require('./assets/key.png')}
                                />
                                <TextInput
                                    value={confirmPassword}
                                    onChangeText={(userPassword: any) => setConfirmPassword(userPassword)}
                                    placeholder="Confirm Password"
                                    style={styles.input}
                                    placeholderTextColor={'#DBC98A'}
                                    secureTextEntry={true}
                                />
                            </View>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={userRegistration}
                            >
                                <Image
                                    source={require('./assets/regBtn.png')}
                                    style={styles.buttonReg}
                                />

                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={navigateTo}
                            >
                                <Image
                                    source={require('./assets/text.png')}
                                    style={styles.already}

                                />
                            </TouchableOpacity>


                            <View style={styles.socialReg}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={googleRegistration}
                                >
                                    <Image source={require('./assets/google.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source={require('./assets/fb.png')} style={styles.fb} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>

                </Animated.View>

            </LinearGradient>





        </View >


    )
}

const styles = StyleSheet.create({
    video: {
        height: '100%',
        position: 'absolute',
        zIndex: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: .404,

    },
    container: {
        width: '100%',
        height: '100%',


        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1

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
        top: '5%'
    },


    bottomAll: {
        marginTop: '10%',
        flexGrow: 1,
        height: '100%'
    },

    bar: {
        backgroundColor: '#ebf5f5',
        width: '60%',
        height: '1%',
        borderRadius: 13,
        justifyContent: 'center',
        marginLeft: '20%',
        marginRight: '20%',
        marginTop: '-10%',
    },


    pin: {

        width: '1%',


        justifyContent: 'center',
        alignContent: 'center',

        marginLeft: '46%',
        marginRight: '40%',
        marginTop: '-5%',
        position: 'absolute',
        top: 0
    },

    containerBottom: {
        flexGrow: 1,
        width: '98%',
        height: '25%',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        marginTop: '62%',
        marginBottom: '-25%',
        backgroundColor: 'rgba(121, 120, 105,0.6)',


        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 55

    },

    email: {
        flexDirection: 'row',

        marginLeft: '5%',
        marginTop: '5%',

    },
    password: {
        flexDirection: 'row',
        marginLeft: '5%',
        marginTop: '3%'
    },

    buttonReg: {
        marginLeft: '6%',
        marginTop: '15%',
        width: '90%'
    },

    input: {
        borderColor: '#dbcfa3',
        borderTopWidth: 0,
        borderBottomWidth: 1,
        width: '76%',
        marginBottom: '2.5%'


    },
    already: {

        marginLeft: '27%',
        marginTop: '2%',
        marginBottom: '13%'
    },

    socialReg: {
        width: '100%',
        paddingLeft: '25%',
        marginTop: '2%',
        marginBottom: '40%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    fb: {
        marginRight: '35%'
    }
});


export default SignUpScreen;