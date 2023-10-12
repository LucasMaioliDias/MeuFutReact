
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";
import { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

type FormCadastro = {
  nome: string;
  email: string;
  senha: string;
  telefone: number;
  ddd: Number;
};




const TelaCadastro = () => {

  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors } } = useForm<FormCadastro>()
  const onsubmit = (data: FormCadastro) => console.log(data)

  useEffect(() => console.log('Senha errors', errors?.senha), [errors?.senha]);
  useEffect(() => console.log('Email errors', errors?.email), [errors?.email]);
  useEffect(() => console.log('Name errors', errors?.nome), [errors?.nome]);
  useEffect(() => console.log('Phone errors', errors?.telefone), [errors?.telefone]);
  useEffect(() => console.log('ddd errors', errors?.ddd), [errors?.ddd]);

  const [hidepass, setHidePass] = useState(true)



  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <View style={{ marginVertical: 5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={Styles.txt}>Criar Conta</Text>
          <Image source={require('../assets/logo.png')} style={{ height: 90, width: 90, top: 26 }} />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={Styles.textInput}>Nome</Text>
          <View style={Styles.containerInput}>
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '10%', }}>
              <Ionicons name="person-outline" size={18} color={COLORS.black} />
            </View>
            <Controller
              name="nome"
              control={control}
              rules={{
                required: "Nome obrigatorio",
                pattern: {
                  message: "Nome invalido",
                  value: /^[A-Za-zÀ-ÖØ-öø-ÿ-' ]+$/,

                }
              }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  placeholder="Insira seu Nome"
                  placeholderTextColor={Colors.black}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    width: '90%',
                    marginStart: 8,
                  }}
                />
              )}
            />
          </View>
          {errors.nome && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="alert-circle-outline" size={15} color='red' />
              <Text style={Styles.erro}>{errors.nome?.message}</Text>
            </View>
          )}
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={Styles.textInput}>Email</Text>
          <View style={Styles.containerInput}>
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '10%', }}>
              <Ionicons name="mail-outline" size={18} color={COLORS.black} />
            </View>
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
                    width: '90%',
                    marginStart: 8,
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
          <Text style={Styles.textInput}>Telefone</Text>
          <View style={[Styles.containerInput]}>
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '10%', }}>
              <Ionicons name="phone-portrait-outline" size={18} color={COLORS.black} />
            </View>
            <Controller
              name="telefone"
              control={control}
              rules={{
                required: "Telefone obrigatorio",
                minLength: {
                  value: 11,
                  message: "Telefone invalido",
                },

              }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  placeholder='Insira seu numero de telefone'
                  placeholderTextColor={Colors.black}
                  keyboardType="numeric"
                  onChangeText={onChange}
                  maxLength={11}
                  style={{
                    width: "90%",
                    marginStart: 8,
                  }}
                />
              )}
            />
          </View>
          {errors.telefone && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="alert-circle-outline" size={15} color='red' />
              <Text style={Styles.erro}>{errors.telefone?.message}</Text>
            </View>
          )}
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={Styles.textInput}>Senha</Text>
          <View style={Styles.containerInput}>
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '10%', }}>
              <Ionicons name="lock-closed-outline" size={18} color={COLORS.black} />
            </View>
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
                  secureTextEntry={hidepass}
                  style={{
                    width: '90%',
                    marginStart: 8,
                  }}
                />
              )}
            />
            <TouchableOpacity style={Styles.btnAbrir} onPress={() => setHidePass(!hidepass)}>
              {hidepass ?
                <Ionicons name="eye-off-outline" size={20} color='black' />
                :
                <Ionicons name="eye-outline" size={20} color='black' />
              }
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
          <Text style={Styles.btnText}>Cadastrar</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row', marginVertical: 22 }}>
          <Text>Já tem uma conta!!</Text>
          <Text style={{ marginHorizontal: 4, fontWeight: 'bold', color: COLORS.primary }} onPress={() => navigation.navigate("TelaLogin")}>Entre</Text>
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
    marginRight: 180,
    top: 35
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
    //paddingLeft: 20,
  },
  btnImage: {
    height: 25,
    width: 25,
  },
  btnAbrir: {
    position: 'absolute',
    right: 12,
    alignSelf: 'center',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
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

export default TelaCadastro;
