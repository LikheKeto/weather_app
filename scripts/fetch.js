//getting geolocation and fetching data
const fetchData = (lat, long) => {
	fetch(`https://radiant-savannah-03752.herokuapp.com/onecall/${lat}/${long}`)
		.then((res) => res.json())
		.then((data) => {
			fetch(
				`https://radiant-savannah-03752.herokuapp.com/geocode/${lat}/${long}`,
			)
				.then((res) => res.json())
				.then((citydata) => {
					data.city = citydata[0].name;
					data.country = citydata[0].country;
					console.log(data);

					rendercurrentWeather(data);
				});
			setBackground(data);
			renderTodaySummary(data);
			renderDailyWeather(data);
			renderdayDetails(data);
			renderhourlyWeather(data);
		});
};

//redirecting if user denies location access
const redirect = () => {
	window.location.replace('search.html');
};

//getting location
const saveLocation = (position) => {
	let lat = position.coords.latitude;
	let long = position.coords.longitude;

	fetchData(lat, long);
};
const isRedirected = checkIfRedirected();
if (!isRedirected) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(saveLocation, redirect);
	} else {
		window.location.replace('search.html');
	}
}
