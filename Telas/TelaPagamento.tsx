import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import COLORS from '../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import Header from '../constants/Header';
import moment from 'moment';
import 'moment/locale/pt-br';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';
moment.locale('pt-br');
const { width, height } = Dimensions.get('screen');

const TelaPagamento = ({ route }) => {
    const navigation = useNavigation();
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const { selectedTimes, selectedDate, nomeDaQuadra, localDaQuadra, ruaDaQuadra, preco, teste, selectedIds } = route.params;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const calcularMultiplicacao = ({ preco, teste }) => {
        const resultado = teste * preco;
        return resultado;
    };


    const resultadoDaMultiplicacao = calcularMultiplicacao({ preco, teste });
    const formattedDate = moment(selectedDate).locale('pt-br').format('dddd, DD MMMM YYYY');

    const menorHorario = selectedTimes.reduce((min, intervalo) => {
        const partes = intervalo.split(' às ');
        return partes[0] < min ? partes[0] : min;
    }, selectedTimes[0].split(' às ')[0]);

    const maiorHorario = selectedTimes.reduce((max, intervalo) => {
        const partes = intervalo.split(' às ');
        return partes[1] > max ? partes[1] : max;
    }, selectedTimes[0].split(' às ')[1]);

    const [observacoes, setObservacoes] = useState('');

    console.log(isButtonClicked);

    const handleAgendarClick = async () => {
        try {
            setLoading(true);
            const auth = getAuth();
            const user = auth.currentUser;
            const uid = user ? user.uid : null;
            const firestore = getFirestore();

            const userDocRef = doc(firestore, 'users', uid);
            const userDoc = await getDoc(userDocRef);
            if (isButtonClicked === true) {
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const name = typeof userData.name === 'string' ? userData.name : '';
                    const { telefone } = userData;
                    const agendamento = {
                        user: {
                            uid: uid,
                            nome: name,
                            telefone: telefone,
                        },
                        nomeDaQuadra: nomeDaQuadra,
                        horario: `${menorHorario} às ${maiorHorario}`,
                        data: formattedDate,
                        idHorario: selectedIds,
                        status: 'agendado',
                        local: {
                            local: localDaQuadra,
                            rua: ruaDaQuadra,
                        },
                        detalhes: observacoes.trim(),
                        pagamento: 'Dinheiro',
                        subtotal: resultadoDaMultiplicacao,
                        total: resultadoDaMultiplicacao,
                    };

                    const agendamentosCollection = collection(firestore, 'agendamentos');
                    const docRef = await addDoc(agendamentosCollection, agendamento);
                    console.log('Agendamento salvo com a chave:', docRef.id);
                    navigation.navigate('TelaConfirmacao');
                    
                } else {
                    console.error('Usuário não encontrado no Firestore');
                }
            } else {
                setError('selecione uma forrma de pagamento');
            }
        } catch (error) {
            console.error('Erro ao salvar agendamento:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleButtonClick = () => {
        setIsButtonClicked(!isButtonClicked);
    };

    const buttonStyle = isButtonClicked
        ? { ...styles.btn, backgroundColor: COLORS.secondary }
        : styles.btn;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
                <Header title="Dados do agendamento" />
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                            <Text style={{ fontSize: 20, fontWeight: '900', color: COLORS.secondary }}>
                                INFORMAÇÕES GERAIS
                            </Text>
                            <View style={{ height: 5, width: '100%', backgroundColor: COLORS.LIGHT_GRAY, marginTop: 4, marginStart: 8 }}></View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 }}>
                            <View style={{ flexDirection: 'row', padding: 5, width: '50%', height: height / 19 }}>
                                <Text style={{ marginTop: 6, color: COLORS.black }}>Horario</Text>
                            </View>
                            <View style={{ width: '50%', height: height / 18, alignItems: 'flex-end', paddingTop: 8 }}>
                                <Text style={{ fontSize: 15 }}>
                                    {`${menorHorario} às`}{` ${maiorHorario}`}
                                </Text>
                                <Text style={{ color: COLORS.secondary, fontSize: 10 }}>
                                    (fuso horario local GTM)
                                </Text>
                            </View>
                        </View>
                        <View style={{ height: 2, width: '100%', backgroundColor: COLORS.LIGHT_GRAY }}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8, alignItems: 'center' }}>
                            <Text>Data:</Text>
                            <Text>{formattedDate}</Text>
                        </View>
                        <View style={{ height: 2, width: '100%', backgroundColor: COLORS.LIGHT_GRAY }}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 }}>
                            <View style={{ flexDirection: 'row', padding: 6, width: '50%', }}>
                                <Text style={{ marginTop: 6, color: COLORS.black }}>Local</Text>
                            </View>
                            <View style={{ width: '50%', alignItems: 'flex-end', paddingTop: 8 }}>
                                <Text style={{ fontSize: 15 }}>
                                    {nomeDaQuadra}
                                </Text>
                                <Text style={{ color: COLORS.black, }}>
                                    {localDaQuadra}
                                </Text>
                                <Text style={{ color: COLORS.black, }}>
                                    {ruaDaQuadra}
                                </Text>

                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                            <Text style={{ fontSize: 20, fontWeight: '900', color: COLORS.secondary }}>
                                Detalhes
                            </Text>
                            <View style={{ height: 5, width: '100%', backgroundColor: COLORS.LIGHT_GRAY, marginTop: 4, marginStart: 8 }}></View>
                        </View>
                        <View style={{ width: '100%' }}>

                            <View style={{ height: 45, width: "100%", borderWidth: 2, borderColor: COLORS.secondary, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, marginVertical: 10 }}>
                                <Icon name="book" size={19} color={COLORS.secondary} />
                                <TextInput style={{ height: '100%', width: "100%", fontSize: 15, marginStart: 8 }} placeholder="Observacoes..." value={observacoes} onChangeText={(text) => setObservacoes(text)} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                            <Text style={{ fontSize: 20, fontWeight: '900', color: COLORS.secondary }}>
                                Como Voce Quer Pagar?
                            </Text>
                            <View style={{ height: 5, width: '100%', backgroundColor: COLORS.LIGHT_GRAY, marginTop: 4, marginStart: 8 }}></View>
                        </View>
                        <View style={{ paddingVertical: 20, height: height / 4.5 }}>

                            <TouchableOpacity style={buttonStyle} onPress={handleButtonClick}>
                                <View style={{ height: '100%', width: "15%", justifyContent: 'center', alignItems: 'center' }}>

                                    <Icon name='handshake' size={30} color={isButtonClicked ? "white" : "black"} />
                                </View>
                                <View style={{ justifyContent: 'center', marginStart: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: isButtonClicked ? 'white' : 'black' }}>Dinheiro</Text>
                                    <Text style={{ fontStyle: 'italic', fontSize: 10, color: isButtonClicked ? 'white' : 'black' }}>Pague no local</Text>
                                </View>
                            </TouchableOpacity>
                            {error && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="alert-circle-outline" size={15} color='red' />
                                <Text style={styles.erro}>{error}</Text>

                            </View>}
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Text style={{ fontWeight: 'bold' }}>Resumo dos valores</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>SubTotal</Text>
                            <Text>{`R$ ${resultadoDaMultiplicacao}`}</Text>
                        </View>
                        <View style={{ height: 2, width: '100%', backgroundColor: COLORS.LIGHT_GRAY, marginTop: 8 }}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <Text style={{ fontWeight: 'bold' }}>Você irá Pagar</Text>
                            <Text>{`R$ ${resultadoDaMultiplicacao}`}</Text>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.agendar} onPress={handleAgendarClick}>
                                {loading ? (
                                    <ActivityIndicator size="large" color={COLORS.white} />
                                ) : (
                                    <Text style={{ fontWeight: '900', color: COLORS.white, fontSize: 15 }}>
                                        Agendar Horário
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    btn: {
        width: '100%',
        height: height / 16,
        borderWidth: 1,
        borderColor: COLORS.LIGHT_GRAY,
        borderRadius: 5,
        backgroundColor: COLORS.default,
        flexDirection: 'row'
    },
    agendar: {
        width: "100%",
        height: height / 16,
        backgroundColor: COLORS.secondary,
        marginTop: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        flex: 1,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: COLORS.LIGHT_GRAY,
        paddingTop: 8,
        bottom: 0,
        position: 'absolute',
        width: '100%',
    },
    erro: {
        color: 'red',
        margin: 5,
        flexDirection: 'row'
    },
});

export default TelaPagamento;
