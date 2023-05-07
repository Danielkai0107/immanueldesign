// ProductList.js
import React from "react";
import ProductCard from "./ProductCard";
import "./ProductList.scss";


const ProductList = ({ categoryName, products, selectedProducts, toggleProduct }) => {
const updateSelectedVariantIndex = (productId, variantIndex) => {
  const updatedProduct = selectedProducts.find((product) => product.id === productId);
  if (updatedProduct) {
    toggleProduct({ ...updatedProduct, selectedVariantIndex: variantIndex });
  }
};

  return (
    <ul className="product-list">
      <h2>{categoryName}</h2>
      <li className="product-list-items">
        {products.map((product) => {
          const selectedProduct = selectedProducts.find((p) => p.id === product.id);
          return (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={!!selectedProduct}
              selectedVariantIndex={selectedProduct?.selectedVariantIndex || 0}
              toggleProduct={toggleProduct}
              updateSelectedVariantIndex={updateSelectedVariantIndex}
            />
          );
        })}
      </li>
    </ul>
  );
};

export default ProductList;
