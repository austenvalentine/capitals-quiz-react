import React from "react";
import CapitalOption from "./CapitalOption";

function CapitalsList(props) {
  const { capitals } = props;
  console.log("CapitalList capitals: ", capitals);
  return (
    <div>
      <ul>
        {[
          <CapitalOption capital={capitals[0]}></CapitalOption>,
          <CapitalOption capital={capitals[1]}></CapitalOption>,
          <CapitalOption capital={capitals[2]}></CapitalOption>,
          <CapitalOption capital={capitals[3]}></CapitalOption>
        ]}
      </ul>
    </div>
  );
}

export default CapitalsList;
