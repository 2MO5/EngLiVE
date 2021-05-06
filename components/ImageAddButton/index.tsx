import { LinearGradient } from 'expo-linear-gradient';
import React, { Component, useState } from 'react';
import { StyleSheet, View, Animated, TouchableHighlight, TouchableOpacity, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// 



const ImageAddButton = () => {

    const [image, setImage] = useState()

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
        outputRange: [100, 38]
    });
    const cameraY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [124, 80]
    });
    const imageX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 175]
    });
    const imageY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [124, 80]
    });



    const photoFromCamera = () => {
        console.warn('from camera')
    }
    const fromGallery = () => {
        console.log('Choose a photo');
        ImagePicker.openPicker({
            width: 1280,
            height: 780,
            cropping: true
        }).then(image => {
            console.log(image);
            const imageURI = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageURI);
        });
    }

    return (
        <View style={{ position: 'absolute', alignItems: 'center', top: '35%', right: '10%', }}>

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
    )
}








const styles = StyleSheet.create({
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
    }
})










export default ImageAddButton


// export class ImageAddButton extends Component {

    //     buttonSize = new Animated.Value(1);
    //     mode = new Animated.Value(0);


    //     addImage = () => {

    //         Animated.sequence([
    //             Animated.timing(this.buttonSize, {
    //                 toValue: 0.95,
    //                 duration: 500,
    //                 useNativeDriver: false
    //             }),

    //             Animated.timing(this.buttonSize, {
    //                 toValue: 1,
    //                 useNativeDriver: false
    //             }),

    //             Animated.timing(this.mode, {
    //                 toValue: this.mode._value === 0 ? 1 : 0,
    //                 useNativeDriver: false
    //             })

    //         ]).start();

    //     }

    //     render() {
    //         const [image, setImage] = useState(null);

    //         // function photoFromCamera() {
    //         //     console.log('Take a photo');
    //         //     ImagePicker.openCamera({
    //         //         width: 1280,
    //         //         height: 780,
    //         //         cropping: true,
    //         //     }).then(image => {
    //         //         console.log(image);
    //         //         const imageURI = Platform.OS === 'ios' ? image.sourceURL : image.path;
    //         //         setImage(imageURI);
    //         //     },
    //         // }

    //         // const chooseFromGallery = () => {
    //         //     console.log('Choose a photo');
    //         //     ImagePicker.openPicker({
    //         //         width: 1280,
    //         //         height: 780,
    //         //         cropping: true
    //         //     }).then(image => {
    //         //         console.log(image);
    //         //         const imageURI = Platform.OS === 'ios' ? image.sourceURL : image.path;
    //         //         setImage(imageURI);
    //         //     });
    //         // },

    //         const sizeStyle = {
    //             transform: [{ scale: this.buttonSize }]
    //         };

    //         const rotation = this.mode.interpolate({
    //             inputRange: [0, 1],
    //             outputRange: ["0deg", "45deg"]
    //         });

    //         const cameraX = this.mode.interpolate({
    //             inputRange: [0, 1],
    //             outputRange: [30, -50]
    //         });
    //         const cameraY = this.mode.interpolate({
    //             inputRange: [0, 1],
    //             outputRange: [124, 80]
    //         });
    //         const imageX = this.mode.interpolate({
    //             inputRange: [0, 1],
    //             outputRange: [30, 108]
    //         });
    //         const imageY = this.mode.interpolate({
    //             inputRange: [0, 1],
    //             outputRange: [124, 80]
    //         });


    //         return (

    //         )
    //     }
    // }



