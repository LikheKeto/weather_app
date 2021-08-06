//implementing search
const search = () => {
	const inputData = document.getElementsByClassName('search')[0].value;
	if (inputData === '') {
		return;
	}
	const loadingScreen = document.getElementById('loading');
	//adding diplay style while data loads
	loadingScreen.classList.remove('hidden');

	fetch(
		`http://pro.openweathermap.org/geo/1.0/direct?q=${inputData}&limit=1&appid=${config.API_KEY}`,
	)
		.then((res) => res.json())
		.then((data) => {
			fetch(
				`https://pro.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&appid=${config.API_KEY}`,
			)
				.then((res) => res.json())
				.then((searchData) => {
					searchData.city = data[0].name;
					setBackground(searchData);
					renderTodaySummary(searchData);
					renderDailyWeather(searchData);
				});

			document.getElementsByClassName('search')[0].value = '';
		})
		.catch((err) => alert('something went wrong try again'));
};
const button = document.getElementById('search-addon');
let form = document.getElementsByClassName('search')[0];
form.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		search();
	}
});
button.addEventListener('click', () => search());
