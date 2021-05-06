import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Post from '../Post';
import post from '../../data/post';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import { useCallback } from 'react'

import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import PostDisplayScreen from '../../screens/Main/PostDisplayScreen';

// export function useForceUpdate() {
//     const [, setTick] = useState(0);
//     const update = useCallback(() => {
//         setTick(tick => tick + 1);
//     }, [])
//     return update;
// }
const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataUpdated, setDataUpdated] = useState(false);

    const insets = useSafeAreaInsets();
    const isFocused = useIsFocused();
    const params = useRoute().params;
    const navigation = useNavigation();

    const fetchingPosts = async () => {
        try {

            const postList = [];

            await firestore()
                .collection('posts')
                .orderBy('createdAt', 'desc')
                .get()
                .then((querySnapshot) => {
                    console.log('total posts: ', querySnapshot.size);

                    querySnapshot.forEach(doc => {
                        const { userId, image, content, createdAt, numberOfComments, numberOfLikes } = doc.data();

                        postList.push({
                            id: doc.id,
                            userId,
                            image,
                            content,
                            createdAt,
                            numberOfComments,
                            numberOfLikes

                        })
                    })

                });

            //assigning the above array to post variale
            setPosts(postList);

            if (loading) {
                setLoading(false);
            }

            console.log('Posts: ', postList);

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {

        fetchingPosts();
    }, []);




    useEffect(() => {

        console.log('feed is being refreshed now!');
        fetchingPosts();

    }, [isFocused]);



    return (

        <View style={styles.containerFeed}>


            <FlatList
                contentContainerStyle={{
                    paddingBottom: '10%'
                }}
                showsVerticalScrollIndicator={false}
                data={posts}
                keyExtractor={(item) => item.id}
                extraData={dataUpdated}


                renderItem={({ item, index }) => {
                    //   console.log('Your Item:', item);
                    return (
                        <Post
                            key={index}
                            post={item}

                        //onPress={() => navigation.navigate('PostDisplay', item)}
                        // screenname={"PostDisplay"}
                        // params={item}

                        />
                    )
                }



                }



            />

        </View >

    )
}

const styles = StyleSheet.create({

    containerFeed: {
        marginTop: 35,
        // justifyContent: 'center',
        height: '100%',
        flex: 1,

        marginBottom: 32,



    }
});



export default Feed;