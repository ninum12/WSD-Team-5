function renderSearchResults() {
  const query = localStorage.getItem("searchQuery")?.trim();
  const resultTitle = document.getElementById("search-result");
  const totalProduct = document.getElementById("totalProduct");
  const selectedCategories = [
    ...document.querySelectorAll("#category-results .category"),
  ].map((cat) => cat.textContent.replace(",", "").trim());

  const allProducts = getAllProducts();
  const matched = filterProductsByQueryAndCategory(
    allProducts,
    query,
    selectedCategories
  );

  resultTitle.textContent = query
    ? `"${query}" 검색 결과`
    : "검색어가 없습니다.";
  totalProduct.textContent = `총 ${matched.length}개`;

  const sortedProducts = sortProducts(matched, "default");

  renderProductList(sortedProducts);
  applyWishList();
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
    const selectedCategories = [
      ...document.querySelectorAll("#category-results .category"),
    ].map((cat) => cat.textContent.replace(",", "").trim());

    const allProducts = getAllProducts();
    const matched = filterProductsByQueryAndCategory(
      allProducts,
      query,
      selectedCategories
    );
    const sortedProducts = sortProducts(matched, sortBy);

    renderProductList(sortedProducts);
    applyWishList();
    bindFavoriteEvents();
    document.getElementById(
      "totalProduct"
    ).textContent = `총 ${sortedProducts.length}개`;
  });
});

window.addEventListener("DOMContentLoaded", () => {
  renderSearchResults();
});
