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

  const matched = products.filter(
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
  item.addEventListener("click", () => {
    document.querySelectorAll(".order-by").forEach((o) => {
      o.style.fontWeight = "var(--light)";
    });

    item.style.fontWeight = "var(--medium)";

    const sortBy = item.dataset.sort;
    const query = localStorage.getItem("searchQuery")?.trim() || "";
    const matched = products.filter(
      (p) => p.name.includes(query) || p.description.includes(query)
    );

    const sortedProducts = sortProducts(matched, sortBy);

    renderProductList(sortedProducts);
    bindFavoriteEvents();
  });
});
