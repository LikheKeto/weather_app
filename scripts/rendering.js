//importing id of dom
const todaySummary = document.getElementById('todaySummary');
const dailyWeather = document.getElementById('dailyWeather');
const dayDetails = document.getElementById('dayDetails');

//Output data to Day Details
const renderdayDetails = (data) => {
	dayDetails.innerHTML = `
	<div>
		<p>Feels Like: ${curateTemp(data.current.feels_like)}</p>
		<p>Barometer: ${data.current.pressure} mb</p>
		<p>Wind: ${data.current.wind_speed} m/sec</p>
		<p>Humidity: ${data.current.humidity} %</p>
	<div>`;
};

//output data to today's summary
const renderTodaySummary = (data) => {
	todaySummary.innerHTML = `
    <h4>Today's summary</h4>
    <hr/>
    <div>
        <p>Highest temp: ${curateTemp(data.daily[0].temp.max)}</p>
        <p>Lowest temp: ${curateTemp(data.daily[0].temp.min)}</p>
        <p>Sunrise: ${curateTime(data.daily[0].sunrise)}</p>
        <p>Sunset: ${curateTime(data.daily[0].sunset)}</p>
        <p>Moonrise: ${curateTime(data.daily[0].moonrise)}</p>
        <p>Moonset: ${curateTime(data.daily[0].moonset)}</p>
    </div>`;
};

//showing details on hover:

const showMinifiedDetails = (data, day) => {
	let key = day.accessKey;
	let hoveredDay = data.daily.filter((day) => day.dt === parseInt(key))[0];
	day.innerHTML = `
	<p>Morning: ${curateTemp(hoveredDay.temp.morn)}</p>
	<p>Day: ${curateTemp(hoveredDay.temp.day)}</p>
	<p>Evening: ${curateTemp(hoveredDay.temp.eve)}</p>
	<p>Night: ${curateTemp(hoveredDay.temp.night)}</p>
	<p>Max: ${curateTemp(hoveredDay.temp.max)}</p>
	<p>Min: ${curateTemp(hoveredDay.temp.min)}</p>
	`;
};

const resetDetails = (data, day) => {
	let key = day.accessKey;
	let hoveredDay = data.daily.filter((day) => day.dt === parseInt(key))[0];
	day.innerHTML = `
	<h5>${curateDate(hoveredDay.dt)}</h5>
	<img src='http://openweathermap.org/img/wn/${hoveredDay.weather[0].icon}.png'/>
	<p class="dailyTemp">${curateTemp(hoveredDay.temp.day)}</p>
	<p>${hoveredDay.weather[0].description}</p>
	`;
};

//output data to daily component
const renderDailyWeather = (data) => {
	dailyWeather.innerHTML = `
    <h2>Daily</h2>
    <hr />
    <div id="grid-container">
    </div>
`;
	const container = document.getElementById('grid-container');
	data.daily.map((day) => {
		const item = document.createElement('div');
		item.classList = 'grid-item';
		item.accessKey = `${day.dt}`;
		item.innerHTML = `
        <h5>${curateDate(day.dt)}</h5>
        <img src='http://openweathermap.org/img/wn/${day.weather[0].icon}.png'/>
        <p class="dailyTemp">${curateTemp(day.temp.day)}</p>
        <p>${day.weather[0].description}</p>
    `;
		container.appendChild(item);
	});

	let HTMLdays = document.getElementsByClassName('grid-item');
	var days = [].slice.call(HTMLdays);
	days.map((day) => {
		//show daily details on hover
		day.addEventListener('mouseenter', () => showMinifiedDetails(data, day));
		day.addEventListener('mouseleave', () => resetDetails(data, day));
	});
};
