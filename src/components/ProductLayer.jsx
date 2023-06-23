import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable';
import { layerMenu } from '../constants/layerMenu';

function ProductLayer({product,position, onPositionChange}) {
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

  const handleStop = (e, data) => {
    onPositionChange({ x: data.x, y: data.y });
  };

  return (
    <Draggable 
      bounds="parent" 
      {...layerSize.axis}
      position={position}
      onStop={handleStop}  // 在拖拽结束时调用 handleMoveToFront 函数
    >
      <ul
        className={`layer-container layer-position ${layerSize.className}`}
        style={{ 
          width: layerSize.width,
          aspectRatio: layerSize.ratio,
          backgroundImage: `url(${imageSrc})`
        }} // 在点击时调用 handleMoveToFront 函数
      >
      </ul>
    </Draggable>
  );
}

export default ProductLayer;
