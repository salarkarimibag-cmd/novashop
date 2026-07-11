const products = [
  {
    id: 1,
    title: "Nike Air Max",
    price: 3500000,
    oldPrice: 4200000,

    category: "پوشاک",
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

    category: "موبایل",
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

  {
    id: 3,
    title: "Adidas Ultraboost",
    price: 4200000,
    oldPrice: 4800000,

    category: "پوشاک",
    brand: "Adidas",

    image: "/products/product1.jpg",

    images: ["/products/product1.jpg", "/products/product2.jpg"],

    rating: 4.9,
    reviews: 96,

    colors: ["#000000", "#ffffff"],

    sizes: [40, 41, 42, 43],

    description: "کفش رانینگ آدیداس با طراحی سبک و راحت برای استفاده روزمره.",

    specifications: {
      material: "Mesh",
      weight: "680g",
      country: "Indonesia",
    },

    bestSeller: true,
    isNew: false,
  },

  {
    id: 4,
    title: "Puma RS-X",
    price: 3300000,
    oldPrice: 3700000,

    category: "پوشاک",
    brand: "Puma",

    image: "/products/product2.jpg",

    images: ["/products/product2.jpg", "/products/product1.jpg"],

    rating: 4.5,
    reviews: 41,

    colors: ["#ffffff", "#2563eb"],

    sizes: [41, 42, 43, 44],

    description: "کفش اسپرت پوما مناسب استفاده روزانه.",

    specifications: {
      material: "Textile",
      weight: "720g",
      country: "Vietnam",
    },

    bestSeller: false,
    isNew: true,
  },

  {
    id: 5,
    title: "iPhone 16 Pro",
    price: 69000000,
    oldPrice: 72000000,

    category: "موبایل",
    brand: "Apple",

    image: "/products/product1.jpg",

    images: ["/products/product1.jpg", "/products/product2.jpg"],

    rating: 4.9,
    reviews: 128,

    colors: ["#000000", "#e5e7eb"],

    sizes: [],

    description: "آیفون ۱۶ پرو با پردازنده نسل جدید و دوربین حرفه‌ای.",

    specifications: {
      storage: "256GB",
      ram: "8GB",
      display: "6.3 inch",
    },

    bestSeller: true,
    isNew: true,
  },

  {
    id: 6,
    title: "Samsung Galaxy S25",
    price: 48000000,
    oldPrice: 51000000,

    category: "موبایل",
    brand: "Samsung",

    image: "/products/product2.jpg",

    images: ["/products/product2.jpg", "/products/product1.jpg"],

    rating: 4.8,
    reviews: 84,

    colors: ["#000000", "#2563eb"],

    sizes: [],

    description: "پرچمدار سامسونگ با نمایشگر AMOLED و دوربین قدرتمند.",

    specifications: {
      storage: "256GB",
      ram: "12GB",
      display: "6.8 inch",
    },

    bestSeller: false,
    isNew: true,
  },

  {
    id: 7,
    title: "Sony WH-1000XM5",
    price: 16500000,
    oldPrice: 18200000,

    category: "هدفون",
    brand: "Sony",

    image: "/products/product1.jpg",

    images: ["/products/product1.jpg", "/products/product2.jpg"],

    rating: 4.9,
    reviews: 73,

    colors: ["#000000", "#d1d5db"],

    sizes: [],

    description: "هدفون بی‌سیم با حذف نویز حرفه‌ای و کیفیت صدای عالی.",

    specifications: {
      battery: "30 Hours",
      bluetooth: "5.3",
      weight: "250g",
    },

    bestSeller: true,
    isNew: false,
  },
  {
    id: 8,
    title: "MacBook Air M4",
    price: 82000000,
    oldPrice: 86000000,

    category: "لپ تاپ",
    brand: "Apple",

    image: "/products/product2.jpg",

    images: ["/products/product2.jpg", "/products/product1.jpg"],

    rating: 4.9,
    reviews: 52,

    colors: ["#d1d5db", "#374151"],

    sizes: [],

    description:
      "مک‌بوک ایر M4 با طراحی باریک، پردازنده قدرتمند و عمر باتری بالا.",

    specifications: {
      cpu: "Apple M4",
      ram: "16GB",
      storage: "512GB SSD",
    },

    bestSeller: true,
    isNew: true,
  },

  {
    id: 9,
    title: "ASUS ROG Strix",
    price: 97000000,
    oldPrice: 102000000,

    category: "لپ تاپ",
    brand: "Asus",

    image: "/products/product1.jpg",

    images: ["/products/product1.jpg", "/products/product2.jpg"],

    rating: 4.8,
    reviews: 39,

    colors: ["#111827"],

    sizes: [],

    description: "لپ‌تاپ گیمینگ ایسوس با کارت گرافیک قدرتمند.",

    specifications: {
      cpu: "Core i9",
      ram: "32GB",
      storage: "1TB SSD",
    },

    bestSeller: false,
    isNew: true,
  },

  {
    id: 10,
    title: "Reebok Classic",
    price: 2900000,
    oldPrice: 3400000,

    category: "پوشاک",
    brand: "Reebok",

    image: "/products/product2.jpg",

    images: ["/products/product2.jpg", "/products/product1.jpg"],

    rating: 4.4,
    reviews: 25,

    colors: ["#ffffff", "#000000"],

    sizes: [40, 41, 42, 43],

    description: "کفش کلاسیک ریباک مناسب استفاده روزمره.",

    specifications: {
      material: "Leather",
      weight: "650g",
      country: "Vietnam",
    },

    bestSeller: false,
    isNew: false,
  },

  {
    id: 11,
    title: "New Balance 530",
    price: 3900000,
    oldPrice: 4500000,

    category: "پوشاک",
    brand: "New Balance",

    image: "/products/product1.jpg",

    images: ["/products/product1.jpg", "/products/product2.jpg"],

    rating: 4.7,
    reviews: 62,

    colors: ["#e5e7eb", "#6b7280"],

    sizes: [40, 41, 42, 43, 44],

    description: "کفش نیوبالانس مناسب پیاده‌روی و استفاده روزمره.",

    specifications: {
      material: "Mesh",
      weight: "670g",
      country: "Indonesia",
    },

    bestSeller: true,
    isNew: false,
  },

  {
    id: 12,
    title: "PlayStation 5",
    price: 42000000,
    oldPrice: 45000000,

    category: "گیم",
    brand: "Sony",

    image: "/products/product2.jpg",

    images: ["/products/product2.jpg", "/products/product1.jpg"],

    rating: 4.9,
    reviews: 103,

    colors: ["#ffffff"],

    sizes: [],

    description: "کنسول بازی پلی‌استیشن ۵ با قدرت پردازشی بالا.",

    specifications: {
      storage: "1TB",
      resolution: "4K",
      fps: "120",
    },

    bestSeller: true,
    isNew: false,
  },

  {
    id: 13,
    title: "Xbox Series X",
    price: 39000000,
    oldPrice: 41500000,

    category: "گیم",
    brand: "Microsoft",

    image: "/products/product1.jpg",

    images: ["/products/product1.jpg", "/products/product2.jpg"],

    rating: 4.8,
    reviews: 88,

    colors: ["#111827"],

    sizes: [],

    description: "کنسول Xbox Series X مناسب اجرای بازی‌های نسل جدید.",

    specifications: {
      storage: "1TB",
      resolution: "4K",
      fps: "120",
    },

    bestSeller: false,
    isNew: true,
  },

  {
    id: 14,
    title: "Philips Air Fryer",
    price: 9800000,
    oldPrice: 11200000,

    category: "خانه",
    brand: "Philips",

    image: "/products/product2.jpg",

    images: ["/products/product2.jpg", "/products/product1.jpg"],

    rating: 4.7,
    reviews: 44,

    colors: ["#000000"],

    sizes: [],

    description: "سرخ‌کن بدون روغن فیلیپس با ظرفیت بالا و مصرف انرژی کم.",

    specifications: {
      power: "2000W",
      capacity: "6L",
      warranty: "18 Months",
    },

    bestSeller: true,
    isNew: false,
  },

  {
    id: 15,
    title: "Samsung Buds 3 Pro",
    price: 8900000,
    oldPrice: 9600000,

    category: "هدفون",
    brand: "Samsung",

    image: "/products/product1.jpg",

    images: ["/products/product1.jpg", "/products/product2.jpg"],

    rating: 4.8,
    reviews: 59,

    colors: ["#ffffff", "#374151"],

    sizes: [],

    description: "هدفون بی‌سیم سامسونگ با حذف نویز فعال و کیفیت صدای عالی.",

    specifications: {
      battery: "32 Hours",
      bluetooth: "5.4",
      weight: "52g",
    },

    bestSeller: false,
    isNew: true,
  },
];

export default products;
