import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { CommentType, PostType, UserType } from '../../types'
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../navigation/AuthProvider';


export type CommentProps = {

    comments: CommentType,
}
const Comments = ({ id, comments }) => {

    const { user } = useContext(AuthContext);
    //comments data are taken from the data passed to it in the mainscreen
    let isLiked, commentLikes;


    const [userLiked, setUserLiked] = useState(true);
    const [likedList, setLikedList] = useState([]);

    const userId = user.uid;


    useEffect(() => {

        let started = true;

        // console.log('@24 post id ==> ', id);
        // console.log('@useEffect29 ==>comment id: ', comments.id);
        // console.log('@useEffect30==> commentor name: ', comments.userName);
        // console.log('commentor image: ', comments.userImage);
        // console.log('comment: ', comments.comment);
        // console.log('comment likes: ', comments.likes);
        // console.log('comment posted at: ', comments.timestamp);

        likesOnLoad();

        setUserLiked(isLiked);
        console.log('@43 : ', userLiked);
        return () => {
            started = false;
        }

    }, [])



    // 1. locate the comment 
    // 2. Add the user who liked ==> with a state variable. By pushing it.
    // 3.update the likecount. 
    // 4. display accordingly JSX

    // ------->For Comments of the Posts<-------

    const firestoreRef = firestore().collection('posts').doc(id)


    const CommentLikeOnClick = async () => {

        const commentId = comments.id;
        console.log('@62 id of the comment: ', commentId);


        await firestoreRef
            .get()
            .then(documentSnapshot => {
                let { comments } = documentSnapshot.data();
                console.log('@57: ', comments)

                let commentData = comments;
                let newComment;

                const comments1 = Object.values(commentData);
                let comments2 = Object.values(comments1);

                console.log('@74: ', comments2)

                comments2.forEach(data => {

                    const commentsArray = Object.values(data);

                    console.log('@58 commentsArray: ', commentsArray);

                    const { comment, likes, theLikedUsers, id } = commentsArray[0];

                    console.log('comment id @56==> ', id);
                    console.log('comment  @56==> ', comment);
                    console.log('Liked users @56==> ', theLikedUsers);
                    console.log('Comment Likes @56==> ', likes);


                    commentLikes = likes;

                    comments.likes = commentLikes;
                    console.log('@103 comment likes: ', comments.likes);
                    // commentsArray.findIndex(obj => {
                    //     obj.id = 
                    // })

                    commentsArray.forEach(doc => {


                        if (doc.id == commentId) {

                            console.log('@70 ==> Doc: ', doc);
                            console.log(typeof doc);

                            let array = [];

                            array = doc;

                            const likedUsers = doc.theLikedUsers;
                            let likedCount = doc.likes;

                            console.log('@73 liked ones: ', likedUsers);

                            if (likedUsers == undefined) {

                                console.log('No users')

                            } else {
                                likedUsers.push({
                                    userId
                                })



                                likedCount = likedCount + 1;

                                console.log('@96 likes: ', likedCount);



                                setLikedList(likedUsers);

                                doc.theLikedUsers = likedUsers;
                                doc.likes = likedCount;

                                console.log('@92 no. of likes: ' + likedCount + ' and the ones who liked are: ' + likedUsers);
                                console.log('@140 New doc: ', doc);
                            }

                            console.log('@82 new liked ones: ', likedUsers);


                            newComment = doc;

                        }


                    })

                    return;

                })


                commentData = comments2;
                console.log('@144 new comments: ', commentData);


                //upadting the db



                firestoreRef

                    .update

                    ({

                        comments: commentData

                    }).then(() => {

                        console.log('@172 updated successfully')

                        // dbObserver.unsubscribe();
                    }).catch((e) => {
                        console.log('@174 error: ', e);
                    })


            })








    }


    const likesOnLoad = async () => {
        await firestoreRef
            .onSnapshot(documentSnapshot => {
                const { comments } = documentSnapshot.data();

                let commentData = comments;


                const comments1 = Object.values(commentData);
                let comments2 = Object.values(comments1);

                comments2.forEach(comment => {

                    const commentsArray = Object.values(comment);

                    commentsArray.forEach(commentVal => {
                        const { comment, likes, theLikedUsers, id } = commentsArray[0];

                        // console.log('@216 comment data: ', commentsArray[0]);
                        // console.log('comment id @216==> ', id);

                        console.log('Liked users @216==> ', theLikedUsers);

                        console.log('@221 array length: ', theLikedUsers.length)

                        for (let i = 0; i < theLikedUsers.length; i++) {
                            if (theLikedUsers[i].usersId == user.uid) {
                                console.log('User has liked this');

                                isLiked = true;

                                console.log('@230 isLiked: ', isLiked);

                            } else {
                                console.log('user has not liked this')
                                isLiked = false;
                                setUserLiked(isLiked);

                                console.log('@237 isLiked: ', isLiked);
                            }



                        }

                        if (isLiked == true) {
                            setUserLiked(true);
                            console.log('@244: ', userLiked)
                        } else {
                            setUserLiked(false);
                        }

                    })
                })
            }


            )
    }
    const commentLike = async () => {

        const commentId = comments.id;
        // 1. Get the comments
        // 2. Check if user exists and put it to a  boolean variable
        //3.

        await firestoreRef
            .onSnapshot(documentSnapshot => {
                const { comments } = documentSnapshot.data();

                let commentData = comments;
                let newComment;

                const comments1 = Object.values(commentData);
                let comments2 = Object.values(comments1);





                comments2.forEach(data => {

                    const commentsArray = Object.values(data);

                    console.log('@228 ', userId);
                    commentsArray.forEach(doc => {

                        if (doc.id === commentId) {
                            const likedUsers = doc.theLikedUsers;

                            console.log('@224 :', likedUsers);
                            console.log('@226 :', likedUsers.length);

                            for (let i = 0; i < likedUsers.length; i++) {

                                let theUser = likedUsers[i];


                                console.log('@233: ', theUser);
                                console.log('@234: ', theUser.userId);
                                if (theUser.userId == user.uid) {

                                    console.log(' @231: user Exists');
                                    isLiked = true;

                                    setUserLiked(!isLiked);

                                } else {
                                    console.log('@231: user does not exist');
                                    isLiked = false;

                                    setUserLiked(!isLiked);
                                }

                                //console.log('@225 : ', isLiked);
                            }

                        }
                    })



                })



            })
    }

    const commentUnlike = () => {

    }

    const addLike = () => {
        CommentLikeOnClick();
        //commentLike();
        console.log('@41 addLike() is working')
        likesOnLoad();

        //1. Find the post
        //2.Locate the comment in the comment array.
        //3. Locate the like field.
        //4. Add one to it.

        //take the state variable and check it in JSX

        const increment = firestore.FieldValue.increment(1);

        // firestore()
        //     .collection('posts')
        //     .doc(id)
        //     .update({
        //         comments: firestore.FieldValue.arrayUnion({
        //             likes: increment
        //         })
        //     })



    }
    const dropLike = () => {
        setLiked(false);
        const decrement = firestore.FieldValue.increment(-1);

        // firestore()
        //     .collection('posts')
        //     .doc(id)
        //     .update({
        //         comments: firestore.FieldValue.arrayUnion({
        //             likes: decrement
        //         })
        //     })
    }






    return (
        <View>
            <View style={styles.container}>
                {/* <Image
                    source={require('../../screens/Main/assets/lineComment.png')}
                    style={{ height: 2.2, marginTop: '5%' }}
                /> */}

                <View style={styles.containerComment}>
                    <View style={styles.commentPoster}>
                        <View style={styles.posterAvatar}>

                            <View style={styles.circle}></View>
                            <Image
                                style={styles.avatar}
                                source={{ uri: comments.userImage }}


                            />
                            <View style={styles.likes}>
                                <AntDesign name="heart" size={10} color="#7A8FA6" style={{ marginLeft: '25%', marginTop: '1%' }} />
                                <Text style={{ fontSize: 9, marginLeft: '3%' }}>{comments.likes}</Text>
                            </View>

                        </View>


                    </View>
                    <View style={styles.commentDetails}>

                        <View style={styles.detailsComment}>
                            <Text style={styles.commentName}>{comments.userName}</Text>
                            <Text style={styles.comment}>
                                {
                                    comments.comment

                                }
                            </Text>
                        </View>
                        <View style={styles.detailsOther}>
                            {/* t  <Texstyle={{ fontSize: 13, marginTop: -32, marginBottom: '17%', color: '#ACACAC' }}>{moment(comment.posteddAt).fromNow()}</Text> */}
                            {
                                !userLiked ? (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={addLike}
                                    >
                                        <EvilIcons name="heart" size={22} color="#7A8FA6" />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={dropLike}
                                    >
                                        <Image
                                            source={require('../../screens/Main/assets/cmtLike.png')}


                                        />
                                    </TouchableOpacity>
                                )
                            }

                        </View>
                        {/* 1.Posters details: name and comment
                        2.Other details:  time and like       */}
                    </View>




                </View>

                <Image
                    source={require('../../screens/Main/assets/lineComment.png')}
                    style={{ height: 3, marginBottom: '-8%' }}
                />

            </View>


        </View>



    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 150,
        backgroundColor: '#ffffff',
        shadowColor: '#141414',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 15,
        borderRadius: 12,

        paddingBottom: '-1%',
        marginTop: 15,

        position: 'relative',
        //zIndex: 1000
    },


    containerComment: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        marginTop: 5,
        marginBottom: 5

    },

    commentPoster: {
        flexDirection: 'column',
        //backgroundColor: 'red',
        width: '30%',
        height: '100%'

    },

    commentDetails: {
        flexDirection: 'row',
        width: '70%',
        height: '100%',
        marginLeft: '-10%'
    },


    posterAvatar: {
        //backgroundColor: 'red'
        flexDirection: 'column',
        marginTop: '-3.5%'

    },


    likes: {
        flexDirection: 'row',
        marginTop: '1%'
    },

    posterLike: {
        marginLeft: '15%',
        marginTop: '3%'
    },


    detailsComment: {
        flexDirection: 'column',
        marginRight: '16%'
    },

    detailsOther: {
        marginTop: '15%',
        marginLeft: '-5%'

    },

    commentName: {
        marginBottom: '.0%',
        color: '#040f1b',
        fontWeight: 'bold',
        fontSize: 10,
    },
    comment: {
        fontSize: 11
    },

    //   detailsOther: {},


    circle: {
        backgroundColor: 'transparent',
        borderColor: '#83d7dd',
        borderWidth: 2.5,
        width: 50,
        height: 50,


        zIndex: 10,
        borderRadius: 100,
        alignContent: 'center',
        alignItems: 'center',

        marginTop: '8%',
        marginLeft: '10%',

        position: 'relative',



    },
    avatar: {

        position: 'absolute',
        top: '23.5%',
        left: '15%',

        // marginLeft: '13%',
        // marginTop: '9%',
        width: '30%',
        height: '49%',
        borderRadius: 999
    },
});


export default Comments;
