const bookmarkButton = document.getElementsByClassName('menu')[0];
bookmarkButton.addEventListener('click', () => {
	const bookmarkTab = document.getElementsByClassName('bookmarks')[0];
	bookmarkTab.classList.toggle('hidden');
	bookmarkButton.classList.toggle('push');

	document.getElementsByClassName('extra')[0].classList.toggle('fill');
});
