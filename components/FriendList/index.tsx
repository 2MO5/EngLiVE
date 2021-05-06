import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { UserType } from '../../types';
import data from '../../data/post';
import ProfilePicture from '../ProfilePicture';


const FriendList = () => {

    //console.log()
    return (
        <View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>

                    <ProfilePicture
                        user={item.user}

                    />


                }

            />

        </View>
    );
}

export default FriendList;

