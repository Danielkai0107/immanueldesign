// data.js

export const products = [
  {
    id: 1,
    name:"大背板",
    price: 5000,
    size: "H200 W400",
    categoryName: "Main 主背景",
    categoryIndex: 1, 
    budgetLevel: "low",
    selectedVariantIndex: 0,
    variants: [
    {
      color: "#A6A28F",
      productImage: () => import("../images/p2.png"),
      displayImage: () => import("../images/後格.png"),
    },
    {
      color: "#A6A28F",
      productImage: () => import("../images/p1.png"),
      displayImage: () => import("../images/後格2.png"),
    },
  ],
  },
]
