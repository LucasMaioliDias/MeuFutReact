import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, Text } from 'react-native';
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
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {Quadras.name}
          </Text>
          <View style={styles.blurContainer}>
            <BlurView intensity={20} style={styles.blurView}>
              <View style={styles.textContainer}>
                <Icon name="location-sharp" size={20} color={COLORS.white} />
                <Text style={{ marginLeft: 5, color: COLORS.white }}>
                  {Quadras.location}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Icon name="star" size={20} color="yellow" />
                <Text style={{ marginLeft: 5, color: COLORS.white }}>5.0</Text>
              </View>
            </BlurView>
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
  },
  cardImage: {
    height: 220,
    width: width ,
    padding: 10,
    borderRadius: 10,
  },
  blurContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    
  },
  blurView: {
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent:'space-between',
    
    
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default Carrosel;
