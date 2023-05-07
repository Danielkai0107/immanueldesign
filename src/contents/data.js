// data.js
export const products = [
  {
    id: 1,
    price: 5000,
    size: "M",
    zIndex: 1,
    type: "background",
    categoryName: "Main 主背景",
    selectedVariantIndex: 0,
      variants: [
      {
        color: "#A6A28F",
        imageModule: () => import("../images/333.png"),
      },
      {
        color: "#D9C2AD",
        imageModule: () => import("../images/111.png"),
      },
    ],
  },
  {
    id: 2,
    imageModule: () => import("../images/222.png"),
    price: 3000,
    size: "M",
    zIndex: 1,
    type: "prop",
    categoryName: "道具",
    selectedVariantIndex: 0,
    variants: [
      {
        color: "#D9C2AD",
        imageModule: () => import("../images/333.png"),
      },
      {
        color: "#A67E6F",
        imageModule: () => import("../images/111.png"),
      },
    ],
  },
  {
    id: 3,
    price: 1500,
    size: "M",
    zIndex: 1,
    type: "background",
    categoryName: "背景",
    selectedVariantIndex: 0,
    variants: [
      {
        color: "#71736A",
        imageModule: () => import("../images/222.png"),
      },
      {
        color: "#A6A28F",
        imageModule: () => import("../images/333.png"),
      },
    ],
  },{
    id: 4,
    price: 1060,
    size: "M",
    zIndex: 1,
    type: "background",
    categoryName: "背景",
    selectedVariantIndex: 0,
    variants: [
      {
        color: "#A6A28F",
        imageModule: () => import("../images/222.png"),
      },
      {
        color: "#D9C2AD",
        imageModule: () => import("../images/333.png"),
      },
    ],
  },{
    id: 5,
    price: 1800,
    size: "M",
    zIndex: 1,
    type: "background",
    categoryName: "背景",
    selectedVariantIndex: 0,
    variants: [
      {
        color: "#D9C2AD",
        imageModule: () => import("../images/222.png"),
      },
      {
        color: "#A67E6F",
        imageModule: () => import("../images/333.png"),
      },
    ],
  },{
    id: 6,
    price: 1900,
    size: "M",
    zIndex: 1,
    type: "background",
    categoryName: "背景",
    selectedVariantIndex: 0,
    variants: [
      {
        color: "#71736A",
        imageModule: () => import("../images/222.png"),
      },
      {
        color: "#A67E6F",
        imageModule: () => import("../images/333.png"),
      },
    ],
  },
];
