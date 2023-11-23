import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ImageBackground, StyleSheet, StatusBar } from 'react-native';
import COLORS from '../constants/colors';
import { getFirestore, collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import Quadras from '../constants/Quadras';
import { getAuth } from 'firebase/auth';
import Icon from '@expo/vector-icons/Ionicons';
import EIcon from '@expo/vector-icons/MaterialCommunityIcons';


const TelaMenuAdministrador = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [quadrasDoUsuario, setQuadrasDoUsuario] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user ? user.uid : null;

  useEffect(() => {
    const obterAgendamentos = async () => {
      try {
        // Obtém a instância do Firestore
        const firestore = getFirestore();

        // Consulta os documentos na coleção 'agendamentos'
        const agendamentosCollection = collection(firestore, 'agendamentos');
        const querySnapshot = await getDocs(agendamentosCollection);

        const agendamentosArray = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          agendamentosArray.push(data);
        });

        setAgendamentos(agendamentosArray);
      } catch (error) {
        console.error('Erro ao obter agendamentos:', error);
      }
    };

    obterAgendamentos();
  }, []);

  useEffect(() => {
    // Filtra as quadras associadas ao usuário logado
    const quadrasFiltradas = Quadras.filter((quadra) => quadra.uid === uid);
    setQuadrasDoUsuario(quadrasFiltradas);
  }, [uid, Quadras]);

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

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', height: '100%' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: '100%' }}>
            <EIcon name="shield" size={55} color={COLORS.white} />
            <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
              <Text style={{ fontSize: 30, color: COLORS.primary, fontWeight: 'bold' }}>{obterDuasPrimeirasLetras(nomeUsuario)}</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Text style={{ color: COLORS.white, fontStyle: 'italic' }}>Administrador</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.titulo}>MEU</Text>
              <Text style={[styles.titulo, { color: COLORS.secondary }]}>FUT</Text>
            </View>
          </View>
        </View>
        <Icon name="notifications-outline" size={28} color={COLORS.white} />
      </View>
      <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
        <FlatList
          data={agendamentos.filter((item) => {
            
            return quadrasDoUsuario.some((quadra) => quadra.name === item.nomeDaQuadra);
          })}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 18, color: COLORS.black, fontStyle: 'italic' }}>
                Nenhum agendamento encontrado
              </Text>
            </View>
          )}
          renderItem={({ item }) => {
            const quadraInfo = Quadras.find((quadra) => quadra.name === item.nomeDaQuadra);

            return (
              <View
                style={{
                  width: '100%',
                  height: 120,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLORS.LIGHT_GRAY,
                  overflow: 'hidden',
                  marginBottom: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View style={{ width: '30%', height: '100%' }}>
                  {quadraInfo && (
                    <ImageBackground style={{ height: '100%' }} source={quadraInfo.image} />
                  )}
                </View>
                <View style={{ flex: 1, marginLeft: 10, paddingVertical: 10, width: '100%' }}>
                  <View style={{ justifyContent: 'center', marginBottom: 5, width: '100%', paddingEnd: 20, flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1 }}>{item.nomeDaQuadra}</Text>
                    <Text>Data: {item.data}</Text>
                    <Text>Horario: {item.horario}</Text>
                    <Text>Nome: {item.user.nome}</Text>
                    <Text>Telefone: {item.user.telefone}</Text>
                    <Text>Detalhes:    {item.detalhes}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,


  },
  titulo: {
    fontWeight: '900',
    fontSize: 22,
  },
})


export default TelaMenuAdministrador;
