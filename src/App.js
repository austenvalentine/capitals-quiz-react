import React, { useEffect, useState } from "react";
import sliceRandomSubset from "./helpers/helper.js";
import RegionHeader from "./components/RegionHeader";
import CurrentCountry from "./components/CurrentCountry";
import CapitalsList from "./components/CapitalsList";

// TODO =====
// rename states to something more intuitive.

// Capitals Quiz - breakdown
// 1. download list of countries and add to the countries array (App.js)
// 2. pick 4 countries at random for multiple-choice options (App.js)
// 3. when user selects an option, show correct/incorrect
// 4. go back to step 2 until fewer than 4 countries remain in the deck
// 5. go back to step 1

function App() {
  const numberOfOptions = 4;
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);

  // pick the countries at random
  function pickRandomCountries() {
    const { set: newCountries, subset: options } = sliceRandomSubset(
      numberOfOptions,
      countries
    );
    // TODO === don't use underscore. Go with newCountries.
    setCountries(newCountries);
    setCountryOptions(options);

    if (newCountries && newCountries.length < numberOfOptions) {
      setCountries([...allCountries]);
    }
  }
  // ===============================================
  // 1. download list of countries, add to cache and add to "deck"
  // ===============================================
  useEffect(function() {
    // Getting "maximum update depth exceeded" warning.
    // May need to implement a debounce for initial render.
    const fetchCountries = async function() {
      const response = await fetch(
        "https://restcountries.eu/rest/v2/region/africa"
      );
      const data = await response.json();
      const { set: newCountries, subset: options } = sliceRandomSubset(
        numberOfOptions,
        data
      );
      setAllCountries(data);
      setCountries(newCountries);
      setCountryOptions(options);
    };
    fetchCountries();
  }, []);

  // if the number of available countries ever becomes less than
  // the number of options, replenish countries from the countriesCache

  return (
    <div className="App" style={{ background: "#cc8833", height: "100vh" }}>
      <RegionHeader></RegionHeader>
      <CurrentCountry
        country={
          countryOptions[Math.floor(Math.random() * countryOptions.length)]
        }
      ></CurrentCountry>
      <CapitalsList capitals={countryOptions}></CapitalsList>
      <button onClick={pickRandomCountries}>Next Question</button>
    </div>
  );
}

export default App;
