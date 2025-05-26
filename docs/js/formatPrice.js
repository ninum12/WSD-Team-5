const priceInput = document.getElementById("productPrice");

if (priceInput) {
  const max = parseInt(priceInput.dataset.max, 10) || 999999999;

  function formatPriceInput(e) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const clamped = Math.min(Number(raw), max);
    e.target.value = clamped.toLocaleString();
  }

  priceInput.addEventListener("input", formatPriceInput);

  formatPriceInput({ target: priceInput });
}
