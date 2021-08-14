const bookmarkButton = document.getElementsByClassName('fas fa-lg')[0];
bookmarkButton.addEventListener('click', () => {
	const bookmarkTab = document.getElementsByClassName('bookmarks')[0];
	bookmarkTab.classList.toggle('hidden');
	bookmarkButton.classList.toggle('push');
	if (bookmarkButton.classList.contains('fa-bars')) {
		bookmarkButton.classList.remove('fa-bars');
		bookmarkButton.classList.add('fa-close');
	} else {
		bookmarkButton.classList.remove('fa-close');
		bookmarkButton.classList.add('fa-bars');
	}

	document.getElementsByClassName('extra')[0].classList.toggle('fill');
});

function getBookmarks() {
	let bookmarks;

	if (localStorage.getItem('cityBookmarks')) {
		bookmarks = JSON.parse(localStorage.getItem('cityBookmarks'));
	} else {
		bookmarks = [];
	}
	return bookmarks;
}

function renderBookmarks(bookmarks) {
	const bookmarkList = document.getElementById('bookmarks-list');
	bookmarkList.innerHTML = '';
	if (bookmarks.length === 0) {
		bookmarkList.innerHTML = '<li>Add bookmarks to see here</li>';
	}
	bookmarks.map((city) => {
		const bookmarkListItem = document.createElement('li');
		bookmarkListItem.classList.add('individualBookmark');
		bookmarkListItem.innerText = city;
		bookmarkList.appendChild(bookmarkListItem);
	});
	addListenersToBookmark();
}

renderBookmarks(getBookmarks());
function addBookmark(city, button) {
	let bookmarks = getBookmarks();
	const index = bookmarks.indexOf(city);
	if (index === -1) {
		bookmarks.push(city);
	} else {
		bookmarks.splice(index, 1);
	}
	localStorage.removeItem('cityBookmarks');
	localStorage.setItem('cityBookmarks', JSON.stringify(bookmarks));
	button.classList.toggle('bookmarked');
	renderBookmarks(bookmarks);
}

function checkBookmarked(city) {
	let bookmarks = getBookmarks();
	return bookmarks.includes(city);
}

function addListenersToBookmark() {
	const bookmarkListItems =
		document.getElementsByClassName('individualBookmark');
	for (individualBookmark of bookmarkListItems) {
		individualBookmark.addEventListener('click', (e) => {
			search(e.target.innerText);
			const bookmarkTab = document.getElementsByClassName('bookmarks')[0];
			bookmarkTab.classList.toggle('hidden');
			const bookmarkButton = document.getElementsByClassName('fas fa-lg')[0];
			bookmarkButton.classList.toggle('push');
			if (bookmarkButton.classList.contains('fa-bars')) {
				bookmarkButton.classList.remove('fa-bars');
				bookmarkButton.classList.add('fa-close');
			} else {
				bookmarkButton.classList.remove('fa-close');
				bookmarkButton.classList.add('fa-bars');
			}
			document.getElementsByClassName('extra')[0].classList.toggle('fill');
		});
	}
}
