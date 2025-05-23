function renderWishlist() {
  const container = document.getElementById("wishlistContainer");
  const count = document.getElementById("totalCount");
  container.innerHTML = "";

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  count.textContent = wishlist.length;

  wishlist.forEach((entry, index) => {
    // entry가 객체면 id를 추출하고, 아니면 그대로 사용
    const productId = typeof entry === "object" ? entry.id : entry;
    const item = PRODUCTS_LIST.find((product) => product.id == productId);
    if (!item) return;

    const product = document.createElement("div");
    product.className = "product-card";

    product.innerHTML = `
      <div class="product-img-container" style="background-image: url('${item.img}')">
        ${item.soldOut ? '<div class="sold-out">판매완료</div>' : ""}
        <button class="like-btn" onclick="removeFromWishlist(${index})"></button>
      </div>
      <div class="product-text-container">
        <div class="product-name">${item.name}</div>
        <div class="product-price">${item.price}</div>
        <div class="product-seller">${item.seller}</div>
      </div>
    `;

    container.appendChild(product);
  });

  if (wishlist.length === 0) {
    container.innerHTML = `<p class="empty-message">찜한 상품이 없습니다.</p>`;
  }
}

function removeFromWishlist(index) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist();
}

document.addEventListener("DOMContentLoaded", renderWishlist);
