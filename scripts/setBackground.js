const setBackground = (data) => {
	let code = data.current.weather[0].icon;
	const image = new Image();
	image.src = `images/${code}.jpg`;
	image.onload = function () {
		//setting background image
		document.body.style.backgroundImage = `url(${this.src})`;
		//adding hidden style from loading div once data loads
		const loadingScreen = document.getElementById('loading');
		loadingScreen.classList.add('hidden');
		document.getElementById('initialText').innerHTML = '';
	};
};
