import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ImageBackground } from 'react-native';
import COLORS from '../constants/colors';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

const TelaMenuAdministrador = () => {
  const [agendamentos, setAgendamentos] = useState([]);

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

  return (
    <View style={{ paddingHorizontal: 10, flex: 1 }}>
      <FlatList
        data={agendamentos}
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
          const Quadras = item.quadra; // Supondo que o campo seja chamado de 'quadra' no agendamento

          return (
            <View
              style={{
                width: '100%',
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
                {/*<ImageBackground style={{ height: '100%' }} source={Quadras.image} />*/}
              </View>
              <View style={{ flex: 1, marginLeft: 10, paddingVertical: 10, width: '100%', }}>
                <View style={{  justifyContent: 'center',  marginBottom: 5, width: '100%', paddingEnd: 20 ,flexDirection:'column'}}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1 }}>{item.nomeDaQuadra}</Text>
                  <Text>{item.data}</Text>
                  <Text>{item.horario}</Text>
                  <Text>{item.user.telefone}</Text>
                  <Text>{item.user.nome}</Text> 
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default TelaMenuAdministrador;
