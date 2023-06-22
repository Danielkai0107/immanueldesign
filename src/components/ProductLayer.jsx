//ProductLayer.js
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



    return (
      <Draggable bounds="parent" {...layerSize.axis}>
        <ul
          className={`layer-container layer-position ${layerSize.className}`}
          style={{ 
            width: layerSize.width,
            aspectRatio: layerSize.ratio,
            backgroundImage: `url(${imageSrc})`
          }}
        >
        </ul>
      </Draggable>
    );
}

export default ProductLayer
