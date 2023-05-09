//Filter.js
import React from "react";

function Filter({ onFilterChange }) {
  return (
    <div>
      <button onClick={() => onFilterChange("low")}>低预算</button>
      <button onClick={() => onFilterChange("medium")}>中预算</button>
      <button onClick={() => onFilterChange("high")}>高预算</button>
    </div>
  );
}

export default Filter;
