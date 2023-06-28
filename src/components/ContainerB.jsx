// ContainerB.js
import React, {  useEffect, useState } from "react";
import ProductLayer from "./ProductLayer";


const ContainerB = ({ 
  selectedProducts,setSelectedProducts,
  screenshotDataUrl,handleDownload,handleDelete }) => {

  const [imageSrc, setImageSrc] = useState(null);
  const [bgcList, setBgcList] = useState(['b1.png','b2.png']);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productPositions, setProductPositions] = useState({});
  const [isSelectedId, setIsSelectedId] = useState(null);
  // const [scale, setScale] = useState(false);

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

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBgcList((oldList) => [...oldList, url]);
      setCurrentImageIndex(bgcList.length);
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

  useEffect(() => {
    // 當點擊頁面的任何地方時，檢查該元素是否為 ProductLayer 或其子元件
    const handlePageClick = (event) => {
      if (!event.target.closest(".layer-container")) {
        // 如果該元素不是 ProductLayer 或其子元件，則將 isSelectedId 設為 null
        setIsSelectedId(null);
      }
    };
  
    // 添加事件監聽器
    document.addEventListener("click", handlePageClick);
  
    // 在 useEffect 清理函數中移除事件監聽器
    return () => {
      document.removeEventListener("click", handlePageClick);
    };
  }, []);  // 空依賴數組表示此 useEffect 僅在組件掛載和卸載時運行
  

  return (
    <article className="containerB">
      {/* <span className="scale-btn" onClick={()=>setScale(!scale)} onTouchStart={()=>setScale(!scale)}></span> */}
      <section className="containerB-btn">
        <span className='clearBtn' onClick={handleClearSelect} onTouchStart={handleClearSelect}>清空</span>
        <label htmlFor="upload-input" className="upload-btn1">上傳</label>
        <input id="upload-input" className="upload-btn2" type="file" accept="image/*" onChange={handleUpload}/>
        <span className="download-btn" onClick={handleDownload} onTouchStart={handleDownload}></span>
      </section>
      <span className="bgcChanger-btn1" 
      onClick={() => handleBackgroundChange('pre')}
      ></span>
      <span className="bgcChanger-btn2" 
      onClick={() => handleBackgroundChange('next')}
      ></span>
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
                  key={selectedProduct.pk} // 增加索引以避免重复的键
                  product={{
                    ...selectedProduct,
                    categoryIndex: selectedProduct.categoryIndex,
                    categoryLayer:selectedProduct.LayerSize,
                  }}
                  handleBackgroundChange={handleBackgroundChange}
                  position={productPositions[selectedProduct.pk]}
                  onPositionChange={(newPosition) => {
                  setProductPositions((prevPositions) => ({
                    ...prevPositions,
                    [selectedProduct.pk]: newPosition,
                  }));
                  }}
                  handleDelete={handleDelete}
                  setIsSelectedId={setIsSelectedId}
                  selected={isSelectedId === selectedProduct.pk}
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
