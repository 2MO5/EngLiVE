// import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

// import AddPostScreen from '../screens/Main/AddPostScreen';
// import PostDisplayScreen from '../screens/Main/PostDisplayScreen';
// import NotFoundScreen from '../screens/Main/NotFoundScreen';
// import SignUpScreen from '../screens/Auth/SignUpScreen';

// import { RootStackParamList } from '../types';
// import MainStack from './MainStack';
// import LinkingConfiguration from './LinkingConfiguration';
import Routes from './Routes';
import { AuthProvider } from './AuthProvider';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Providers({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    // <NavigationContainer
    //   linking={LinkingConfiguration}
    //   theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    //   <RootNavigator />
    // </NavigationContainer>

    <AuthProvider>
      <Routes />
    </AuthProvider>


  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
// const Stack = createStackNavigator<RootStackParamList>();

// function RootNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Root" component={MainStack} />
//       <Stack.Screen name="NewPost" component={AddPostScreen} />
//       <Stack.Screen name="ShowPost" component={PostDisplayScreen} />
//       <Stack.Screen name="SignUp" component={SignUpScreen} />
//       <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
//     </Stack.Navigator>

//     //     <AuthProvider>
//     //       <Routes />
//     //     </AuthProvider>

//   );
// }
