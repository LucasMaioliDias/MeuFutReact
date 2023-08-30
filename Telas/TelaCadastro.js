
import { Text, View, StyleSheet, TextInput, TouchableOpacity ,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


const TelaCadastro = () => {
  const [img, setImg] = useState(require('../assets/olho.png'));

  function AbrirOlho() {
    setImg(require('../assets/olho-aberto.png'));
  }
  const navigation = useNavigation();


  return (
    <SafeAreaView style={Styles.container}>
      <View style={{ marginVertical: 5 }}>
      <View style={{flexDirection:'row',justifyContent:'center'}}>
        <Text style={Styles.txt}>Criar Conta</Text>
        <Image source={require('../assets/logo.png')} style={{height:90,width:90,top:26}}/>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={Styles.textInput}>Nome</Text>
          <View style={Styles.containerInput}>
            <TextInput
              placeholder="Insira seu nome completo"
              placeholderTextColor={Colors.black}
              keyboardType="email-address"
              style={{
                width: '100%',
              }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={Styles.textInput}>Email</Text>
          <View style={Styles.containerInput}>
            <TextInput
              placeholder="Insira seu email"
              placeholderTextColor={Colors.black}
              keyboardType="email-address"
              style={{
                width: '100%',
              }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={Styles.textInput}>Telefone</Text>
          <View style={[Styles.containerInput]}>
            <TextInput
              placeholder="+55"
              placeholderTextColor={Colors.black}
              keyboardType="numeric"
              style={{
                width: '12%',
                borderRigthWidth:1,
                borderRigthColor:COLORS.black,
                height:"100%"
              }}
            />
            <TextInput 
                placeholder='Insira seu numero de telefone'
                placeholderTextColor={Colors.black}
                keyboardType="numeric"
                style={{
                  width:"80%"
                }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={Styles.textInput}>Senha</Text>
          <View style={Styles.containerInput}>
            <TextInput
              placeholder="Insira sua Senha"
              placeholderTextColor={Colors.black}
              secureTextEntry
              style={{
                width: '100%',
              }}
            />
            <TouchableOpacity style={Styles.btnAbrir} onPress={AbrirOlho}>
              <Image source={img} style={Styles.btnImage}/>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={Styles.btn}>
          <Text style={Styles.btnText}>Cadastrar</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row',alignItems:'center',marginVertical:15}}> 
          <View style={{flex:1,height:1,backgroundColor:COLORS.black,marginHorizontal:10}}>
          </View>
          <Text style={{fontSize:14}}>Acesso rápido com</Text>
          <View style={{flex:1,height:1,backgroundColor:COLORS.black,marginHorizontal:10}}></View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
          <TouchableOpacity style={Styles.btnLogo}>
              <Image source={require('../assets/google.png')} style={Styles.imgLogo} resizeMode='contain' />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.btnLogo}>
              <Image source={require('../assets/facebook.png')} style={Styles.imgLogo} resizeMode='contain' />
          </TouchableOpacity>
        </View>
        <View style={{justifyContent:'center',flexDirection:'row',marginVertical:22}}>
          <Text>Já tem uma conta!!</Text>
          <Text style={{marginHorizontal:4,fontWeight:'bold',color:COLORS.primary}} onPress={() => navigation.navigate('TelaLogin')}>Entre</Text>
        </View>
      </View>
      
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
  },
  txt: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: COLORS.black,
    marginRight:180,
    top:35
  },
  textInput: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  containerInput: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection:'row',
    paddingLeft: 20,
  },
  btnImage:{
    height:25,
    width:25,
  },
  btnAbrir:{
    position:'absolute',
    right:12,
    alignSelf: 'center',
  },
  btn:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 370,
    backgroundColor: COLORS.primary,
    padding: 20,
    marginTop: 20,
    marginBottom: 30, 
    alignSelf: 'center', 
    borderRadius: 10,
  },
  btnText:{
    color:COLORS.white,
    fontWeight:'bold',
    fontSize:15,
  },
  btnLogo:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    flexDirection: 'row',
    borderRadius:10,
    borderColor:COLORS.black,
    height:52,
    borderWidth:1,
    marginHorizontal:5,
  },
  imgLogo:{
    height:30,
    width:30,
  },

});

export default TelaCadastro;
