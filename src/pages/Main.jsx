// Main.js
import React, { useEffect, useState } from "react";
import ProductList from '../components/ProductList'
import ShowMsg from "../components/ShowMsg";
import html2canvas from "html2canvas";

const ContainerB = React.lazy(() => import('../components/ContainerB'));
const ContainerC = React.lazy(() => import('../components/ContainerC'));



function Main({
  isDataReady,getUniqueCategories,filteredProducts,
  selectedProducts,toggleProduct,updateSelectedVariantIndex,
  products,totalSelected,totalPrice,setSelectedProducts,
  screenshotDataUrl,handleScreenshot,handleDownload,setScreenshotDataUrl,productQuantities,changeProductCount
}) {
  
  

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

  useEffect(() => {
    return () => {
      const containerB = document.querySelector('.displayIMG-container');
      if (containerB) {
        html2canvas(containerB).then(canvas => {
          const dataUrl = canvas.toDataURL();
          setScreenshotDataUrl(dataUrl);
          console.log(dataUrl);
        });
      }
    };
  }, [setScreenshotDataUrl]);

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
            productQuantities={productQuantities}
            changeProductCount={changeProductCount}
          />
        ))}
      </section>
      <aside className="container-for-BC">
      <React.Suspense fallback={<div className="loading-overlay"><span></span></div>}>
        <ContainerB
          selectedProducts={selectedProducts}
          products={products}
          handleClearSelect={handleClearSelect}
          screenshotDataUrl={screenshotDataUrl}
          handleDownload={handleDownload}
          productQuantities={productQuantities}
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
