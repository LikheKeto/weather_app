let renderFar = false;
//curating date and time
const curateTime = (time) => {
	let a = new Date(time * 1000).toLocaleTimeString();
	return a;
};

const curateTemp = (temp) => {
	let curatedTemp;
	if (renderFar) {
		curatedTemp = `${Math.round(((temp - 273.5) * 9) / 5 + 32)}°F`;
	} else curatedTemp = `${Math.round(temp - 273)}°C`;
	return curatedTemp;
};

const curateDate = (time) => {
	let a = new Date(time * 1000).toDateString().split(' ');
	if (a[2].indexOf('0') === 0) {
		a[2] = a[2].split('0')[1];
	}
	let b = a[0] + ' ' + a[2];
	let e = b.toUpperCase();
	return e;
};

function checkIfRedirected() {
	//check if user is redirected from search
	const url = window.location.href;
	const field = 'search';
	if (url.indexOf('?' + field + '=') != 1) {
		const redirectedCity = url.split('?' + field + '=')[1];
		return redirectedCity;
	} else return false;
}
