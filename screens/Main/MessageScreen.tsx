import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'


const MessageScreen = () => {
    const [content, setContent] = useState({});
    return (
        <View style={styles.container}>
            {/* <Text> This is the message screen</Text> */}
            <ScrollView contentContainerStyle={content}
            >
                <View style={{ height: 2000, backgroundColor: 'red' }} >
                    <ScrollView
                        onTouchStart={(e) => { setContent({ flex: 1 }); }}
                        onMomentumScrollEnd={(e) => { setContent({}); }}
                        onScrollEndDrag={(e) => { setContent({}); }}
                        style={{ margin: 10, maxHeight: 200 }} >
                        <View style={{ height: 200, backgroundColor: 'blue' }} />
                        <View style={{ height: 200, backgroundColor: 'pink' }} />
                        <View style={{ height: 200, backgroundColor: 'blue' }} />
                        <View style={{ height: 200, backgroundColor: 'pink' }} />
                        <View style={{ height: 200, backgroundColor: 'blue' }} />
                        <View style={{ height: 200, backgroundColor: 'pink' }} />
                        <View style={{ height: 200, backgroundColor: 'blue' }} />
                        <View style={{ height: 200, backgroundColor: 'pink' }} />
                        <View style={{ height: 200, backgroundColor: 'blue' }} />
                        <View style={{ height: 200, backgroundColor: 'pink' }} />
                        <View style={{ height: 200, backgroundColor: 'blue' }} />
                        <View style={{ height: 200, backgroundColor: 'pink' }} />
                    </ScrollView>
                    <ScrollView
                        onTouchStart={(e) => { setContent({ flex: 1 }); }}
                        onMomentumScrollEnd={(e) => { setContent({}); }}
                        onScrollEndDrag={(e) => { setContent({}); }}
                        style={{ margin: 10, maxHeight: 200 }} >
                        <View style={{ height: 200, backgroundColor: 'blue' }} />
                        <View style={{ height: 200, backgroundColor: 'pink' }} />

                        <View style={{ height: 200, backgroundColor: 'pink' }} />
                        <View style={{ height: 200, backgroundColor: 'blue' }} />
                        <View style={{ height: 200, backgroundColor: 'pink' }} />
                    </ScrollView>
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        // backgroundColor: '#f4f4f4',

        // justifyContent: 'center',
        // alignItems: 'center'
    }
});

export default MessageScreen
