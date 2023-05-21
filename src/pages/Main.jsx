// Main.js
import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar'
import ContainerC from "../components/ContainerC";
import ContainerA from "../components/ContainerA";
import ContainerB from "../components/ContainerB";


function Main() {
  // State Hooks
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterLevel, setFilterLevel] = useState("high");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [backgroundClass, setBackgroundClass] = useState('bg-image-1');

  // Handler Functions
  const handleBackgroundChange = (newClass) => {
    setBackgroundClass(newClass);
  };
  const toggleProduct = (selectedProduct) => {
    setSelectedProducts((prevState) => {
      const existingProductIndex = prevState.findIndex(
        (product) => product.id === selectedProduct.id
      );

      if (existingProductIndex > -1) {
        // If the product exists and the variant is the same, remove it
        if (prevState[existingProductIndex].selectedVariantIndex === selectedProduct.selectedVariantIndex) {
          return prevState.filter((product) => product.id !== selectedProduct.id);
        } else {
          // Otherwise, update the variant
          const updatedProducts = [...prevState];
          updatedProducts[existingProductIndex] = {
            ...selectedProduct,
            categoryIndex: selectedProduct.categoryIndex,
            clickOrder: prevState[existingProductIndex].clickOrder,
            insideIndex: selectedProduct.insideIndex, // add this line
          };
          return updatedProducts;
        }
      } else {
        // If the product does not exist, add it
        return [
          ...prevState,
          {
            ...selectedProduct,
            categoryIndex: selectedProduct.categoryIndex,
            clickOrder: prevState.length + 1,
            insideIndex: selectedProduct.insideIndex, // add this line
          },
        ];
      }
    });
  };

  const handleClearSelect = () => {
    setSelectedProducts([])
  }
  const totalSelected = selectedProducts.length;
  const totalPrice = selectedProducts.reduce(
    (acc, product) => acc + products.find((p) => p.id === product.id).price,
    0
  ).toLocaleString();
  const updateSelectedVariantIndex = (productId, variantIndex) => {
    setSelectedProducts(
      selectedProducts.map((product) =>
        product.id === productId
          ? { ...product, selectedVariantIndex: variantIndex }
          : product
      )
    );
  };

  // Effect Hooks
  useEffect(() => {
    fetch("/data.json") // 根据实际情况修改文件路径
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []);
  useEffect(() => {
    const filterProducts = (level) => {
      if (level === "low") {
        return products.filter((product) => product.budgetLevel === "low");
      } else if (level === "medium") {
        return products.filter((product) => product.budgetLevel !== "high");
      } else {
        return products;
      }
    };
    setFilteredProducts(filterProducts(filterLevel));
  }, [filterLevel, products]);

  return (
    <main className="main">
      <Navbar/>
      <article className="main-inner">
        <ContainerA
          filterLevel={filterLevel}
          setFilterLevel={setFilterLevel}
          filteredProducts={filteredProducts}
          selectedProducts={selectedProducts}
          toggleProduct={toggleProduct}
          updateSelectedVariantIndex={updateSelectedVariantIndex}
        />
        <aside className="container-for-BC">
          <ContainerB 
            selectedProducts={selectedProducts}
            products={products}
            backgroundClass={backgroundClass}
            handleClearSelect={handleClearSelect}
          />
          <ContainerC
            handleBackgroundChange={handleBackgroundChange}
            totalSelected={totalSelected}
            totalPrice={totalPrice}
            selectedProducts={selectedProducts}
          />
        </aside>
      </article>
    </main>
  );
}

export default Main;



