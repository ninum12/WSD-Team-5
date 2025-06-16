function getNicknameFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("nickname");
}

const nickname = getNicknameFromURL();
if (nickname) {
  document.querySelector(".nickname").textContent = nickname;
  document.querySelector(".id").textContent = `${
    defaultUsers.find((u) => u.name === nickname).id
  }`;

  const productListContainer = document.querySelector(".product-list");
  const allProducts = loadFromLocalStorage("productsList");
  const userProducts = allProducts.filter((p) => p.seller === nickname);

  productListContainer.innerHTML = "";

  userProducts.forEach((product) => {
    const soldOutHTML = product.soldOut
      ? `<span class="sold-out">판매완료</span>`
      : "";
    const productHTML = `
        <div class="product-container">
          <div class="product-img-container" style="background-image: url('${product.img}')">
            ${soldOutHTML}
            <button class="like-btn" onclick="toggleLike(this)"></button>
          </div>
          <div class="product-text-container">
            <p class="product-name">${product.name}</p>
            <p class="product-price">${product.price}원</p>
            <p class="product-seller">${product.seller}</p>
          </div>
        </div>
      `;
    productListContainer.innerHTML += productHTML;
  });
}
getNicknameFromURL();
