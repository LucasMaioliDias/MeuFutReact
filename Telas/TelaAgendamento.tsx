
import { View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Text } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br'; 
import CalendarStrip from 'react-native-calendar-strip';
import Icon from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import COLORS from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import React, { useState ,useEffect} from 'react';
import Header from '../constants/Header';
import Quadras from '../constants/Quadras';



const TelaAgendamento = ({route}) => {
    
    const today = moment();
    const datesBlacklist = [];
    for (let i = 1; i < 31; i++) {
        datesBlacklist.push(today.clone().subtract(i, 'days'));
    }
    const pastDate = today.clone().subtract(30, 'days');
    const start = today.clone().subtract(3, 'days');

    const navigation = useNavigation();
    const [selectedCount, setSelectedCount] = useState(0);

    const [selectedDate, setSelectedDate] = useState(moment());

    const [data, setData] = useState([
        { id: '1', text: '08:00 às 09:00', selected: false, habilitado:false },
        { id: '2', text: '09:00 às 10:00', selected: false, habilitado:true },
        { id: '3', text: '10:00 às 11:00', selected: false, habilitado:true},
        { id: '4', text: '11:00 às 12:00', selected: false, habilitado:true },
        { id: '5', text: '12:00 às 13:00', selected: false, habilitado:true },
        { id: '6', text: '13:00 às 14:00', selected: false, habilitado:true},
        { id: '7', text: '14:00 às 15:00', selected: false, habilitado:true },
        { id: '8', text: '15:00 às 16:00', selected: false, habilitado:true },
        { id: '9', text: '16:00 às 17:00', selected: false, habilitado:true },
        { id: '10', text: '18:00 às 19:00', selected: false, habilitado:true },
        { id: '11', text: '19:00 às 20:00', selected: false, habilitado:true },
        { id: '12', text: '21:00 às 22:00', selected: false, habilitado:true },
    ]);
    
    const handleSelectItem = (itemId) => {
        
        setData((prevData) => {
            const newData = prevData.map((item) =>
                item.id === itemId ? { ...item, selected: !item.selected } : item
            );

            const selectedItems = newData.filter((item) => item.selected);
            setSelectedCount(selectedItems.length);

            if (selectedItems.length > 0) {
                const minSelectedIndex = Math.min(
                    ...selectedItems.map((item) => Number(item.id))
                );
                const maxSelectedIndex = Math.max(
                    ...selectedItems.map((item) => Number(item.id))
                );

                newData.forEach((item) => {
                    // Habilita os horários adjacentes aos horários mínimo e máximo selecionados
                    item.habilitado = (
                        Math.abs(Number(item.id) - minSelectedIndex) === 1 ||
                        Math.abs(Number(item.id) - maxSelectedIndex) === 1
                    );
                });
            } else {
                // Se nenhum horário estiver selecionado, habilitar todos
                newData.forEach((item) => {
                    item.habilitado = true;
                });
            }

            return newData;
        });
    };

    const handleDateSelected = (date) => {
        // Formatando a data no padrão desejado
        const formattedDate = moment(selectedDate).locale('pt-br').format('dddd, DD [de] MMMM [de] YYYY');
        console.log(formattedDate); 

        setSelectedDate(date);
        const newData = data.map((item) => ({ ...item, selected: false }));

        setData(newData);
        setSelectedCount(0);
    };
    
    const handleGoToPayment = () => {
        const selectedTimes = data
            .filter(item => item.selected)
            .map(item => item.text);
    
        // Obter a data formatada no padrão desejado
        const formattedDate = moment(selectedDate).locale('pt-br').format('dddd, DD MMMM YYYY');
    
        const { nomeDaQuadra, localDaQuadra, ruaDaQuadra, preco } = route.params;
        const teste = selectedCount;
    
        console.log(formattedDate);
    
        // Certifique-se de que a data seja passada no formato ISOString para a próxima tela
        navigation.navigate("TelaPagamento", {
            ruaDaQuadra,
            localDaQuadra,
            nomeDaQuadra,
            selectedTimes,
            selectedDate: selectedDate.toISOString(), // Convertendo para ISOString
            preco,
            teste,
        });
    };
    {/* 
    useEffect(() => {
        const fetchDatesAgendadas = async () => {
            const datesFromDB = await getDatesAgendadas();
            setDatesAgendadas(datesFromDB);
        };
    
        fetchDatesAgendadas();
    }, []);
*/}
    


    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            
           <Header title="Selecione o Horario " />
            <View style={{ height: 112, }}>
                <CalendarStrip
                    scrollable
                    calendarAnimation={{ type: 'sequence', duration: 30 }}
                    daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: COLORS.secondary }}
                    style={{ height: 110, paddingTop: 20, paddingBottom: 10 }}
                    calendarHeaderStyle={{ color: COLORS.black, fontSize: 12 }}
                    calendarColor={COLORS.white}
                    iconContainer={{ flex: 0.1 }}
                    //selectedDate={today}
                    highlightDateNumberStyle={styles.dataselecionada}
                    highlightDateNameStyle={styles.dataselecionada}
                    dateNumberStyle={{ fontSize: 12 }}
                    dateNameStyle={{ color: COLORS.black, fontSize: 6 }}
                    leftSelector={<Icon name="angle-left" size={20} color={COLORS.secondary} />}
                    rightSelector={<Icon name="angle-right" size={20} color={COLORS.secondary} />}
                    datesBlacklist={datesBlacklist}
                    minDate={pastDate.toDate()}
                    startingDate={start}
                    onDateSelected={handleDateSelected} 
                    selectedDate={selectedDate}
                />
            </View>
            <View style={{ backgroundColor: "#f3f3f3", flex: 1 }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.datas} onPress={() => handleSelectItem(item.id)} disabled={!item.habilitado}>
                            <View style={{ height: "100%", width: "10%", alignItems: 'center', justifyContent: 'center' }}>
                                {item.selected &&
                                    <Ionicons name="checkmark-done-sharp" size={20} color={COLORS.primary} />
                                }
                            </View>
                            <View style={styles.informacoes}>
                                <Text>{item.text}</Text>
                                <Ionicons name="football" size={19} color={COLORS.secondary} />
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            {selectedCount > 0 &&
                <View style={styles.container}>
                    <Text style={styles.headerText}>{`${selectedCount} Horários selecionados`}</Text>
                    <TouchableOpacity style={styles.button}  onPress={handleGoToPayment}>
                        <Icon name="calendar-check-o" size={30} color={COLORS.secondary} />
                    </TouchableOpacity>
                </View>
            }


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    dataselecionada: {
        color: COLORS.secondary,
    },
    selectedDate: {
        backgroundColor: COLORS.secondary
    },
    datas: {
        height: 40,
        backgroundColor: COLORS.white,
        marginVertical: 2,
        marginHorizontal: 2,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.LIGHT_GRAY,
        flexDirection: 'row',
       
    },

    informacoes: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100%',
        width: '90%',
        paddingHorizontal: 10,
        paddingEnd: 15,
    },
    container: {
        backgroundColor: COLORS.secondary,
        height: 65,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingStart: 25,
        position: 'relative',
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    button: {
        height: 60,
        width: 60,
        backgroundColor: 'white',
        borderRadius: 99,
        position: 'absolute',
        right: 15,
        bottom: 25,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TelaAgendamento;
