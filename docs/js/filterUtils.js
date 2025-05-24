function getAllProducts() {
  return JSON.parse(localStorage.getItem("productsList")) || [];
}

function filterProductsByQueryAndCategory(products, query, selectedCategories) {
  let result = products;

  if (query) {
    result = result.filter(
      (p) =>
        p.name.includes(query) ||
        p.seller.includes(query) ||
        p.description.includes(query)
    );
  }

  if (selectedCategories.length > 0) {
    result = result.filter((product) =>
      product.categories.some((cat) =>
        selectedCategories.some((selected) =>
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
