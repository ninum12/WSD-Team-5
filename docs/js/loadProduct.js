document.getElementById("loadBtn").addEventListener("click", () => {
  const tempDataStr = getCookie("tempProductData");
  if (!tempDataStr) {
    alert("불러올 임시 저장 데이터가 없습니다.");
    return;
  }

  try {
    const tempData = JSON.parse(tempDataStr);

    if (tempData.name) {
      document.getElementById("productName").value = tempData.name;
      document.getElementById(
        "countWordName"
      ).textContent = `${tempData.name.length}/40`;
    }

    if (Array.isArray(tempData.categories)) {
      document
        .querySelectorAll("#category-results .category")
        .forEach((el) => el.remove());
      document
        .querySelectorAll("#firstCategory .category-btn")
        .forEach((btn) => {
          btn.style.color = "";
          btn.style.fontWeight = "var(--light)";
        });

      tempData.categories.forEach((name) => {
        const btn = [...document.querySelectorAll(".category-btn")].find(
          (b) => b.textContent === name
        );
        if (btn) btn.click();
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

    if (tempData.description) {
      document.getElementById("productDescription").value =
        tempData.description;
      document.getElementById(
        "countWordDescription"
      ).textContent = `${tempData.description.length}/2000`;
    }

    if (tempData.price) {
      document.getElementById("productPrice").value = tempData.price;
    }

    if (Array.isArray(tempData.prefer)) {
      document
        .querySelectorAll('input[name="preferredMethod"]')
        .forEach((input) => {
          input.checked = tempData.prefer.includes(input.value);
        });
    }

    if (tempData.inPerson) {
      const inPersonInput = document.querySelector(
        `input[name="inPerson"][value="${tempData.inPerson}"]`
      );
      if (inPersonInput) inPersonInput.checked = true;
    }

    alert("임시 저장된 데이터를 불러왔습니다.");
  } catch (err) {
    console.error("불러오기 중 오류:", err);
    alert("데이터를 불러오는 중 오류가 발생했습니다.");
  }
});
