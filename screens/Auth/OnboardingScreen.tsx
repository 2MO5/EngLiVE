
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({ selected }) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor
      }}
    />
  );
}

const Skip = ({ ...props }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 10 }}
    {...props}
  >
    <Text style={{ fontSize: 16 }}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 10 }}
    {...props}
  >
    <Text style={{ fontSize: 16, color: "#0e0e0e" }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 10 }}
    {...props}
  >
    <Text style={{ fontSize: 16 }}>Next</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {

  const [fontReady, setFontReady] = useState(false);


  useEffect(() => {

    const loadingTheFonts = async () => {
      await Font.loadAsync({
        'Poppins': require('../../assets/fonts/Poppins.ttf'),
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
        'Candara': require('../../assets/fonts/Candara.ttf'),
        'RocknRollOne': require('../../assets/fonts/RocknRollOne-Regular.ttf'),
      });
      setFontReady(true);
    }
    loadingTheFonts();
  }, [])


  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace("Welcome")}
      onDone={() => navigation.navigate("Welcome")}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('./assets/onboardN1.png')} style={{ width: '80%', height: '90%', marginTop: '-40%' }} />,
          title: 'Meet People around the globe',
          subtitle: 'Connect to improve your English',
          subTitleStyles: { color: '#524d4d', marginTop: '-18%', fontWeight: '100', fontSize: 17, fontFamily: 'Candara' },
          titleStyles: { marginTop: '-50%', color: '#27705e', fontWeight: 'bold', fontFamily: 'Poppins-Bold' }

        },
        {
          backgroundColor: '#8ba5a7',
          image: <Image source={require('./assets/onboard-2.png')} style={{ width: '90%', height: '80%' }} />,
          title: 'Your Home for English',
          subtitle: 'EnglishHUB.LiVE is your home to improve and master your English',
          subTitleStyles: { color: '#c9cfd4', fontWeight: '100', fontSize: 17, fontFamily: 'Candara', marginTop: '-25%' },
          titleStyles: { color: '#ffffff', fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: '-45%' }
        },
        {
          backgroundColor: '#43f191',
          image: <Image source={require('./assets/onboardN3.png')} style={{ marginBottom: '-58%', marginTop: '9%', width: '90%', height: '80%' }} />,
          title: 'Learn English while having loads of fun',
          subtitle: "Learning English should be enjoyable",
          subTitleStyles: { color: '#7e8a88', fontWeight: '100', fontFamily: 'Candara' },
          titleStyles: { color: '#066d5f', fontWeight: 'bold', fontFamily: 'Poppins-Bold', fontSize: 22 }
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
