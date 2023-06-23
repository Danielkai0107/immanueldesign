// ContainerB.js
import React, {  useEffect, useState } from "react";
import ProductLayer from "./ProductLayer";


const ContainerB = ({ 
  selectedProducts,setSelectedProducts,
  screenshotDataUrl,handleDownload }) => {

  const [imageSrc, setImageSrc] = useState(null);
  const [bgcList, setBgcList] = useState(['b1.png','b2.png']);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productPositions, setProductPositions] = useState({});

  // 在 useState 開頭添加

  //清除按鈕功能
  const handleClearSelect = () => {
    if (selectedProducts.length > 0) {
      setProductPositions({});
      setSelectedProducts([]);
      localStorage.setItem("selectedProducts", JSON.stringify([]));
    }
  };

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
      setBgcList((oldList) => [...oldList, url]);
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
          }}>
        </figure>
        {
  selectedProducts
    .sort((a, b) => {
      if (a.categoryIndex !== b.categoryIndex) {
        return a.categoryIndex - b.categoryIndex;
      } else {
        return a.insideIndex - b.insideIndex;
      }
    })
    .flatMap((selectedProduct) => {
      const productQuantity = selectedProduct.quantity || 1;

      return Array(productQuantity).fill().map((_, i) => (
        <ProductLayer
          key={`${selectedProduct.id}-${i}`} // 增加索引以避免重复的键
          product={{
            ...selectedProduct,
            categoryIndex: selectedProduct.categoryIndex,
            categoryLayer:selectedProduct.LayerSize,
          }}
          handleBackgroundChange={handleBackgroundChange}
          position={productPositions[`${selectedProduct.id}-${i}`]}
          onPositionChange={(newPosition) => {
          setProductPositions((prevPositions) => ({
            ...prevPositions,
            [`${selectedProduct.id}-${i}`]: newPosition,
          }));
  }}
        />
      ));
    })
}

        
      </section>
      {/* {screenshotDataUrl && <img className="screenshot" src={screenshotDataUrl} alt="Screenshot" />} */}
    </article>
  );
};

export default ContainerB;
