//Filter.js
import React, { useState } from "react";

function Filter({ onFilterChange }) {
  const [selectedOption, setSelectedOption] = useState("low");

  const handleClick = (option) => {
    setSelectedOption(option);
    onFilterChange(option);
  };
  
  return (
    <ul className="filter-area">
      <li
        onClick={() => handleClick("low")}
        className={selectedOption === "low" ? "selected" : ""}
      >
        低预算
      </li>
      <li
        onClick={() => handleClick("medium")}
        className={selectedOption === "medium" ? "selected" : ""}
      >
        中预算
      </li>
      <li
        onClick={() => handleClick("high")}
        className={selectedOption === "high" ? "selected" : ""}
      >
        高预算
      </li>
    </ul>
  );
}

export default Filter;
