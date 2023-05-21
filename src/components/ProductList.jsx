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

  // 計算當前 ProductList 中被選擇的物品數量
  const selectedCount = selectedProducts.filter((selectedProduct) =>
    products.some((product) => product.id === selectedProduct.id)
  ).length;

  const sortByPrice = (products) => {
    return products.slice().sort((a, b) => a.price - b.price);
  };


  return (
    <section className="product-list">
      <ul className="product-list-header" onClick={() => setIsExpanded(!isExpanded)} >
        <li className="product-list-header-title">{categoryName}</li>
        <li className="product-list-header-info">
          {selectedCount > 0 && (
            <p className="selectedInfo"><span className="dot"></span> {selectedCount}</p>
        )}
        {products.length > 0 && (
            <figure className={isExpanded ? "close" : "open"} ></figure>
        )}
        </li>
        
      </ul>
      {isExpanded && (
        <ul className="product-list-items">
          {products.length > 0 ? (
            sortByPrice(products).map((product) => {
              const selectedProduct = selectedProducts.find(
                (p) => p.id === product.id
              );
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
            })
          ) : (
            <h4 className="op-6">暫時沒有相關道具</h4>
          )}
        </ul>
      )}
    </section>
  );
};

export default ProductList;
