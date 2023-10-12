import { View, SafeAreaView, TouchableHighlight, TouchableOpacity, Text, StyleSheet, Image, Touchable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import COLORS from '../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import Header from '../constants/Header';
import MapView, { Marker } from 'react-native-maps';
import React, { useState } from 'react';





const TelaPagamento = () => {
    const navigation = useNavigation();
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const latitude = -23.645984;
    const longitude = -46.787655;

    const handleButtonClick = () => {
        setIsButtonClicked(!isButtonClicked);
    };

    const buttonStyle = isButtonClicked
        ? { ...styles.btn, backgroundColor: COLORS.secondary }
        : styles.btn;

        
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Header title="Dados do agendamento." />
            <View style={{ paddingHorizontal: 10, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <Text style={{ fontSize: 20, fontWeight: '900', color: COLORS.secondary }}>
                        INFORMAÇÕES GERAIS
                    </Text>
                    <View style={{ height: 5, width: '100%', backgroundColor: COLORS.LIGHT_GRAY, marginTop: 4, marginStart: 8 }}></View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 }}>
                    <View style={{ flexDirection: 'row', padding: 5, width: '50%', height: 40 }}>
                        <Text style={{ marginTop: 6, color: COLORS.black }}>Horario</Text>
                    </View>
                    <View style={{ width: '50%', height: 40, alignItems: 'flex-end', paddingTop: 8 }}>
                        <Text style={{ fontSize: 15 }}>
                            09:00 às 10:00
                        </Text>
                        <Text style={{ color: COLORS.secondary, fontSize: 10 }}>
                            (fuso horario local GTM)
                        </Text>
                    </View>
                </View>
                <View style={{ height: 2, width: '100%', backgroundColor: COLORS.LIGHT_GRAY }}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, height: 30, alignItems: 'center' }}>
                    <Text>Data:</Text>
                    <Text>Quinta,12 de outubro 2023</Text>
                </View>
                <View style={{ height: 2, width: '100%', backgroundColor: COLORS.LIGHT_GRAY }}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 }}>
                    <View style={{ flexDirection: 'row', padding: 5, width: '50%', height: 40 }}>
                        <Text style={{ marginTop: 6, color: COLORS.black }}>Local</Text>
                    </View>
                    <View style={{ width: '50%', height: 40, alignItems: 'flex-end', paddingTop: 8 }}>
                        <Text style={{ fontSize: 15 }}>
                            Campo Carpinelli
                        </Text>
                        <Text style={{ color: COLORS.black, }}>
                            Campo Limpo
                        </Text>
                        <Text style={{ color: COLORS.black, }}>
                            Rua Francisco caminhoa 162
                        </Text>

                    </View>
                </View>
                <View style={{ borderRadius: 20, overflow: 'hidden', marginTop: 30 }}>
                    <MapView style={{ height: 180, width: "100%", }} initialRegion={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}>
                        <Marker
                            coordinate={{
                                latitude,
                                longitude,
                            }}
                            title="Rua Francisco Caminhoa 162"
                            description="Seu marcador personalizado"
                        />
                    </MapView>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <Text style={{ fontSize: 20, fontWeight: '900', color: COLORS.secondary }}>
                        Como Voce Quer Pagar?
                    </Text>
                    <View style={{ height: 5, width: '100%', backgroundColor: COLORS.LIGHT_GRAY, marginTop: 4, marginStart: 8 }}></View>
                </View>
                <View style={{ paddingVertical: 20, height: 200 }}>

                    <TouchableOpacity style={buttonStyle} onPress={handleButtonClick}>
                        <View style={{ height: '100%', width: "15%", justifyContent: 'center', alignItems: 'center' }}>

                            <Icon name='handshake' size={30} color={isButtonClicked ? "white" : "black"} />
                        </View>
                        <View style={{ justifyContent: 'center', marginStart: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: isButtonClicked ? 'white' : 'black' }}>Dinheiro</Text>
                            <Text style={{ fontStyle: 'italic', fontSize: 10, color: isButtonClicked ? 'white' : 'black' }}>Pague no local</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 10, borderTopWidth: 1, borderColor: COLORS.LIGHT_GRAY, paddingTop: 8 }}>
                <Text style={{ fontWeight: 'bold', }}>
                    Resumo dos valores
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>
                        SubTotal
                    </Text>
                    <Text>
                        R$ 20,00
                    </Text>
                </View>
                <View style={{ height: 2, width: '100%', backgroundColor: COLORS.LIGHT_GRAY, marginTop: 8 }}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontWeight: 'bold' }}>
                        Voce ira Pagar
                    </Text>
                    <Text>
                        R$ 20,00
                    </Text>
                </View>
                <View style={{}}>
                    <TouchableOpacity style={styles.agendar} onPress={() => navigation.navigate('TelaConfirmacao')}>
                        <Text style={{ fontWeight: '900', color: COLORS.white, fontSize: 15 }}>Agendar Horario</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    btn: {
        width: '100%',
        height: 55,
        borderWidth: 1,
        borderColor: COLORS.LIGHT_GRAY,
        borderRadius: 5,
        backgroundColor: COLORS.default,
        flexDirection: 'row'
    },
    agendar: {
        width: "100%",
        height: 55,
        backgroundColor: COLORS.secondary,
        marginTop: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});



export default TelaPagamento;
