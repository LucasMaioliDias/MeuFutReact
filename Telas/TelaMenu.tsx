import React from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, View, Text, TextInput, FlatList, Dimensions,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import EIcon from '@expo/vector-icons/MaterialCommunityIcons';
import COLORS from '../constants/colors';
import Quadras from '../constants/Quadras';
import Carrosel from '../constants/CarroselQuadras';
import { useNavigation } from '@react-navigation/native';
import Slider from '../constants/Slider';


const { width } = Dimensions.get('screen');


const TelaMenu = () => {
  const navigation = useNavigation();
  
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={styles.container}>
        <View style={{ alignItems: 'center', justifyContent: 'center', bottom: 7, flexDirection: 'row', right: 8 }}>
          <EIcon name="shield" size={55} color={COLORS.white} />
          <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <Text style={{ fontSize: 30, color: COLORS.primary, fontWeight: 'bold' }}>LM</Text>
          </View>
        </View>
        
        <View>
          <Text style={{ right: 110, bottom: 6, color: COLORS.white, fontStyle:'italic' }}>Fala jogado</Text>
          <Text style={styles.titulo}>MEU FUT</Text>
        </View>
        <Icon name="notifications-outline" size={28} color={COLORS.white} />
      </View>
      <Slider />
      <Text style={styles.subTitulo}>Categorias</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.containerQuadras}>
          <View style={styles.icon}>
            <Icon name="football" size={25} color={COLORS.primary} />
          </View>
          <Text style={{ fontSize: 14, color: COLORS.primary, fontWeight: 'bold', marginTop: 5 }}>Lorem</Text>
        </View>
        <View style={styles.containerQuadras}>
          <View style={styles.icon}>
            <Icon name="star-sharp" size={25} color={COLORS.primary} />
          </View>
          <Text style={{ fontSize: 14, color: COLORS.primary, fontWeight: 'bold', marginTop: 5 }}>Lorem</Text>
        </View>
        <View style={styles.containerQuadras}>
          <View style={styles.icon}>
            <Icon name="thumbs-up-sharp" size={25} color={COLORS.primary} />
          </View>
          <Text style={{ fontSize: 14, color: COLORS.primary, fontWeight: 'bold', marginTop: 5 }}>Lorem</Text>
        </View>
        <View style={styles.containerQuadras}>
          <View style={styles.icon}>
            <Icon name="navigate" size={25} color={COLORS.primary} onPress={() => navigation.navigate("TelaMaps")} />
          </View>
          <Text style={{ fontSize: 14, color: COLORS.primary, fontWeight: 'bold', marginTop: 5 }}>Lorem</Text>
        </View>

      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.subTitulo}>Quadras</Text>
        <Text style={{ marginHorizontal: 20, marginVertical: 20, color: COLORS.secondary,  fontSize: 15 }}>Ver Tudo</Text>
      </View>
      <View>
        <FlatList
          contentContainerStyle={{ paddingLeft: 20 }}
          data={Quadras}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Carrosel Quadras={item} />}
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor: COLORS.primary,

  },
  titulo: {
    color: COLORS.white,
    fontSize: 22,
    right: 110,
    bottom: 6

  },
  busca: {
    height: 60,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    top: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,

  },
  containerQuadras: {
    marginHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
    opacity: 0.7
  },
  icon: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    opacity: 0.8,
  },
  subTitulo: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontSize: 22,
    

  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
});
export default TelaMenu;