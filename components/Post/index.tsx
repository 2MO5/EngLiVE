import React, { useEffect, useState } from 'react'
import { View, Image, Text } from 'react-native';
import { PostType, UserType } from '../../types';
import { FontAwesome } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';

import styles from './styles';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
//import posts from '../../data/post';

export type PostProps = {
    post: PostType,
    //user: UserType
    //onPress: any,
    // screenname: any,
    // params: any,
}

const Post = ({ post }: PostProps) => {

    const [userImage, setUserImage] = useState();
    const [userName, setUserName] = useState();

    const navigation = useNavigation();


    useEffect(() => {
        //console.log(post.content);
        // console.log(post.createdAt);
        console.log(post.image);
        // console.log(post.numberOfComments);
        // console.log(post.numberOfLikes);
        console.log(post.id);

        console.log(post.userId);
        //console.log(user.name);
        // console.log(user.username);

    }, [])

    // const navigation = useNavigation();


    const userDetails = async () => {
        const id = post.userId;
        console.log('user ID @userDetails: ', id);
        firestore()
            .collection('users')
            .doc(id)
            .onSnapshot(documentSnapshot => {
                const { userImage, firstName } = documentSnapshot.data();


                setUserImage(userImage);
                setUserName(firstName);


            })
    }

    useEffect(() => {
        userDetails();
    })

    const showPost = () => {

        // sendingId()

        navigation.navigate('PostDisplay', {
            screen: 'PostDisplayScreen',
            // params: {
            //     id: post.id
            // }
            post

        });

        // navigation.navigate('CommentFeed', post);

        console.log("Here is the post id: ", post.id);


    }
    const sendingId = () => {

        navigation.navigate('Comments', {
            screen: 'Comments',
            // params: {
            //     id: post.id
            // }
            post

        });
        console.log("Here is the post id: ", post.id);


    }

    return (


        <TouchableOpacity onPress={showPost}>
            <View style={styles.container}>
                <View style={styles.containerImage}>

                    {
                        post.image &&
                        <Image
                            style={styles.containerImage}
                            source={{ uri: post.image }}
                        />
                    }
                </View>
                <View style={styles.containerDetails}>
                    <View style={styles.DetailsUser}>


                        <Image
                            source={{ uri: userImage }}
                            style={styles.DetailsUserAvatar}

                        />

                        <View style={styles.DetailsOther}>
                            <Text style={styles.OtherUserName}>  {userName} </Text>
                            <Text style={styles.OtherDatePosted}>{moment(post.createdAt.toDate()).fromNow()}</Text>
                        </View>


                    </View>
                    <View style={styles.DetailsIcon}>


                        <View style={styles.IconHeart} >
                            {/* <FontAwesome name="heart" size={20} color="#EC5757" /> */}
                            <Image source={require('../../assets/images/ic-heart.png')} />
                            <Text style={{ fontSize: 10, color: "#7b887f", marginLeft: 4 }}>{post.numberOfLikes}</Text>
                        </View>

                        <View style={styles.IconComment} >
                            {/* <FontAwesome name="wechat" size={24} color="#BACFE4" /> */}
                            <Image source={require('../../assets/images/awesome-comments.png')} />
                            <Text style={{ fontSize: 10, color: "#7b887f", marginLeft: 4 }}>{post.numberOfComments}</Text>
                        </View>

                    </View>
                </View>
            </View>


        </TouchableOpacity>


    )
}

export default Post;


// class Post extends React.PureComponent {


//     navigation = useNavigation();

//     showPost = () => {

//         this.navigation.navigate('PostDisplay');

//     }


//     render() {

//         const { post, user } = this.props;


//         return (
//             <TouchableOpacity onPress={this.showPost}>
//                 <View style={styles.container}>
//                     <View style={styles.containerImage}>

//                         {post.image && <Image style={styles.containerImage} source={{ uri: post.image }} />}
//                     </View>
//                     <View style={styles.containerDetails}>
//                         <View style={styles.DetailsUser}>


//                             <Image
//                                 source={{ uri: user.image }}
//                                 style={styles.DetailsUserAvatar}

//                             />

//                             <View style={styles.DetailsOther}>
//                                 <Text style={styles.OtherUserName}>{user.name}</Text>
//                                 <Text style={styles.OtherDatePosted}>{moment(post.createdAt).fromNow()}</Text>
//                             </View>


//                         </View>
//                         <View style={styles.DetailsIcon}>


//                             <View style={styles.IconHeart} >
//                                 {/* <FontAwesome name="heart" size={20} color="#EC5757" /> */}
//                                 <Image source={require('../../assets/images/ic-heart.png')} />
//                                 <Text style={{ fontSize: 10, color: "#7b887f", marginLeft: 4 }}>{post.numberOfLikes}</Text>
//                             </View>

//                             <View style={styles.IconComment} >
//                                 {/* <FontAwesome name="wechat" size={24} color="#BACFE4" /> */}
//                                 <Image source={require('../../assets/images/awesome-comments.png')} />
//                                 <Text style={{ fontSize: 10, color: "#7b887f", marginLeft: 4 }}>{post.numberOfComments}</Text>
//                             </View>

//                         </View>
//                     </View>
//                 </View>


//             </TouchableOpacity>
//         );
//     }
// }

// export default Post;