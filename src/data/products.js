const products = [
  {
    id: 1,
    title: "Nike Air Max",
    price: 3500000,
    oldPrice: 4200000,

    category: "Shoes",
    brand: "Nike",

    image: "/products/product1.jpg",

    images: [
      "/products/product1.jpg",
      "/products/product2.jpg",
      "/products/product1.jpg",
    ],

    rating: 4.8,
    reviews: 58,

    colors: ["#000000", "#ffffff", "#ef4444"],

    sizes: [40, 41, 42, 43, 44],

    description:
      "کفش Nike Air Max با طراحی مدرن، رویه تنفس‌پذیر و کفی نرم، مناسب استفاده روزمره و فعالیت‌های ورزشی است.",

    specifications: {
      material: "Leather",
      weight: "700g",
      country: "Vietnam",
    },

    bestSeller: true,
    isNew: true,
  },

  {
    id: 2,
    title: "Smart Watch",
    price: 1800000,
    oldPrice: 2100000,

    category: "Electronics",
    brand: "Apple",

    image: "/products/product2.jpg",

    images: ["/products/product2.jpg", "/products/product1.jpg"],

    rating: 4.6,
    reviews: 31,

    colors: ["#000000", "#3b82f6"],

    sizes: [],

    description:
      "ساعت هوشمند با نمایشگر AMOLED، پایش سلامتی و عمر باتری طولانی.",

    specifications: {
      display: "AMOLED",
      battery: "7 Days",
      bluetooth: "5.3",
    },

    bestSeller: false,
    isNew: true,
  },
];

export default products;
