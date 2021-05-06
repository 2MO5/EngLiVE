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

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

//Identical ones should go with the same stack
export default function MainStack() {

  // if (route.state && route.state.index > 0) {
  //   navigation.setOptions({ tabBarVisible: false });
  // } else {
  //   navigation.setOptions({ tabBarVisible: true });
  // }

  const colorScheme = useColorScheme();



  return (

    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        showLabel: false,

      }}>

      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <Octicons name="home" size={30} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessageNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="message-outline" size={28} color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Notifications"
        component={NotifcationNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="notifications-outline" color={color} />,
        }}
      />


      <BottomTab.Screen
        name="User"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <Feather name="user" size={30} color={color} />,
        }}
      />


    </BottomTab.Navigator>





  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}



const TabOneStack = createStackNavigator<HomeNavigatorParamList>();

function HomeNavigator({ navigation, route }) {

  // if (route.state && route.state.index > 0) {
  //   navigation.setOptions({ tabBarVisible: false });
  // } else {
  //   navigation.setOptions({ tabBarVisible: true });
  // }


  // const TabBarVisibility = (route: string) => {
  //   const routeName = route.state
  //     ? getFocusedRouteNameFromRoute
  //     : '';


  //   if (routeName === 'AddPostNavigator') {
  //     return false
  //   } else {
  //     return true
  //   }
  // }

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
          //tabBarVisible: false,
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

          headerShown: false
        }}

      />






    </TabOneStack.Navigator>
  )
}

const MessageStack = createStackNavigator<MessageNavigatorParamList>();

function MessageNavigator() {
  return (
    <MessageStack.Navigator>
      <MessageStack.Screen

        name="Message"
        component={MessageScreen}
        options={{
          headerShown: false
        }}

      />


    </MessageStack.Navigator>
  );
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

function ProfileNavigator() {
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
// const AddPostStack = createStackNavigator<AddPostNavigatorParamList>();

// function AddPostNavigator() {


//   return (
//     <AddPostStack.Navigator>
//       <AddPostStack.Screen
//         name="AddPost"
//         component={AddPostScreen}
//         options={{
//           headerShown: false,

//         }}
//       />
//     </AddPostStack.Navigator>
//   );
// }
// const PostDisplayStack = createStackNavigator<PostDisplayNavigatorParamList>();

// function PostDisplayNavigator() {
//   return (
//     <PostDisplayStack.Navigator>
//       <PostDisplayStack.Screen
//         name="PostDisplay"
//         component={PostDisplayScreen}
//         options={{
//           headerShown: false,

//         }}
//       // initialParams={post.id}
//       />

//     </PostDisplayStack.Navigator>
//   );
// }


const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={MainStack} />
      <Stack.Screen name="NewPost" component={AddPostNavigator} />
      <Stack.Screen name="ShowPost" component={PostDisplayNavigator} />

    </Stack.Navigator>

    //     <AuthProvider>
    //       <Routes />
    //     </AuthProvider>

  );
}
