export interface Meteo {
	current_weather: CurrentWeather;
	current_weather_units: CurrentWeatherUnits;
	daily: Daily;
	daily_units: DailyUnits;
	elevation: number;
	generationtime_ms: number;
	latitude: number;
	longitude: number;
	timezone: string;
	timezone_abbreviation: string;
	utc_offset_seconds: number;
}

export interface CurrentWeather {
	interval: number;
	is_day: number;
	temperature: number;
	time: string;
	weathercode: number;
	winddirection: number;
	windspeed: number;
}

export interface CurrentWeatherUnits {
	interval: string;
	is_day: string;
	temperature: string;
	time: string;
	weathercode: string;
	winddirection: string;
	windspeed: string;
}

export interface Daily {
	sunrise: string[];
	sunset: string[];
	temperature_2m_max: number[];
	time: Date[];
	weather_code: number[];
	wind_speed_10m_max: number[];
}

export interface DailyUnits {
	sunrise: string;
	sunset: string;
	temperature_2m_max: string;
	time: string;
	weather_code: string;
	wind_speed_10m_max: string;
}
