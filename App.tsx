import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Providers from './navigation';
import Navigation from './navigation';
import Navigator from './navigation/Drawer'
import { createDrawerNavigator } from '@react-navigation/drawer';
//import Drawer from './navigation/Drawer';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Providers colorScheme={colorScheme} />
        <StatusBar />

      </SafeAreaProvider>
    );
  }
}
