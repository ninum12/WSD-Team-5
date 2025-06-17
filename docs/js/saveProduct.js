function setCookie(name, value, days) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
}

function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function collectFormData() {
  const name = document.getElementById("productName").value.trim();

  const categories = [
    ...document.querySelectorAll("#category-results .category"),
  ].map((div) => div.textContent.replace(/,$/, ""));

  const use = document.querySelector('input[name="use"]:checked')?.value || "";

  const damage =
    document.querySelector('input[name="damage"]:checked')?.value || "";

  const description = document
    .getElementById("productDescription")
    .value.trim();

  const price = document.getElementById("productPrice").value.trim();

  const prefer = [
    ...document.querySelectorAll('input[name="preferredMethod"]:checked'),
  ].map((input) => input.value);

  const inPerson =
    document.querySelector('input[name="inPerson"]:checked')?.value || "";

  return {
    name,
    categories,
    use,
    damage,
    description,
    price,
    prefer,
    inPerson,
  };
}

document.getElementById("saveBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const data = collectFormData();
  setCookie("tempProductData", JSON.stringify(data), 7);
  alert("임시 저장되었습니다. 7일간 유지됩니다.");

  window.location.href = "./index.html";
});

document.getElementById("registerBtn").addEventListener("click", (e) => {
  e.preventDefault();

  const currentUserId = loadFromLocalStorage("loggedInUserId");
  if (!currentUserId || !currentUserId.username) {
    alert("로그인 후 상품을 등록할 수 있습니다.");
    window.location.href = "./login.html";
    return;
  }

  const productName = document.getElementById("productName").value.trim();
  const productDescription = document
    .getElementById("productDescription")
    .value.trim();

  if (productName.length === 0) {
    alert("상품명을 입력해 주세요.");
    return;
  }

  if (productDescription.length === 0) {
    alert("상품 설명을 입력해 주세요.");
    return;
  }

  const data = collectFormData();

  const existingList = loadFromLocalStorage("productsList") || [];

  const maxId = existingList.reduce(
    (max, item) => Math.max(max, item.id || 0),
    0
  );

  const newProduct = {
    id: maxId + 1,
    name: data.name,
    categories: data.categories,
    price: data.price,
    seller: defaultUsers.find((u) => u.id === currentUserId.username).name,
    img: "./img/products/linear-algebra.png",
    use: data.use,
    damage: data.damage,
    description: data.description,
    prefer: data.prefer,
    inPerson: data.inPerson,
    soldOut: false,
  };

  existingList.push(newProduct);
  saveToLocalStorage("productsList", existingList);

  alert("상품이 등록되었습니다!");

  window.location.href = "./index.html";
});

window.addEventListener("load", () => {
  const tempDataStr = getCookie("tempProductData");
  if (!tempDataStr) return;

  try {
    const tempData = JSON.parse(tempDataStr);

    if (tempData.productName) {
      document.getElementById("productName").value = tempData.productName;
      document.getElementById(
        "countWordName"
      ).textContent = `${tempData.productName.length}/40`;
    }

    if (Array.isArray(tempData.selectedCategories)) {
      document
        .querySelectorAll("#category-results .category")
        .forEach((el) => el.remove());
      document
        .querySelectorAll("#firstCategory .category-btn")
        .forEach((btn) => {
          btn.style.color = "";
          btn.style.fontWeight = "var(--light)";
        });

      tempData.selectedCategories.forEach((name) => {
        const btn = [...document.querySelectorAll(".category-btn")].find(
          (b) => b.textContent === name
        );
        if (btn) {
          btn.click();
        }
      });
    }

    if (tempData.use) {
      const useInput = document.querySelector(
        `input[name="use"][value="${tempData.use}"]`
      );
      if (useInput) useInput.checked = true;
    }

    if (tempData.damage) {
      const damageInput = document.querySelector(
        `input[name="damage"][value="${tempData.damage}"]`
      );
      if (damageInput) damageInput.checked = true;
    }

    if (tempData.productDescription) {
      document.getElementById("productDescription").value =
        tempData.productDescription;
      document.getElementById(
        "countWordDescription"
      ).textContent = `${tempData.productDescription.length}/2000`;
    }

    if (tempData.productPrice !== undefined) {
      const priceStr = tempData.productPrice.toLocaleString();
      document.getElementById("productPrice").value = priceStr;
    }

    if (Array.isArray(tempData.preferredMethods)) {
      document
        .querySelectorAll('input[name="preferredMethod"]')
        .forEach((input) => {
          input.checked = tempData.preferredMethods.includes(input.value);
        });
    }

    if (tempData.inPerson) {
      const inPersonInput = document.querySelector(
        `input[name="inPerson"][value="${tempData.inPerson}"]`
      );
      if (inPersonInput) inPersonInput.checked = true;
    }
  } catch (error) {
    console.error("임시 저장 데이터 로딩 중 오류:", error);
  }
});
