//Filter.js
import React from "react";

function Filter({ onFilterChange }) {
  const [selectedOption, setSelectedOption] = React.useState("low");

  const handleClick = (option) => {
    setSelectedOption(option);
    onFilterChange(option);
  };
  
  return (
    <section className="filter-area">
      <button
        onClick={() => handleClick("low")}
        className={selectedOption === "low" ? "selected" : ""}
      >
        低预算
      </button>
      <button
        onClick={() => handleClick("medium")}
        className={selectedOption === "medium" ? "selected" : ""}
      >
        中预算
      </button>
      <button
        onClick={() => handleClick("high")}
        className={selectedOption === "high" ? "selected" : ""}
      >
        高预算
      </button>
    </section>
  );
}

export default Filter;
