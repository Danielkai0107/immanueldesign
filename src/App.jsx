import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Main from './pages/Main';
import About from './pages/About';
import Navbar from './components/Navbar';
import Error from './pages/Error';
import Home from './pages/Home';
import Cart from './components/Cart';
import html2canvas from 'html2canvas';


function App() {

  // State Hooks
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isDataReady, setIsDataReady] = useState(false); // 追加資料準備狀態
  // const [filterLevel, setFilterLevel] = useState("high"); 
  const [screenshotDataUrl, setScreenshotDataUrl] = useState(null);
  const [isNavbar, setIsNavbar] = useState(0);

  const handleDownload = () => {
      const containerB = document.querySelector('.displayIMG-container');
    html2canvas(containerB).then(canvas => {
      const dataUrl = canvas.toDataURL();
      setScreenshotDataUrl(dataUrl);
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'screenshot.png';
      a.click();
    });
  };


  const handleScreenshot = () => {
    const containerB = document.querySelector('.displayIMG-container');
    html2canvas(containerB).then(canvas => {
    const dataUrl = canvas.toDataURL();
    setScreenshotDataUrl(dataUrl);
    console.log(dataUrl);
  });}
  

  // Handler Functions
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
  const getUniqueCategories = () => {
    return [...new Set(filteredProducts.map((product) => product.categoryName))];
  };
  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prevState) => {
      const updatedProducts = prevState.filter((product) => product.id !== productId);
      localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  // Effect Hooks

  useEffect(() => {
    fetch("/data.json")
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
        setIsDataReady(true); // 資料準備完成
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // useEffect(() => {
  //   const filterProducts = (level) => {
  //     if (level === "low") {
  //       return products.filter((product) => product.budgetLevel === "low");
  //     } else if (level === "medium") {
  //       return products.filter((product) => product.budgetLevel !== "high");
  //     } else {
  //       return products;
  //     }
  //   };
  //   setFilteredProducts(filterProducts(filterLevel));
  // }, [filterLevel, products]);
  
  

  return (
  <Router>
    <Navbar 
        totalSelected={totalSelected} 
        isNavbar={isNavbar} setIsNavbar={setIsNavbar} 
        handleScreenshot={handleScreenshot}
    />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Main" element={<Main 
        isDataReady={isDataReady}
        getUniqueCategories={getUniqueCategories}
        filteredProducts={filteredProducts}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        toggleProduct={toggleProduct}
        updateSelectedVariantIndex={updateSelectedVariantIndex}
        products={products}
        totalSelected={totalSelected}
        totalPrice={totalPrice}
        screenshotDataUrl={screenshotDataUrl}
        handleDownload={handleDownload}
        handleScreenshot={handleScreenshot}
        setScreenshotDataUrl={setScreenshotDataUrl}
      />} />
      <Route path="/About" element={<About />} />
      <Route path="/Cart" element={<Cart 
        selectedProducts={selectedProducts}
        totalSelected={totalSelected}
        totalPrice={totalPrice}
        handleRemoveProduct={handleRemoveProduct}
        setIsNavbar={setIsNavbar}
      />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </Router>
  )
}

export default App
