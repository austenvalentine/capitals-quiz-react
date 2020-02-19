import React from "react";

import CapitalOption from "./CapitalOption";

function CapitalsList(props) {
  const { countries, compareAnswer } = props;

  return (
    <div>
      <ul>
        {countries.map(function(country) {
          return (
            <CapitalOption
              country={country}
              key={country.capital}
              compareAnswer={compareAnswer}
            ></CapitalOption>
          );
        })}
      </ul>
    </div>
  );
}

export default CapitalsList;
