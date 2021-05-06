import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {

        width: '89%',
        height: 300,

        backgroundColor: '#ffff',

        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 25,
        marginRight: 20,
        marginBottom: 50,
        borderRadius: 19,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,

        zIndex: 99999,
    },


    containerImage: {
        width: '100%',
        height: '88%',
        borderRadius: 20,

        marginTop: 10,
    },

    containerDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: -49,
        marginBottom: 10,
        marginTop: -10,
        alignItems: 'center'

    },



    DetailsUser: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '12%'
    },

    DetailsUserAvatar: {
        width: '15%',
        height: '68%',
        borderRadius: 500,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: '26%',

        position: 'absolute',
        bottom: 8,
        left: -28
    },

    DetailsOther: {
        marginLeft: 60,
        marginBottom: 20,
        flexDirection: 'column'
    },

    OtherUserName: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 5
    },

    OtherDatePosted: {
        fontWeight: '100',
        fontSize: 10,
        color: '#999999',
    },
    DetailsIcon: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
        marginLeft: '25%'

    },

    UserAndTime: {

    },

    IconHeart: {
        flexDirection: 'row',
        marginLeft: '10%',

    },

    IconHeartFont: {
        textAlign: 'center',
        color: '#999999',
    },

    IconComment: {
        marginLeft: 20,
        flexDirection: 'row',
        textAlign: 'center',
    }


});

export default styles;