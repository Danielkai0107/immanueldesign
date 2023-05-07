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
      <div>價格: {product.price}</div>
      <div>尺寸: {product.size}</div>
    </div>
  );
};

export default ProductCard;
