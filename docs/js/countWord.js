function countWord(inputId, countId, maxLength) {
  const input = document.getElementById(inputId);
  const counter = document.getElementById(countId);

  const updateCount = () => {
    const len = input.value.length;
    counter.textContent = `${len}/${maxLength}`;
  };

  input.addEventListener("input", updateCount);
  updateCount();
}

countWord("productName", "countWordName", 40);

countWord("productDescription", "countWordDescription", 2000);
