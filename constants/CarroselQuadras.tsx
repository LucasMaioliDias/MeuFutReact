import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, Text} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import COLORS from './colors';

import { useNavigation } from '@react-navigation/native'; 

const { width } = Dimensions.get('screen');

const Carrosel = ({ Quadras }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{width:260,height:250,
    borderRadius:10,
    borderWidth:1,
    borderColor:COLORS.LIGHT_GRAY,
    marginRight:15}}
    onPress={() => navigation.navigate('TelaDetalhes', Quadras)}
    
    >
      <Image style={styles.img} source={Quadras.image}/>
      <View style={{padding:7}}>
        <Text style={{fontWeight:'900',fontSize:20}}>{Quadras.name}</Text>
        <View style={{justifyContent:'space-between',flexDirection:'row',marginTop:9}}>
        <View style={{flexDirection:'row',marginTop:5}}>
        <Icon name="location-sharp" size={12} color='red' />
        <Text style={{color:'gray',fontWeight:'500'}}>{Quadras.location}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <Text style={{color:'gray',fontWeight:'500',marginRight:2}}>R$</Text>
        <Text style={{color:'gray'}}>{Quadras.price}</Text>
        </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    alignItems: 'center',
    elevation:10,
  },
  cardImage: {
    height: 300,
    width: width ,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    
     
  },
  infoContainer: {
    height: 70,
    width: 330,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation:10,
    opacity: 0.6
  },
  img:{
    width:'100%',
    height:170,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
});

export default Carrosel;
