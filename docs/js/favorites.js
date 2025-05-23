const WISHLIST_KEY = "wishlist";

function getWishList() {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
}

function setWishList(wishList) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishList));
}

function setHeartIcon(likeBtn, isLiked) {
  likeBtn.style.backgroundImage = isLiked
    ? "url('./img/icon/heart-fill.svg')"
    : "url('./img/icon/heart-empty.svg')";
}

function toggleFavorite(productId, likeBtn) {
  let wishList = getWishList();
  const index = wishList.indexOf(productId);

  if (index == -1) {
    wishList.push(productId);
  } else {
    wishList.splice(index, 1);
  }

  setWishList(wishList);
  setHeartIcon(likeBtn, !(index > -1));
}

function applyWishList() {
  const wishList = getWishList();

  document.querySelectorAll(".product-card").forEach((p) => {
    const productId = p.dataset.id;
    const likeBtn = p.querySelector(".like-btn");
    const isLiked = wishList.includes(productId);

    setHeartIcon(likeBtn, isLiked);
  });
}

applyWishList();
