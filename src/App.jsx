//App.js最外層
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
  const [productQuantities, setProductQuantities] = useState({});


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
        // 如果商品已存在并且variant相同，我们将不做任何操作
        if (prevState[existingProductIndex].selectedVariantIndex === selectedProduct.selectedVariantIndex) {
          updatedProducts = [...prevState];
        } else {
          // 否则，更新variant
          updatedProducts = [...prevState];
          updatedProducts[existingProductIndex] = {
            ...selectedProduct,
            categoryIndex: selectedProduct.categoryIndex,
            clickOrder: prevState[existingProductIndex].clickOrder,
            insideIndex: selectedProduct.insideIndex,
          };
        }
      } else {
        // 如果商品不存在，添加它，并将其数量设为1
        updatedProducts = [
          ...prevState,
          {
            ...selectedProduct,
            categoryIndex: selectedProduct.categoryIndex,
            clickOrder: prevState.length + 1,
            insideIndex: selectedProduct.insideIndex,
          },
        ];
        setProductQuantities((prevState) => ({
          ...prevState,
          [selectedProduct.id]: 1
        }));
      }
  
      // 保存到localStorage
      localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
  
      return updatedProducts;
    });
  };
  
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
  
        const recoveredQuantities = JSON.parse(localStorage.getItem("productQuantities")) || {};
        setProductQuantities(recoveredQuantities);
  
        setIsDataReady(true); // 資料準備完成
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  const changeProductCount = (productId, amount) => {
    setProductQuantities((prevState) => {
      const prevQuantity = prevState[productId] || 0;
      const newQuantity = prevQuantity + amount;
  
      if (newQuantity < 0 || (newQuantity === 0 && amount < 0)) {
        // 如果数量小于0或者数量为0且尝试减少，移除商品并将其数量设为0
        handleRemoveProduct(productId);
        const updatedQuantities = { ...prevState, [productId]: 0 };
  
        // 保存到localStorage
        localStorage.setItem("productQuantities", JSON.stringify(updatedQuantities));
  
        return updatedQuantities;
      }
  
      const updatedQuantities = { ...prevState, [productId]: newQuantity };
  
      // 保存到localStorage
      localStorage.setItem("productQuantities", JSON.stringify(updatedQuantities));
  
      return updatedQuantities;
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
        productQuantities={productQuantities}
        changeProductCount={changeProductCount}
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
