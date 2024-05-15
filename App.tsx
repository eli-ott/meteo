import { ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Home from './components/Home';
//@ts-ignore
import AlataRegular from './assets/Alata-Regular.ttf';
import { useFonts } from 'expo-font';

export default function App() {
	useFonts({
		'Alata-Regular': AlataRegular
	});
	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<ImageBackground source={require('./assets/background.png')}>
					<View style={styles.container}>
						<Home />
					</View>
				</ImageBackground>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
		paddingVertical: 50,
		height: '100%',
	}
});
