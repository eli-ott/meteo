export const getCityCoords = async (city: string): Promise<{ latitude: number; longitude: number }> => {
	const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&language=fr&count=1`;
	let res = await fetch(url, {
		method: 'GET'
	});
	let ret = await res.json();

	return {
		latitude: ret.results[0].latitude,
		longitude: ret.results[0].longitude
	};
};
