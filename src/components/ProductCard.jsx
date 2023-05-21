// ProductCard.js
import React, { useState, useEffect } from "react";

const ProductCard = ({
  product,
  isSelected,
  toggleProduct,
  selectedVariantIndex,
  updateSelectedVariantIndex,
  }) => {
  // State Hooks
  const [imageSrc, setImageSrc] = useState(null);
  // Handler Functions
  const handleColorButtonClick = (index) => {
      if (selectedVariantIndex !== index) {
        updateSelectedVariantIndex(product.id, index);
      }
    };
  // Effect Hooks
  useEffect(() => {
    import(`../images/${product.variants[selectedVariantIndex].productImage}`)
      .then((image) => {
        setImageSrc(image.default);
      });
  }, [product, selectedVariantIndex]);

  return (
    <li
      className={`product-card ${isSelected ? "selected" : ""}`}
      onClick={() => toggleProduct({ ...product, selectedVariantIndex })}
    >
      {imageSrc && (
        <img src={imageSrc} alt="product" className="product-image" />
      )}
      <section className="content">
        <p className="name">{product.name}</p>
        <p className="price"><span>$</span>{product.price.toLocaleString()}</p>
        <p className="size">{product.sizeInfo}</p>
      </section>
      
      {product.variants && (
        <section className="color-selector-container">
          <ul className={isSelected ? "selected" : ""}>
            {product.variants.map((variant, index) => (
              <li
                key={index}
                className={isSelected ? "color-selector-after" : "color-selector-before"}
                style={{ backgroundColor: variant.color }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleColorButtonClick(index);
                }}
              ><span>{isSelected ? variant.info : ''}</span></li>
            ))}
          </ul>
        </section>
      )}
      
    </li>
  );
};

export default ProductCard;
