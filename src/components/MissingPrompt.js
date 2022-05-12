import React from "react";
import "../index.css";

function MissingPrompt() {
  return (
    <div className="prompt-container">
      <img
        className="prompt-img img"
        src="/assets/mokoHuh.png"
        alt="mokokoHuh"
      />
      <h2 className="prompt-text">Please add chracters to track!</h2>
    </div>
  );
}

export default MissingPrompt;
