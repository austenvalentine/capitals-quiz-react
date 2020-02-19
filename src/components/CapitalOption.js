import React from "react";

function CapitalOption(props) {
  const { country, compareAnswer } = props;
  return (
    <li>
      <button onClick={() => compareAnswer(country)}>{country.capital}</button>
    </li>
  );
}

export default CapitalOption;
