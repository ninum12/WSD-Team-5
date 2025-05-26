function bindFavoriteEvents() {
  document.querySelectorAll(".product-card").forEach((card) => {
    const productId = parseInt(card.dataset.id);
    const likeBtn = card.querySelector(".like-btn");

    likeBtn.addEventListener("click", () => {
      toggleFavorite(productId, likeBtn);
    });
  });
}
