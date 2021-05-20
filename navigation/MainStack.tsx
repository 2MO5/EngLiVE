import { Ionicons, Octicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabTwoScreen from '../screens/Main/TabTwoScreen';

import CommunityScreen from '../screens/Main/CommunityScreen';
import MessageScreen from '../screens/Main/MessageScreen';
import NotificationScreen from '../screens/Main/NotificationScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';
import PostDisplayScreen from '../screens/Main/PostDisplayScreen';
import AddPostScreen from '../screens/Main/AddPostScreen';
import FeedDisplayScreen from '../components/Feed'


import { AddPostNavigatorParamList, BottomTabParamList, RootStackParamList, HomeNavigatorParamList, MessageNavigatorParamList, NotificationNavigatorParamList, ProfileNavigatorParamList, TabTwoParamList, PostDisplayNavigatorParamList } from '../types';
import { Notifications } from 'expo';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { Image, StyleSheet, View } from 'react-native';

import home from '../screens/Main/assets/home.png';
import homeF from '../screens/Main/assets/homeF.png';
import notification from '../screens/Main/assets/notification.png';
import notificationF from '../screens/Main/assets/notificationF.png';
import user from '../screens/Main/assets/user.png';
import userF from '../screens/Main/assets/userF.png';

import { createDrawerNavigator } from '@react-navigation/drawer';
import FriendsScreen from '../screens/Main/Friends/FriendsScreen';
import DrawerContent from './DrawerContent';


const Drawer = createDrawerNavigator();


let image: any;
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

//Identical ones should go with the same stack
export default function MainStack() {



  // if (route.state && route.state.index > 0) {
  //   navigation.setOptions({ tabBarVisible: false });
  // } else {
  //   navigation.setOptions({ tabBarVisible: true });
  // }

  const colorScheme = useColorScheme();

  // const tabBarImage = () => {

  //   tabBarIcon: ({ color, focused }) => {
  //     image = focused

  //       ? require('../screens/Main/assets/home.png')
  //       : require('../screens/Main/assets/homeF.png')

  //   }




  // }


  return (

    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        showLabel: false,

        style: {
          position: "absolute",
          bottom: 10,
          right: 20,
          left: 20,
          paddingLeft: 70,
          paddingRight: 70,
          height: 50,
          borderRadius: 15,
          backgroundColor: '#f1f1ee',
          ...styles.theShadows
        }

      }}>

      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        // options={{
        //   tabBarIcon: ({ color, }) => <Octicons name="home" size={30} color={color} />,
        // }}
        options={{
          tabBarIcon: ({ focused }) => {



            return (

              focused ? (
                <Image
                  source={homeF}
                  style={{ width: 40, height: 40 }}
                />
              ) : (
                <Image
                  source={home}
                  style={{ width: 40, height: 40 }}
                />
              )


            )
          }



        }}

      // options={{
      //   tabBarIcon: <Image source={home} />
      // }}



      />
      {/* <BottomTab.Screen
        name="Messages"
        component={MessageNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="message-outline" size={28} color={color} />,
        }}
      /> */}

      <BottomTab.Screen
        name="Notifications"
        component={NotifcationNavigator}
        options={{
          tabBarIcon: ({ focused }) => {

            return (
              focused ? (

                <Image
                  source={notificationF}
                  style={{ width: 40, height: 40 }}
                />

              ) : (
                <Image
                  source={notification}
                  style={{ width: 40, height: 40 }}
                />
              )
            )
          },
        }}
      />


      <BottomTab.Screen
        name="User"
        component={DrawerNavigation}
        options={{
          tabBarIcon: ({ focused }) => {

            return (


              focused ? (
                <Image
                  source={userF}
                  style={{ width: 40, height: 40 }}
                />
              ) : (
                <Image
                  source={user}
                  style={{ width: 40, height: 40 }}
                />
              )
            );


          },
        }}
      />




    </BottomTab.Navigator>





  );
}

//Drawer Navigator

export function DrawerNavigation() {

  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      hideStatusBar={true}
      edgeWidth={10}

      drawerStyle={{ backgroundColor: "#f3f5f7", zIndex: 100, width: "80%" }}
      drawerContent={props => <DrawerContent {...props} />}

    >
      <Drawer.Screen name="Home" component={CommunityScreen} />
      <Drawer.Screen name="Friends" component={FriendsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />




    </Drawer.Navigator>)


}

















// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}



const TabOneStack = createStackNavigator<HomeNavigatorParamList>();

function HomeNavigator({ navigation, route }) {

  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }


  // const TabBarVisibility = (route: string) => {
  //   const routeName = route.state
  //     ? getFocusedRouteNameFromRoute
  //     : '';


  //   // if (routeName === 'AddPostNavigator') {
  //   //   return false
  //   // } else {
  //   //   return true
  //   // }
  // }

  // navigation.setOptions({
  //   tabBarVisible: false
  // })

  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Home"
        component={CommunityScreen}
        options={{

          headerShown: false
        }}

      />
      <TabOneStack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{

          headerShown: false,

        }}
      // options={({ navigation, route }) => ({

      //   tabBarVisible: false

      // })}

      />
      <TabOneStack.Screen
        name="PostDisplay"
        component={PostDisplayScreen}
        options={{

          headerShown: false,

        }}

      />






    </TabOneStack.Navigator>
  )
}


const NotificationStack = createStackNavigator<NotificationNavigatorParamList>();

function NotifcationNavigator() {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen

        name="Notifications"
        component={NotificationScreen}
        options={{
          headerShown: false
        }}

      />


    </NotificationStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileNavigatorParamList>();

function ProfileNavigator({ navigation }) {

  return (


    <ProfileStack.Navigator>




      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}

        options={{
          headerShown: false,

        }}
      />



    </ProfileStack.Navigator>





  );
}

const Stack = createStackNavigator<RootStackParamList>();

// function RootNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Root" component={MainStack} />
//       <Stack.Screen name="NewPost" component={AddPostNavigator} />
//       <Stack.Screen name="ShowPost" component={PostDisplayNavigator} />

//     </Stack.Navigator>

//     //     <AuthProvider>
//     //       <Routes />
//     //     </AuthProvider>

//   );
// }



const styles = StyleSheet.create({

  theShadows: {
    shadowColor: '#68571B',
    shadowOffset: {
      width: 0,
      height: 210,
    },
    shadowOpacity: 0.25,
    shadowRadius: 23.5,
    elevation: 29,
  }
})