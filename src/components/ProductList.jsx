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

  return (
    <div className="product-list">
      <div className="product-list-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h2>{categoryName}</h2>
        <div className="product-list-header-info">
          {products.length > 0 && (
        <span className="selectInfo">已選取 ({selectedCount})</span>
        )}
        {products.length > 0 && (
          <span>
            {isExpanded ? "收起" : "展開"}
          </span>
        )}
        </div>
        
      </div>
      {isExpanded && (
        <ul className="product-list-items">
          {products.length > 0 ? (
            products.map((product) => {
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
    </div>
  );
};

export default ProductList;
