// ProductCard.js
import React, { useState, useEffect } from "react";

const ProductCard = ({
  product,
  isSelected,
  toggleProduct,
  selectedVariantIndex,
  updateSelectedVariantIndex,
  productQuantities, // 從props接收
  changeProductCount // 從props接收
  }) => {

  const productCount = productQuantities[product.id] || 0;
  // State Hooks
  const [imageSrc, setImageSrc] = useState(null);
  // Handler Functions
  const handleColorButtonClick = (index) => {
      if (selectedVariantIndex !== index) {
        updateSelectedVariantIndex(product.id, index);
      }
    };
  const [isExpanded, setIsExpanded] = useState(false);

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
      onClick={() => {toggleProduct({ ...product, selectedVariantIndex });setIsExpanded(false);}}
    >
      {isSelected ? 
      <ul className="count-btn">
        <li onClick={(e) => {e.stopPropagation(); changeProductCount(product.id, -1);}}></li>
        <span>{productCount}</span>
        <li onClick={(e) => {e.stopPropagation(); changeProductCount(product.id, 1);}}></li>
      </ul>:null}
      <section className="content">
      {imageSrc && (
        <img src={imageSrc} alt="product" className="product-image" />
        )}
        <p className="name">{product.name}</p>
        <p className="price"><span>$</span>{product.price.toLocaleString()}</p>
        <p className="size">{product.sizeInfo}</p>
      </section>
      
      {product.variants && (
        <article className="color-selector-container">
          <p className="size">{product.variants[0].info} </p>
          {isSelected ? 
          (<section className="color-showBox" style={{ backgroundColor: product.variants[selectedVariantIndex].color}}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded)
            }}>
              <figure></figure>
              <ul className={isExpanded ? "" : "close"}>
                {product.variants.map((variant, index) => (
                  <li
                    key={index}
                    style={{ backgroundColor: variant.color }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleColorButtonClick(index);
                      setIsExpanded(!isExpanded)
                    }}
                  ><span></span></li>
                ))}
              </ul>
            </section>):
            (<section className="color-default" style={{ backgroundColor: product.variants[selectedVariantIndex].color }} ></section>)}
        </article>
      )}
      
    </li>
  );
};

export default ProductCard;
