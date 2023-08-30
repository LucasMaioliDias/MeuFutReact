import React from 'react';
import {SafeAreaView,StatusBar,StyleSheet,View,Text,TextInput,FlatList,Dimensions,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import COLORS from '../constants/colors';
import Quadras from '../constants/Quadras';
import Carrosel from '../constants/Carrosel';
const {width} = Dimensions.get('screen');


const TelaMenu = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
          <View style={style.container}>
              <Icon name="menu" size={28} color={COLORS.white} />
              <Icon name="notifications-outline" size={28} color={COLORS.white} />
          </View>
      
        <View style={{ backgroundColor: COLORS.primary,height: 120,paddingHorizontal: 20,}}>
          <View style={{flex: 1}}>
            <Text style={style.titulo}>MeuFut</Text>
              <Text style={style.titulo}>Quadras</Text>
                <View style={style.busca}>
                  <Icon name="search-sharp" size={25} />
                    <TextInput placeholder="Ache sua quadra..." style={{color: COLORS.grey, paddingLeft:15}}/>
                </View>
          </View>
        </View>
          <View style={style.containerQuadras}>
              <View style={style.icon}>
                <Icon name="football" size={25} color={COLORS.primary} />
              </View>
              <View style={style.icon}>
                <Icon name="star-sharp" size={25} color={COLORS.primary} />
              </View>
              <View style={style.icon}>
                <Icon name="thumbs-up-sharp" size={25} color={COLORS.primary} />
              </View>
              <View style={style.icon}>
                <Icon name="navigate" size={25} color={COLORS.primary} />
              </View>
          </View>
              <Text style={style.subTitulo}>Quadras</Text>
          <View>
          <FlatList
            contentContainerStyle={{paddingLeft: 20}}
            data={Quadras}
            renderItem={({item}) => <Carrosel Quadras={item} />}
          />    
        </View>
      
    </SafeAreaView>
  );
};
  
const style = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  titulo: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 23,
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
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 12,
  },
  icon: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  subTitulo: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
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