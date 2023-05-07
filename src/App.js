// App.js
import React, { useState,useEffect } from "react";
import { products } from "./data";
import ProductList from "./ProductList";
import "./App.scss";

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const toggleProduct = (selectedProduct) => {
    setSelectedProducts((prevState) => {
      const existingProductIndex = prevState.findIndex(
        (product) => product.id === selectedProduct.id
      );

      if (existingProductIndex > -1) {
        // Check if the selected variant is the same as the existing one
        if (
          prevState[existingProductIndex].selectedVariantIndex ===
          selectedProduct.selectedVariantIndex
        ) {
          // Remove the product from the array
          return prevState.filter(
            (product) => product.id !== selectedProduct.id
          );
        } else {
          // Update the existing product in the array
          const updatedProducts = [...prevState];
          updatedProducts[existingProductIndex] = selectedProduct;
          return updatedProducts;
        }
      } else {
        // Add the new product to the array
        return [...prevState, selectedProduct];
      }
    });
  };
  const totalPrice = selectedProducts.reduce(
    (acc, product) => acc + products.find((p) => p.id === product.id).price,
    0
  );
  const backgrounds = products.filter((product) => product.type === "background");
  const props = products.filter((product) => product.type === "prop");
  const ProductLayer = ({ product }) => {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
    const loadImage = async () => {
      const imageModule = await product.imageModule();
      setImageSrc(imageModule.default);
    };
    loadImage();
  }, [product.imageModule, product]);


    return (
      <div className="product-layer">
        {imageSrc && <img src={imageSrc} alt="selected product" className="product-image" />}
      </div>
    );
  };
  const updateSelectedVariantIndex = (productId, variantIndex) => {
    setSelectedProducts(
      selectedProducts.map((product) =>
        product.id === productId
          ? { ...product, selectedVariantIndex: variantIndex }
          : product
      )
    );
  };

  return (
    <article className="App">
      <section className="containerA">
        <ProductList
          categoryName={backgrounds[0]?.categoryName}
          products={backgrounds}
          selectedProducts={selectedProducts}
          toggleProduct={toggleProduct}
          updateSelectedVariantIndex={updateSelectedVariantIndex}
        />
        <ProductList
          categoryName={props[0]?.categoryName}
          products={props}
          selectedProducts={selectedProducts}
          toggleProduct={toggleProduct}
          updateSelectedVariantIndex={updateSelectedVariantIndex}
        />
      </section>
      <ul className="containerR">
        <li className="containerB">
          {
            selectedProducts
              .sort((a, b) => {
                return a.zIndex - b.zIndex;
              })
              .map((selectedProduct) => {
                const product = products.find((p) => p.id === selectedProduct.id);
                const selectedVariant = product.variants[selectedProduct.selectedVariantIndex];
                return (
                  <ProductLayer
                    key={selectedProduct.id}
                    product={{
                      ...selectedVariant,
                      zIndex: product.zIndex,
                      type: product.type,
                    }}
                  />
                );
              })
          }
      </li>
      <li className="containerC">
        <div className="total-price">總價: {totalPrice}</div>
      </li>
      </ul>
      
    </article>
  );
}

export default App;
