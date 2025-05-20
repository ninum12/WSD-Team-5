function sortProducts(products, sortBy) {
  const available = products.filter((p) => !p.soldOut);
  const soldOut = products.filter((p) => p.soldOut);

  console.log(soldOut);

  switch (sortBy) {
    case "default":
      break;
    case "low-to-high":
      available.sort((a, b) => a.price - b.price);
      break;
    case "high-to-low":
      available.sort((a, b) => b.price - a.price);
      break;
  }

  return [...available, ...soldOut];
}

function renderSearchResults() {
  const query = localStorage.getItem("searchQuery")?.trim();
  const resultTitle = document.getElementById("search-result");
  const listProducts = document.querySelector(".product-list");
  const totalProduct = document.getElementById("totalProduct");

  function noResult() {
    document.querySelector(".category-btns-table").style.display = "none";
    totalProduct.style.display = "none";
    document.querySelector(".order-by-container").style.display = "none";
    document.querySelector(".about-search-products").style.justifyContent =
      "center";
    document.querySelector(".about-search-products").innerHTML =
      "<p>검색 결과가 없습니다.</p>";
  }

  if (!query) {
    resultTitle.textContent = "검색어가 없습니다.";
    listProducts.innerHTML = "";
    noResult();
    return;
  }

  const matched = PRODUCTS_LIST.filter(
    (p) => p.name.includes(query) || p.seller.includes(query)
  );

  resultTitle.textContent = `"${query}" 검색 결과`;
  totalProduct.textContent = `총 ${matched.length}개`;

  if (matched.length === 0) {
    listProducts.innerHTML = "";
    noResult();
    return;
  }

  renderProductList(matched);
  applyFavorites();
  bindFavoriteEvents();
}
document.querySelectorAll(".order-by").forEach((item) => {
  console.log("products\n" + PRODUCTS_LIST);
  item.addEventListener("click", () => {
    document.querySelectorAll(".order-by").forEach((o) => {
      o.style.fontWeight = "var(--light)";
    });

    item.style.fontWeight = "var(--medium)";

    const sortBy = item.dataset.sort;
    const query = localStorage.getItem("searchQuery")?.trim() || "";
    const matched = PRODUCTS_LIST.filter(
      (p) => p.name.includes(query) || p.description.includes(query)
    );

    console.log("match" + matched);
    const sortedProducts = sortProducts(matched, sortBy);

    renderProductList(sortedProducts);
    bindFavoriteEvents();
  });
});
