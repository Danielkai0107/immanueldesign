// Main.js
import React, { useEffect, useState } from "react";
import ProductList from '../components/ProductList'
import { bgc } from "../constants/bgc";
import ShowMsg from "../components/ShowMsg";

const ContainerB = React.lazy(() => import('../components/ContainerB'));
const ContainerC = React.lazy(() => import('../components/ContainerC'));



function Main({
  isDataReady,getUniqueCategories,filteredProducts,
  selectedProducts,toggleProduct,updateSelectedVariantIndex,
  products,totalSelected,totalPrice,setSelectedProducts,
  screenshotDataUrl,handleScreenshot,handleDownload
}) {
  
  //換背景功能
  const [bgcIndex, setBgcIndex] = useState(0);
  const [backgroundClass, setBackgroundClass] = useState('bg-image-1');
  const handleBackgroundChange = (direction) => { // 更新此函数
    let newIndex = direction === 'next' ? bgcIndex + 1 : bgcIndex - 1;
    // 轮回到数组的另一端
    if(newIndex < 0) {
      newIndex = bgc.length - 1;
    } else if (newIndex >= bgc.length) {
      newIndex = 0;
    }
    setBgcIndex(newIndex);
    const newClass = bgc[newIndex];
    setBackgroundClass(newClass);
    localStorage.setItem("backgroundClass", newClass);
  };
  useEffect(() => {
    const newClass = bgc[bgcIndex];
    setBackgroundClass(newClass);
    localStorage.setItem("backgroundClass", newClass);
  }, [bgcIndex]);

  //置頂按鈕功能
  const [isTopButton, setIsTopButton] = useState(false);
  useEffect(() => {
    const checkScrollTop = () => {
      if (!isTopButton && window.pageYOffset > 0) {
        setIsTopButton(true);
      } else if (isTopButton && window.pageYOffset <= 0) {
        setIsTopButton(false);
      }
    };
    
    window.addEventListener('scroll', checkScrollTop);
    
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [isTopButton]);

  //清除按鈕功能
  const handleClearSelect = () => {
    if (selectedProducts.length > 0) {
      setSelectedProducts([]);
      localStorage.setItem("selectedProducts", JSON.stringify([]));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    isDataReady ? (
    <main> 
      <ShowMsg totalPrice={totalPrice} selectedProducts={selectedProducts}/>
      <section className="containerA" >
        {getUniqueCategories().map((category) => (
          <ProductList
            key={category}
            categoryName={category}
            products={filteredProducts.filter(
              (product) => product.categoryName === category
            )}
            selectedProducts={selectedProducts}
            toggleProduct={toggleProduct}
            updateSelectedVariantIndex={updateSelectedVariantIndex}
          />
        ))}
      </section>
      <aside className="container-for-BC">
      <React.Suspense fallback={<div className="loading-overlay"><span></span></div>}>
        <ContainerB
          backgroundClass={backgroundClass}
          handleBackgroundChange={handleBackgroundChange}
          selectedProducts={selectedProducts}
          products={products}
          handleClearSelect={handleClearSelect}
          screenshotDataUrl={screenshotDataUrl}
          handleDownload={handleDownload}
        />
      </React.Suspense>
      <React.Suspense fallback={<div className="loading-overlay"><span></span></div>}>
        <ContainerC
          totalSelected={totalSelected}
          totalPrice={totalPrice}
          selectedProducts={selectedProducts}
          handleScreenshot={handleScreenshot}
        />
        </React.Suspense>
      </aside>
      {isTopButton && <section className="to-the-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><span></span>
      </section>}
      
    </main>
    ):( 
    <div className="loading-overlay"><span></span></div>
    )
    
  );
}

export default Main;
