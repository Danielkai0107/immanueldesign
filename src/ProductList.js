// ProductList.js
import React, { useState, useEffect } from "react";
import "./ProductList.scss";

const ProductCard = ({
  product,
  isSelected,
  toggleProduct,
  selectedVariantIndex,
  updateSelectedVariantIndex,
}) => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleColorButtonClick = (index) => {
    // Update the product color in the B section directly
    if (isSelected) {
      updateSelectedVariantIndex(product.id, index);
    }
  };

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
                handleColorButtonClick(index);
              }}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};



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
