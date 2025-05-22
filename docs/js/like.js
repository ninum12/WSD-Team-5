const sampleWishlist = [
  {
    id: 1,
    name: "자료구조",
    price: "30,000원",
    seller: "송이",
    img: "./img/products/data-structure.jpg",
    soldOut: false
  },
  {
    id: 2,
    name: "운영체제",
    price: "35,000원",
    seller: "송이",
    img: "./img/products/os.jpg",
    soldOut: true
  },
  {
    id: 3,
    name: "네트워크",
    price: "32,000원",
    seller: "송이",
    img: "./img/products/network.jpg",
    soldOut: false
  },
  {
    id: 4,
    name: "파이썬",
    price: "25,000원",
    seller: "송이",
    img: "./img/products/python.jpg",
    soldOut: false
  }
];

if (!localStorage.getItem("wishlist")) {
  localStorage.setItem("wishlist", JSON.stringify(sampleWishlist));
}

function renderWishlist() {
  const container = document.getElementById("wishlistContainer");
  const count = document.getElementById("totalCount");
  container.innerHTML = "";

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  count.textContent = wishlist.length;

  wishlist.forEach((item, index) => {
    const product = document.createElement("div");
    product.className = "product-card";

    product.innerHTML = `
      ${item.soldOut ? '<span class="sold-out">판매완료</span>' : ''}
      <img src="${item.img}" alt="${item.name}">
      <button class="like-btn liked" onclick="removeFromWishlist(${index})"></button>
      <p class="product-title">${item.name}</p>
      <p class="product-price">${item.price}</p>
      <p class="product-seller">${item.seller}</p>
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
