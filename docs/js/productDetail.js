function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}

function renderProductDetail(product) {
  const container = document.getElementById("product-detail-container");

  container.innerHTML = `
    <div class="product-detail">
      <div class="image-section">
        <img src="${product.img}" alt="${product.name}" />
        ${product.soldOut ? '<div class="sold-out">판매완료</div>' : ""}
      </div>
      <div class="info-section">
        <h2>${product.name}</h2>
        <div class="price">${product.price}원</div>
        <div class="detail">
          <div>카테고리: ${product.categories.join(" / ")}</div>
          <div>사용 횟수: ${
            product.use === "new"
              ? "없음"
              : product.use === "almost-new"
              ? "1~2회"
              : "3회 이상"
          }</div>
          <div>손상 여부: ${product.damage === "no" ? "없음" : "있음"}</div>
          <div>거래 방법: ${
            product.inPerson === "yes" ? "직거래" : "사물함"
          }</div>
          <p class="description">${product.description}</p>
        </div>
        <div><button id="buyButton">구매하기</button></div>
        <button id="likeButton">찜</button>
        <button onclick="goToChatting(${product.id})">채팅</button>
      </div>
    </div>
  `;

  const likeBtn = document.getElementById("likeButton");
  likeBtn.addEventListener("click", () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyAdded = wishlist.some((entry) =>
      typeof entry === "object" ? entry.id === product.id : entry === product.id
    );
    if (!alreadyAdded) {
      wishlist.push(product.id);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("찜 목록에 추가되었습니다!");
    } else {
      alert("이미 찜한 상품입니다.");
    }
  });

  const buyButton = document.getElementById("buyButton");
  buyButton.addEventListener("click", () => {
    const params = new URLSearchParams({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
    });
    window.location.href = `./order.html?${params.toString()}`;
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const productId = getProductIdFromURL();
  const product = loadFromLocalStorage("productsList").find(
    (p) => p.id === productId
  );
  if (product) {
    renderProductDetail(product);
  }
});

function getRandomProducts(products, count = 6) {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function renderProductList() {
  const container = document.getElementById("productList");
  const products = loadFromLocalStorage("productsList") || PRODUCTS_LIST;
  const randomProducts = getRandomProducts(products, 6);

  container.innerHTML = "";

  randomProducts.forEach((product) => {
    const item = document.createElement("div");
    item.className = "product-card";
    item.dataset.id = product.id;

    const soldOutTag = product.soldOut
      ? '<div class="sold-out">판매완료</div>'
      : "";

    item.innerHTML = `
    <div class="product-img-container" style="background-image: url('${product.img}');">
      ${soldOutTag}
      <button class="like-btn"></button>
    </div>
    <div class="product-text-container">
      <div class="product-name">${product.name}</div>
      <div class="product-price">${product.price}원</div>
      <div class="product-seller">${product.seller}</div>
    </div>
  `;

    item.addEventListener("click", (event) => {
      if (event.target.closest(".like-btn")) {
        event.stopPropagation();
        return;
      }
      window.location.href = `./product.html?id=${id}`;
    });
    container.appendChild(item);
  });
}

initLocalProductList();
renderProductList();
applyWishList();
bindFavoriteEvents();

function goToChatting(productId) {
  const product = PRODUCTS_LIST.find((p) => p.id === productId);
  const params = new URLSearchParams({
    id: product.id,
    name: product.name,
    price: product.price,
    seller: product.seller,
    img: product.img,
  });
  location.href = `chatting.html?${params.toString()}`;
}
