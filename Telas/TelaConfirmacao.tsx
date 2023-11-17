import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const TelaConfirmacao = () => {
    const navigation = useNavigation();
    const handleAnimationFinish = () => {
        navigation.navigate('TelaAgendadas');
    };
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', justifyContent:'center' }}>

            <LottieView
                source={require('../assets/bolaConfirmacao')}
                autoPlay
                loop={false}
                style={{
                    height: '100%',
                    width: '100%',
                }}
                onAnimationFinish={handleAnimationFinish}
                        
                
            />
        </View>
    );
}
export default TelaConfirmacao;