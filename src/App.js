import React, { useEffect, useState } from "react";
import axios from "axios";
import RegionHeader from "./components/RegionHeader";
import CurrentCountry from "./components/CurrentCountry";
import CapitalsList from "./components/CapitalsList";

// Capitals Quiz
// 3. when user selects an option, show correct/incorrect
// 4. go back to step 2 until fewer than 4 countries remain in the deck
// 5. go back to step 1

function App() {
  const [countriesDeck, setCountriesDeck] = useState([]);
  const [capitalsOptions, setCapitalsOptions] = useState([]);
  // ===============================================
  // 1. download list of countries and add to "deck"
  // ===============================================
  //    define reusable function to get countries and capitals from API
  function fetchCountries() {
    axios
      .get("https://restcountries.eu/rest/v2/region/africa")
      .then(function(response) {
        setCountriesDeck(response.data);
        console.log(response.data);
      });
  }
  // trigger API call on first render
  useEffect(() => {
    fetchCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===============================================
  // 2. pick 4 countries at random for multiple-choice options
  // ===============================================
  function getNextOptions() {
    // copy the countriesDeck state for mutation (filtering elements)
    let deckCopy = [...countriesDeck];
    // an array in which to store the randomly-selected countries
    const options = [];
    for (let i = 0; i < 4; i++) {
      const randIndex = Math.floor(Math.random() * deckCopy.length);
      const randCountry = deckCopy[randIndex];
      options.push(randCountry);
      // remove randomly picked country from deck
      deckCopy = deckCopy.filter(country => {
        return randCountry !== country;
      });
    }
    console.log(options);
    // update deck state to exclude removed countries
    setCountriesDeck(deckCopy);
    // put the picked countries into state
    setCapitalsOptions(options);
  }

  // trigger fetch when countriesDeck is low or empty
  useEffect(() => {
    if (!countriesDeck || countriesDeck.length < 4) {
      fetchCountries();
      getNextOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesDeck]);

  return (
    <div className="App" style={{ background: "#cc8833", height: "100vh" }}>
      <RegionHeader></RegionHeader>
      <CurrentCountry country={null}></CurrentCountry>
      <CapitalsList capitals={capitalsOptions}></CapitalsList>
    </div>
  );
}

export default App;
