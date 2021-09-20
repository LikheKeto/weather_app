if (checkIfRedirected()) {
	search(checkIfRedirected());
}

//implementing search
function search(cityName) {
	if (!cityName) {
		cityName = document.getElementsByClassName('search')[0].value;
		if (cityName === '') {
			return;
		}
	}
	const loadingScreen = document.getElementById('loading');
	//adding diplay style while data loads
	loadingScreen.classList.remove('hidden');

	fetch(
		`http://pro.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${config.API_KEY}`,
	)
		.then((res) => res.json())
		.then((data) => {
			fetch(
				`https://pro.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&appid=${config.API_KEY}`,
			)
				.then((res) => res.json())
				.then((searchData) => {
					searchData.city = data[0].name;
					searchData.country = data[0].country;
					setBackground(searchData);
					renderTodaySummary(searchData);
					renderDailyWeather(searchData);
					renderdayDetails(searchData);
					renderhourlyWeather(searchData);
					rendercurrentWeather(searchData);
				});

			document.getElementsByClassName('search')[0].value = '';
		})
		.catch((err) => {
			alert('something went wrong try again');
			if (checkIfRedirected()) {
				window.location.replace('search.html');
				return;
			}
			loadingScreen.classList.add('hidden');
		});
}
const button = document.getElementById('search-addon');
let form = document.getElementsByClassName('search')[0];
form.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		search();
	}
});
button.addEventListener('click', () => search());
