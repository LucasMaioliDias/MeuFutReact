import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, SafeAreaView, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import COLORS from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Icon from '@expo/vector-icons/FontAwesome';
import MapView, { Marker } from 'react-native-maps';


const TelaDetalhes = ({ route }) => {
  const Quadras = route.params;
  const { width, height } = Dimensions.get('screen');
  const navigation = useNavigation();
  const latitude = Quadras.latitude;
  const longitude = Quadras.longitude;
  

  const handleGoBackToAgendamento = () => {
    const nomeDaQuadra = Quadras.name;
    const localDaQuadra = Quadras.location;
    const ruaDaQuadra = Quadras.street;
    const preco = Quadras.price;
  
    navigation.navigate("TelaAgendamento", {ruaDaQuadra,localDaQuadra,nomeDaQuadra,preco});
  };
  
  

  return (
    <SafeAreaView style={{ flex: 1 ,backgroundColor:COLORS.white}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      <ImageBackground source={Quadras.image} style={{ height: height / 3, width: '100%' }}>
        <View style={styles.bottomLeftText}>
          <Text style={{ letterSpacing: 1, fontSize: 17, fontWeight: '900', color: COLORS.primary }}>Quadra {Quadras.name}</Text>
        </View>
      </ImageBackground>
      <View style={{ marginTop: -20, backgroundColor: COLORS.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, flex: 1, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'column' }}>
        
        <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: '600', color: COLORS.primary }}>Descrição</Text>
        <Text>{Quadras.details}</Text>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: '600', color: COLORS.primary }}>Comodidades</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            {Quadras.bath && (<View style={styles.icon}>
              <Icon name="shower" size={20} color={COLORS.primary} />
            </View>)}
            {Quadras.barbecue && (<View style={styles.icon}>
              <Icon name="fire" size={20} color={COLORS.primary} />
            </View>)}
            {Quadras.parking && (<View style={styles.icon}>
              <Icon name="car" size={20} color={COLORS.primary} />
            </View>)}
            {Quadras.house && (<View style={styles.icon}>
              <Icon name="car" size={20} color={COLORS.primary} />
            </View>)}
          </View>
        </View>
        <View style={{ marginTop: 10 ,backgroundColor:COLORS.white}}>
          <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: '600', color: COLORS.primary }}>Localização</Text>
          <Text>{Quadras.location}</Text>
          <Text>{Quadras.street}</Text>

          <View style={{ borderRadius: 20, overflow: 'hidden', marginTop: 15, }}>
            <MapView style={{ height: height / 4.5, width: "100%", }} initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}>
              <Marker
                coordinate={{
                  latitude,
                  longitude,
                }}
                title={Quadras.name}
                description={Quadras.location}
              />
            </MapView>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={{ width: '100%', height: 70, backgroundColor: COLORS.secondary, justifyContent: 'space-between', position: 'absolute', bottom: 0, paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}
        onPress={handleGoBackToAgendamento}>
          <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white, borderRadius: 10 }}>
            <Text style={{ color: COLORS.secondary, fontSize: 18, fontWeight: 'bold' }}>R$ {Quadras.price}/H</Text>
          </View>
          <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white, borderRadius: 10 }}>
            <Text style={{ color: COLORS.secondary, fontSize: 18, fontWeight: 'bold' }}>Agendar agora</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 30,
    left: 25,
    zIndex: 1,
    // height:50,
    // width:50,
    //borderRadius:99,
    // backgroundColor:COLORS.white,
    //opacity: 0.3
    //justifyContent:'center',
    //alignItems:'center',
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomLeftText: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 15,
    marginStart: 6,
    elevation: 5,

  },

  icon: {
    height: 50,
    width: 70,
    backgroundColor: COLORS.secondary,
    opacity: 0.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 10
  }
});

export default TelaDetalhes;
