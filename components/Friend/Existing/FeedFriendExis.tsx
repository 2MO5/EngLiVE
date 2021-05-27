import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import FriendExisting from '.'
import friendsData from '../../../data/friends'

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../navigation/AuthProvider';

const FeedFriendExis = ({ theProps }) => {
    const { user } = useContext(AuthContext);
    const [theFriends, setTheFriends] = useState([]);

    const fetchingTheFriends = async () => {

        //1. Locate the user
        // 2. Take the friend array
        // 3.Put it to another array and take the id 
        // 4. Take the users details with that id and put that into an array
        //5. Set that array into a state
        let theNewArray: any = [], toStateArray: any = [];

        await
            firestore()
                .collection('users')
                .doc(user.uid)
                .get()
                .then(documentSnapshot => {
                    const { friends } = documentSnapshot.data();

                    // 1.Get the id
                    // 2.Get the details

                    theNewArray = friends

                    theNewArray.forEach(doc => {
                        let id: string, timestamp: string;

                        id = doc.friendsId; //getting the id
                        timestamp = doc.friendSince;

                        firestore()
                            .collection('users')
                            .doc(id)
                            .get()
                            .then(documentSnapshot => {
                                const { firstName, lastName, userImage } = documentSnapshot.data();


                                toStateArray.push({
                                    id: id,
                                    firstName: firstName,
                                    lastName: lastName,
                                    userImage: userImage,
                                    timestamp: timestamp,

                                })

                                setTheFriends(toStateArray);
                            })

                    })


                })


    }

    useEffect(() => {
        fetchingTheFriends();
    }, [])




    return (
        <View>
            <FlatList
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 40, }}
                showsVerticalScrollIndicator={true}
                data={theFriends}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                    return (
                        <FriendExisting
                            key={index}
                            friend={item}
                            props={theProps}

                        />
                    )
                }}
            />
        </View>
    )
}

export default FeedFriendExis
