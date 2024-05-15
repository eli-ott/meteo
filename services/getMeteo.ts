import { Meteo } from '../types/meteo';
import { getLocation } from './getLocation';

export const getMeteo = async (latitudeParam: number | null = null, longitudeParam: number | null = null): Promise<{ meteo: Meteo; ville: string }> => {
	let location = await getLocation();

	let latitude = latitudeParam ?? location?.latitude;
	let longitude = longitudeParam ?? location?.longitude;

	console.log(latitude, longitude);

	const url = `https://api.open-meteo.com/v1/forecast?
		latitude=${latitude}
		&longitude=${longitude}
		&daily=weathercode,temperature_2m_max,sunrise,sunset,windspeed_10m_max
		&timezone=auto
		&current_weather=true`;

	const urlVille = `http://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

	let villeRes = await fetch(urlVille, {
		method: 'GET'
	});
	let villeRet = await villeRes.json();

	const res = await fetch(url, {
		method: 'GET'
	});
	const ret = await res.json();

	return {
		meteo: ret,
		ville: villeRet.address.city
	};
};
