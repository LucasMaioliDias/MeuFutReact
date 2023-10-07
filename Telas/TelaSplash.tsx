import React, { useEffect } from 'react';
import { View,Image, BackHandler } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const TelaSplash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const animationDuration = 4000; 

    
    const timer = setTimeout(() => {
      navigation.navigate('TelaAbertura');
    }, animationDuration);

    return () => clearTimeout(timer);
  }, [navigation]);
  
  return (
    <View style={{ flex: 1,  alignItems: 'center', backgroundColor: 'white',flexDirection:'column' }}>
      
      <LottieView
        source={require('../assets/petecandoVerde.json')}
        autoPlay
        loop
        speed={1.8}
        style={{
          height: '100%',
          width:'100%',
          left:20,
          
        }}
      />
    </View>
  );
}

export default TelaSplash;
