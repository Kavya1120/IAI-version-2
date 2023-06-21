import React from "react";

import "./Options.css";

const Options = (props) => {
  const options = [
    { text: "ICCICBE", 
      handler: props.actionProvider.handleList,
      id: 1 },
    { text: "Latest event",
    handler: props.actionProvider.handleList,
      id: 2},
    // { text: "APIs", handler: () => {}, id: 3 },
    // { text: "Security", handler: () => {}, id: 4 },
    // { text: "Interview prep", handler: () => {}, id: 5 },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default Options;
