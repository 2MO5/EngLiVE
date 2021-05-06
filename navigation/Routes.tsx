import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './AuthProvider';
import MainStack from './MainStack';
import AuthStack from './AuthStack';

import auth from '@react-native-firebase/auth';

const Routes = () => {

    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);



    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber;
    }, [])

    const onAuthStateChanged = (user: undefined) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    if (initializing) return null;

    return (
        <NavigationContainer>
            {user ? (<MainStack />) : (<AuthStack />)}
        </NavigationContainer>
    )
}

export default Routes
