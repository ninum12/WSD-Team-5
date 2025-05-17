function sortProducts(products, sortBy) {
  const available = products.filter((p) => !p.soldOut);
  const soldOut = products.filter((p) => p.soldOut);

  switch (sortBy) {
    case "original":
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
