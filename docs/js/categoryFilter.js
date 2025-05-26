const filterBtn = document.getElementById("filterCategoryBtn");

filterBtn.addEventListener("click", () => {
  const selectedCategories = [
    ...document.querySelectorAll("#category-results .category"),
  ].map((cat) => cat.textContent.replace(",", "").trim());

  const query = localStorage.getItem("searchQuery")?.trim() || "";
  const allProducts = getAllProducts();

  const matched = filterProductsByQueryAndCategory(
    allProducts,
    query,
    selectedCategories
  );
  const sortBy =
    document.querySelector(".order-by[style*='var(--medium)']")?.dataset.sort ||
    "default";

  const sortedProducts = sortProducts(matched, sortBy);

  renderProductList(sortedProducts);
  applyWishList();
  bindFavoriteEvents();

  document.getElementById(
    "totalProduct"
  ).textContent = `총 ${sortedProducts.length}개`;
});
