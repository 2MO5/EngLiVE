import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'



const NewPostButton = () => {


    const navigation = useNavigation();

    const addPost = () => {
        navigation.navigate('AddPost');
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.postBtn}
            onPress={addPost}
        >

            <Image


                source={require('../../assets/images/btnAdd.png')}

            />

        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({



    postBtn: {
        position: 'relative',
        bottom: '54%',
        right: '-65%',
        zIndex: 400000



    }
})




export default NewPostButton;
