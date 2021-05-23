import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const FriendExisting = () => {

    let width, height, resolution;

    width = Dimensions.get('window').width;
    height = Dimensions.get('window').height;

    resolution = height / width;
    return (
        <View style={styles.container}>

            <View style={styles.containerLeft}>
                <View style={styles.leftCircle}>
                    <Image
                        source={{ uri: 'https://media.istockphoto.com/photos/happy-smiling-man-looking-away-picture-id1158245623?k=6&m=1158245623&s=612x612&w=0&h=y0LbpRFMHMj_9YC_kpKvLYcijEunxP27KyjXBrDHcFg=' }}
                        style={styles.leftAvatar}
                    />
                </View>
            </View>
            <View style={styles.containerRight}>
                <Text style={{ fontFamily: 'Roboto', fontSize: resolution / .10, fontWeight: 'bold', position: 'absolute', top: resolution / .13, left: resolution / .05 }} >Jake Jack</Text>
                <TouchableOpacity activeOpacity={0.8}>
                    <Image
                        source={require('../../../screens/Main/assets/view.png')}
                        style={{ marginTop: resolution / .08, }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',

        flexDirection: 'row',


        height: '25%',

        paddingLeft: '10%',
        paddingRight: '10%',
        marginBottom: '-2%',

    },
    containerLeft: {
        height: '100%',
        width: '30%',



        alignItems: 'center',
        justifyContent: 'center',

        flexDirection: 'column'
    },

    leftCircle: {
        width: '70%',
        height: '70%',
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

        justifyContent: 'center',
        alignItems: 'center',
    },

})
export default FriendExisting
