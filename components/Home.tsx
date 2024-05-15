import React, { useState } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getMeteo } from '../services/getMeteo';
import { useEffect } from 'react';
import { CurrentWeather, CurrentWeatherUnits } from '../types/meteo';
import { WEATHER_INTERPRETATIONS } from '../services/constantes';
import { getCityCoords } from '../services/getCityCoordinates';

export default function Home() {
	let [ville, setVille] = useState<string | undefined>();
	let [meteo, setMeteo] = useState<CurrentWeather | undefined>();
	let [units, setUnits] = useState<CurrentWeatherUnits | undefined>();
	let [villeRecherche, setVilleRecherche] = useState<string | undefined>();

	const changeCity = async () => {
		const cityCoords = await getCityCoords(villeRecherche ?? 'paris');

		let ret = await getMeteo(cityCoords.latitude, cityCoords.longitude);
		setVille(ret.ville);
		setMeteo(ret.meteo.current_weather);
		setUnits(ret.meteo.current_weather_units);

		console.log(ville);
	};

	useEffect(() => {
		(async () => {
			let ret = await getMeteo();
			setVille(ret.ville);
			setMeteo(ret.meteo.current_weather);
			setUnits(ret.meteo.current_weather_units);
		})();
	}, []);

	return (
		<View style={styles.homeContainer}>
			<Text style={styles.ville}>{ville ?? "'Localisation...'"}</Text>
			<View style={styles.tempContainer}>
				<Text style={styles.temperature}>
					{meteo?.temperature ?? '0'}
					{units?.temperature ?? '°C'}
				</Text>
				<Image
					style={styles.weatherImage}
					source={WEATHER_INTERPRETATIONS.find(item => item.codes.includes(meteo?.weathercode ?? 0))!.image ?? require('../assets/sun.png')}
				></Image>
			</View>
			<TextInput onChangeText={setVilleRecherche} value={villeRecherche} style={styles.recherche} />
			<TouchableOpacity onPress={changeCity} style={styles.button}>
				<Text style={styles.buttonText}>Rechercher la ville</Text>
			</TouchableOpacity>
		</View>
	);
}

export const styles = StyleSheet.create({
	homeContainer: {
		display: 'flex',
		gap: 10
	},
	ville: {
		fontSize: 25,
		color: 'white',
		fontFamily: 'Alata-Regular'
	},
	tempContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	},
	temperature: {
		width: '65%',
		fontSize: 53,
		color: 'white',
		fontFamily: 'Alata-Regular'
	},
	weatherImage: {
		objectFit: 'contain',
		height: 150,
		width: '35%'
	},
	recherche: {
		width: '100%',
		height: 50,
		borderRadius: 50,
		backgroundColor: 'white',
		paddingHorizontal: 25,
		fontFamily: 'Alata-Regular'
	},
	button: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '50%',
		marginLeft: 'auto',
		height: 50,
		borderRadius: 50,
		fontSize: 23,
		backgroundColor: 'black',
		fontFamily: 'Alata-Regular'
	},
	buttonText: {
		color: 'white'
	}
});
