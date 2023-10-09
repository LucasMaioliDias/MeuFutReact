import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import COLORS from '../constants/colors';
import { StatusBar } from 'expo-status-bar';
const TelaDetalhes = ({ navigation, route }) => {
  const Quadras = route.params;

  // Função para lidar com o pressionamento do botão (adicione ação desejada)
  const handleButtonPress = () => {
    // Coloque a ação desejada aqui
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      {/* Botão fixo no topo */}
      <TouchableOpacity style={styles.fixedButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
      </TouchableOpacity>

      <ParallaxScrollView
        backgroundColor={COLORS.primary}
        contentBackgroundColor={COLORS.white}
        parallaxHeaderHeight={300}
        renderBackground={() => <Image source={Quadras.image} style={{ height: '100%', width: '100%' }} />}
        stickyHeaderHeight={70}
        renderStickyHeader={() => (
          <View key="stick-header" style={styles.stickyHeader}>
            {/* Conteúdo do cabeçalho pegajoso */}
          </View>
        )}
      >
        <View style={{ height: 500 }}>
          {/* Conteúdo da tela */}
        </View>
      </ParallaxScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fixedButton: {
    position: 'absolute',
    top: 25,
    left: 20,
    zIndex: 1,
    backgroundColor:'white',
    height:40,
    width:40,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
  },
  stickyHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
});

export default TelaDetalhes;
