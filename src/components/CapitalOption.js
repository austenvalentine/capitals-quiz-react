import React from "react";

function CapitalOption(props) {
  const { capital } = props.capital;
  return <li>{capital}</li>;
}

export default CapitalOption;
