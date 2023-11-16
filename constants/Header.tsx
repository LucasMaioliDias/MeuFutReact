import { View, TouchableOpacity, StyleSheet,Text ,Dimensions} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import COLORS from './colors';
import { useNavigation } from '@react-navigation/native';

const { width,height } = Dimensions.get('screen');

const Header = ({title}) => {
    const navigation = useNavigation();
    return (
        <View>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <View style={styles.container}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()} >
                    <Ionicons name="arrow-back" size={30} color={COLORS.secondary} style={{ marginTop: 13 }} />
                </TouchableOpacity>
                <View style={{height:'100%',width:'80%',justifyContent:'center',}}>
                    <Text style={{marginTop:13,fontSize:20,fontWeight:'bold'}}>{title}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        height: height / 11,
        borderBottomWidth: 1,
        borderColor: COLORS.LIGHT_GRAY,
        justifyContent: 'space-between',
        flexDirection:'row',
        
    },
    btn: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },

});
export default Header;