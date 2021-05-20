import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import CommunityScreen from '../screens/Main/CommunityScreen';
import FriendsScreen from '../screens/Main/Friends/FriendsScreen';


const Drawer = createDrawerNavigator();

const TheDrawer = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="home" component={CommunityScreen} />
            <Drawer.Screen name="friends" component={FriendsScreen} />
        </Drawer.Navigator>
    )
}


// const DrawerMenu = () => {


//     return (
//         <NavigationContainer>
//             <TheDrawer />
//         </NavigationContainer>
//     )

// }

export default TheDrawer
