// ContainerB.js
import React, { useEffect, useState } from "react";

const ContainerB = ({ selectedProducts, products, backgroundClass }) => {

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
    <section className="containerB">
      <figure className={`layer-bgc ${backgroundClass}`}></figure>
      {
        selectedProducts
          .sort((a, b) => {
            if (a.categoryIndex !== b.categoryIndex) {
              return a.categoryIndex - b.categoryIndex;
            } else {
              return a.clickOrder - b.clickOrder;
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
  );
};

export default ContainerB;
