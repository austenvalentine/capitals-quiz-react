import React from "react";

function OKModal(props) {
  return (
    <div>
      <h2>{props.message}</h2>
      <button onClick={props.closeOKModal}>OK</button>
    </div>
  );
}

export default OKModal;
