import React from "react";

function RegionHeader() {
  // use this to display how many questions remain
  return (
    <div>
      <h1>Capital Cities in Africa Quiz</h1>
      <p>
        <span className="questions-remaining">0</span> countries remaining.
      </p>
    </div>
  );
}

export default RegionHeader;
