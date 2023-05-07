// ProductList.js
import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ categoryName, products, selectedProducts, toggleProduct }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const updateSelectedVariantIndex = (productId, variantIndex) => {
    const updatedProduct = selectedProducts.find((product) => product.id === productId);
    if (updatedProduct) {
      toggleProduct({ ...updatedProduct, selectedVariantIndex: variantIndex });
    }
  };

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h2>{categoryName}</h2>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "收起" : "展開"}
        </button>
      </div>
      {isExpanded && (
        <ul className="product-list-items">
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
        </ul>
      )}
    </div>
  );
};

export default ProductList;
