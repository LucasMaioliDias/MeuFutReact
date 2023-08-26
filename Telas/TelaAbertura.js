import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const TelaAbertura = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View>
        <Image
          source={require('../assets/bola.png')}
          style={{
            height: 100,
            width: 100,
            position: 'absolute',
            top: 10,
            transform: [
              { translateX: -50 },
              { translateY: -20 },
              { rotate: '-15deg' },
            ],
          }}
        />

        <Image
          source={require('../assets/bola.png')}
          style={{
            height: 110,
            width: 110,
            position: 'absolute',
            top: 0,
            left: 150,
            transform: [
              { translateX: 100 },
              { translateY: -60 },
              { rotate: '20deg' },
            ],
          }}
        />

        <Image
          source={require('../assets/bola.png')}
          style={{
            height: 180,
            width: 180,
            position: 'absolute',
            top: 0,
            left: 150,
            transform: [
              { translateX: -250 },
              { translateY: 200 },
              { rotate: '20deg' },
            ],
          }}
        />

        <Image
          source={require('../assets/bola.png')}
          style={{
            height: 160,
            width: 160,
            position: 'absolute',
            top: 0,
            left: 50,
            transform: [
              { translateX: 40 },
              { translateY: 50 },
              { rotate: '-10deg' },
            ],
          }}
        />

        <Image
          source={require('../assets/bola.png')}
          style={{
            height: 200,
            width: 200,
            position: 'absolute',
            top: 0,
            left: 200,
            transform: [
              { translateX: 40 },
              { translateY: 200 },
              { rotate: '-50deg' },
            ],
          }}
        />

      </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.txt}>
              MeuFut
            </Text>
            <Text style={styles.txt2}>
              Let't Get Started
            </Text>
          </View>
          <View style={styles.containerDescricao}>
            <Text style={styles.txtDescricao}>
              Entre no nosso aplicativo de reserva e simplifique sua experiência ao planejar suas reservas. 
            </Text>
            <Text style={styles.txtDescricao}>
              Tudo que você precisa ao alcance dos seus dedos.
            </Text>
          </View>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('TelaLogin')}
>
              <Text style={styles.btnText}>Entrar</Text>
                <Image source={require('../assets/seta-direita.png')} style={styles.btnImage}/>
            </TouchableOpacity>
          </View>
            <View style={styles.containerTexto}>
              <Text style={styles.txtcadastro} >
                Nao se cadastrou ainda?
              </Text>
              <Text style={[styles.txtcadastro,{fontWeight:'bold',marginStart:3}]} onPress={() => navigation.navigate('TelaCadastro')}>
                  Login
              </Text>
      </View>
  </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    position: 'absolute',
    top: 420,
    width: "100%",
  },
  txt: {
    fontSize: 60,
    fontWeight: '800',
    color:COLORS.white,
  },
  txt2:{
    fontSize: 40,
    fontWeight: '800',
    color:COLORS.white,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 370,
    backgroundColor: 'white',
    padding: 20,
    marginTop: 20,
    marginBottom: 30, 
    alignSelf: 'center', 
    borderRadius: 10,
    top:660,
    flexDirection:'row',
},
btnImage:{
  width: 15,
  height: 15,
  
},
btnText:{
  fontSize: 20,
  fontWeight: '600',
  marginRight: 250,
},
txtcadastro:{
  alignSelf: 'center',
  top:640,
  fontSize:20,
  color:COLORS.white,
  fontWeight:'300',
  
},
containerTexto:{
  flexDirection:'row',
  marginTop:10,
  justifyContent:'center',
},
txtDescricao:{
  top:560,
  fontSize:15,
  color:COLORS.white,
  fontWeight:'500',
},
containerDescricao:{
  paddingHorizontal: 22,
  position: 'absolute',
},



});

export default TelaAbertura;
