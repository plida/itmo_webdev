import { fetchWeatherApi } from "openmeteo";

export async function getWeatherAtLocation(locationLatitude: number, locationLongitude: number){
	const params = {
		latitude: locationLatitude,
		longitude: locationLongitude,
		hourly: "temperature_2m",
	};

	const url = "https://api.open-meteo.com/v1/forecast";
	const responses = await fetchWeatherApi(url, params);

	const response = responses[0];
	if (!(response)){
		return -1
	}
	const latitude = response.latitude();
	const longitude = response.longitude();
	const elevation = response.elevation();
	const utcOffsetSeconds = response.utcOffsetSeconds();

	const info1 = [latitude, longitude, elevation, utcOffsetSeconds]
	/*
	console.log(
		`\nCoordinates: ${latitude}°N ${longitude}°E`,
		`\nElevation: ${elevation}m asl`,
		`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
	);*/

	const hourly = response.hourly()!;

	// Note: The order of weather variables in the URL query and the indices below need to match!
	const weatherData = {
		hourly: {
			time: Array.from(
				{ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
				(_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
			),
			temperature_2m: hourly.variables(0)!.valuesArray(),
		},
	};
	return [info1, weatherData]
}