import React, { useEffect, useState } from "react";
import axios from "axios";
import RegionHeader from "./components/RegionHeader";
import CurrentCountry from "./components/CurrentCountry";
import CapitalsList from "./components/CapitalsList";

// Capitals Quiz - breakdown
// 1. download list of countries and add to "deck" (App.js)
// 2. pick 4 countries at random for multiple-choice options (App.js)
// 3. when user selects an option, show correct/incorrect
// 4. go back to step 2 until fewer than 4 countries remain in the deck
// 5. go back to step 1

function App() {
  const optionCount = 4;

  const [countriesDeck, setCountriesDeck] = useState([]);
  const [capitalsOptions, setCapitalsOptions] = useState([]);
  // ===============================================
  // 1. download list of countries and add to "deck"
  // ===============================================
  //    define function to get countries and capitals from API
  function fetchCountries() {
    axios
      .get("https://restcountries.eu/rest/v2/region/africa")
      .then(function(response) {
        console.log("RESPONSE: ", response.data);
        const { countries, options } = getNextOptions(response.data);
        console.log("STATE: ", options, countries);
        setCountriesDeck(countries);
        setCapitalsOptions(options);
      });
  }

  // ===============================================
  // 2. pick 4 countries at random for multiple-choice options
  // ===============================================
  // define function to randomly pick 4 countries and remove them from the
  // countriesDeck array.
  function getNextOptions(countries) {
    // an array in which to store the randomly-selected countries
    const options = [];
    for (let i = 0; i < optionCount; i++) {
      const randIndex = Math.floor(Math.random() * countries.length);
      const randCountry = countries[randIndex];
      options.push(randCountry);
      // remove randomly picked country from deck
      countries = countries.filter(country => {
        return randCountry !== country;
      });
    }
    // return new array of countries and array of options
    return { countries, options };
  }

  // trigger fetch when countriesDeck is low or empty
  useEffect(() => {
    if (countriesDeck.length < optionCount) {
      fetchCountries();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesDeck]);

  // user-triggered question generation
  const handleClick = () => {
    const { countries, options } = getNextOptions(countriesDeck);
    setCountriesDeck(countries);
    setCapitalsOptions(options);
  };

  return (
    <div className="App" style={{ background: "#cc8833", height: "100vh" }}>
      <RegionHeader></RegionHeader>
      <CurrentCountry country={capitalsOptions[0]}></CurrentCountry>
      <CapitalsList capitals={capitalsOptions}></CapitalsList>
      <button onClick={handleClick}>Next Question</button>
    </div>
  );
}

export default App;
