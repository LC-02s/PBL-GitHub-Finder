import Finder from "./finder.js";
const searchInput = document.getElementById('searchInput');
const resultContainer = document.getElementById('resultContainer');
const gitHubFinder = new Finder();
// gitHubFinder.printData('lc-02s');

















window.addEventListener('keydown', (e) => {
    const hotKey = window.navigator.platform.toLowerCase().indexOf('mac') >= 0 ? e.metaKey : e.altKey;
    if (hotKey && e.keyCode == 13) searchInput.focus();
});
searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) console.log("search function");
    else if (e.keyCode == 27) searchInput.blur();

    if (searchInput.value !== '') {
        searchInput.parentNode.classList.remove('area-main__searchInputBox--tooltip');
    }
});
searchInput.addEventListener('focus', (e) => {
    if (searchInput.value === '') {
        searchInput.parentNode.classList.add('area-main__searchInputBox--tooltip');
    }
});
searchInput.addEventListener('blur', (e) => {
    searchInput.parentNode.classList.remove('area-main__searchInputBox--tooltip');
});