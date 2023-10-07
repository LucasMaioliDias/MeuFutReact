import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native'; // Importe o hook useNavigation

const Maps = () => {
  const navigation = useNavigation(); // Use o hook useNavigation para obter a propriedade navigation

  const [location, setLocation] = useState({
    latitude: -23.605066,
    longitude: -46.763137,
    latitudeDelta: 0.0043,
    longitudeDelta: 0.0034,
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnHeader} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>
      <MapView style={{ height: '100%', width: '100%' }} region={location} showsUserLocation={true}>
       
        <Marker
          coordinate={{
            latitude: -23.605066,
            longitude: -46.763137,
          }}
        >
          <Ionicons name="location-sharp" size={70} color="red" />
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  btnHeader: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
  },
  header: {
    height: 70,
    width: '100%',
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    paddingStart: 20,
  },
});

export default Maps;
