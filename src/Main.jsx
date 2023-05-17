// Main.js
import React, { useState,useEffect } from "react";    
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";


function Main() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterLevel, setFilterLevel] = useState("high");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [backgroundClass, setBackgroundClass] = useState('bg-image-1');
  const handleBackgroundChange = (newClass) => {
  setBackgroundClass(newClass);
  };

  useEffect(() => {
    fetch("/data.json") // 根据实际情况修改文件路径
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []);

  const toggleProduct = (selectedProduct) => {
  setSelectedProducts((prevState) => {
    const existingProductIndex = prevState.findIndex(
      (product) => product.id === selectedProduct.id
    );

    if (existingProductIndex > -1) {
      // Check if the selected variant is the same as the existing one
      if (
        prevState[existingProductIndex].selectedVariantIndex ===
        selectedProduct.selectedVariantIndex
      ) {
        // Remove the product from the array
        return prevState.filter(
          (product) => product.id !== selectedProduct.id
        );
      } else {
        // Update the existing product in the array
        const updatedProducts = [...prevState];
        updatedProducts[existingProductIndex] = {
          ...selectedProduct,
          categoryIndex: selectedProduct.categoryIndex,
          clickOrder: prevState[existingProductIndex].clickOrder,
        };
        return updatedProducts;
      }
    } else {
      // Add the new product to the array
      return [
        ...prevState,
        {
          ...selectedProduct,
          categoryIndex: selectedProduct.categoryIndex,
          clickOrder: prevState.length + 1,
        },
      ];
    }
  });
};

  const handleClearSelect=()=>{
    setSelectedProducts([])
  }

  const totalPrice = selectedProducts.reduce(
      (acc, product) => acc + products.find((p) => p.id === product.id).price,
      0
    ).toLocaleString();

  const ProductLayer = ({ product }) => {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
      import(`./images/${product.displayImage}`)
        .then((image) => {
          setImageSrc(image.default);
        });
    }, [product.displayImage, product]);

    return (
      <div className="product-layer">
        {imageSrc && <img src={imageSrc} alt="selected product" className="product-image" />}
      </div>
    );
  };
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
    return [...new Set(products.map((product) => product.categoryName))];
  };  

  useEffect(() => {
    const filterProducts = (level) => {
      if (level === "low") {
        return products.filter((product) => product.budgetLevel === "low");
      } else if (level === "medium") {
        return products.filter((product) => product.budgetLevel !== "high");
      } else {
        return products;
      }
    };
    setFilteredProducts(filterProducts(filterLevel));
  }, [filterLevel, products]);

  return (
    <article className="outside">
    <Navbar/>
    <main className="Main">
      <section className="containerA">
        <Filter onFilterChange={(level) => setFilterLevel(level)} />
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
      <ul className="containerR">
        <li className="containerB">
          <div className={`layer-bgc ${backgroundClass}`}></div>
          {
            selectedProducts
              .sort((a, b) => {
                if (a.categoryIndex !== b.categoryIndex) {
                  return a.categoryIndex - b.categoryIndex;
                } else {
                  return a.clickOrder - b.clickOrder;
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
                      type: product.type,
                    }}
                  />
                );
              })
          }
      </li>
      <li className="containerC">
        <section>
          <button onClick={() => handleBackgroundChange('bg-image-1')}>背景1</button>
          <button onClick={() => handleBackgroundChange('bg-image-2')}>背景2</button>
          <button onClick={handleClearSelect}>清空</button>
          </section>
        <div className="total-price">總價: {totalPrice}</div>
        <button>我要訂購，聯絡我們</button>
      </li>
      </ul>
      
    </main></article>
    
  );
}

export default Main;
