const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("search-input");

searchBtn.addEventListener("click", function () {
  const query = searchInput.value.trim();
  if (query) {
    localStorage.setItem("searchQuery", query);
    window.location.href = "./search.html";
  } else {
    localStorage.removeItem("searchQuery");
  }
});

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      localStorage.setItem("searchQuery", query);
      window.location.href = "./search.html";
    } else {
      localStorage.removeItem("searchQuery");
    }
  }
});
