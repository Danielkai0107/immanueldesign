// ContainerB.js
import React from "react";
import ProductLayer from "./ProductLayer";

const ContainerB = ({ 
  selectedProducts,products,backgroundClass,
  handleClearSelect, handleBackgroundChange,
  screenshotDataUrl,handleDownload }) => {
  
    

  return (
    <article className="containerB">
      
      <section className="containerB-btn">
        <span className='clearBtn' onClick={handleClearSelect}>清空</span>
        <span className="download-btn" onClick={handleDownload}></span>
      </section>
      
      <ul className='bgcChanger'>
        <li className="bgcChanger-btn" onClick={() => handleBackgroundChange('pre')}></li>
        <li className="bgcChanger-btn" onClick={() => handleBackgroundChange('next')}></li>
      </ul>
      <section className="displayIMG-container">
        <figure className={`layer-bgc ${backgroundClass}`}></figure>
        
        {
          selectedProducts
            .sort((a, b) => {
              if (a.categoryIndex !== b.categoryIndex) {
                return a.categoryIndex - b.categoryIndex;
              } else {
                return a.insideIndex - b.insideIndex; // change this line
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
                    categoryLayer:product.LayerSize,
                    type: product.type,
                  }}
                  handleBackgroundChange={handleBackgroundChange}
                />
              );
            })

        }
      </section>
      {/* {screenshotDataUrl && <img className="screenshot" src={screenshotDataUrl} alt="Screenshot" />} */}
    </article>
  );
};

export default ContainerB;
