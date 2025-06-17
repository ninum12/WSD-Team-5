function getAllProducts() {
  return JSON.parse(localStorage.getItem("productsList")) || [];
}

function filterProductsByQueryAndCategory(products, query, selectedCategories) {
  let result = products;

  if (query) {
    const keywords = query
      .toLowerCase()
      .split(" ")
      .map((word) => word.trim())
      .filter((word) => word.length > 0);

    result = result.filter((p) =>
      keywords.every(
        (kw) =>
          p.name.toLowerCase().includes(kw) ||
          p.seller.toLowerCase().includes(kw) ||
          p.description.toLowerCase().includes(kw)
      )
    );
  }

  if (selectedCategories.length > 0) {
    result = result.filter((product) =>
      selectedCategories.every((selected) =>
        product.categories.some((cat) =>
          cat.toLowerCase().includes(selected.toLowerCase().trim())
        )
      )
    );
  }

  return result;
}

function sortProducts(products, sortBy) {
  const available = products.filter((p) => !p.soldOut);
  const soldOut = products.filter((p) => p.soldOut);

  if (sortBy === "low-to-high") {
    available.sort(
      (a, b) =>
        parseInt(a.price.replace(/,/g, "")) -
        parseInt(b.price.replace(/,/g, ""))
    );
  } else if (sortBy === "high-to-low") {
    available.sort(
      (a, b) =>
        parseInt(b.price.replace(/,/g, "")) -
        parseInt(a.price.replace(/,/g, ""))
    );
  }

  return [...available, ...soldOut];
}
