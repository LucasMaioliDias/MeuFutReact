import React from 'react';
import { FlatList, View, Image, Dimensions, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

const Slider = () => {
  const img = [
    {
      id: 1,
      name: 'slider 1',
      image: require('../assets/6.png')
    },
    {
      id: 2,
      name: 'slider 2',
      image: require('../assets/4.png')
    },
    {
      id: 3,
      name: 'slider 3',
      image: require('../assets/fem.png'),
    },
  ];

  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={img}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cardContainer}
          >
            <ImageBackground style={styles.cardImage} source={item.image}>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  cardImage: {
    height: 230,
    width: width - 20, 
    borderRadius: 10,
    padding: 10,
  },
  
});

export default Slider;
