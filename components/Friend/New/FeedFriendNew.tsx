import React, { useContext, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import friendsData from '../../../data/friends'
import { AuthContext } from '../../../navigation/AuthProvider';
import Friend from './index';
import firestore from '@react-native-firebase/firestore';
import { WaveIndicator, DotIndicator, MaterialIndicator, UIActivityIndicator } from 'react-native-indicators';

const FeedFriendNew = () => {
    const { user } = useContext(AuthContext);

    const [friends, setFriends] = useState([]);
    const [requestedPeople, setRequestedPeople] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newFriends, setNewFriends] = useState([]);

    let usersFriends: any = [];
    let requestedOnes: any = [];
    let isFriend: boolean, isRequested: boolean;

    const userId = user.uid;
    // 1. Locate the user id.
    // 2. Go to the user collection.
    // 3. Get all the users except the current user, requested users and the ones who are already friends
    // 4. Add that to a state variable and pass it to the flatlist    

    useEffect(() => {
        fetchingTheUsers();
    }, [])


    const fetchingTheFriends = async () => {
        try {

            //Locate the user and get all the friends and
            await
                firestore()
                    .collection('users')
                    .doc(userId)
                    .onSnapshot(documentSnapshot => {

                        const { receivedRequests, friends } = documentSnapshot.data();

                        usersFriends = friends; //all the friends
                        requestedOnes = receivedRequests; //all the requested

                    })




        } catch (e) {
            console.log('This error occurred: ', e)
        }
    }


    const fetchingTheUsers = async () => {

        await fetchingTheFriends();

        try {

            const friendList = [];

            await
                firestore()
                    .collection('users')
                    .get()
                    .then((querySnapshot) => {

                        querySnapshot.forEach(doc => {
                            const { firstName, lastName, userImage } = doc.data();

                            console.log('@33 ', doc.id);

                            //Take the data if the id is not equal to user.uid , one of the friends or requested ones

                            if (doc.id !== userId) {

                                isFriend = usersFriends.includes(doc.id);
                                isRequested = requestedOnes.includes(doc.id);

                                console.log('isFriend: ', isFriend)
                                console.log('isRequested: ', isRequested)

                                //if both the above are false and also the id is not equal to user.uid
                                if ((isFriend === false) && (isRequested === false)) {

                                    console.log('Working on to get the newFriends')
                                    friendList.push({
                                        id: doc.id,
                                        firstName,
                                        lastName,
                                        userImage
                                    })


                                    console.log('@96: ', friendList);
                                    return;
                                }
                            }

                        })

                    })

            setNewFriends(friendList);
            console.log('@103: ', newFriends);

            if (loading) {
                setLoading(false);
            }


        } catch (e) {
            console.log('This error occurred @fetchingTheUsers: ', e)
        }



    }

    return (
        <View>
            { !loading ? (
                <FlatList
                    contentContainerStyle={{ paddingBottom: '20%', paddingTop: '10%', }}
                    showsVerticalScrollIndicator={true}
                    data={newFriends}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        return (
                            <Friend
                                key={index}
                                friend={item}

                            />
                        )
                    }}
                />
            ) : (

                <DotIndicator color='#e4d236' size={10} />
            )}
        </View>
    )
}

export default FeedFriendNew
