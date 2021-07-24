//getting geolocation and fetching data
const fetchData = (lat, long) => {
	fetch(
		`https://pro.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&appid=6adcf3c1885c4c266db85e42762c3e4c
		`,
	)
		.then((res) => res.json())
		.then((data) => {
			fetch(
				`http://pro.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=6adcf3c1885c4c266db85e42762c3e4c`,
			)
				.then((res) => res.json())
				.then((citydata) => {
					data.city = citydata[0].name;
				});
			setBackground(data);
			renderTodaySummary(data);
			renderDailyWeather(data);
		});
};

//getting location
const saveLocation = (position) => {
	let lat = position.coords.latitude;
	let long = position.coords.longitude;
	fetchData(lat, long);
};
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(saveLocation);
} else {
	alert('looks like you device is too old to know where its at');
}
