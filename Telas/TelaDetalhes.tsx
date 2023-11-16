import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, SafeAreaView, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import COLORS from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const TelaDetalhes = ({  route }) => {
  const Quadras = route.params;
  const { width, height } = Dimensions.get('screen');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1,  }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      <ImageBackground source={require('../assets/QuadraFortaleza.png')} style={{ height: height / 3, width: '100%' }}>
        </ImageBackground>
      <View style={{ marginTop: -20, backgroundColor: COLORS.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 100 }}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("TelaAgendamento")}>

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
  btn:{
    height:100,
    width:"100%",
    backgroundColor:COLORS.primary
  },
});

export default TelaDetalhes;
