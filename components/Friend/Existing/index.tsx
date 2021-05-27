import React, { useEffect } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import navigation from '../../../navigation';
import { FriendExistingType } from '../../../types';

export type FriendExistingProps = {
    friend: FriendExistingType
}

const FriendExisting = ({ friend, props }: FriendExistingProps) => {

    let width, height, resolution;
    let image: string, firstName: string, lastName: string, timestamp: string

    width = Dimensions.get('window').width;
    height = Dimensions.get('window').height;

    resolution = height / width;

    image = friend.userImage
    firstName = friend.firstName
    lastName = friend.lastName
    timestamp = friend.timestamp

    useEffect(() => {
        console.log('@26: first name is', firstName, 'last name is', lastName, 'of ', image);
    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.containerLeft}>
                <View style={styles.leftCircle}>
                    <Image
                        source={{ uri: image }}
                        style={styles.leftAvatar}
                    />
                </View>
            </View>
            <View style={styles.containerRight}>
                <Text style={{ fontFamily: 'Roboto', fontSize: resolution / .10, fontWeight: 'bold', position: 'absolute', top: '-100%', left: '16%' }} >{firstName} {lastName}</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => props.navigation.navigate('FriendProfile', { id: friend.id })}
                >
                    <Image
                        source={require('../../../screens/Main/assets/view.png')}
                        style={{ marginTop: '10%', }}
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
        marginBottom: 35,

    },
    containerLeft: {
        height: '100%',
        width: '30%',



        alignItems: 'center',
        justifyContent: 'center',

        flexDirection: 'column'
    },

    leftCircle: {
        width: 75,
        height: 75,
        borderRadius: 100,
        borderColor: '#AA9138',
        borderWidth: 1.5,

        marginBottom: '15%',
        marginLeft: '20%'
    },

    leftAvatar: {
        width: '80%',
        height: '80%',
        borderRadius: 100,

        position: 'absolute',
        top: 6,
        left: 8,
    },
    containerRight: {

        height: '100%',
        width: '70%',

        justifyContent: 'center',
        alignItems: 'center',

    },

})
export default FriendExisting
