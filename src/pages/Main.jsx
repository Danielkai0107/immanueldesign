// Main.js
import React, { useState, useEffect} from "react";
import ProductList from '../components/ProductList'
import { bgc } from "../content/bgc";
import Cart from "../components/Cart";

const ContainerB = React.lazy(() => import('../components/ContainerB'));
const ContainerC = React.lazy(() => import('../components/ContainerC'));



function Main() {
  // State Hooks
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  // const [filterLevel, setFilterLevel] = useState("high"); 
  const [backgroundClass, setBackgroundClass] = useState('bg-image-1');
  const [bgcIndex, setBgcIndex] = useState(0);
  const [isDataReady, setIsDataReady] = useState(false); // 追加資料準備狀態
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isCart, setIsCart] = useState(false);

  // Handler Functions
  const handleCartExpand=()=>{setIsCart(!isCart)}
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
    if (selectedProducts.length > 0) {
      setSelectedProducts([]);
      localStorage.setItem("selectedProducts", JSON.stringify([]));
    }
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
  
  // const handleRemoveProduct = (productId) => {
  //   setSelectedProducts((prevState) => {
  //     const updatedProducts = prevState.filter((product) => product.id !== productId);
  //     localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
  //     return updatedProducts;
  //   });
  // };

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

  useEffect(() => {
    const newClass = bgc[bgcIndex];
    setBackgroundClass(newClass);
    localStorage.setItem("backgroundClass", newClass);
  }, [bgcIndex]);

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

  useEffect(() => {
    const checkScrollTop = () => {
      if (!isButtonVisible && window.pageYOffset > 0) {
        setIsButtonVisible(true);
      } else if (isButtonVisible && window.pageYOffset <= 0) {
        setIsButtonVisible(false);
      }
    };
    
    window.addEventListener('scroll', checkScrollTop);
    
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [isButtonVisible]);
  

  return (
    isDataReady ? (
    <main> 
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
        />
      </React.Suspense>
      <React.Suspense fallback={<div className="loading-overlay"><span></span></div>}>
        <ContainerC
          totalSelected={totalSelected}
          totalPrice={totalPrice}
          selectedProducts={selectedProducts}
          handleCartExpand={handleCartExpand}
        />
        </React.Suspense>
      </aside>
      {isButtonVisible && <section className="to-the-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><span></span>
      </section>}
      {isCart && <Cart selectedProducts={selectedProducts} 
          handleCartExpand={handleCartExpand} />}
    </main>
    ):( 
    <div className="loading-overlay"><span></span></div>
    )
    
  );
}

export default Main;
