import React from 'react'
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native'

import top from '../../Main/assets/designFriendReq.png';
import bottom from '../../Main/assets/friendRebBtm.png';
import back from '../../Main/assets/backBtn.png';
import RequestedFriends from '../../../components/Friend/Requested';
import FeedRequested from '../../../components/Friend/Requested/FeedRequested';

const FriendRequests = (props) => {

    let width, height, resolution;

    width = Dimensions.get('window').width;
    height = Dimensions.get('window').height;

    resolution = height / width;

    return (
        <View style={styles.container}>

            <View style={styles.containerTop}>

                <Image source={top} style={{ position: 'absolute', top: resolution * -100, left: resolution * -70, zIndex: 900 }} />
                <TouchableOpacity
                    style={{ zIndex: 10000, marginTop: '10%', marginLeft: '3%', position: 'absolute', top: resolution * -1, left: resolution * 3 }}
                    onPress={() => props.navigation.navigate('FriendScreen')}
                >
                    <Image source={back} />
                </TouchableOpacity>
            </View>
            <View style={{
                zIndex: 1000, marginTop: resolution * 70
            }}>
                <FeedRequested />



            </View>
            <View style={styles.containerBottom}>
                <Image source={bottom} style={{ position: 'absolute', bottom: resolution * -150, left: resolution * -280 }} />
            </View>

        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerTop: {
        width: '100%',

    },
    containerMid: {
        zIndex: 1000,


    },
    containerBottom: {}
})

export default FriendRequests
