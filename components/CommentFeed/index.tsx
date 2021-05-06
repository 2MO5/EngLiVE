import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Flatlist } from 'react-native'
import Comments from '../Comments'
import firestore from '@react-native-firebase/firestore';
import { WaveIndicator, DotIndicator, MaterialIndicator, UIActivityIndicator } from 'react-native-indicators';

const CommentFeed = (props) => {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        console.log('props: ', props);
    }, [])
    // const { id } = route.params.post;

    const fetchingComment = async () => {

        // 1.Locate the post.
        // 2. Get to the comments.
        // 3.Get the comments details for each
        // 4.Push it to the new array.
        // 5. Set that to the new state variable

        try {

            const commentList = [];

            await firestore()
                .collection('posts')
                .doc(id)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .get()
                .then((querySnapshot) => {
                    console.log('total comments: ', querySnapshot.size)

                    querySnapshot.forEach(doc => {
                        const { userImage, userName, comment, timestamp } = doc.data();

                        commentList.push({
                            id: doc.id,
                            userImage,
                            userName,
                            comment,
                            timestamp

                        })

                    })

                    setLoading(false);
                    setComments(commentList);


                })
        } catch (error) {
            console.log('This error occurred: ', error)
        }
    }

    return (
        <View style={styles.container} >

            { !loading ? (

                <Flatlist
                    contentContainerStyle={{
                        paddingBottom: '10%'
                    }}
                    showsVerticalScrollIndicator={false}
                    data={comments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {

                        return (
                            <Comments
                                key={index}
                                comment={item}
                                id={id}
                            />
                        )
                    }}

                />
            ) : (

                <UIActivityIndicator color='#4ec2f0' size={30} />

            )}


        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
    }
});

export default CommentFeed
