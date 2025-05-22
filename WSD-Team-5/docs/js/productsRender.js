function renderProductList(products) {
  const container = document.querySelector(".product-list");
  container.innerHTML = "";

  products.forEach((product) => {
    const productEl = document.createElement("div");
    productEl.className = "product-container";
    productEl.dataset.id = product.id;

    productEl.innerHTML = `
      <div class="product-img-container">
        ${product.soldOut ? '<div class="sold-out">판매완료</div>' : ""}
        <button class="like-btn"></button>
      </div>
      <div class="product-text-container">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price.toLocaleString()}원</div>
        <div class="product-seller">${product.seller}</div>
      </div>
    `;

    container.appendChild(productEl);
  });
}

renderProductList(PRODUCTS_LIST);
