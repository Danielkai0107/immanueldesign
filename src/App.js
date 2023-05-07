// App.js
import React, { useState,useEffect } from "react";
import { products } from "./data";
import ProductList from "./ProductList";
import "./App.scss";

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);

const toggleProduct = (product, selectedVariantIndex) => {
  const existingProductIndex = selectedProducts.findIndex((p) => p.id === product.id);

  if (existingProductIndex >= 0) {
    if (selectedProducts[existingProductIndex].selectedVariantIndex !== selectedVariantIndex) {
      // Update the product's selectedVariantIndex in the selectedProducts array
      setSelectedProducts((prevSelectedProducts) => {
        const updatedSelectedProducts = [...prevSelectedProducts];
        updatedSelectedProducts[existingProductIndex] = {
          ...updatedSelectedProducts[existingProductIndex],
          selectedVariantIndex,
        };
        return updatedSelectedProducts;
      });
    } else {
      // Remove the product from the selectedProducts array
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    }
  } else {
    // Add the product to the selectedProducts array
    setSelectedProducts([...selectedProducts, { ...product, selectedVariantIndex }]);
  }
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


  return (
    <article className="App">
      <section className="containerA">
        <ProductList
          categoryName={backgrounds[0]?.categoryName}
          products={backgrounds}
          selectedProducts={selectedProducts}
          toggleProduct={toggleProduct}
          />
        <ProductList
          categoryName={props[0]?.categoryName}
          products={props}
          selectedProducts={selectedProducts}
          toggleProduct={toggleProduct}
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
