import React, { useState } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import GameScreen from "./components/GameScreen";
// import AnswerScreen from "./components/AnswersScreen";

function App() {
  const [inProp, setInProp] = useState(false);
  return (
    <div className="App">
      <SwitchTransition mode="in-out">
        <Transition in={inProp} key="appScreen" timeout={100}>
          {GameScreen}
        </Transition>
      </SwitchTransition>
      <button
        onClick={() => {
          setInProp(inProp ? false : true);
        }}
      >
        TOggle!
      </button>
    </div>
  );
}

export default App;
