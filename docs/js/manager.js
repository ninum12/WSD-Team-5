function saveToLocalStorageManager(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorageManager(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function initLocalProductListManager() {
  const existing = loadFromLocalStorageManager("productsList");
  if (!existing) {
    saveToLocalStorageManager("productsList", PRODUCTS_LIST);
  }
}

function renderProductListManager() {
  const products = loadFromLocalStorageManager("productsList") || [];
  const container = document.getElementById("product-container");
  if (!container) {
    console.error("product-container element not found!");
    return;
  }
  container.innerHTML = "";
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>가격: ${product.price}원</p>
      <p>판매자: ${product.seller}</p>
    `;
    container.appendChild(div);
  });
}

window.showProductListManager = function () {
  document.getElementById("member-info").style.display = "none";
  document.getElementById("product-list").style.display = "block";
  renderProductListManager();

  document.getElementById("member-tab").classList.remove("active");
  document.getElementById("product-tab").classList.add("active");
};

window.showMemberInfoManager = function () {
  document.getElementById("member-info").style.display = "block";
  document.getElementById("product-list").style.display = "none";

  document.getElementById("member-tab").classList.add("active");
  document.getElementById("product-tab").classList.remove("active");
};

window.addEventListener("DOMContentLoaded", () => {
  initLocalProductListManager();
});

window.showMemberInfo = function () {
  document.getElementById("member-info").style.display = "block";
  document.getElementById("product-list").style.display = "none";

  document.getElementById("member-tab").classList.add("active");
  document.getElementById("product-tab").classList.remove("active");
};

window.showProductList = function () {
  document.getElementById("member-info").style.display = "none";
  const productList = document.getElementById("product-list");
  productList.style.display = "block";
  productList.style.height = "auto";
  productList.style.visibility = "visible";
  productList.style.position = "relative";
  renderProductList();

  document.getElementById("member-tab").classList.remove("active");
  document.getElementById("product-tab").classList.add("active");
};
