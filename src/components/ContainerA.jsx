// ContainerA.js
import React from "react";
import Filter from "./Filter";
import ProductList from "./ProductList";

const ContainerA = ({
  setFilterLevel,
  filteredProducts,
  selectedProducts,
  toggleProduct, 
  updateSelectedVariantIndex 
}) => {
  
  const getUniqueCategories = () => {
    return [...new Set(filteredProducts.map((product) => product.categoryName))];
  };

  return (
    <section className="containerA">
      <Filter onFilterChange={(level) => setFilterLevel(level)} />
      {getUniqueCategories().map((category) => (
        <ProductList
          key={category}
          categoryName={category}
          categoryNameEn={category}
          products={filteredProducts.filter(
            (product) => product.categoryName === category
          )}
          selectedProducts={selectedProducts}
          toggleProduct={toggleProduct}
          updateSelectedVariantIndex={updateSelectedVariantIndex}
        />
      ))}
    </section>
  );
};

export default ContainerA;
