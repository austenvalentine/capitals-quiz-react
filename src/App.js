import React, { useEffect, useState } from "react";
import sliceRandomSubset from "./helpers/helper.js";
import RegionHeader from "./components/RegionHeader";
import CurrentCountry from "./components/CurrentCountry";
import OKModal from "./components/OKModal";
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
  // Set a number of multiple-choice options
  const numberOfOptions = 4;
  // State to store the data fetched from the API. It does not get modified.
  const [allCountries, setAllCountries] = useState([]);
  // State to store a copy of the data fetched from the API. Gets modified
  // every time a new question is generated and is replenished when it does
  // enough data to generate the next question.
  const [countries, setCountries] = useState([]);
  // state to store the options for the current multiple-choice question
  const [countryOptions, setCountryOptions] = useState([]);
  // state to store the correct answer
  const [correctAnswer, setCorrectAnswer] = useState({});
  // state to store user's choice
  const [userChoice, setUserChoice] = useState({});
  // state to toggle the user-confirm modal
  const [modalIsVisible, setModalIsVisible] = useState(false);
  // state to set a response message in the modal
  const [modalMessage, setModalMessage] = useState("");

  function pickRandomCountries() {
    // randomly splice the options in the new question from the list of
    // countries
    const {
      set: newCountries,
      subset: options
    } = sliceRandomSubset(numberOfOptions, [...countries]);
    // choose a correct answer from the options
    const newCorrectAnswer =
      options[Math.floor(Math.random() * options.length)];
    // update the countries list, correct answer, and the quiz question
    setCountries(newCountries);
    setCorrectAnswer(newCorrectAnswer);
    setCountryOptions(options);

    // replenish the countries list if the subset is too small to
    // generate the next question
    if (newCountries && newCountries.length < numberOfOptions) {
      setCountries(allCountries);
    }
  }

  // give user a chance to read the message before continuing the game
  function closeOKModal() {
    if (userChoice === correctAnswer) {
      console.log("CORRECT: pickRandomCountries");
      pickRandomCountries();
    }
    setModalIsVisible(false);
  }

  function compareAnswer(country) {
    setUserChoice(country);
    if (country === correctAnswer) {
      setModalMessage(
        `Yes! ${correctAnswer.capital} is the capital of ${correctAnswer.name}!`
      );
    } else {
      setModalMessage(
        `No! ${country.capital} is not the capital of ${correctAnswer.name}`
      );
    }
    setModalIsVisible(true);
  }

  useEffect(function() {
    const fetchCountries = async function() {
      const response = await fetch(
        "https://restcountries.eu/rest/v2/region/africa"
      );
      const data = await response.json();
      const { set: newCountries, subset: options } = sliceRandomSubset(
        numberOfOptions,
        data
      );
      // choose a correct answer from the options
      const newCorrectAnswer =
        options[Math.floor(Math.random() * options.length)];
      // store the correct answer
      setCorrectAnswer(newCorrectAnswer);
      // store the full set of data in state
      setAllCountries(data);
      // give the modified set of data to the current list of countries and
      // and the next question's options.
      setCountries(newCountries);
      setCountryOptions(options);
    };
    fetchCountries();
  }, []);

  // if the number of available countries ever becomes less than
  // the number of options, replenish countries from the countriesCache

  return (
    <div className="App" style={{ background: "#cc8833", height: "100vh" }}>
      {modalIsVisible && (
        <OKModal closeOKModal={closeOKModal} message={modalMessage}></OKModal>
      )}
      <RegionHeader></RegionHeader>
      <CurrentCountry country={correctAnswer}></CurrentCountry>
      <CapitalsList
        countries={countryOptions}
        compareAnswer={compareAnswer}
      ></CapitalsList>
      <button onClick={pickRandomCountries}>Next Question</button>
    </div>
  );
}

export default App;
