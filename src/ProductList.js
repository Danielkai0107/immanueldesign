// ProductList.js
import React, { useState, useEffect } from "react";
import "./ProductList.scss";

const ProductCard = ({ product, isSelected, toggleProduct }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  useEffect(() => {
    const loadImage = async () => {
      const imageModule = await product.variants[selectedVariantIndex].imageModule();
      setImageSrc(imageModule.default);
    };
    loadImage();
  }, [product, selectedVariantIndex]);

  return (
    <div
      className={`product-card ${isSelected ? "selected" : ""}`}
    onClick={() => toggleProduct(product, selectedVariantIndex)}
    >
      {imageSrc && <img src={imageSrc} alt="product" className="product-image" />}
      <div>價格: {product.price}</div>
      <div>尺寸: {product.size}</div>
      {product.variants && (
        <div className="color-selector">
          {product.variants.map((variant, index) => (
            <button
              key={index}
              className="color-option"
              style={{ backgroundColor: variant.color }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVariantIndex(index);
              }}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};


const ProductList = ({ categoryName, products, selectedProducts, toggleProduct }) => {
  return (
    <ul className="product-list">
      <h2>{categoryName}</h2>
      <li className="product-list-items">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={selectedProducts.includes(product.id)}
            toggleProduct={toggleProduct}
          />
        ))}
      </li>
    </ul>
  );
};

export default ProductList;
