import * as Location from 'expo-location';
import { getCityCoords } from './getCityCoordinates';

export const getLocation = async (): Promise<{ latitude: number; longitude: number } | undefined> => {
	let latitude: number, longitude: number;

	let { status } = await Location.requestForegroundPermissionsAsync();
	if (status !== 'granted') {
		const cityCoordinates = await getCityCoords('paris');

		latitude = cityCoordinates.latitude;
		longitude = cityCoordinates.longitude;
	}

	let location = await Location.getCurrentPositionAsync({});
	latitude = location.coords.latitude;
	longitude = location.coords.longitude;

	return {
		latitude: latitude,
		longitude: longitude
	};
};
