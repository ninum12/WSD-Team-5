const PRODUCTS_LIST = [
  {
    id: 1,
    name: "자료구조",
    categories: ["교재", "공과", "소프트웨어학부"],
    price: "30,000",
    seller: "눈송이",
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
    categories: ["교재", "공과", "소프트웨어학부"],
    price: "35,000",
    seller: "눈송이",
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
    categories: ["교재", "공과", "소프트웨어학부"],
    price: "32,000",
    seller: "눈송이",
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
    categories: ["교재", "공과", "소프트웨어학부"],
    price: "25,000",
    seller: "눈송이",
    img: "./img/products/python.jpg",
    use: "often",
    damage: "no",
    description: "파이썬 기초입니다.",
    prefer: [""],
    inPerson: "yes",
    soldOut: false,
  },
  {
    id: 5,
    name: "베이비눈송이 키링",
    categories: ["학교 굿즈"],
    price: "4,000",
    seller: "눈송이",
    img: "./img/products/key-ring.jpg",
    use: "almost-new",
    damage: "no",
    description: "눈송이 아크릴 키링입니다.",
    prefer: ["locker"],
    inPerson: "no",
    soldOut: true,
  },
  {
    id: 6,
    name: "눈송이 그립톡",
    categories: ["학교 굿즈"],
    price: "5,000",
    seller: "눈결이",
    img: "./img/products/grip-talk.jpg",
    use: "almost-new",
    damage: "yes",
    description: "그립톡입니다. 스크래치 있습니다.",
    prefer: [""],
    inPerson: "yes",
    soldOut: false,
  },
  {
    id: 7,
    name: "눈송이 떡메모지",
    categories: ["무료 나눔"],
    price: "0",
    seller: "눈결이",
    img: "./img/products/rice-cake-memo.jpg",
    use: "new",
    damage: "no",
    description: "떡메모지 나눔합니다",
    prefer: [""],
    inPerson: "yes",
    soldOut: false,
  },
  {
    id: 8,
    name: "눈송이 스티커",
    categories: ["무료 나눔"],
    price: "0",
    seller: "눈결이",
    img: "./img/products/sticker.jpg",
    use: "new",
    damage: "no",
    description: "스티커 나눔합니다",
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

function initLocalProductList() {
  const existing = loadFromLocalStorage("productsList");
  if (!existing) {
    saveToLocalStorage("productsList", PRODUCTS_LIST);
  }
}
