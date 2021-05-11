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
const Comments = ({ id, comments, state }) => {

    const { user } = useContext(AuthContext);
    //comments data are taken from the data passed to it in the mainscreen
    let isLiked: boolean, commentLikes;

    // const [isLoaded, set]

    //const [isLoaded, setIsLoaded] = useState(state);

    const [userLiked, setUserLiked] = useState(false);
    const [likedList, setLikedList] = useState([]);
    const [likesCount, setLikesCount] = useState();

    const userId = user.uid;
    let theCommentId: string;

    useEffect(() => {

        let started = true;

        // console.log('@24 post id ==> ', id);
        console.log('@useEffect29 ==>comment id: ', comments.id);
        theCommentId = comments.id;
        // console.log('@useEffect30==> commentor name: ', comments.userName);
        // console.log('commentor image: ', comments.userImage);
        // console.log('comment: ', comments.comment);
        // console.log('comment likes: ', comments.likes);
        // console.log('comment posted at: ', comments.timestamp);



        //setUserLiked(isLiked);
        console.log('@43 : ', userLiked);
        return () => {
            started = false;
        }

    }, [])

    useEffect(() => {

        likesOnLoad();

    }, [])



    // When comments are loaded:
    //1. If user has liked then show the heart filled in ==> By using state variables
    //2. Else show the outlined

    //When user click:
    //1. Filled heart when likes outlined otherwise






    // 1. locate the comment 
    // 2. Add the user who liked ==> with a state variable. By pushing it.
    // 3.update the likecount. 
    // 4. display accordingly JSX

    // ------->For Comments of the Posts<-------

    const firestoreRef = firestore().collection('posts').doc(id)


    // const CommentLikeOnClick = async () => {

    //     const commentId = comments.id;
    //     console.log('@62 id of the comment: ', commentId);


    //     await firestoreRef
    //         .get()
    //         .then(documentSnapshot => {
    //             let { comments } = documentSnapshot.data();
    //             console.log('@57: ', comments)

    //             let commentData = comments;
    //             let newComment;

    //             const comments1 = Object.values(commentData);
    //             let comments2 = Object.values(comments1);

    //             console.log('@74: ', comments2)

    //             comments2.forEach(data => {

    //                 const commentsArray = Object.values(data);

    //                 console.log('@58 commentsArray: ', commentsArray);

    //                 const { comment, likes, theLikedUsers, id } = commentsArray[0];

    //                 console.log('comment id @56==> ', id);
    //                 console.log('comment  @56==> ', comment);
    //                 console.log('Liked users @56==> ', theLikedUsers);
    //                 console.log('Comment Likes @56==> ', likes);


    //                 commentLikes = likes;

    //                 comments.likes = commentLikes;
    //                 console.log('@103 comment likes: ', comments.likes);
    //                 // commentsArray.findIndex(obj => {
    //                 //     obj.id = 
    //                 // })

    //                 commentsArray.forEach(doc => {


    //                     if (doc.id == commentId) {

    //                         console.log('@70 ==> Doc: ', doc);
    //                         console.log(typeof doc);

    //                         let array = [];

    //                         array = doc;

    //                         const likedUsers = doc.theLikedUsers;
    //                         let likedCount = doc.likes;





    //                         console.log('@73 liked ones: ', likedUsers);


    //                         if (likedUsers == undefined) {

    //                             console.log('No users')

    //                         }



    //                         else {
    //                             likedUsers.push({
    //                                 userId
    //                             })

    //                             console.log('@143: user ' + userId + ' added');

    //                             likedCount = likedCount + 1;

    //                             console.log('@96 likes: ', likedCount);



    //                             setLikedList(likedUsers);

    //                             doc.theLikedUsers = likedUsers;
    //                             doc.likes = likedCount;

    //                             console.log('@92 no. of likes: ' + likedCount + ' and the ones who liked are: ' + likedUsers);
    //                             console.log('@140 New doc: ', doc);
    //                         }

    //                         console.log('@82 new liked ones: ', doc.theLikedUsers);


    //                         // ====Checking for the like status====

    //                         const isUserLiked = doc.theLikedUsers.includes(userId);

    //                         if (isLiked === false) {
    //                             setUserLiked(false);
    //                             console.log('@178: ', userLiked);
    //                         } else {
    //                             setUserLiked(true);
    //                         }

    //                         newComment = doc;

    //                     }


    //                 })

    //                 return;

    //             })


    //             commentData = comments2;
    //             console.log('@144 new comments: ', commentData);


    //             //upadting the db



    //             firestoreRef

    //                 .update

    //                 ({

    //                     comments: commentData

    //                 }).then(() => {

    //                     console.log('@172 updated successfully')

    //                     // dbObserver.unsubscribe();
    //                 }).catch((e) => {
    //                     console.log('@174 error: ', e);
    //                 })


    //         })








    // }


    const likesOnLoad = async () => {
        console.log('@244: likesOnLoad');
        //1.Locate the comments         
        //2.go through all the comments and get their likes also their like count  
        //3.Check if the loggedin user has liked each comment
        //4. If liked show the filled heart else the outlined ==> use a state for this + update the like count with a state
        //5. 
        //Need to check for each like

        await firestoreRef
            .onSnapshot(documentSnapshot => {
                const { comments } = documentSnapshot.data();

                let commentData = comments;


                const comments1 = Object.values(commentData);
                let comments2 = Object.values(comments1);


                console.log('@261: ', comments1);

                console.log('@262: ', comments2);

                comments2.forEach(data => {

                    const commentsArray = Object.values(data);
                    console.log('@266: ', commentsArray);

                    const { comment, likes, theLikedUsers, id } = commentsArray[0];
                    console.log('@255: ', commentsArray[0]);


                    let isUserIn, likedCount;

                    let likedUsersArray = [];

                    likedUsersArray = theLikedUsers;
                    likedCount = likes;


                    commentsArray.forEach(doc => {

                        let isUserIn, likedCount;

                        let likedUsersArray = [];

                        likedUsersArray = doc.theLikedUsers;


                        console.log('@279: ', likedUsersArray);
                        console.log('@309: The doc.id is ', doc.id, ' and comments.id is ', theCommentId);

                        if (doc.id === theCommentId) {
                            isUserIn = likedUsersArray.includes(user.uid);
                            console.log('@313: ', isUserIn);

                            if (isUserIn === true) {
                                console.log('@287: ', isUserIn);
                                setUserLiked(true);

                            } else {
                                setUserLiked(false);

                            }

                        }












                    })


                })

            })

        await fetchingLikesCount();


    }
    const commentLike = async () => {

        const commentId = comments.id;
        // 1. Get the comments
        // 2. Check if user exists
        //3. add if it's not else don't   also update the likes along with this 

        await firestoreRef
            .get()
            .then(documentSnapshot => {
                const { comments } = documentSnapshot.data();

                let commentData = comments;


                //chopping off the map
                const comments1 = Object.values(commentData);
                let comments2 = Object.values(comments1);





                comments2.forEach(data => {

                    //finally getting the array
                    const commentsArray = Object.values(data);
                    const { comment, likes, theLikedUsers, id } = commentsArray[0];


                    console.log('@228 ', userId);
                    commentsArray.forEach(doc => {

                        if (doc.id === commentId) {

                            //adding the user

                            const likedUsers = doc.theLikedUsers;
                            let likeCount = doc.likes;

                            console.log('@224 :', likedUsers);
                            console.log('@226 :', likedUsers.length);

                            likedUsers.push(user.uid);
                            console.log('@349 new likedUsers :', likedUsers);



                            doc.theLikedUsers = likedUsers;
                            console.log('@381: ', doc.theLikedUsers);


                            //updating the likes count  

                            likeCount = likeCount + 1;
                            doc.likes = likeCount;

                            setLikesCount(doc.likes);
                            console.log('@395 updated doc: ', doc);
                            console.log('@396: ', likesCount);
                        }




                    })

                    setUserLiked(true);


                })

                console.log('@384 ==> ', comments2);

                commentData = comments2;



                //updating the db
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

    const commentUnlike = async () => {
        //1.locate the comment 
        //2. Get the users and check if the logged in user is in
        //3. take it down if the user is else do nothing


        const commentId = comments.id;
        console.log('@393 id: ', commentId);

        await firestoreRef
            .get()
            .then(documentSnapshot => {
                let { comments } = documentSnapshot.data();
                let commentData = comments;

                const comments1 = Object.values(commentData);
                let comments2 = Object.values(comments1);

                comments2.forEach(data => {

                    const commentsArray = Object.values(data);

                    const { comment, likes, theLikedUsers, id } = commentsArray[0];


                    commentsArray.forEach(doc => {


                        if (doc.id === commentId) {

                            console.log('@416 doc: ', doc);

                            const likedUsers = doc.theLikedUsers;
                            let likedCount = doc.likes;
                            let j = likedUsers.length;


                            console.log('@460: ', likedUsers);

                            //checking if the user id is present in likedUsers

                            const isUserPresent = likedUsers.includes(user.uid);
                            console.log('@465: ', isUserPresent);


                            if (isUserPresent === true) {
                                //doing the splice to take down the user id
                                for (let i = 0; i < likedUsers.length; i++) {

                                    if (likedUsers[i] = user.uid) {
                                        likedUsers.splice(i, 1);
                                        console.log('@474: Splice is done');
                                    }
                                }

                                console.log('@478: new users : ', likedUsers);

                                doc.theLikedUsers = likedUsers;



                                //updating the like count
                                likedCount = likedCount - 1;

                                doc.likes = likedCount;

                                console.log('@489: ', likedCount);

                                console.log('@482: doc : ', doc);

                                setLikesCount(doc.likes);
                                console.log('@517: ', likesCount);

                            } else {
                                console.log('User is not here!');
                            }




                        }
                    })

                })


                commentData = comments2;
                console.log('@454 new comment data: ', commentData);


                firestoreRef
                    .update({
                        comments: commentData
                    }).then(() => {
                        console.log('db updated successfully');

                    }).catch(error => {
                        console.log('This error occurred: ', error);
                    })


            })









    }


    const fetchingLikesCount = () => {

        firestoreRef
            .get()
            .then(documentSnapshot => {

                //values for the comments
                const { comments } = documentSnapshot.data();

                let commentData = comments;

                //chopping off the maps
                const comments1 = Object.values(commentData);
                let comments2 = Object.values(comments1);

                //getting each array (still there's a map) 

                comments2.forEach(data => {

                    let likedCount;
                    //finally pulling the array out from all the maps

                    const commentsArray = Object.values(data);
                    const { likes } = commentsArray[0];


                    commentsArray.forEach(doc => {

                        if (doc.id === theCommentId) {

                            likedCount = doc.likes;

                            setLikesCount(likedCount)

                        }
                    })





                })


            })
    }



    const addLike = async () => {
        console.log('@41 addLike() is working')
        setUserLiked(true);
        //await CommentLikeOnClick();
        await commentLike();
        // await fetchingLikesCount();






    }
    const dropLike = async () => {
        console.log('@405 dropLike() is working');
        setUserLiked(false);
        await commentUnlike();
        //await fetchingLikesCount();


    }






    return (
        <View>
            <View style={styles.container}>
                <Image
                    source={require('../../screens/Main/assets/lineComment.png')}
                    style={{ height: 2.2, marginTop: '5%' }}
                />

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
                                <Text style={{ fontSize: 9, marginLeft: '3%' }}>
                                    {

                                        likesCount



                                    }

                                </Text>
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
                                        <EvilIcons
                                            style={styles.detailsOtherHeart}
                                            name="heart"
                                            size={22}
                                            color="#7A8FA6"
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={dropLike}
                                    >
                                        <Image
                                            style={styles.detailsOtherHeart}
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
                    style={{ height: 3, marginTop: 5 }}
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
        marginTop: 15,
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
        justifyContent: 'space-between',
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
        marginRight: '16%',
        marginTop: '1.5%'
    },

    detailsOtherHeart: {

        marginRight: 12
    },
    detailsOther: {
        marginTop: '10%',
        marginLeft: '-15%'

    },

    commentName: {
        marginBottom: '.0%',
        color: '#6281a1',
        fontWeight: 'bold',
        fontSize: 12,
    },
    comment: {
        fontSize: 10,
        fontWeight: '200',
        marginTop: 2
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
