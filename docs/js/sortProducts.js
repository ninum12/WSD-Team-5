function sortProducts(products, sortBy) {
  // 판매중/판매완료 분리
  const available = products.filter((p) => !p.soldOut); // 판매중
  const soldOut = products.filter((p) => p.soldOut); // 판매완료

  // 판매중 상품 정렬
  switch (sortBy) {
    case "original":
      // 원래 순서대로 (순서 유지)
      break;
    case "low-to-high":
      available.sort((a, b) => a.price - b.price);
      break;
    case "high-to-low":
      available.sort((a, b) => b.price - a.price);
      break;
  }

  // 정렬된 판매중 상품 + 판매완료 상품을 뒤에 붙여서 반환
  return [...available, ...soldOut];
}
