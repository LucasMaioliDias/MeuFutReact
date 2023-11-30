import React, { useState,useEffect } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, View, Text, TextInput, FlatList, Dimensions, TouchableOpacity, Alert
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import EIcon from '@expo/vector-icons/MaterialCommunityIcons';
import COLORS from '../constants/colors';
import Quadras from '../constants/Quadras';
import Carrosel from '../constants/CarroselQuadras';
import { useNavigation } from '@react-navigation/native';
import TelaAgendadas from './TelaAgendadas';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc,doc, getDoc } from 'firebase/firestore';


const { width } = Dimensions.get('screen');


const TelaMenu = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');


  const [nomeUsuario, setNomeUsuario] = useState('');

  useEffect(() => {
    const obterNomeUsuario = async () => {
      const auth = getAuth();
          const user = auth.currentUser;
          const uid = user ? user.uid : null;
      
          // Obtém a instância do Firestore
          const firestore = getFirestore();
      
          // Recupera as informações do usuário no Firestore
          const userDocRef = doc(firestore, 'users', uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
      
            // Verifica se 'nome' é uma string válida antes de usá-la
            const name = typeof userData.name === 'string' ? userData.name : '';
            setNomeUsuario(name);
          }
    };

    obterNomeUsuario();
  }, []);

  const obterDuasPrimeirasLetras = (name) => {
    return name.slice(0, 2).toUpperCase();
  };

  const alerta = () => {
    Alert.alert("Beta");
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={styles.container}>
        <View style={{flexDirection:'row',height:'100%'}}>
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row',height:'100%'}}>
          <EIcon name="shield" size={55} color={COLORS.white} />
          <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <Text style={{ fontSize: 30, color: COLORS.primary, fontWeight: 'bold' }}>{obterDuasPrimeirasLetras(nomeUsuario)}</Text>
          </View>
        </View>
        <View style={{justifyContent:'center',alignItems:'center',height:'100%'}}>
          <Text style={{color: COLORS.white, fontStyle: 'italic' }}>Fala, jogadô</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.titulo}>MEU</Text>
            <Text style={[styles.titulo, { color: COLORS.secondary }]}>FUT</Text>
          </View>
        </View>
        </View>
        <Icon name="notifications-outline" size={28} color={COLORS.white} />
      </View>
      <View style={{ height: 35, backgroundColor: COLORS.secondary, alignItems: 'center', paddingHorizontal: 18, flexDirection: 'row' }}>
        <Icon name="compass-outline" size={19} color={COLORS.white} />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, marginStart: 5 }}>
          <Text style={{ color: COLORS.white }}>Sao Paulo, Sao Paulo</Text>
          <TouchableOpacity style={{ height: '100%' }} onPress={alerta}>
            <Text style={{ color: COLORS.white, fontStyle: 'italic', fontSize: 10 }}>Alterar localização</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
        <View style={{ height: 45, width: "100%", borderWidth: 2, borderColor: COLORS.secondary, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 }}>
          <Icon name="search" size={19} color={COLORS.primary} />
          <TextInput style={{ height: '100%', width: "100%", fontSize: 15, marginStart: 8 }} placeholder="Pesquisar quadra..."
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)} />
        </View>
      </View>
      <Text style={[styles.subTitulo, { marginVertical: 10 }]}>Categorias</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,paddingHorizontal:15}}>
        <TouchableOpacity style={styles.containerQuadras} onPress={() => navigation.navigate('TelaEscolherTime')}>
          <View style={styles.icon}>
            <Icon name="football" size={25} color={COLORS.primary} />
          </View>
          <Text style={{ fontSize: 14, color: COLORS.primary, fontWeight: 'bold', marginTop: 5 }}>Escolher Time</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerQuadras} onPress={() => navigation.navigate('TelaAgendadas')}>
          <View style={styles.icon}>
            <Icon name="calendar" size={25} color={COLORS.primary} />
          </View>
          <Text style={{ fontSize: 14, color: COLORS.primary, fontWeight: 'bold', marginTop: 5 }}>Agendados</Text>
        </TouchableOpacity>
        <View style={styles.containerQuadras}>
          <View style={styles.icon}>
            <Icon name="star-sharp" size={25} color={COLORS.primary} />
          </View>
          <Text style={{ fontSize: 14, color: COLORS.primary, fontWeight: 'bold', marginTop: 5 }}>favoritos</Text>
        </View>
        <View style={styles.containerQuadras}>
          <View style={styles.icon}>
            {/*<Icon name="navigate" size={25} color={COLORS.primary} />*/}
          </View>
          {/*<Text style={{ fontSize: 14, color: COLORS.primary, fontWeight: 'bold', marginTop: 5 }}>Localizaçao</Text>*/}
        </View>

      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.subTitulo}>Quadras</Text>
        <Text style={{ marginHorizontal: 20, marginVertical: 20, color: COLORS.secondary, fontSize: 15 }}>Ver Tudo</Text>
      </View>
      <View style={{ paddingHorizontal: 10, flex: 1 }}>
  <FlatList
    data={Quadras.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))}
    keyExtractor={item => item.id}
    showsVerticalScrollIndicator={false}
    ListEmptyComponent={() => (
      <View style={{alignItems:'center',justifyContent:'center',flex:1,}}>
      <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 18, color: COLORS.black,fontStyle:'italic', }}>
        Nenhuma quadra encontrada
      </Text>
      </View>
    )}
    renderItem={({ item }) => <Carrosel Quadras={item} />}
  />
</View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: 70,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    

  },
  titulo: {
    fontWeight: '900',
    fontSize: 22,



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
    marginVertical: 15,
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