function createProductCard(product) {
  const { id, name, price, seller, img, soldOut } = product;

  const card = document.createElement("div");
  card.className = "product-card";
  card.dataset.id = id;

  const soldOutTag = soldOut ? '<div class="sold-out">판매완료</div>' : "";

  card.innerHTML = `
    <div class="product-img-container" style="background-image: url('${img}');">
      ${soldOutTag}
      <button class="like-btn"></button>
    </div>
    <div class="product-text-container">
      <div class="product-name">${name}</div>
      <div class="product-price">${price}원</div>
      <div class="product-seller">${seller}</div>
    </div>
  `;

  return card;
}

function renderProductList(products) {
  const container = document.querySelector(".product-list");
  container.innerHTML = "";

  products.forEach((product) => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}
