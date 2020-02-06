import React, { useEffect, useState } from "react";
// import axios from "axios";
import RegionHeader from "./components/RegionHeader";
import CurrentCountry from "./components/CurrentCountry";
import CapitalsList from "./components/CapitalsList";

// Capitals Quiz - breakdown
// 1. download list of countries and add to the countries array (App.js)
// 2. pick 4 countries at random for multiple-choice options (App.js)
// 3. when user selects an option, show correct/incorrect
// 4. go back to step 2 until fewer than 4 countries remain in the deck
// 5. go back to step 1

function App() {
  const numberOfOptions = 4;

  const [countries, setCountries] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  // ===============================================
  // 1. download list of countries and add to "deck"
  // ===============================================
  //    define function to get countries and capitals from API
  async function fetchCountries() {
    const response = await fetch(
      "https://restcountries.eu/rest/v2/region/africa"
    );
    const data = await response.json();
    setCountries(data);
  }

  // pick the countries at random
  function pickCountries() {
    let _countries = [...countries];
    const _countryOptions = [];
    for (let i = 0; i < numberOfOptions; i++) {
      const randomIndex = Math.floor(Math.random() * _countries.length);
      const pickedCountry = _countries[randomIndex];
      _countryOptions.push(pickedCountry);
      _countries = _countries.filter(country => {
        return pickedCountry !== country;
      });
    }
    setCountries(_countries);
    setCountryOptions(_countryOptions);
  }

  useEffect(function() {
    fetchCountries();
  }, []);

  // handleClickNext
  function handleClickNext() {
    (async function() {
      if (countries.length < numberOfOptions) {
        await fetchCountries();
      }
      pickCountries();
      console.log("handleClick:", countries, countryOptions);
    })();
  }

  return (
    <div className="App" style={{ background: "#cc8833", height: "100vh" }}>
      <RegionHeader></RegionHeader>
      <CurrentCountry country={countryOptions[0]}></CurrentCountry>
      <CapitalsList capitals={countryOptions}></CapitalsList>
      <button onClick={handleClickNext}>Next Question</button>
    </div>
  );
}

export default App;
