import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Image, FlatList, ImageBackground } from 'react-native';
import Header from '../constants/Header';
import COLORS from '../constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs, query, where, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Quadras from '../constants/Quadras';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('screen');


const TelaAgendadas = () => {
    const [agendamentoData, setAgendamentoData] = useState([]);
    const [uid, setUid] = useState(null);
    const navigation = useNavigation();
    const [hideAgenda, setHideAgenda] = useState(false);
    const [selectedSquare, setSelectedSquare] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAgendamento, setSelectedAgendamento] = useState(null);

    const handleShowModal = (agendamento) => {
        setSelectedAgendamento(agendamento);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleSquarePress = (index) => {
        setSelectedSquare(selectedSquare === index ? null : index);
    };

    useEffect(() => {
        const obterDadosAgendamentos = async () => {
            const firestore = getFirestore();

            try {
                const auth = getAuth();
                const user = auth.currentUser;
                setUid(user ? user.uid : null);

                const agendamentosCollection = collection(firestore, 'agendamentos');

                // Adicione um filtro baseado no status selecionado
                let statusFiltro = '';
                if (selectedSquare === 1) {
                    statusFiltro = 'agendado';
                } else if (selectedSquare === 2) {
                    statusFiltro = 'cancelado';
                } else if (selectedSquare === 3) {
                    statusFiltro = 'realizado';
                }

                // Use o filtro apenas se o statusFiltro não for uma string vazia
                const querySnapshot = statusFiltro
                    ? await getDocs(query(agendamentosCollection, where('status', '==', statusFiltro)))
                    : await getDocs(agendamentosCollection);

                const dadosAgendamentos = querySnapshot.docs
                    .filter((doc) => doc.data().user.uid === uid)
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                setAgendamentoData(dadosAgendamentos);
            } catch (error) {
                console.error('Erro ao obter dados dos agendamentos:', error);
            }
        };

        obterDadosAgendamentos();
    }, [uid, selectedSquare]);


    const handleObterIdAgendamento = async (agendamento) => {

        console.log('Clicou no agendamento com ID:', agendamento.id);

        handleCloseModal();

        await alterarStatusNoBanco(agendamento.id);

        handleSquarePress(2);
    };

    const alterarStatusNoBanco = async (agendamentoId) => {
        const firestore = getFirestore();
        const agendamentoRef = doc(firestore, 'agendamentos', agendamentoId);

        try {

            await updateDoc(agendamentoRef, { status: 'cancelado' });

            console.log('Status do Agendamento atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar o status do agendamento:', error);
        }
    };

    const renderItem = ({ item }) => {
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
                    backgroundColor:COLORS.white
                }}
            >
                <View style={{ width: '30%', height: '100%' }}>
                    {quadraInfo && (
                        <ImageBackground style={{ height: '100%' }} source={quadraInfo.image} />
                    )}
                </View>
                <View style={{ flex: 1, paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', marginBottom: 5, width: '80%', paddingEnd: 20, flexDirection: 'column', paddingLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1.5 }}>{item.nomeDaQuadra}</Text>
                        <Text style={{fontWeight:'300'}}>{item.data}</Text>
                        <Text style={{fontWeight:'300'}}>{item.horario}</Text>
                        <Text style={{fontWeight:'300'}}>{item.local.local}</Text>
                        <Text style={{fontWeight:'300'}}>{item.local.rua}</Text>
                        <Text style={{fontWeight:'300'}}>{item.detalhes}</Text>
                    </View>
                    {selectedSquare === 1 ? (
    <TouchableOpacity style={{ alignItems: 'center', height: '100%', width: '20%' }} onPress={() => handleShowModal(item)}>
        <Ionicons name="ios-close-circle" size={20} color='red' />
    </TouchableOpacity>
) : null}

                </View>
            </View>
        );
    };


    return (
        <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <View>
                <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
                <View style={styles.teste1}>
                    <TouchableOpacity style={styles.teste2} onPress={() => navigation.navigate('TelaMenu')} >
                        <Ionicons name="arrow-back" size={30} color={COLORS.secondary} style={{ marginTop: 13 }} />
                    </TouchableOpacity>
                    <View style={{ height: '100%', width: '80%', justifyContent: 'center', }}>
                        <Text style={{ marginTop: 13, fontSize: 20, fontWeight: 'bold', color: COLORS.primary }}>Quadras Agendadas</Text>
                    </View>
                </View>
            </View>
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                <View style={{ paddingHorizontal: 5, paddingVertical: 5, flexDirection: 'row' }} >


                    <TouchableOpacity
                        style={[styles.btn, { borderRightColor: "white", borderLeftColor: COLORS.LIGHT_GRAY, backgroundColor: selectedSquare === 1 ? `${COLORS.secondary}80` : 'white', }]}
                        onPress={() => { handleSquarePress(1); setHideAgenda(!hideAgenda) }}
                    >
                        <FontAwesome name="calendar-plus-o" size={25} color={COLORS.secondary} />
                        <Text style={{ fontSize: 12, color: COLORS.secondary, fontWeight: '300', marginTop: 2 }}>Agendados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, { borderRightColor: "white", borderLeftColor: COLORS.LIGHT_GRAY, backgroundColor: selectedSquare === 2 ? 'rgba(255, 0, 0, 0.5)' : 'white' }]}
                        onPress={() => handleSquarePress(2)}
                    >
                        <Icon name="calendar-minus-o" size={25} color='red' />
                        <Text style={{ fontSize: 12, color: 'red', fontWeight: '300', marginTop: 2 }}>Cancelados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, { borderRightColor: "white", borderLeftColor: COLORS.LIGHT_GRAY, backgroundColor: selectedSquare === 3 ? 'rgba(255, 165, 0, 0.5)' : 'white' }]}
                        onPress={() => handleSquarePress(3)}
                    >
                        <Icon name="calendar-o" size={25} color="orange" />
                        <Text style={{ fontSize: 12, color: 'orange', fontWeight: '300', marginTop: 2 }}>Realizados</Text>
                    </TouchableOpacity><TouchableOpacity
                        style={[styles.btn, { borderRightColor: "white", borderLeftColor: COLORS.LIGHT_GRAY, borderEndColor: COLORS.LIGHT_GRAY, backgroundColor: selectedSquare === 4 ? 'rgba(0, 0, 0, 0.5)' : 'white' }]}
                        onPress={() => handleSquarePress(4)}
                    >
                        <Icon name="calendar-o" size={25} color={COLORS.black} />
                        <Text style={{ fontSize: 12, color: COLORS.black, fontWeight: '300', marginTop: 2 }}>Todos</Text>
                    </TouchableOpacity>
                </View>
                <Modal isVisible={isModalVisible} onBackdropPress={handleCloseModal}>
                    {selectedAgendamento && (
                        <View style={{ backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="close" size={30} color={COLORS.black} onPress={handleCloseModal} />
                                <Text style={{ fontSize: 20, fontWeight: '900', paddingLeft: 20 ,letterSpacing: 2}}>Tem Certeza que quer Cancelar</Text>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                                <Text style={{fontSize: 19,}}>Quadra {selectedAgendamento.nomeDaQuadra}</Text>
                                <Text style={{ fontSize: 19 ,fontWeight:'300'}}>{selectedAgendamento.data}</Text>
                                <Text style={{ fontSize: 19 ,fontWeight:'300'}}>{selectedAgendamento.horario}</Text>
                            </View>
                            <TouchableOpacity style={{ height: 50, width: '100%', backgroundColor: 'red', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10 }} onPress={() => handleObterIdAgendamento(selectedAgendamento)}>
                                <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Modal>



            </View>
            <View style={{ height: 1, backgroundColor: COLORS.LIGHT_GRAY }} ></View>
            <View style={{ flex: 1, padding: 10, backgroundColor: COLORS.default }}>
                <FlatList
                    data={agendamentoData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ListEmptyComponent={() => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 18, color: COLORS.black, fontStyle: 'italic' }}>
                                Nenhum agendamento encontrado
                            </Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        height: 60,
        width: 90,
        borderBottomColor: COLORS.LIGHT_GRAY,
        borderTopColor: COLORS.LIGHT_GRAY
    },
    container: {
        backgroundColor: COLORS.white,
        height: 90,
        // borderRadius: 20,
        position: 'absolute',
        top: 90,
        left: 0,
        right: 0,
        margin: 30,
        borderWidth: 1,
        borderColor: COLORS.LIGHT_GRAY,
    },
    view: {
        backgroundColor: COLORS.white,
        //borderRadius: 20,
        height: height / 5,
        justifyContent: "center",
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.LIGHT_GRAY,
    },
    teste1: {
        height: height / 11,
        borderBottomWidth: 1,
        borderColor: COLORS.LIGHT_GRAY,
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    teste2: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',

    },

});

export default TelaAgendadas;
