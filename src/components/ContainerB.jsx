// ContainerB.js
import React, { useEffect, useState } from "react";
import ProductLayer from "./ProductLayer";


const ContainerB = ({ 
  selectedProducts,products,handleClearSelect,
  screenshotDataUrl,handleDownload,productQuantities }) => {

  const [imageSrc, setImageSrc] = useState(null);
  const [bgcList, setBgclist] = useState(['b1.png','b2.png']);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const handleBackgroundChange = (direction) => {
    if (direction === 'pre') {
      setCurrentImageIndex((currentImageIndex - 1 + bgcList.length) % bgcList.length);
    } else if (direction === 'next') {
      setCurrentImageIndex((currentImageIndex + 1) % bgcList.length);
    }
  };

  useEffect(() => {
    if (bgcList[currentImageIndex].startsWith('blob:')) {
      setImageSrc(bgcList[currentImageIndex]);
    } else {
      import(`../images/${bgcList[currentImageIndex]}`)
      .then((image) => {
        setImageSrc(image.default);
      });
    }
  }, [bgcList, currentImageIndex]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBgclist((oldList) => [...oldList, url]);
      setCurrentImageIndex(bgcList.length);
    }
  };

  return (
      <article className="containerB">
        <section className="containerB-btn">
          <span className='clearBtn' onClick={handleClearSelect}>清空</span>
          <label htmlFor="upload-input" className="upload-btn1">上傳</label>
          <input id="upload-input" className="upload-btn2" type="file" accept="image/*" onChange={handleUpload}/>
          <span className="download-btn" onClick={handleDownload}></span>
        </section>
        
        <ul className='bgcChanger'>
          <li className="bgcChanger-btn" onClick={() => handleBackgroundChange('pre')}></li>
          <li className="bgcChanger-btn" onClick={() => handleBackgroundChange('next')}></li>
        </ul>
        <section className="displayIMG-container">
          <figure className="layer-bgc" style={{
              backgroundImage: `url(${imageSrc})`
            }}></figure>
          
          {
    [...selectedProducts]  // 使用展開運算符創建新的數組，避免直接修改selectedProducts
    .sort((a, b) => {
      if (a.categoryIndex !== b.categoryIndex) {
        return a.categoryIndex - b.categoryIndex;
      } else {
        return a.insideIndex - b.insideIndex;
      }
    })
    .map((selectedProduct) => {
        const product = products.find((p) => p.id === selectedProduct.id);
        const selectedVariant = product.variants[selectedProduct.selectedVariantIndex];
        // 获取商品数量
        const productQuantity = productQuantities[selectedProduct.id] || 1;
        
        // 创建一个数组来呈现多个商品层
        const productLayers = Array(productQuantity).fill().map((_, i) => (
          <ProductLayer
            key={`${selectedProduct.id}-${i}`} // 增加索引以避免重复的键
            product={{
              ...selectedVariant,
              categoryIndex: product.categoryIndex,
              categoryLayer:product.LayerSize,
              type: product.type,
            }}
            handleBackgroundChange={handleBackgroundChange}
          />
        ));

        return productLayers;
      })
  }

        </section>
        {/* {screenshotDataUrl && <img className="screenshot" src={screenshotDataUrl} alt="Screenshot" />} */}
      </article>

  );
};

export default ContainerB;
