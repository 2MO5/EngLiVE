import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Notification from '../../components/Notification'
import Tab from '../../components/Tab'

const NotificationScreen = () => {

    const [activeNew, setActiveNew] = useState(true);
    const [activeOld, setActiveOld] = useState(false);


    useEffect(() => {

        setActiveNew(true);
        setActiveOld(false);
    }, [])

    const changeActiveTabToNew = () => {


        setActiveNew(true);
        setActiveOld(false);

    }
    const changeActiveTabToOld = () => {



        setActiveNew(false);
        setActiveOld(true);
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <Image
                    source={require('../Main/assets/dTopN.png')}
                    style={{ position: 'absolute', top: '-33%', left: '-25%' }}
                />
                <Image
                    source={require('../Main/assets/YNoti.png')}
                    style={{ zIndex: 10, marginTop: '-1%' }}

                />
            </View>
            <View style={styles.containerMiddle}>
                <View style={styles.middleTop}>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={changeActiveTabToNew}
                    >
                        {
                            activeNew ? (
                                <>

                                    <Text style={styles.topTextActive}> NEW</Text>
                                    <Tab style={styles.tab} />
                                </>
                            ) : (
                                <Text style={styles.topTextInActive}> NEW</Text>
                            )
                        }
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={changeActiveTabToOld}
                    >
                        {
                            activeOld ? (
                                <>

                                    <Text style={styles.topTextActive}> OLD</Text>
                                    <Tab style={styles.tab} />
                                </>

                            ) : (

                                <>
                                    <Text style={styles.topTextInActive}> OLD</Text>
                                </>
                            )
                        }
                    </TouchableOpacity>


                </View>



                <View style={styles.middleBottom}>
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />

                </View>
            </View>
            <View style={styles.containerBottom}>
                <Image
                    source={require('../Main/assets/dBotN.png')}
                    style={{ position: 'absolute', bottom: '-40%', right: '-25%' }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f4f4f4',

        justifyContent: 'center',
        alignItems: 'center',


        //fontFamily: 'Roboto'

    },

    containerTop: {
        width: '100%',
        height: '20%',

        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15

    },
    topTextActive: {
        fontSize: 22,
        color: '#CEAA29'
    },
    topTextInActive: {
        fontSize: 16,
        color: '#D6DBE6'
    },

    containerMiddle: {
        width: '100%',
        height: '60%',



    },

    middleTop: {




        alignItems: 'center',

        flexDirection: 'row',
        justifyContent: 'space-between',

        marginLeft: '4%',
        marginTop: '3%',
        height: '10%',
        width: '24%',

    },

    middleBottom: {

        height: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerBottom: {
        width: '100%',
        height: '20%',

    },



    tab: {
        marginLeft: '5%'
    }
});

export default NotificationScreen
