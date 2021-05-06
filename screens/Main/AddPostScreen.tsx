import React, { useContext, useEffect, useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TextInput, Platform, ScrollView, Animated, Alert } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { LinearGradient } from 'expo-linear-gradient';
import ImageAddButton from '../../components/ImageAddButton';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import storage from '@react-native-firebase/storage';
//import { BallIndicator,BarIndicator, MaterialIndicator,PacmanIndicator,PulseIndicator,SkypeIndicator,UIActivityIndicator} from 'react-native-indicators';
import {WaveIndicator, DotIndicator,MaterialIndicator,UIActivityIndicator} from 'react-native-indicators';
import {AuthContext} from "../../navigation/AuthProvider";
import firestore from '@react-native-firebase/firestore';




const AddPostScreen = () => {
    
    const {user, logout} = useContext(AuthContext);
    
    const [content, setContent] = useState({}); 
    const [text, setText] = useState('');


    const [image, setImage] = useState(null);
    const [post, setPost ] = useState(null);
 
    const [uploading, setUploading] = useState(false);
    const [transfered, setTransfered] = useState(0);

    const [userImage, setUserImage] = useState();
    const [firstName, setFirstName] = useState();

    // useEffect(() => {

    // }, [])


    const buttonSize = new Animated.Value(1);
    const mode = new Animated.Value(0);


    const addImage = () => {

        Animated.sequence([
            Animated.timing(buttonSize, {
                toValue: 0.95,
                duration: 500,
                useNativeDriver: false
            }),

            Animated.timing(buttonSize, {
                toValue: 1,
                useNativeDriver: false
            }),

            Animated.timing(mode, {
                toValue: mode._value === 0 ? 1 : 0,
                useNativeDriver: false
            })

        ]).start();

    }




    const sizeStyle = {
        transform: [{ scale: buttonSize }]
    };

    const rotation = mode.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "45deg"]
    });

    const cameraX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 98]
    });
    const cameraY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [124, 80]
    });
    const imageX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [30, -38]
    });
    const imageY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [124, 80]
    });



    const cameraX2 = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 30]
    });
    const cameraY2 = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [124, 184]
    });
    const imageX2 = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 30]
    });
    const imageY2 = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [124, 234]
    });



    const photoFromCamera = () => {
        console.log('from camera');
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7,
        }).then((image) => {
            console.log(image);
            const imageURI = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageURI);
        }).catch((error) => {
            console.log( 'This error occurred: ', error);
            Alert.alert('Why did you cancel it? ');
        });  
    }
    const fromGallery = () => {
        console.log('Choose a photo');
        ImagePicker.openPicker({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7,
        }).then(image => {
            console.log(image);
            const imageURI = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageURI);
        }).catch((error) => {
            console.log( 'This error occurred: ', error);
            Alert.alert('Why did you cancel it? ');
        });
    }
    const loadingTheUser = async () => {
        firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot(documentSnapshot => {

                const { userImage, firstName } = documentSnapshot.data();

                setUserImage(userImage);
                setFirstName(firstName);
            })
    }


    useEffect(() => {
        loadingTheUser();
    })
    //adding to db 

    //uploadint the Full Post
    const postSubmit = async () => {
        console.log(user.uid)
        const imageUrl = await imageUpload();

        firestore()
        .collection('posts')
        .add({
            userId: user.uid,
            userName: firstName,
            userImage:userImage,
            image: imageUrl,//takes the image from the image upload
            content: post,//from the textinput
            createdAt: firestore.Timestamp.fromDate(new Date()),
            numberOfLikes: 0,
            numberOfComments: 0,
            likedUsers: [{ 
                userId: 'testID',
                
            }],
            // comments: [{

            //     [firestore.Timestamp.fromDate(new Date())] : {
            //         userName: 'testUser',
            //         userImage: 'https://media.istockphoto.com/photos/happy-smiling-man-looking-away-picture-id1158245623?k=6&m=1158245623&s=612x612&w=0&h=y0LbpRFMHMj_9YC_kpKvLYcijEunxP27KyjXBrDHcFg=',
            //         comment: 'testComment',
            //         likes: 12,
            //     }
           
                
            // }],
        })
        .then(() => {
            console.log('Post is added!');
            Alert.alert(
                'Post Published!',
                'Post is added successfully to the community!'
            )
            setPost(null);
        })
        .catch((error) => {
            console.log( 'This error occurred: ', error);
        })  
    }


    //uploading the image
    const imageUpload = async () => {

        const uploadURI = image;
        let fileName = uploadURI.substring(uploadURI.lastIndexOf('/') + 1);
        const reference = storage().ref(fileName);

        
        //adding time

        const extension = fileName.split('.').pop();
        const name = fileName.split('.').slice(0, -1).join('.');
        fileName = name + Date.now() + '.' + extension


        setUploading(true);
        setTransfered(0);

        console.log(uploadURI);
        console.log(name);
        


        const storageRef = storage().ref(`photos/${fileName}`)
        const task = storageRef.putFile(uploadURI);
        //const task = reference.putFile(uploadURI);

        task.on('state_changed', (taskSnapshot) => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

            setTransfered(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
            );
        })

        try {

            await task;

            const downURL = await storageRef.getDownloadURL();

            const reference = storage().ref(fileName);
            await reference.putFile(uploadURI);


           
            Alert.alert(
                'Image Uploaded!',
                'You can see it in the community now!'
            );
            setUploading(false);
            //console.log(downURL);
            
            setImage(null);
            console.log('uploading done!');
            console.log(fileName); 
            console.log(downURL); 
           return downURL; //downloaded from db to upload into the function

        
           

        } catch (e) {
            console.log(e)
            return null;
        }

        

    }


    
    return (
        <SafeAreaView style={styles.container}>



            <View>


                {
                    !uploading ? (
                        <Image
                            source={{ uri: image }}
                            style={styles.image}

                        />
                    ) : (
                        null
                    )
                }


                {(image == null && !uploading) ? (
                   <Image
                   source={require('../Main/assets/design-addpost.png')}
                   style={styles.design}
               />
                ) : (
                 null
                )}



                {
                    uploading? (null) : (

                        image == null ? (
                            <View style={styles.imgBtn}>
    
                                {/* ===Camera== */}
                                <Animated.View style={{ position: 'absolute', top: cameraY, left: cameraX }}>
    
                                    <TouchableOpacity
                                        onPress={photoFromCamera}
                                    >
                                        <View
                                            style={styles.btnSecondaryCamera}
    
                                        >
                                            <LinearGradient
                                                // Background Linear Gradient
                                                colors={['#31CDAE', '#60C3FF']}
                                                style={styles.backgroundSecondary}
                                            >
                                                <Ionicons name="ios-camera-outline" size={20} color="#fff" />
                                            </LinearGradient>
    
                                        </View>
                                    </TouchableOpacity>
    
    
                                </Animated.View>
    
                                {/* ===Image== */}
                                <Animated.View style={{ position: 'absolute', top: imageY, left: imageX }}>
    
                                    <TouchableOpacity
                                        onPress={fromGallery}
                                    >
                                        <View style={styles.btnSecondaryImage}>
                                            <LinearGradient
                                                // Background Linear Gradient
                                                colors={['#31CDAE', '#60C3FF']}
                                                style={styles.backgroundSecondary}
                                            >
                                                <MaterialIcons name="image-search" size={20} color="#fff" />
                                            </LinearGradient>
    
                                        </View>
                                    </TouchableOpacity>
    
    
                                </Animated.View>
    
                                {/* ===Main== */}
                                <Animated.View style={[styles.button, sizeStyle]}>
    
    
                                    <TouchableHighlight onPress={addImage} underlayColor="#f4f4f4">
                                        <LinearGradient
                                            // Background Linear Gradient
                                            colors={['#5574F7', '#60C3FF']}
                                            style={styles.background}
                                        >
    
                                            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                                                <Ionicons name="add" size={25} color="#fff" />
                                            </Animated.View>
    
                                        </LinearGradient>
                                    </TouchableHighlight>
    
                                </Animated.View>
    
    
                            </View>
    
                        ) : (
                            <View style={styles.imgBtnOn}>
    
                                {/* ===Camera== */}
                                <Animated.View style={{ position: 'absolute', top: cameraY2, left: cameraX2 }}>
    
                                    <TouchableOpacity
                                        onPress={photoFromCamera}
                                    >
                                        <View
                                            style={styles.btnSecondaryCamera}
    
                                        >
                                            <LinearGradient
                                                // Background Linear Gradient
                                                colors={['#31CDAE', '#60C3FF']}
                                                style={styles.backgroundSecondary}
                                            >
                                                <Ionicons name="ios-camera-outline" size={20} color="#fff" />
                                            </LinearGradient>
    
                                        </View>
                                    </TouchableOpacity>
    
    
                                </Animated.View>
    
                                {/* ===Image== */}
                                <Animated.View style={{ position: 'absolute', top: imageY2, left: imageX2 }}>
    
                                    <TouchableOpacity
                                        onPress={fromGallery}
                                    >
                                        <View style={styles.btnSecondaryImage}>
                                            <LinearGradient
                                                // Background Linear Gradient
                                                colors={['#31CDAE', '#60C3FF']}
                                                style={styles.backgroundSecondary}
                                            >
                                                <MaterialIcons name="image-search" size={20} color="#fff" />
                                            </LinearGradient>
    
                                        </View>
                                    </TouchableOpacity>
    
    
                                </Animated.View>
    
                                {/* ===Main== */}
                                <Animated.View style={[styles.button, sizeStyle]}>
    
    
                                    <TouchableHighlight onPress={addImage} underlayColor="#f4f4f4">
                                        <LinearGradient
                                            // Background Linear Gradient
                                            colors={['#5574F7', '#60C3FF']}
                                            style={styles.background}
                                        >
    
                                            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                                                <Ionicons name="add" size={25} color="#fff" />
                                            </Animated.View>
    
                                        </LinearGradient>
                                    </TouchableHighlight>
    
                                </Animated.View>
    
    
                            </View>
    
                        )


                    )
                }






                {
                    (image == null) ? (
                    
                       
                         <Text style={styles.txtWelcome}>

                            Hello there! Click + to add your image!
    
                        </Text>
                  

                    ) : (
                       
                        uploading ? (null) : (
                            <TextInput
                            style={styles.textInput}
                            placeholder="What's on your mind?"
                            placeholderTextColor={'#1d0fe4'}
                            multiline={true}
                            value={post}
                            onChangeText={(theInput: any) => setPost(theInput)}
                        />
                        )

                    )
                }









            </View>

            {
                uploading ? (
                    <View style={styles.spinner}>
                        <MaterialIndicator color='#4ec2f0' size={230} />
                        <View style={styles.btmProgress}>
                     
                            <Text style={styles.txtTransfer}> {transfered}% of your image is uploaded! </Text>
                            <DotIndicator color='#97d9f7' size={5} />
                       </View>
                    </View>
                ) : (
                   null
                )
            }




            <View style={styles.btn}>


                {
                    //if there's both image and no uploadings
                    (image !== null && !uploading) ? (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={postSubmit}
                        >

                            <Image
                                source={require('../Main/assets/postBtn1.png')}

                            />
                        </TouchableOpacity>
                    ) : (
                        <Text></Text>
                    )
                }


                {/* 
                {
                    uploading ? (
                        <Text>{transfered}% of your image is uploaded!</Text>
                    ) : (

    )
                } */}



            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    image: {
        zIndex: 111111100,
        width: '110%',
        height: '160%',

        position: 'absolute',
        top: '-142%',
        left: '-27%',

    },



    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    container: {
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        backgroundColor: '#f4f4f4',

        justifyContent: 'center',
        alignItems: 'center'
    },

    design: {


        width: '120%',

        // backgroundColor: 'red',

        position: 'absolute',
        bottom: 121,
        left: '-55%',




    },






    circle: {
        backgroundColor: 'transparent',
        borderColor: '#ffffff',
        borderWidth: 1.5,
        width: '15%',
        height: '17%',

        position: 'absolute',
        top: "-38%",
        left: '13.9%',

        zIndex: 10000000,
        borderRadius: 500,
        alignContent: 'center',
        alignItems: 'center',



    },
    avatar: {

        marginTop: '4.4%',
        width: '86%',
        height: '88%',
        borderRadius: 999
    },

    txtWelcome: {

        position: 'absolute',
        fontSize: 15,
        right: '-32%',
        bottom: '-20%',
        marginTop: '15%',
        marginBottom: -132

    },


    textInput: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 22,
        textAlign: 'center',
        width: '115%',
        marginBottom: 36,
        marginTop: 92,

        marginLeft: '-5%',


        maxWidth: '55%',




    },



    imgBtn: {

        position: 'absolute',
        right: '14%',
        top: -134

    },
    imgBtnOn: {

        position: 'absolute',
        left: '-29%',
        top: '-19%'

    },

    btn: {
        width: '100%',
        //height: '15%',
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        //zIndex: 999999999999
        // marginRight: '15%'

    },
    button: {

        alignItems: 'center',
        justifyContent: 'center',
        width: 42,
        height: 42,
        borderRadius: 136,

        position: 'absolute',
        top: 130,
        left: 30,

        zIndex: 999999
    },
    background: {
        zIndex: 999999,
        shadowColor: '#1a1a1d',
        shadowRadius: 45,
        shadowOffset: { height: 10, width: 5 },
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 136,

    },
    btnSecondaryCamera: {
        // position: 'absolute',
        // bottom: -272,
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45,
        zIndex: -999999

        // display: 'none',
        // backgroundColor:

    },
    btnSecondaryImage: {
        // position: 'absolute',
        // bottom: -182,
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45,
        zIndex: -999999
        // backgroundColor:

    },
    backgroundSecondary: {
        shadowColor: '#1a1a1d',
        shadowRadius: 45,
        shadowOffset: { height: 10, width: 5 },
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 136,
    },

    spinner: {
        width: '100%',
        height: '10%',
        marginBottom: '20%'
    },
    btmProgress: {
        marginTop: '35%',
        width: '100%',
        flexDirection: 'column',
    },

    barloader: {

    },
    txtTransfer: {
        marginTop: '35%',
        marginLeft: '25%',
        marginBottom: 10
    }
});

export default AddPostScreen
