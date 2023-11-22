import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Header from '../constants/Header';
import COLORS from '../constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

const TelaAgendadas = () => {
    const navigation = useNavigation();
    const [hideAgenda, setHideAgenda] = useState(false);
    const [selectedSquare, setSelectedSquare] = useState(null);
    const handleSquarePress = (index) => {
        setSelectedSquare(selectedSquare === index ? null : index);
    };
    return (
        <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <View>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <View style={styles.teste1}>
                <TouchableOpacity style={styles.teste2} onPress={() => navigation.navigate('TelaMenu')} >
                    <Ionicons name="arrow-back" size={30} color={COLORS.secondary} style={{ marginTop: 13 }} />
                </TouchableOpacity>
                <View style={{height:'100%',width:'80%',justifyContent:'center',}}>
                    <Text style={{marginTop:13,fontSize:20,fontWeight:'bold',color:COLORS.primary }}>Quadras Agendadas</Text>
                </View>
            </View>
        </View>
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                <View style={{ paddingHorizontal: 5, paddingVertical: 5, flexDirection: 'row' }} >


                    <TouchableOpacity
                        style={[styles.btn, { borderRightColor: "white", borderLeftColor: COLORS.LIGHT_GRAY, backgroundColor: selectedSquare === 1 ? `${COLORS.secondary}80` : 'white', }]}
                        onPress={() => {handleSquarePress(1);  setHideAgenda(!hideAgenda)} }
                    >
                        <FontAwesome name="calendar-plus-o" size={25} color={COLORS.secondary} />
                        <Text style={{fontSize:12,color:COLORS.secondary,fontWeight:'300',marginTop:2}}>Agendados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, { borderRightColor: "white", borderLeftColor: COLORS.LIGHT_GRAY, backgroundColor: selectedSquare === 2 ? 'rgba(255, 0, 0, 0.5)' : 'white' }]}
                        onPress={() => handleSquarePress(2)}
                    >
                        <Icon name="calendar-minus-o" size={25} color='red' />
                        <Text style={{fontSize:12,color:'red',fontWeight:'300',marginTop:2}}>Cancelados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, { borderRightColor: "white", borderLeftColor: COLORS.LIGHT_GRAY, backgroundColor: selectedSquare === 3 ? 'rgba(255, 165, 0, 0.5)' : 'white' }]}
                        onPress={() => handleSquarePress(3)}
                    >
                        <Icon name="calendar-o" size={25} color="orange" />
                        <Text style={{fontSize:12,color:'orange',fontWeight:'300',marginTop:2}}>Realizados</Text>
                    </TouchableOpacity><TouchableOpacity
                        style={[styles.btn, { borderRightColor: "white", borderLeftColor: COLORS.LIGHT_GRAY, borderEndColor: COLORS.LIGHT_GRAY, backgroundColor: selectedSquare === 4 ? 'rgba(0, 0, 0, 0.5)' : 'white' }]}
                        onPress={() => handleSquarePress(4)}
                    >
                        <Icon name="calendar-o" size={25} color={COLORS.black} />
                        <Text style={{fontSize:12,color:COLORS.black,fontWeight:'300',marginTop:2}}>Todos</Text>
                    </TouchableOpacity>





                </View>
            </View>
            <View style={{ height: 1, backgroundColor: COLORS.LIGHT_GRAY }} ></View>
            <View style={{ flex: 1, backgroundColor: COLORS.default, padding: 10 }}>
                {hideAgenda ? (
                    <View>
                        <View style={styles.view}>
                            <Image source={require('../assets/QuadraFortaleza.png')}
                                style={{ height: "90%", width: "95%",  }} />
                        </View>
                        <View style={styles.container}>
                            <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Quadra Carpinelli</Text>
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    <FontAwesome name="map-pin" size={10} color='red' />
                                    <Text style={{ marginLeft: 4 }}>Campo Limpo</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{}}>Rua Francisco Caminhoa 162</Text>
                                    <Text style={{}}>09:00 às 10:00</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontStyle: 'italic' }}>Não existem quadras agendadas</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

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
        flexDirection:'row',
        
    },
    teste2: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },

});

export default TelaAgendadas;
