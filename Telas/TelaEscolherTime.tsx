import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, TouchableOpacity, TextInput, FlatList, Text, Dimensions, Alert } from 'react-native';
import COLORS from '../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Header from '../constants/Header';
import Modal from "react-native-modal";
import { CheckBox } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('screen');

const TelaEscolherTime = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedButton, setSelectedButton] = useState('nomes');
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  const [number, setNumber] = useState(0);
  const [teams, setTeams] = useState([]);
  





  useEffect(() => {
    // Carregar dados do AsyncStorage ao montar o componente
    loadData();
  }, []);

  const toggleModal = () => {
    setSelectedPosition(null);
    setModalVisible(!isModalVisible);
  };

  const addPlayer = async () => {
    if (inputText.trim() !== '' && selectedPosition) {
      const newData = [
        ...data,
        { key: String(data.length), name: inputText, position: selectedPosition },
      ];
      await saveData(newData);
      setData(newData);
      setInputText('');
      setSelectedPosition(null);
      toggleModal();
    }
  };

  const getButtonStyle = (position) => {
    return {
      ...styles.btn,
      backgroundColor: position === selectedPosition ? `${COLORS.secondary}90` : 'white',
    };
  };

  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem('playerData', JSON.stringify(data));
    } catch (error) {
      //console.error('Error saving data:', error);
    }
  };

  const loadData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('playerData');
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    } catch (error) {
      //console.error('Error loading data:', error);
    }
  };

  const handleCheckboxChange = (itemKey) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemKey]: !prevCheckedItems[itemKey],
    }));
  };

  const handleSelectAll = () => {
    const newCheckedItems = {};
    if (!checkedAll) {
      data.forEach((item) => {
        newCheckedItems[item.key] = true;
      });
    }
    setCheckedItems(newCheckedItems);
    setCheckedAll(!checkedAll);
  };

  const clearSelectedData = async () => {
    // Remover os itens selecionados
    const newData = data.filter((item) => !checkedItems[item.key]);
    await saveData(newData);
    setData(newData);
    setCheckedItems({});
    setCheckedAll(false);
  };

  const clearAllData = async () => {
    // Limpar todos os dados salvos
    await AsyncStorage.removeItem('playerData');
    setData([]);
    setCheckedItems({});
    setCheckedAll(false);
  };

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  const toggleSecondModal = () => {
    setSecondModalVisible(!isSecondModalVisible);
  };



  const formTeams = () => {
    if (number <= 0) {
      Alert.alert('Erro', 'Por favor, insira um número válido para formar os times.');
      return;
    }

    const selectedPlayers = data.filter((item) => checkedItems[item.key]);

    if (selectedPlayers.length < number) {
      Alert.alert('Erro', 'Não há jogadores suficientes para formar times.');
      return;
    }

    const shuffledPlayers = selectedPlayers.sort(() => Math.random() - 0.5);

    const newTeams = [];
    const playersPerTeam = Math.ceil(shuffledPlayers.length / number);

    for (let i = 0; i < number; i++) {
      newTeams.push(shuffledPlayers.splice(0, playersPerTeam));
    }

    setTeams(newTeams);
    setNumber(0)
    toggleSecondModal();
  };


  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.container}>
        <TouchableOpacity style={styles.heade} onPress={() => navigation.goBack()} >
          <Ionicons name="arrow-back" size={30} color={COLORS.secondary} style={{ marginTop: 13 }} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ height: '100%', width: '80%', justifyContent: 'center' }}>
            <Text style={{ marginTop: 13, fontSize: 20, fontWeight: 'bold', color: COLORS.primary }}>Formar Time</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 13, }}>
            <TouchableOpacity style={styles.btnHeader} onPress={toggleModal}>
              <Ionicons name="add-sharp" size={30} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.LIGHT_GRAY, paddingHorizontal: 10, paddingVertical: 6, flexDirection: 'row', justifyContent: 'space-between', paddingEnd: 30 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <CheckBox
            checked={checkedAll}
            onPress={handleSelectAll}
            checkedColor={COLORS.secondary}
            uncheckedColor={COLORS.secondary}
            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginRight: 10, padding: 0 }}
          />
          <Text style={{ color: COLORS.secondary, fontSize: 14 }}>Selecionar tudo</Text>
        </View>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 30 }} onPress={data.length > 0 ? clearSelectedData : null} disabled={Object.keys(checkedItems).length === 0}>
          <Ionicons name="trash-bin-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={{ borderBottomWidth: 1, justifyContent: 'space-between', flexDirection: 'row', borderBottomColor: COLORS.LIGHT_GRAY }}>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '50%', paddingStart: 40, borderEndWidth: 0.5, borderEndColor: COLORS.LIGHT_GRAY, backgroundColor: selectedButton === 'nomes' ? `${COLORS.secondary}50` : 'transparent', }} onPress={() => handleButtonPress('nomes')}>
          <Text>Nomes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '50%', paddingEnd: 40, borderStartWidth: 0.5, borderStartColor: COLORS.LIGHT_GRAY, height: 40, backgroundColor: selectedButton === 'times' ? `${COLORS.secondary}50` : 'transparent', }} onPress={() => handleButtonPress('times')}>
          <Text style={{}}>Times</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={{ backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10 }}>
            <View style={{ marginBottom: 8 }}>
              <Ionicons name="close" size={30} color={COLORS.primary} onPress={toggleModal} />
            </View>
            <Text style={{ marginStart: 5, marginBottom: 4 }}>Apelido</Text>
            <TextInput
              style={{ height: 40, borderColor: COLORS.secondary, borderWidth: 2, paddingLeft: 10, borderRadius: 10 }}
              onChangeText={(text) => setInputText(text)}
              value={inputText}
              placeholder="Ex.Lucas"
            />
            
            <Text style={{ marginStart: 5, marginBottom: 4 }}>Posicao</Text>

            <TouchableOpacity style={[styles.btn, getButtonStyle('G')]} onPress={() => setSelectedPosition('G')}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.bola}>
                  <Text style={styles.bolaText}>G</Text>
                </View>
                <Text style={styles.positionText}>Goleiro</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, getButtonStyle('A')]} onPress={() => setSelectedPosition('A')}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.bola}>
                  <Text style={styles.bolaText}>A</Text>
                </View>
                <Text style={styles.positionText}>Atacante</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, getButtonStyle('Z')]} onPress={() => setSelectedPosition('Z')}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.bola}>
                  <Text style={{ fontWeight: '900', color: 'white', fontSize: 20 }}>Z</Text>
                </View>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Zagueiro</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, getButtonStyle('M')]} onPress={() => setSelectedPosition('M')}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.bola}>
                  <Text style={{ fontWeight: '900', color: 'white', fontSize: 20 }}>M</Text>
                </View>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Meio-Campista</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, getButtonStyle('LD')]} onPress={() => setSelectedPosition('LD')}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.bola}>
                  <Text style={{ fontWeight: '900', color: 'white', fontSize: 20 }}>LD</Text>
                </View>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Lateral-Direiro</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, getButtonStyle('LE')]} onPress={() => setSelectedPosition('LE')}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.bola}>
                  <Text style={{ fontWeight: '900', color: 'white', fontSize: 20 }}>LE</Text>
                </View>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Lateral-Esquerdo</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={addPlayer} style={styles.addButton}>
              <Text style={styles.addButtonText}>Adicionar Jogador</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      {selectedButton === 'nomes' ? (
        <View style={{ marginTop: 15 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={[styles.btn, { flexDirection: 'row', alignItems: 'center' }]}>
                <CheckBox
                  checked={checkedItems[item.key] || false}
                  onPress={() => handleCheckboxChange(item.key)}
                  checkedColor={COLORS.secondary}
                  uncheckedColor={COLORS.secondary}
                  size={30}
                  containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginRight: 10, padding: 0 }}
                />
                <View style={styles.bola}>
                  <Text style={{ fontWeight: '900', color: 'white', fontSize: 20 }}>{item.position}</Text>
                </View>
                <Text style={{ fontSize: 15, fontWeight: 'bold', flex: 1 }}>{item.name}</Text>
              </View>

            )}

          />
        </View>) : (

        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Modal isVisible={isSecondModalVisible} onBackdropPress={toggleSecondModal}>
            <View style={{ backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10 }}>
              <View style={{ marginBottom: 8 }}>
                <Ionicons name="close" size={30} color={COLORS.primary} onPress={toggleSecondModal} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <TextInput
                  style={{ height: 40, width: 60, borderColor: COLORS.secondary, borderWidth: 2, paddingLeft: 10, borderRadius: 10 }}
                  placeholder="1-10"
                  keyboardType="numeric"
                  value={String(number)}
                  onChangeText={(text) => {
                    const parsedNumber = parseInt(text, 10);
                    setNumber(isNaN(parsedNumber) ? 0 : parsedNumber);
                  }}
                />
                <TouchableOpacity style={{ height: 50, width: 65, backgroundColor: COLORS.secondary, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={formTeams}>
                  <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Formar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20 }}>
            <FlatList
              data={teams}
              
              renderItem={({ item, index }) => (
                <View style={{ marginBottom: 20, borderRadius: 10, width: 370 }}>
                  <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: 'red', borderRadius: 10 }}>
                    <Text style={{ fontWeight: '900', color: COLORS.white }}>{`Time ${index + 1}`}</Text>
                  </View>
                  <View style={{ padding: 20 }}>
                    {item.map((player) => (
                      <Text key={player.key}>{player.name}</Text>
                    ))}
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <TouchableOpacity style={styles.bottomView} onPress={toggleSecondModal}>
            <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold' }}>Formar o Time</Text>
          </TouchableOpacity>
        </View>

      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btnHeader: {
    // Adicione estilos conforme necessário
  },
  btn: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginBottom: 10,


  },
  bola: {
    height: 30,
    width: 40,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  bolaText: {
    fontWeight: '900',
    color: 'white',
    fontSize: 20,
  },
  positionText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  addButton: {
    height: 60,
    backgroundColor: COLORS.primary,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: height / 11,
    borderBottomWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
    flexDirection: 'row',
    paddingEnd: 15

  },
  heade: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',

  },
});

export default TelaEscolherTime;
