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

	fetch(`https://radiant-savannah-03752.herokuapp.com/search/${cityName}`)
		.then((res) => res.json())
		.then((data) => {
			fetch(
				`https://radiant-savannah-03752.herokuapp.com/onecall/${data[0].lat}/${data[0].lon}`,
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
