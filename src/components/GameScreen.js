import React from "react";
import RegionHeader from "RegionHeader";
import CurrentCountry from "CurrentCountry";
import CapitalSelection from "CapitalSelection";

function GameScreen() {
  return (
    <div style={{ background: "#cc8833", height: "100vh" }}>
      <RegionHeader></RegionHeader>
      <CurrentCountry></CurrentCountry>
      <CapitalSelection></CapitalSelection>
    </div>
  );
}

export default GameScreen;
