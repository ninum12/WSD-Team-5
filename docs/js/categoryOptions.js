const thirdCategoryContainer = document.querySelector(
  "#thirdCategory .category-btns-container"
);
const resultContainer = document.querySelector("#category-results");

function resetButtonStyle(text) {
  document.querySelectorAll(".category-btn").forEach((btn) => {
    if (btn.textContent === text) {
      btn.style.color = "";
      btn.style.fontWeight = "var(--light)";
    }
  });
}

function toggleCategoryInResults(name, button) {
  const existing = [...resultContainer.querySelectorAll(".category")];
  const existingNames = existing.map((el) => el.textContent.replace(",", ""));

  if (existingNames.includes(name)) {
    existing.find((el) => el.textContent.includes(name)).remove();
    button.style.color = "";
    button.style.fontWeight = "var(--light)";
  } else {
    const div = document.createElement("div");
    div.className = "category";
    div.textContent = name + ",";
    div.style.cursor = "pointer";
    div.addEventListener("click", function () {
      this.remove();
      resetButtonStyle(name);
    });
    resultContainer.appendChild(div);
    button.style.color = "var(--blue-light)";
    button.style.fontWeight = "var(--medium)";
  }
}

function createCategoryButton(text) {
  const btn = document.createElement("button");
  btn.className = "category-btn";
  btn.textContent = text;
  btn.style.fontWeight = "var(--light)";
  btn.style.cursor = "pointer";
  btn.addEventListener("click", function () {
    toggleCategoryInResults(text, btn);
  });
  return btn;
}

document.querySelectorAll("#firstCategory .category-btn").forEach((btn) => {
  btn.style.fontWeight = "var(--light)";
  btn.style.cursor = "pointer";
  btn.addEventListener("click", function () {
    const name = this.textContent;
    const isSelected = this.style.color === "var(--blue-light)";

    if (isSelected) {
      this.style.color = "";
      this.style.fontWeight = "var(--light)";

      const resultEl = [...resultContainer.querySelectorAll(".category")].find(
        (el) => el.textContent.replace(",", "") === name
      );
      if (resultEl) resultEl.remove();
    } else {
      document.querySelectorAll("#firstCategory .category-btn").forEach((b) => {
        b.style.color = "";
        b.style.fontWeight = "var(--light)";
      });

      const firstCategoryNames = [
        ...document.querySelectorAll("#firstCategory .category-btn"),
      ].map((btn) => btn.textContent);

      [...resultContainer.querySelectorAll(".category")].forEach((el) => {
        if (firstCategoryNames.includes(el.textContent.replace(",", ""))) {
          el.remove();
        }
      });

      this.style.color = "var(--blue-light)";
      this.style.fontWeight = "var(--medium)";

      const div = document.createElement("div");
      div.className = "category";
      div.textContent = name + ",";
      div.addEventListener("click", function () {
        this.remove();
        resetButtonStyle(name);
      });
      resultContainer.appendChild(div);
    }
  });
});

document.querySelectorAll("#secondCategory .category-btn").forEach((btn) => {
  btn.style.fontWeight = "var(--light)";
  btn.style.cursor = "pointer";
  btn.addEventListener("click", function () {
    const category = this.textContent;

    thirdCategoryContainer.innerHTML = "";
    thirdCategoryContainer.style.fontWeight = "";
    thirdCategoryContainer.style.fontSize = "";
    thirdCategoryContainer.style.padding = "0";

    if (THIRD_CATEGORY[category]) {
      THIRD_CATEGORY[category].forEach((sub) => {
        const newBtn = createCategoryButton(sub);
        thirdCategoryContainer.appendChild(newBtn);
      });
    }

    toggleCategoryInResults(category, this);
  });
});

document.querySelectorAll(".category").forEach((cat) => {
  cat.addEventListener("click", function () {
    const name = this.textContent.replace(",", "");
    this.remove();
    resetButtonStyle(name);
  });
});
