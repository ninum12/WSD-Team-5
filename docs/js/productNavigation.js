function bindFavoriteEvents() {
  document.querySelectorAll(".product-card").forEach((p) => {
    const productId = p.dataset.id;
    const likeBtn = p.querySelector(".like-btn");

    likeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(productId, likeBtn);
    });

    p.addEventListener("click", (e) => {
      if (!likeBtn.contains(e.target)) {
        window.location.href = "./product.html";
      }
    });
  });
}
bindFavoriteEvents();
