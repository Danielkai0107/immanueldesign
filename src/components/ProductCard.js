//ProductCard.js
import React, { useState, useEffect } from "react";

const ProductCard = ({
  product,
  isSelected,
  toggleProduct,
  selectedVariantIndex,
  updateSelectedVariantIndex,
}) => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleColorButtonClick = (index) => {
  if (!isSelected) {
    toggleProduct(product, index);
  } else {
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
  <section className={`product-card ${isSelected ? "selected" : ""}`} onClick={() => toggleProduct(product, selectedVariantIndex)}>
      {imageSrc && (
        <img src={imageSrc} alt="product" className="product-image" />
      )}
      <h4>價格: {product.price.toLocaleString()}</h4>
      <h4>尺寸: {product.size}</h4>
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
  </section>
);

};


export default ProductCard;
