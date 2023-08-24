import React, { useState } from "react";
import "./style.css";

//hidden under canvas
//z-index has no effect
export default function Controls() {
  const [showGoalHelper, setShowGoalHelper] = useState(false);
  function displayGOALHelper(e) {
    e.preventDefault();
    console.log("displayGoalHelper");
    setShowGoalHelper(true);
  }
  function hideGOALHelper(e) {
    e.preventDefault();
    console.log("hideGoalHelper");
    setShowGoalHelper(false);
  }
  function controlsContainerClick() {
    console.log("controls container click");
  }
  return (
    <div className="controls-container" onClick={controlsContainerClick}>
      <div className="controls">
        <div className="controls-title">Controls </div>
        <div className="controls-details">
          <kbd>click + drag to look</kbd>
          <br />
          <kbd>spacebar to throw the dice</kbd>
          <br />
          <kbd>click to select</kbd>
          <br />
          <kbd>click again to place</kbd>
        </div>
        <div className="controls-title" id="rules">
          Rules{" "}
        </div>
        <div className="controls-details">
          <div
            className="controls-details-item"
            onMouseEnter={(e) => displayGOALHelper(e)}
            onMouseLeave={(e) => hideGOALHelper(e)}
          >
            <kbd>
              * GOAL is to make a circle with your ships from Earth to Earth.
            </kbd>
            <br />
          </div>
          <kbd>
            * Throw the dice (yuts) to determine how many steps to move.
          </kbd>
          <br />
          <kbd>* Click a ship, and click a star or planet to place it.</kbd>
          <br />
          <kbd>* Each team takes turns. </kbd>
          <br />
          <kbd>* To score, select a piece and click the button.</kbd>
          <br />
          <kbd>*** Additional Rules</kbd>
          <br />
          <kbd>*** Throw again if you threw a four or a five.</kbd>
          <br />
          <kbd>*** Throw again if you captured a piece.</kbd>
          <br />
          <kbd>
            *** You can move across the shortcut on your next turn on planets.
          </kbd>
        </div>
      </div>
    </div>
  );
}
