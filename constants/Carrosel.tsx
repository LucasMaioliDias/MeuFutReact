import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, Text} from 'react-native';
import { BlurView } from 'expo-blur';
import Icon from '@expo/vector-icons/Ionicons';
import COLORS from './colors';
import { useNavigation } from '@react-navigation/native'; 

const { width } = Dimensions.get('screen');

const Carrosel = ({ Quadras }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('TelaDetalhes', Quadras)}>
      <View style={styles.cardContainer}>
        <ImageBackground style={styles.cardImage} source={Quadras.image}>
          <View style={styles.infoContainer}>
            
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    alignItems: 'center',
    elevation:10,
  },
  cardImage: {
    height: 300,
    width: width ,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    
     
  },
  infoContainer: {
    height: 70,
    width: 330,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation:10,
    opacity: 0.6
  },
});

export default Carrosel;
