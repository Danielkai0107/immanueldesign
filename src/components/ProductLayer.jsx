import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable';
import { layerMenu } from '../constants/layerMenu';

function ProductLayer({product}) {
  const [imageSrc, setImageSrc] = useState(null);

  const layerSize = layerMenu.find(item => item.id === product.categoryLayer)

  useEffect(() => {
    if(product.displayImage) {
      import(`../images/${product.displayImage}`)
      .then((image) => {
        setImageSrc(image.default);
      });
    }
    
  }, [product.displayImage, product]);



    // <figure className="product-layer">
    //   {imageSrc && <img src={imageSrc} alt="selected product" className="product-image" />}
    // </figure>

    return (
      <Draggable bounds="parent" {...layerSize.axis}>
        <ul
          className={`layer-container ${layerSize.className}`}
          style={{ 
            width: layerSize.width,
            height: layerSize.height,
            backgroundColor: product.color, 
            backgroundImage: `url(${imageSrc})`
          }}
        >
        </ul>
      </Draggable>
    );
}

export default ProductLayer
