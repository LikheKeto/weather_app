//importing id of dom
const todaySummary = document.getElementById('todaySummary');
const dailyWeather = document.getElementById('dailyWeather');
const hourlyWeather = document.getElementById('hourlyWeather');
const dayDetails = document.getElementById('dayDetails');
const currentWeather = document.getElementById('currentWeather');

// output data of hourly
const renderhourlyWeather = (data) => {
	hourlyWeather.innerHTML = '';
	let hour = data.hourly;
	const heading = document.createElement('h4');
	const bar = document.createElement('hr');
	heading.innerText = 'Hourly';
	hourlyWeather.appendChild(heading);
	hourlyWeather.appendChild(bar);
	const list = document.createElement('ul');
	for (let i = 0; i < data.hourly.length / 4; i++) {
		const listItem = document.createElement('li');
		listItem.innerHTML = `
		<p> ${curateTime(hour[i].dt)}</p>
		<div class="block">
		<p> ${curateTemp(hour[i].temp)}</p>
		<img src='http://openweathermap.org/img/wn/${hour[i].weather[0].icon}.png'/>
		<p> ${hour[i].weather[0].description}</p>
		</div>
		<div class="block">
		<p>💨 ${hour[i].wind_speed}m/sec</p>
		<p>💧 ${hour[i].humidity}%</p>
		</div>
		<hr/>`;
		list.appendChild(listItem);
	}
	hourlyWeather.appendChild(list);
};

//Output data to Day Details
const renderdayDetails = (data) => {
	dayDetails.innerHTML = `
	<div id = "grid-container-daydetail">
		<p class = "day_detail_box">Feels Like: ${curateTemp(
			data.current.feels_like,
		)}</p>
		<p class = "day_detail_box">Barometer: ${data.current.pressure} mb</p>
		<p class = "day_detail_box">Wind: ${data.current.wind_speed} m/sec</p>
		<p class = "day_detail_box">Humidity: ${data.current.humidity} %</p>
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

//output for current weather

const rendercurrentWeather = (data) => {
	currentWeather.innerHTML = `
	
	<div class="currentweatherdiv">
		<img src='http://openweathermap.org/img/wn/${
			data.hourly[3].weather[0].icon
		}.png' height="90px" width="90px"/>
		<h1>${curateTemp(data.current.temp)}
		</h1><button id="changeTempUnit">${renderFar ? 'C' : 'F'}</button>
		<span class="group"><h6>${data.city}, ${
		data.country
	}</h6><i class="fas fa-bookmark" data-bs-toggle="tooltip"
	 data-bs-html="true" title="Add/Remove Bookmark"></i></span>
	</div>`;

	const addButton = document.getElementsByClassName('fas fa-bookmark')[0];
	if (checkBookmarked(data.city)) {
		addButton.classList.add('bookmarked');
	}
	addButton.addEventListener('click', () => addBookmark(data.city, addButton));
	const tempButton = document.getElementById('changeTempUnit');
	tempButton.addEventListener('click', () => {
		renderFar = !renderFar;
		rendercurrentWeather(data);
		renderTodaySummary(data);
		renderDailyWeather(data);
		renderdayDetails(data);
		renderhourlyWeather(data);
	});
};
