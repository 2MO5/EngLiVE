import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import RequestedFriends from './index';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../navigation/AuthProvider';

import { Chase, Bounce, CircleFade, Wander, Grid, Swing, Circle, Fold, Pulse } from 'react-native-animated-spinkit'

const FeedRequested = () => {

    const [requestedFriends, setRequestedFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useContext(AuthContext);

    const fetchingTheRequests = async () => {

        //     1.Locate the user
        //     2. Get the data: first the id and then the details
        //     3. Put 'em to an array and set it to a state variable. 
        // 4. Pass that to the flatlist
        let arrayRequestTmp: any = []
        let requestList: any = [];

        //first getting the ids
        firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then(documentSnapshot => {
                const { receivedRequests } = documentSnapshot.data();

                arrayRequestTmp = receivedRequests;

                console.log('@32: ', arrayRequestTmp);

                arrayRequestTmp.forEach(doc => {
                    console.log('@35: ', arrayRequestTmp.length);
                    //getting the data for each id
                    let id = doc.friendsId;
                    let requestedAt = doc.requestReceievedAt;

                    firestore()
                        .collection('users')
                        .doc(id)
                        .get()
                        .then(documentSnapshot => {
                            const { firstName, lastName, userImage } = documentSnapshot.data();

                            console.log('@46: ', firstName);

                            requestList.push({
                                id: id,
                                firstName,
                                lastName,
                                userImage,
                                requestedAt: requestedAt
                            })
                            setRequestedFriends(requestList);
                            console.log('@59: ', requestedFriends);
                        })


                })

                if (loading) {
                    setLoading(false);

                }


                console.log('@54: ', requestList);
            })

    }

    useEffect(() => {
        fetchingTheRequests();
    }, [RequestedFriends]);

    return (
        <View style={styles.container}>
            {
                loading ? (

                    <Circle size={120} color="#775d2ff8" style={{ marginTop: '60%', marginBottom: '30%' }} />
                ) : (
                    <FlatList
                        contentContainerStyle={{ paddingTop: 15, paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                        data={requestedFriends}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => {
                            console.log('@91: ', item)
                            return (
                                <RequestedFriends
                                    key={index}
                                    requestedFriend={item}
                                />
                            )
                        }}
                    />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export default FeedRequested