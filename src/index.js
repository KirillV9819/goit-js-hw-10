import './css/styles.css';
import "./fetchCountries";

const BASE_URL = "https://restcountries.com/v3.1/";
const DEBOUNCE_DELAY = 300;

const refs = {
    inputRef: document.querySelector("#search-box"),
    countryList: document.querySelector(".country-list"),
    countryInfo: document.querySelector(".country-info"),
};

function fetchCountries(name){
    return fetch(`${BASE_URL}name/${name}?fields=name,capital,population,flags,languages`)
        .then((response) => {

            if (!response.ok) {
                throw new Error(response.status)
            }

            return response.json()
        })
        .catch((error) => console.log(error))
};

function getCountries() {
    fetchCountries().then((data) => {
        // const countries = data;
        // createListMarkup(data)
        console.log(data)
    })
}
getCountries()



function createMarkup(country) {
    
    `<img alt="${name.official}" src="${flags.svg}" class="country-img"></img>
    <h2class="country-name">${name.official}</h2class=>
    <p class="country-capital"><b>Capital:</b>${capital}</p>
    <p class="country-popul"><b>Population:</b>${population}</p>
    <p class="country-lang"><b>Languages:</b>${languages}</p>`  
}

function createListMarkup(countries) {

    const markup = countries
        .map(({ name, capital, population, flags, languages }) => {

        `<li class="country-list-item">
        <img class="country-list-item__img" alt="${name.official}" src="${flags.svg}"></img>
        <p class="country-list-item__name">${name.official}</p>
        </li>`;
        }).join("");
    console.log(markup)
    refs.countryList.innerHTML = markup;
}