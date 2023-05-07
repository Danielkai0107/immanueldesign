// data.js
export const products = [
  {
    id: 1,
    price: 100,
    size: "M",
    zIndex: 1,
    type: "background",
    categoryName: "背景",
    selectedVariantIndex: 0,
    variants: [
      {
        color: "#ff0000",
        imageModule: () => import("../images/222.png"),
      },
    ],
  },
  {
    id: 2,
    imageModule: () => import("../images/222.png"),
    price: 300,
    size: "M",
    zIndex: 1,
    type: "prop",
    categoryName: "道具",
    selectedVariantIndex: 0,
    variants: [
      {
        color: "#ff0000",
        imageModule: () => import("../images/333.png"),
      },
      {
        color: "#00ff00",
        imageModule: () => import("../images/111.png"),
      },
    ],
  },
  {
    id: 3,
    price: 100,
    size: "M",
    zIndex: 1,
    type: "background",
    categoryName: "背景",
    selectedVariantIndex: 0,
    variants: [
      {
        color: "#ff0000",
        imageModule: () => import("../images/222.png"),
      },
      {
        color: "#00ff00",
        imageModule: () => import("../images/333.png"),
      },
    ],
  },{
    id: 4,
    price: 100,
    size: "M",
    zIndex: 1,
    type: "background",
    categoryName: "背景",
    selectedVariantIndex: 0,
    variants: [
      {
        color: "#ff0000",
        imageModule: () => import("../images/222.png"),
      },
      {
        color: "#00ff00",
        imageModule: () => import("../images/333.png"),
      },
    ],
  },{
    id: 5,
    price: 100,
    size: "M",
    zIndex: 1,
    type: "background",
    categoryName: "背景",
    selectedVariantIndex: 0,
    variants: [
      {
        color: "#ff0000",
        imageModule: () => import("../images/222.png"),
      },
      {
        color: "#00ff00",
        imageModule: () => import("../images/333.png"),
      },
    ],
  },{
    id: 6,
    price: 100,
    size: "M",
    zIndex: 1,
    type: "background",
    categoryName: "背景",
    selectedVariantIndex: 0,
    variants: [
      {
        color: "#ff0000",
        imageModule: () => import("../images/222.png"),
      },
      {
        color: "#00ff00",
        imageModule: () => import("../images/333.png"),
      },
    ],
  },
];
