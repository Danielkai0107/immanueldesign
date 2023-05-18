// ProductCard.js
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
      if (selectedVariantIndex !== index) {
        updateSelectedVariantIndex(product.id, index);
      }
    };

  useEffect(() => {
    import(`../images/${product.variants[selectedVariantIndex].productImage}`)
      .then((image) => {
        setImageSrc(image.default);
      });
  }, [product, selectedVariantIndex]);

  return (
    <section className={`product-card ${isSelected ? "selected" : ""}`} onClick={() => toggleProduct({ ...product, selectedVariantIndex })}>
      {imageSrc && (
        <img src={imageSrc} alt="product" className="product-image" />
      )}
      <h3>{product.name}</h3>
      <h2>{product.price.toLocaleString()}<span> NT</span></h2>
      <h4>{product.size}</h4>
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
