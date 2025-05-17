const FAVORITES_KEY = "favorites";

function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

function setFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function setHeartIcon(likeBtn, isLiked) {
  likeBtn.style.backgroundImage = isLiked
    ? "url('./img/icon/heart-fill.svg')"
    : "url('./img/icon/heart-empty.svg')";
}

function toggleFavorite(productId, likeBtn) {
  let favorites = getFavorites();
  const index = favorites.indexOf(productId);

  if (index == -1) {
    favorites.push(productId);
  } else {
    favorites.splice(index, 1);
  }

  setFavorites(favorites);
  setHeartIcon(likeBtn, !(index > -1));
}

function applyFavorites() {
  const favorites = getFavorites();

  document.querySelectorAll(".product-container").forEach((p) => {
    const productId = p.dataset.id;
    const likeBtn = p.querySelector(".like-btn");
    const isLiked = favorites.includes(productId);

    setHeartIcon(likeBtn, isLiked);
  });
}

applyFavorites();
