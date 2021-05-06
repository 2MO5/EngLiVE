import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-elements';
import { UserType } from '../../types';


export type ProfilePictureProps = {

    user: UserType
}


const ProfilePicture = ({ user }: ProfilePictureProps) => {


    return (
        <View style={styles.container}>
            <Avatar

                size="small"
                rounded
                containerStyle={{ padding: 1.5, marginTop: 1.5, marginBottom: 1.5, marginRight: 1 }}
                source={{
                    uri: user.image
                }}


            />
        </View>
    )
}

export default ProfilePicture;


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        borderColor: '#52C083',
        borderWidth: 1.5,
        width: 40,
        height: '100%',
        zIndex: 10,
        borderRadius: 500,

        paddingLeft: 1,
        marginRight: 2.5
    },

    img: {

    }
});
