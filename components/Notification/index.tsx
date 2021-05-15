import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';


const Notification = () => {
    return (
        <View style={styles.container}>
            <View style={styles.containerUser}>
                <Image
                    style={{ position: 'relative', width: 60, height: 60, borderRadius: 99 }}
                    source={{ uri: 'https://www.ub.edu/web/ub/galeries/imatges/noticies/2019/04/IMG_0043_Pilar_Cayero.jpg' }}
                />

                <Image
                    style={{ position: 'absolute', bottom: 5, left: '66%' }}
                    source={require('../../screens/Main/assets/heart.png')}
                />

            </View>
            <View style={styles.containerDetails}>

                <Text style={styles.detailsNotification}> Jane Doe dropped a heart {"\n"} on your new post </Text>

                <Text style={styles.detailsTime}> about 10 minutes ago</Text>
            </View>
            <View style={styles.containerDot}>
                <Image

                    source={require('../../screens/Main/assets/dot.png')}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingLeft: '3%',
        marginLeft: '1%',
        marginTop: '5%',
    },

    containerUser: {

    },


    containerDetails: {
        flexDirection: 'column',
        marginLeft: '-3%',

    },

    detailsNotification: {

        marginTop: '1%',
        fontSize: 16,
        fontWeight: '200',
        color: '#68571B'
    },

    detailsTime: {

        marginTop: '5%',
        fontSize: 12,
        color: '#cea40b'
    },

    containerDot: {

        justifyContent: 'center',
        alignItems: 'center'
    },

})


export default Notification;