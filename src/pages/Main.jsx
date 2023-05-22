// Main.js
import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar'
import ContainerC from "../components/ContainerC";
import ContainerA from "../components/ContainerA";
import ContainerB from "../components/ContainerB";


function Main() {
  // State Hooks
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterLevel, setFilterLevel] = useState("high"); 
  const [backgroundClass, setBackgroundClass] = useState('bg-image-1');

  // Handler Functions
  const handleBackgroundChange = (newClass) => {
    setBackgroundClass(newClass);
    localStorage.setItem("backgroundClass", newClass);
  };
  const toggleProduct = (selectedProduct) => {
    setSelectedProducts((prevState) => {
      const existingProductIndex = prevState.findIndex(
        (product) => product.id === selectedProduct.id
      );

      let updatedProducts;

      if (existingProductIndex > -1) {
        // If the product exists and the variant is the same, remove it
        if (prevState[existingProductIndex].selectedVariantIndex === selectedProduct.selectedVariantIndex) {
          updatedProducts = prevState.filter((product) => product.id !== selectedProduct.id);
        } else {
          // Otherwise, update the variant
          updatedProducts = [...prevState];
          updatedProducts[existingProductIndex] = {
            ...selectedProduct,
            categoryIndex: selectedProduct.categoryIndex,
            clickOrder: prevState[existingProductIndex].clickOrder,
            insideIndex: selectedProduct.insideIndex,
          };
        }
      } else {
        // If the product does not exist, add it
        updatedProducts = [
          ...prevState,
          {
            ...selectedProduct,
            categoryIndex: selectedProduct.categoryIndex,
            clickOrder: prevState.length + 1,
            insideIndex: selectedProduct.insideIndex,
          },
        ];
      }

      // Save to localStorage
      localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));

      return updatedProducts;
    });
  };


  const handleClearSelect = () => {
    setSelectedProducts([])
    localStorage.setItem("selectedProducts", JSON.stringify([]));
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
        const recoveredProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];
        const verifiedProducts = recoveredProducts.filter(product => data.some(p => p.id === product.id));
        setSelectedProducts(verifiedProducts);
      })
      .catch((error) => {
      });
  }, []);
  useEffect(() => {
    const savedBackgroundClass = localStorage.getItem("backgroundClass");
    setBackgroundClass(savedBackgroundClass || 'bg-image-1');
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
            backgroundClass={backgroundClass}
            handleBackgroundChange={handleBackgroundChange}
            selectedProducts={selectedProducts}
            products={products}
            handleClearSelect={handleClearSelect}
          />
          <ContainerC
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



