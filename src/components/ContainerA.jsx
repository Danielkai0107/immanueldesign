// ContainerA.js
import React from "react";
import ProductList from "./ProductList";

const ContainerA = ({
  setFilterLevel,
  filteredProducts,
  selectedProducts,
  toggleProduct, 
  updateSelectedVariantIndex,
  containerARef,
}) => {
  
  const getUniqueCategories = () => {
    return [...new Set(filteredProducts.map((product) => product.categoryName))];
  };


  return (
    <section className="containerA" >
      {getUniqueCategories().map((category) => (
        <ProductList
          key={category}
          categoryName={category}
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
