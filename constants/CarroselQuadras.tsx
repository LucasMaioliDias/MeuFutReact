import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, Text, ImageBackground } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import COLORS from './colors';

import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

const Carrosel = ({ Quadras }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.LIGHT_GRAY,
        overflow: 'hidden',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',

      }}
      onPress={() => navigation.navigate('TelaDetalhes', Quadras)}
    >
      <View style={{ width: '30%', height: '100%' }}>
        <ImageBackground style={{ height: '100%' }} source={Quadras.image} />
      </View>
      <View style={{ flex: 1, marginLeft: 10, paddingVertical: 10, width: '100%' }}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, width: '100%', paddingEnd:20 }}>
    <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1 }}>{Quadras.name}</Text>
    <Text style={{ fontSize: 13, fontWeight: '500', color: COLORS.black }}>
      R$ {Quadras.price}
    </Text>
  </View>
  <Text style={{ fontSize: 13, fontWeight: '200' }}>{Quadras.location}</Text>
  <View style={{ flexDirection: 'row' }}>
  {Quadras.bath && (
    <View style={styles.icon}>
      <Icon name="shower" size={14} color={COLORS.primary} />
    </View>
  )}
  {Quadras.barbecue && (
    <View style={styles.icon}>
      <Icon name="fire" size={14} color={COLORS.primary} />
    </View>
  )}
</View>

</View>


    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30,
    backgroundColor: COLORS.secondary,
    marginTop: 10,
    borderRadius: 10,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd:8,

  },
});

export default Carrosel;
