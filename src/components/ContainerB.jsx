// ContainerB.js
import React, { useEffect, useState } from "react";

const ContainerB = ({ selectedProducts, products, backgroundClass, handleClearSelect, handleBackgroundChange }) => {



  const ProductLayer = ({ product }) => {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
      import(`../images/${product.displayImage}`)
        .then((image) => {
          setImageSrc(image.default);
        });
    }, [product.displayImage, product]);

    return (
      <figure className="product-layer">
        {imageSrc && <img src={imageSrc} alt="selected product" className="product-image" />}
      </figure>
    );
  };

  return (
    <article className="containerB">
      <section className="displayIMG-container">
        <span className='clearBtn' onClick={handleClearSelect}>清空</span>
        <figure className={`layer-bgc ${backgroundClass}`}></figure>
        <ul className='bgcChanger'>
        <li className="bgcChanger-btn" onClick={() => handleBackgroundChange('pre')}></li>
        <li className="bgcChanger-btn" onClick={() => handleBackgroundChange('next')}></li>
      </ul>
        {
          selectedProducts
            .sort((a, b) => {
              if (a.categoryIndex !== b.categoryIndex) {
                return a.categoryIndex - b.categoryIndex;
              } else {
                return a.insideIndex - b.insideIndex; // change this line
              }
            })
            .map((selectedProduct) => {
              const product = products.find((p) => p.id === selectedProduct.id);
              const selectedVariant = product.variants[selectedProduct.selectedVariantIndex];
              return (
                <ProductLayer
                  key={selectedProduct.id}
                  product={{
                    ...selectedVariant,
                    categoryIndex: product.categoryIndex,
                    type: product.type,
                  }}
                />
              );
            })

        }
      </section>
    </article>
  );
};

export default ContainerB;
