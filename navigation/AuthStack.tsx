import React, { useEffect, useState } from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthStackParamList, OnboardingNavigatorParamList, SignUpNavigatorParamList, LoginNavigatorParamList, WelcomeNavigatorParamList } from '../types';

import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import LoginScreen from '../screens/Auth/LogInScreen';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';

import { GoogleSignin } from '@react-native-community/google-signin';
import SignUpInfoScreen from '../screens/Auth/SignUpInfoScreen';
const Stack = createStackNavigator<AuthStackParamList>();


export default function AuthStack() {

    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    let routeName;


    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then((value) => {
            if (value === null) {
                AsyncStorage.setItem('alreadyLaunched', 'true');
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        });

        GoogleSignin.configure({
            webClientId: '729551426293-9bf5b8nca5iqsnefo2neocrc0o56i5f6.apps.googleusercontent.com',
        });

    }, [])



    return (
        <Stack.Navigator initialRouteName={routeName} >
            <Stack.Screen
                name="Onboarding"
                component={OnBoardingNavigator}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpNavigator}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="SignUpInfo"
                component={SignUpInfoScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Login"
                component={LogInNavigator}
                options={{
                    headerShown: false
                }}

            />
            <Stack.Screen
                name="Welcome"
                component={WelcomeNavigator}
                options={{
                    headerShown: false
                }}

            />

        </Stack.Navigator>
    )
}


const OnboardingStack = createStackNavigator<OnboardingNavigatorParamList>();

function OnBoardingNavigator() {
    return (
        <OnboardingStack.Navigator>
            <OnboardingStack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{
                    headerShown: false
                }}


            />
        </OnboardingStack.Navigator>
    );
}

const SignUpStack = createStackNavigator<SignUpNavigatorParamList>();

function SignUpNavigator() {
    return (
        <SignUpStack.Navigator>
            <SignUpStack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                    headerShown: false
                }}


            />
            <SignUpStack.Screen
                name="SignUpInfo"
                component={SignUpInfoScreen}
                options={{
                    headerShown: false
                }}


            />
        </SignUpStack.Navigator>
    );
}
const LoginStack = createStackNavigator<LoginNavigatorParamList>();

function LogInNavigator() {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerShown: false
                }}


            />
        </LoginStack.Navigator>
    );
}

const WelcomeStack = createStackNavigator<WelcomeNavigatorParamList>();

function WelcomeNavigator() {
    return (
        <WelcomeStack.Navigator>
            <WelcomeStack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{
                    headerShown: false
                }}


            />
        </WelcomeStack.Navigator>
    );
}




