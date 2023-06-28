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
import { useSelector, useDispatch } from 'react-redux'
import { setProducts } from './redux/slice/productSlice';


function App() {

  //Redux
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  
  // State Hooks
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isDataReady, setIsDataReady] = useState(false);
  const [screenshotDataUrl, setScreenshotDataUrl] = useState(null);
  const [isNavbar, setIsNavbar] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState(JSON.parse(localStorage.getItem('selectedProducts')) || []);
  const totalSelected = selectedProducts.reduce(
    (acc, product) => acc + product.quantity,
    0
    );
  const totalPrice = selectedProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
    ).toLocaleString();
  // const [filterLevel, setFilterLevel] = useState("high"); 

  // Handler Functions
  const toggleProduct = (product) => {
    const existingProductIndex = selectedProducts.findIndex(p => 
      p.id === product.id &&
      p.pk === totalSelected &&
      p.name === product.name && 
      p.price === product.price && 
      p.categoryIndex === product.categoryIndex && 
      p.insideIndex === product.insideIndex && 
      p.LayerSize === product.LayerSize && 
      p.color === product.variants[product.selectedVariantIndex].color &&
      p.info === product.variants[product.selectedVariantIndex].info &&
      p.productImage === product.variants[product.selectedVariantIndex].productImage &&
      p.displayImage === product.variants[product.selectedVariantIndex].productImage
    );
    if (existingProductIndex !== -1) {
      // 商品已經存在，增加數量
      setSelectedProducts(prevProducts => {
        const newProducts = [...prevProducts];
        newProducts[existingProductIndex].quantity += 1;
        return newProducts;
      });
    } else {
      // 商品不存在，添加新商品
      setSelectedProducts(prevProducts => [...prevProducts, {
        id:product.id,
        pk:totalSelected,
        name: product.name,
        price: product.price,
        categoryIndex: product.categoryIndex,
        insideIndex: product.insideIndex,
        LayerSize: product.LayerSize,
        color: product.variants[product.selectedVariantIndex].color,
        info: product.variants[product.selectedVariantIndex].info,
        productImage: product.variants[product.selectedVariantIndex].productImage,
        displayImage: product.variants[product.selectedVariantIndex].productImage,
        quantity: 1
      }]);
    }
  };
  const handleDelete = (pk) => {
    setSelectedProducts(prevProducts => prevProducts.filter(product => product.pk !== pk));
};
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
        dispatch(setProducts(data))
        setFilteredProducts(data);
        const recoveredProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];
        const verifiedProducts = recoveredProducts.filter(product => data.some(p => p.id === product.id));
        setSelectedProducts(verifiedProducts);
        setIsDataReady(true); // 資料準備完成
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

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
        handleDelete={handleDelete}
      />} />
      <Route path="/About" element={<About />} />
      <Route path="/Cart" element={<Cart 
        selectedProducts={selectedProducts}
        totalSelected={totalSelected}
        totalPrice={totalPrice}
        setIsNavbar={setIsNavbar}
      />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </Router>
  )
}

export default App
