const FAVORITES_KEY = "favorites";

const wishlistItems = [
  {
    id: "1",
    title: "자료구조",
    price: 30000,
    seller: "송이",
    soldOut: false,
    image: "./img/products/data-structure.jpg"
  },
  {
    id: "2",
    title: "운영체제",
    price: 35000,
    seller: "송이",
    soldOut: true,
    image: "./img/products/data-structure.jpg"
  },
    {
    id: "3",
    title: "머신러닝",
    price: 25000,
    seller: "송이",
    soldOut: false,
    image: "./img/products/data-structure.jpg"
  },
    {
    id: "4",
    title: "소프트웨어의 이해",
    price: 22000,
    seller: "송이",
    soldOut: false,
    image: "./img/products/data-structure.jpg"
  }
];

if (!localStorage.getItem(FAVORITES_KEY)) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(["1", "2", "3", "4", "5"]));
}

function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

function setFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function setHeartIcon(button, liked) {
  const path = liked
    ? "./img/icon/heart-fill.svg"
    : "./img/icon/heart-empty.svg";
  button.style.backgroundImage = `url('${path}')`;
  button.style.backgroundRepeat = "no-repeat";
  button.style.backgroundPosition = "center";
  button.style.backgroundSize = "24px 24px";
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const idx = favorites.indexOf(id);
  if (idx === -1) favorites.push(id);
  else favorites.splice(idx, 1);
  setFavorites(favorites);
  renderItems();
}

function renderItems() {
  const wrap = document.getElementById("wishlistContainer");
  const total = document.getElementById("totalCount");
  const favorites = getFavorites();

  wrap.innerHTML = "";
  const filtered = wishlistItems.filter((item) => favorites.includes(item.id));
  total.textContent = filtered.length;

  if (filtered.length === 0) {
    wrap.innerHTML = `<p style="font-size:14px;color:#666;">찜한 상품이 없습니다.</p>`;
    return;
  }

  filtered.forEach((item) => {
    const card = document.createElement("div");
    card.className = "product-container";

    const img = document.createElement("div");
    img.className = "product-img-container";
    img.style.backgroundImage = `url('${item.image}')`;

    if (item.soldOut) {
      const badge = document.createElement("div");
      badge.className = "sold-out";
      badge.textContent = "판매완료";
      img.appendChild(badge);
    }

    const btn = document.createElement("button");
    btn.className = "like-btn";
    setHeartIcon(btn, true);
    btn.onclick = () => toggleFavorite(item.id);
    img.appendChild(btn);

    const textBox = document.createElement("div");
    textBox.className = "product-text-container";

    const name = document.createElement("div");
    name.className = "product-name";
    name.textContent = item.title;

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = item.price.toLocaleString() + "원";

    const seller = document.createElement("div");
    seller.className = "product-seller";
    seller.textContent = item.seller;

    textBox.append(name, price, seller);
    card.append(img, textBox);
    wrap.appendChild(card);
  });
}

renderItems();
