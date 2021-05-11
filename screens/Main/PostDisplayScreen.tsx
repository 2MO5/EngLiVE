import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, ScrollView, FlatList, TextInput, YellowBox, LogBox } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Font from 'expo-font';

import firestore from '@react-native-firebase/firestore';
import comments from '../../data/comments'
import Comments from '../../components/Comments';
import { PostType } from '../../types';
import post from '../../components/Post'
import { useNavigation } from '@react-navigation/core';
import { AuthContext } from '../../navigation/AuthProvider';
import { firebase } from '@react-native-firebase/storage';


import CommentFeed from '../../components/CommentFeed';


// export type PostProps = {
//     post: PostType
// }

const PostDisplayScreen = ({ route }) => {

    const { user } = useContext(AuthContext);

    const { id, image, content } = route.params.post;

    console.log('Required: ', route.params);

    const [isLoaded, setIsLoaded] = useState(false);
    const [theContent, setTheContent] = useState({});

    const [fontReady, setFontReady] = useState(false);

    const [usersLiked, setUsersLiked] = useState([]);
    const [checkLike, setCheckLike] = useState();
    const [unlike, setUnlike] = useState();
    const [commentListAll, setCommentListAll] = useState([]);

    const [commentCheck, setCommentCheck] = useState(false);

    const [thePost, setThePost] = useState([]);
    const [theLikes, setTheLikes] = useState();
    const [theComments, setTheComments] = useState();
    const [theInput, setTheInput] = useState('');

    const [userImage, setUserImage] = useState();
    const [firstName, setFirstName] = useState();
    //const navigation = useNavigation();

    const input = React.createRef();

    let isLiked: boolean, finalValue: string;

    // Ignoring the warnings
    useEffect(() => {

        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])



    useEffect(() => {
        codeGen();
        fetchingTheComments();
    }, [Comments])


    useEffect(() => {

        let started = true;

        showingTheLike();
        setIsLoaded(true);


        console.log(isLiked);

        return () => {
            started = false;
        }
    }, [])


    useEffect(() => {

        let started = true;

        const loadingTheFonts = async () => {
            await Font.loadAsync({
                'Candara': require('../../assets/fonts/Candara.ttf'),
            });
            setFontReady(true);
        }


        const loadingThePost = async () => {
            // 1.Go to collection.
            // 2. Find the doc by id 
            // 3. extract the required fields
            // 4. Display the required

            const showPost = () => {
                console.log('Current post Id: ', id);

                firestore()
                    .collection('posts')
                    .doc(id)
                    .onSnapshot(documentSnapshot => {
                        console.log('data: ', documentSnapshot.data());

                        const { numberOfComments, numberOfLikes } = documentSnapshot.data();

                        console.log(numberOfComments);
                        console.log(numberOfLikes);

                        setTheLikes(numberOfLikes);
                        setTheComments(numberOfComments);
                    })
            }


            try {
                showPost();
                // await fetchingTheComments();


            } catch (error) {
                console.log('This error occurred: ', error);
            }

            return () => {
                started = false;
            }
        }

        loadingTheFonts();
        loadingThePost();
        loadingTheUser();
    }, [])



    //Like on loading
    const showingTheLike = async () => {
        await firestore()
            .collection('posts')
            .doc(id)
            .onSnapshot(documentSnapshot => {
                const { likedUsers } = documentSnapshot.data();

                console.log(likedUsers);
                setUsersLiked(likedUsers);


                if (likedUsers !== undefined) {
                    const isLiked = likedUsers.includes(user.uid);
                    console.log('@157: ', isLiked);


                    setCheckLike(isLiked);
                } else {
                    console.log('no liked users found');

                }



            })

        //isLiked = checkLike;
        console.log(checkLike);
        return;
    }

    //like on click
    const showingTheLikeOnClick = async () => {
        await firestore()
            .collection('posts')
            .doc(id)
            .onSnapshot(documentSnapshot => {
                const { likedUsers } = documentSnapshot.data();

                console.log(likedUsers);
                setUsersLiked(likedUsers);

                const isLiked = likedUsers.includes(user.uid);
                console.log(isLiked);





            })
        setCheckLike(!isLiked);
        isLiked = checkLike;
        console.log(isLiked);


    }



    const loadingTheUser = async () => {
        firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot(documentSnapshot => {

                const { userImage, firstName } = documentSnapshot.data();

                setUserImage(userImage);
                setFirstName(firstName);
            })
    }



    // ===========ADDING AND DROPIING LIKES============


    // ------->For Posts<-------
    const likeDrop = async () => {


        await isUserDisLiked();
        await showingTheLikeOnClick();




        const decrement = firestore.FieldValue.increment(-1)
        console.log('like Drop');


        // 1.Go to the db.
        // 2.Find the Id.
        // 3.Locate the field.
        // 4.Remove one (take one down -1)

        firestore()
            .collection('posts')
            .doc(id)
            .update({
                numberOfLikes: decrement
            })
        return;






    }
    const likeAdd = async () => {

        await isUserLiked();
        await showingTheLikeOnClick();

        const increment = firestore.FieldValue.increment(1)
        console.log('like Add');


        // 1.Go to the db.
        // 2.Find the Id.
        // 3.Locate the field.
        // 4.Add one (add one up + 1)

        firestore()
            .collection('posts')
            .doc(id)
            .update({


                numberOfLikes: increment
            })

        return;
    }


    const isUserLiked = () => {
        firestore()
            .collection('posts')
            .doc(id)
            .update({
                likedUsers: firestore.FieldValue.arrayUnion(user.uid),
            })




        console.log(theInput);
        return;



    }

    const isUserDisLiked = () => {
        firestore()
            .collection('posts')
            .doc(id)
            .update({
                likedUsers: firestore.FieldValue.arrayRemove(user.uid),
            })


        console.log(theInput);
    }






    //============adding  comments==========


    const postingTheComments = async () => {

        await commenting();

        const increment = firestore.FieldValue.increment(1);

        await firestore()
            .collection('posts')
            .doc(id)
            .update({
                numberOfComments: increment
            })

        await fetchingTheComments();
    }



    const commenting = async () => {
        let time = firestore.Timestamp.now();
        console.log(time);
        console.log('Posting the comment')
        try {

            await codeGen();

            const idComment = await codeGen();
            console.log('@328 idComment: ', idComment);

            await firestore()
                .collection('posts')
                .doc(id)
                .update({
                    comments: firestore.FieldValue.arrayUnion({
                        //id: id,

                        [firestore.Timestamp.fromDate(new Date())]:
                        {
                            id: idComment,
                            userName: firstName,
                            userImage: userImage,
                            comment: theInput,
                            timestamp: firestore.Timestamp.fromDate(new Date()),
                            theLikedUsers: [],
                            likes: 0,
                        },


                    }),


                })

            setTheInput('');
            console.log(time);


            console.log(theInput);
        } catch (error) {
            console.log('This error occurred: ', error)
        }
    }

    const codeGen = async () => {

        let commentsNumber: number;

        await firestore()
            .collection('posts')
            .doc(id)
            .get()
            .then(documentSnapshot => {
                let { comments } = documentSnapshot.data();

                commentsNumber = comments.length + 1;

                console.log('@397 length: ', commentsNumber);
            })



        const b = Math.floor(Math.random() * 130);
        const a = Math.floor(Math.random() * 11);
        const i = Math.floor(Math.random() * 21);
        const k = Math.floor(Math.random() * 35);
        let r = Math.floor(Math.random() * 5);
        const c = a + b;

        let j, n;

        if (i > a && r < 3) {
            j = i - a + r;
        } else {

            j = a - i + r;
        }




        if (k > 25) {

            n = k;

        } else {
            n = 25;
        }

        const characters = '*$#@_+AFOjd123GHI<JKL?>M|"NOPQoaRSTUVqWX!@#$BCDaaassss343434+_#Jdsdu6t7yg3h43edxsd812382uieshwq378927302392:deiurye(*$#@ndsdthjHUWEWNhdstKKUUpooTKHHE!@#$%^&*YZ__120a(bcdefghijklmnopqrstuvwxyz#!@#_#@#@++?)></';
        const number = '0123456789';
        const C = 'C';
        const theLength = commentsNumber.toString();



        const stringValue1 = characters.substr(a, b); //
        const stringValue2 = characters.substr(a, c);
        const stringValue3 = characters.substr(0, j);

        const bFinal = stringValue2.concat(stringValue1);
        const b1Final = stringValue3.concat(stringValue2);

        const index = C.concat(theLength);
        const theFinal = bFinal.concat(b1Final);

        finalValue = theFinal.substr(r, n);

        finalValue = index.concat(finalValue);

        console.log('@431: r is ', r, ' and n is ', n);
        console.log('@431 stringValue: ', finalValue);
        console.log('@379 stringValue: ', finalValue);

        return finalValue;
    }


    //Fetching the comments

    const fetchingTheComments = async () => {

        const commentsList = [];

        //     // 1.Take comments from the db
        //     // 2. put them into an array
        //     // 3.put that array to a state.
        //     // 4. Assign that state to a flatlist

        //     //1. Take data from db and turn to an array
        //     //2. put it to an array.
        //     //3.set that array to state varibles
        //     //4.access that state varible in the flatlist



        //getting the data from db
        await firestore()
            .collection('posts')
            .doc(id)
            .get()
            .then(documentSnapshot => {


                const { comments } = documentSnapshot.data();

                const commentData = comments;
                console.log('@381: ', commentData);

                //console.if (commentData !== null) { setCommentCheck(true); } else { setCommentCheck(false); }

                if (commentData == (null || undefined)) {

                    console.log('@386: ZERO comments found');
                } else {
                    console.log('@388: Comments Exists')

                    //1. Get comments as an array  (chop off the map)
                    //2. Push them to an array.
                    //3. Access them in the Flatlist


                    const commentsSet1 = Object.values(commentData);
                    const commentsSet2 = Object.values(commentsSet1);

                    console.log('commentsSet2: ', commentsSet2);

                    commentsSet2.forEach(theComment => {

                        const arrayComment = Object.values(theComment);

                        console.log("Array Comment: ", arrayComment);

                        const { comment, likes, liked, userName, userImage, timestamp, id } = arrayComment[0];



                        console.log('@409: => Comment ' + id + ' is ' + comment + ' which is posted by ' + userName + ' ==> ' + userImage);
                        console.log('@410: => Comment has ' + likes + ' likes');
                        console.log('@411: => Is it liked ?' + liked);


                        commentsList.push({
                            id,
                            userImage,
                            userName,
                            comment,
                            likes,
                            liked,
                            timestamp
                        })

                    })

                    console.log('@424 Comment List is: ', commentsList);

                    setCommentListAll(commentsList);

                    console.log('@429 Comment List State is: ', commentListAll);
                }







            });

        //setCommentListAll(commentsList);

        console.log('State variable commentsList : ', commentListAll);
    }


    return (

        <SafeAreaView>

            <View style={styles.container}>
                <View style={styles.image}>

                    <Image
                        //source={require('../Main/assets/placeH.png')}
                        source={{ uri: image }}
                        style={{ width: '100%', height: '100%' }}
                    />
                    <Image
                        source={require('../Main/assets/postbottom.png')}
                        style={styles.postBottom}
                    />


                    <View style={styles.icons}>
                        <View style={styles.iconsHeart}>


                            <Ionicons name="heart" size={25} color="#EC5757" />
                            <Text style={{ marginLeft: '10%', }}>{theLikes}</Text>
                        </View>


                        <View>
                            {
                                !checkLike ? (
                                    <TouchableOpacity
                                        style={styles.like}
                                        onPress={likeAdd}
                                    >
                                        <Image
                                            source={require('../Main/assets/Like.png')}

                                        />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.like}
                                        onPress={likeDrop}
                                    >
                                        <Image
                                            source={require('../Main/assets/LikeFill.png')}

                                        />
                                    </TouchableOpacity>
                                )
                            }
                        </View>


                        <View style={styles.iconsComment}>


                            <FontAwesome name="comments" size={25} color="#BACFE4" />
                            <Text style={{ marginLeft: '10%', }}>{theComments}</Text>
                        </View>
                    </View>


                </View>
                <View>


                    <ScrollView style={{ height: '100%', marginTop: '65%' }} contentContainerStyle={content}>

                        <View style={{ height: '100%', marginTop: '1%' }}>
                            <View style={styles.description}>
                                <ScrollView
                                    onTouchStart={(e) => { setTheContent({ flex: 1 }); }}
                                    onMomentumScrollEnd={(e) => { setTheContent({}); }}
                                    onScrollEndDrag={(e) => { setTheContent({}); }}

                                >
                                    <Text style={{ color: '#326A9A', marginLeft: '3%', fontWeight: '100', fontFamily: 'Candara', lineHeight: 30, fontSize: 30 }}> {content} </Text>
                                </ScrollView>

                            </View>

                            <View style={styles.comments}>

                                <ScrollView
                                    onTouchStart={(e) => { setTheContent({ flex: 1 }); }}
                                    onMomentumScrollEnd={(e) => { setTheContent({}); }}
                                    onScrollEndDrag={(e) => { setTheContent({}); }}
                                >

                                    <FlatList
                                        //horizontal={true}
                                        contentContainerStyle={{
                                            paddingBottom: '295%',

                                            flexGrow: 1
                                        }}
                                        data={commentListAll}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item }) =>
                                            <Comments
                                                // bottom={comments[comments.length - 1].id}
                                                comments={item}
                                                //user={item.user}
                                                id={id}
                                                state={isLoaded}

                                            />

                                        }
                                    />






                                </ScrollView>

                            </View>


                        </View>
                    </ScrollView>


                </View>

                <View style={styles.commentInput}>


                    <Image
                        style={styles.commentInputAvatar}
                        source={{
                            uri:
                                userImage
                        }}


                    />
                    <TextInput
                        value={theInput}
                        onSubmitEditing={postingTheComments}
                        onChangeText={(Input: any) => setTheInput(Input)}
                        style={{ marginLeft: '5%', marginBottom: '1%', height: 40, width: '75%', borderWidth: 1, borderRadius: 88, borderColor: 'white', backgroundColor: '#f4f5f7', paddingLeft: 20 }}
                        placeholder={`Add your comment as well ${firstName}`}
                        placeholderTextColor={'#9e9898'}
                        clearButtonMode="always"

                    />
                </View>

            </View>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        flexGrow: 1,

        justifyContent: 'center',
        alignItems: 'center',

        flexDirection: 'column',
        // paddingBottom: '40%',

    },

    image: {
        width: '110%',
        height: '40%',

        zIndex: 1000,
        position: 'absolute',
        top: 0

    },
    description: {
        width: '100%',
        height: '45%',
        backgroundColor: '#fff',
        paddingTop: '20%',
        paddingLeft: '8%',
        paddingRight: '8%',

        marginBottom: '5%',


    },


    comments: {
        width: '100%',
        height: '90%',

        marginLeft: '2%',
        marginRight: '2%',
        marginTop: '-80%',



    },

    addComments: {
        width: '100%',
        height: '30%',
        backgroundColor: '#fff',
    },

    commentInput: {

        flexDirection: 'row',
        marginBottom: 12,
        marginTop: -33,
        width: "100%"
    },

    commentInputAvatar: {

        marginTop: '0%',
        marginLeft: '6.5%',
        width: '10%',
        height: '90%',
        borderRadius: 999
    },

    postBottom: {
        width: '102%',
        height: '30%',
        marginTop: '-8%',
        marginLeft: '-1%',


        //position: 'absolute',
    },

    icons: {

        position: 'relative',
        top: '-14%',
        left: '43%',
        //backgroundColor: 'red',
        width: '120%',
        paddingTop: '5%',
        flexDirection: 'row',
        //justifyContent: 'space-evenly',
        //zIndex: 10000,


        alignContent: 'center',
    },
    iconsHeart: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '50%',
        marginTop: '-1%',


    },
    iconsComment: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '10%',

        width: '10%',
        height: '10%',

        paddingBottom: '20%',
        marginTop: '1%'
    },

    like: {

        zIndex: 9999,
        //width: 100,


    }

});

export default PostDisplayScreen
