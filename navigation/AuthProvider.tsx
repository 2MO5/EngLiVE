import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,


                register: async (email: string, password: string, avatar: string, firstName: string, lastName: string, country: string, friends: object, receivedRequests: object, sentRequests: object) => {
                    try {
                        console.log(user)
                        console.log(email)
                        console.log(password)
                        console.log(avatar)
                        console.log('firebase connectd and is on the register function');
                        await auth()
                            .createUserWithEmailAndPassword(email, password)
                            .then(() => {
                                console.log('adding user to the db');
                                firestore()
                                    .collection('users')
                                    .doc(auth().currentUser?.uid)
                                    .set({
                                        firstName: firstName,
                                        lastName: lastName,
                                        country: country,
                                        email: email,
                                        createdAt: firestore.Timestamp.fromDate(new Date()),
                                        userImage: avatar,
                                        friends: [],
                                        receivedRequests: [],
                                        sentRequests: [],

                                    })
                            }).catch((e) => {
                                console.log('user was not added due to: ', e);
                            })
                        // .then(() => {
                        //     console.log('adding user to the db')
                        //     firestore().collection('users').doc(auth().currentUser.uid)
                        //         .set({
                        //             fname: '',
                        //             lname: '',
                        //             email: email,
                        //             createdAt: firestore().Timestamp.fromDate(new Date()),
                        //             userImg: null,
                        //         })
                        //         .catch(error => {
                        //             console.log('User was not added to the db', error)
                        //         })
                        // })

                    } catch (error) {
                        console.log(error);

                    }
                },

                login: async (email: string, password: string) => {

                    console.log('Email: ', email, 'Password: ', password);
                    try {
                        console.log('LOGIN IN with firebase');
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch (error) {
                        console.log('This error occurred: ', error);
                        alert(error);
                    }
                },


                googleLogin: async () => {
                    try {
                        // Get the users ID token
                        const { idToken } = await GoogleSignin.signIn();

                        // Create a Google credential with the token
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                        // Sign-in the user with the credential
                        return auth().signInWithCredential(googleCredential);

                    } catch (error) {
                        console.log(error);
                    }

                },

                facebookLogin: async () => {
                    try {

                    } catch (error) {
                        console.log(error);
                    }
                },

                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (error) {
                        console.log(error);
                        alert(error);
                    }
                }



            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

