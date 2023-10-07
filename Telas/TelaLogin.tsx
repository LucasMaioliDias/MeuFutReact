
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";
import { useEffect } from 'react';


type FormData = {
  email: string;
  senha: string;
};



const TelaLogin = () => {
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()
  const onsubmit = (data: FormData) => console.log(data)

  useEffect(() => console.log('Senha errors', errors?.senha), [errors?.senha]);
  useEffect(() => console.log('Email errors', errors?.email), [errors?.email]);

  return (
    <SafeAreaView style={Styles.container}>
      <View style={{ marginVertical: 22 }}>
        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
          <Text style={Styles.txt}>Bem vindo             </Text>
          <Image source={require('../assets/logo.png')} style={{ height: 90, width: 90 }} />
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={Styles.textInput}>Email</Text>
          <View style={Styles.containerInput}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email obrigatorio",
                pattern: {
                  message: "Email invalido",
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                }
              }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  placeholder="Insira seu email"
                  placeholderTextColor={Colors.black}
                  keyboardType="email-address"
                  onChangeText={onChange}
                  value={value}
                  style={{
                    width: '100%',
                  }}
                />
              )}
            />
          </View>
          {errors.email && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="alert-circle-outline" size={15} color='red' />
              <Text style={Styles.erro}>{errors.email?.message}</Text>
            </View>
          )}
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={Styles.textInput}>Senha</Text>
          <View style={Styles.containerInput}>
            <Controller
              name="senha"
              control={control}
              rules={{
                required: "Senha obrigatoria",
                minLength: {
                  value: 3,
                  message: "Sua senha deve ter pelo menos 3 caracteres",
                },
                
              }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Insira sua Senha"
                  placeholderTextColor={Colors.black}
                  secureTextEntry
                  style={{
                    width: '100%',
                  }}
                />
              )}
            />
            <TouchableOpacity style={Styles.btnAbrir} >

            </TouchableOpacity>
          </View>
          {errors.senha && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="alert-circle-outline" size={15} color='red' />
              <Text style={Styles.erro}>{errors.senha?.message}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={Styles.btn} onPress={() => {
          Keyboard.dismiss();
          handleSubmit(onsubmit)();
        }}>
          <Text style={Styles.btnText}>Entrar</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: COLORS.black, marginHorizontal: 10 }}>
          </View>
          <Text style={{ fontSize: 14 }}>Acesso rápido com</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: COLORS.black, marginHorizontal: 10 }}></View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={Styles.btnLogo}>
            <Image source={require('../assets/google.png')} style={Styles.imgLogo} resizeMode='contain' />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.btnLogo}>
            <Image source={require('../assets/facebook.png')} style={Styles.imgLogo} resizeMode='contain' />
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row', marginVertical: 22 }}>
          <Text>Não tem uma conta?</Text>
          <Text style={{ marginHorizontal: 4, fontWeight: 'bold', color: COLORS.primary }} onPress={() => navigation.navigate('TelaCadastro')}>cadastre-se</Text>
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
    marginVertical: 12,
    color: COLORS.black,
    marginRight: 130


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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 22,
  },
  btnImage: {
    height: 25,
    width: 25,
  },
  btnAbrir: {
    position: 'absolute',
    right: 12,
    alignSelf: 'center',
  },
  btn: {
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
  btnText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
  btnLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: COLORS.black,
    height: 52,
    borderWidth: 1,
    marginHorizontal: 5,
  },
  imgLogo: {
    height: 30,
    width: 30,
  },
  erro: {
    color: 'red',
    margin: 5,
    flexDirection: 'row'
  },

});

export default TelaLogin;
