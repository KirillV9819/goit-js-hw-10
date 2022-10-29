import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputRef: document.querySelector("#search-box"),
    countriesList: document.querySelector(".country-list"),
    countryInfo: document.querySelector(".country-info"),
};

refs.inputRef.addEventListener(
  'input',
  debounce(onSearchBoxInput, DEBOUNCE_DELAY)
);

function onSearchBoxInput(evt) {

  const searchValue = evt.target.value.trim();

  if (!searchValue) {
    refs.countriesList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
    return;
  }

  fetchCountries(searchValue).then(getCountries);
};

function getCountries(array) {

  if (!array) {
    return;
  }
  if (array.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  if (array.length > 1 && array.length < 10) {
    createListMarkup(array);
    return;
  }

  createMarkup(array[0]);
};

function createMarkup({
    name: { official },
    capital,
    population,
    flags: { svg },
    languages,
}) {
    const allLanguages = Object.values(languages).join(',');

    const markup =
    `<img alt="flag ${official}" src="${svg}" class="country-img"></img>
    <h2class="country-name">${official}</h2class=>
    <p class="country-text"><b>Capital:</b>${capital}</p>
    <p class="country-text"><b>Population:</b>${population}</p>
    <p class="country-text"><b>Languages:</b>${allLanguages}</p>`

    refs.countryInfo.innerHTML = markup;
    refs.countriesList.innerHTML = "";
};

function createListMarkup(countries) {

    const markup = countries
        
        .map(({ name: { official }, capital, population, flags: { svg }, languages }) => {
            return `<li class="country-list-item">
        <img class="country-list-item__img" alt="flag ${official}" src="${svg}"></img>
        <p class="country-list-item__name">${official}</p>
        </li>`;
        }).join("");
    
    refs.countriesList.innerHTML = markup;
    refs.countryInfo.innerHTML = "";
}