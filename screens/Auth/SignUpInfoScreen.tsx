import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { View } from '../../components/Themed'
import Video from 'react-native-video';
import { LinearGradient } from 'expo-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const SignUpInfoScreen = () => {

    const [photoUploaded, setPhotoUploaded] = useState(false);

    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [country, setCountry] = useState('');




    const imageUpload = () => {
        console.warn('image upload');
        setPhotoUploaded(true);

        // 1.change and track the input.
        // 2. Take what's being changed.
        // 3. Add it to the db





    }



    const navigation = useNavigation();

    const letsGo = () => {
        console.warn('lets GO!!');
        navigation.navigate('SignUp');

        console.log('First Name : ', fName);
        console.log('Second Name : ', lName);
        console.log('Country : ', country);


        firestore()
            .collection('users')
            .add({

                firstName: fName,
                lastName: lName,
                country: country
            })
            .then(() => {
                console.log('User is added');
            })
            .catch((e) => {
                console.log(e);
            });




    }

    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                //colors={['#102ba7', '#1634b9', '#6065FF', '#6065FF', '#6065FF', '#1634b9', '#1634b9']}
                colors={['#000000', '#A8860B']}
                style={styles.backgroundSecondary}
            >
                <Video
                    source={require('./assets/video-3.mp4')}
                    style={styles.video}
                    // rate={ }
                    // volume={ }
                    // muted={ }
                    resizeMode={'cover'}
                    repeat

                />

                <Image
                    source={require('./assets/designSignup.png')}
                    style={{ position: 'absolute', right: '-40%', top: '-25%' }}
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={imageUpload}
                >
                    {

                        !photoUploaded ? (
                            <Image
                                source={require('./assets/userAdd.png')}
                                style={{ marginTop: '10%', left: '1%' }}
                            />
                        ) : (
                            <Image
                                source={require('./assets/profileImg.png')}
                                style={{ marginTop: '10%', left: '1%', width: 80, height: 92 }}
                            />
                        )

                    }

                </TouchableOpacity>


                <View style={{ backgroundColor: 'transparent', marginTop: '55%' }}>

                    <Image

                        source={require('./assets/Circle.png')}
                        style={{ marginLeft: '60%', marginTop: '-11%' }}
                    />

                    <TextInput
                        value={fName}
                        onChangeText={(input: any) => setFName(input)}
                        placeholder="First Name"
                        style={styles.input}
                        placeholderTextColor={'#fff'}
                        secureTextEntry={false}
                    />
                    <TextInput
                        value={lName}
                        onChangeText={(input: any) => setLName(input)}
                        placeholder="Last Name"
                        style={styles.input}
                        placeholderTextColor={'#fff'}
                        secureTextEntry={false}
                    />
                    <TextInput
                        value={country}
                        onChangeText={(input: any) => setCountry(input)}
                        placeholder="Country"
                        style={styles.input1}
                        placeholderTextColor={'#fff'}
                        secureTextEntry={false}
                    />
                    <Image

                        source={require('./assets/Circle.png')}
                        style={{ marginRight: '60%' }}
                    />

                </View>


                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={letsGo}
                    style={{ backgroundColor: 'transparent', marginTop: '-5%', }}
                >
                    <Image
                        source={require('./assets/GetinbtnNEW.png')}
                        style={styles.getInBtn}
                    />
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    video: {
        height: '100%',
        position: 'absolute',
        zIndex: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: .34,

    },
    backgroundSecondary: {
        shadowColor: '#1a1a1d',
        shadowRadius: 45,
        shadowOffset: { height: 10, width: 5 },
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',

    },

    getInBtn: {
        //position: 'absolute',
        marginTop: '20%',
        marginLeft: '20.5%',
        marginRight: '15%'
    },
    input: {
        borderColor: '#f1e7bf',
        borderTopWidth: 0,
        borderBottomWidth: 1,
        width: '180%',
        paddingRight: '50%',
        marginBottom: '2.5%',
        marginLeft: '4%',
        //marginTop: '10%'


    },
    input1: {
        borderColor: '#f1e7bf',
        borderTopWidth: 0,
        borderBottomWidth: 1,
        width: '180%',
        paddingRight: '55%',
        marginBottom: '2.5%',
        marginLeft: '4%',
        //marginTop: '10%'


    },
});

export default SignUpInfoScreen
