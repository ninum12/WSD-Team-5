const productConditionArea = document.getElementById("productConditionArea");

const firstCategoryButtons = document.querySelectorAll(
  "#firstCategory .category-btn"
);

firstCategoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selected = btn.textContent.trim();

    const visibleCategories = ["교재", "학잠/과잠", "학교 굿즈"];

    if (visibleCategories.includes(selected)) {
      productConditionArea.style.visibility = "visible";
    } else {
      productConditionArea.style.visibility = "hidden";
    }
  });
});
