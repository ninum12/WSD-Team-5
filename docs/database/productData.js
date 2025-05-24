const PRODUCTS_LIST = [
  {
    id: 1,
    name: "자료구조",
    categories: ["공과", "소프트웨어학부"],
    price: "30,000",
    seller: "송이",
    img: "./img/products/data-structure.jpg",
    use: "almost-new",
    damage: "no",
    description: "자료구조입니다.",
    prefer: ["locker", "in-person"],
    inPerson: "yes",
    soldOut: false,
  },
  {
    id: 2,
    name: "운영체제",
    categories: ["공과", "소프트웨어학부"],
    price: "35,000",
    seller: "송이",
    img: "./img/products/os.jpg",
    use: "new",
    damage: "no",
    description: "운영체제입니다.",
    prefer: ["locker"],
    inPerson: "no",
    soldOut: true,
  },
  {
    id: 3,
    name: "네트워크",
    categories: ["공과", "소프트웨어학부"],
    price: "32,000",
    seller: "송이",
    img: "./img/products/network.jpg",
    use: "often",
    damage: "yes",
    description: "네트워크입니다.",
    prefer: ["in-person"],
    inPerson: "yes",
    soldOut: false,
  },
  {
    id: 4,
    name: "파이썬",
    categories: ["공과", "소프트웨어학부"],
    price: "25,000",
    seller: "송이",
    img: "./img/products/python.jpg",
    use: "often",
    damage: "no",
    description: "파이썬 기초입니다.",
    prefer: [""],
    inPerson: "yes",
    soldOut: false,
  },
];

function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// ✅ 최초 1회만 초기화
function initLocalProductList() {
  const existing = loadFromLocalStorage("productsList");
  if (!existing) {
    saveToLocalStorage("productsList", PRODUCTS_LIST);
  }
}

// 페이지 로딩 시 호출
window.addEventListener("load", () => {
  initLocalProductList();

  const products = loadFromLocalStorage("productsList");
  if (products) renderProductList(products);
});
