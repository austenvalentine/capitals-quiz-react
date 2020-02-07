import React from "react";

function CurrentCountry(props) {
  const { country } = props;
  return (
    <div>
      {country ? (
        <div>
          <h2>Which capital belongs to {country.name}?</h2>
          <div style={{ height: "100px", width: "60px" }}>
            <img
              style={{ width: "100%" }}
              src={country.flag}
              alt={`Flag of ${country.name}`}
            ></img>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default CurrentCountry;
