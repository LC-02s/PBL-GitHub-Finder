import Finder from "./finder.js";
const searchInput = document.getElementById('searchInput');
const resultContainer = document.getElementById('resultContainer');
const gitHubFinder = new Finder();


async function insertHTML(username) {
    resultContainer.innerHTML = await gitHubFinder.templateHTML(username);
}

window.addEventListener('keydown', (e) => {
    const hotKey = window.navigator.platform.toLowerCase().indexOf('mac') >= 0 ? e.metaKey : e.altKey;
    if (hotKey && e.keyCode == 13) searchInput.focus();
});
searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        if (searchInput.value !== '') {
            insertHTML(searchInput.value.toLowerCase());
            searchInput.value = '';
        } else alert("GitHub 아이디를 입력해주세요");
    } else if (e.keyCode == 27) searchInput.blur();

    if (searchInput.value !== '') {
        searchInput.parentNode.classList.remove('area-search__inputBox--tooltip');
    }
});
searchInput.addEventListener('focus', (e) => {
    if (searchInput.value === '') {
        searchInput.parentNode.classList.add('area-search__inputBox--tooltip');
    }
});
searchInput.addEventListener('blur', (e) => {
    searchInput.parentNode.classList.remove('area-search__inputBox--tooltip');
});