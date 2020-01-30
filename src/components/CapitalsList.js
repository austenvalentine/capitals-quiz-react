import React from "react";

import CapitalOption from "./CapitalOption";

function CapitalsList(props) {
  const { capitals } = props;
  console.log("CapitalList capitals: ", capitals);

  return (
    <div>
      <ul>
        {[
          <CapitalOption capital={capitals[0] || "hi"}></CapitalOption>,
          <CapitalOption capital={capitals[1] || "hi"}></CapitalOption>,
          <CapitalOption capital={capitals[2] || "hi"}></CapitalOption>,
          <CapitalOption capital={capitals[3] || "hi"}></CapitalOption>
        ]}
      </ul>
    </div>
  );
}

export default CapitalsList;
