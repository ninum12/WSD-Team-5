document.addEventListener("DOMContentLoaded", () => {
  const chatting = document.querySelector(".chatting");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");

  function addMessage(text, sender = "user") {
    const messageEl = document.createElement("div");
    messageEl.classList.add("chat-message");
    messageEl.textContent = text;

    if (sender === "user") {
      messageEl.classList.add("user");
    } else if (sender === "seller") {
      messageEl.classList.add("seller");
    }

    chatting.appendChild(messageEl);
    chatting.scrollTop = chatting.scrollHeight;
  }

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    chatInput.value = "";

    setTimeout(() => {
      addMessage("메시지 잘 받았습니다!", "seller");
    }, 2000);
  }

  sendBtn.addEventListener("click", sendMessage);

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productName = params.get("name");
  const productPrice = params.get("price");
  const productSeller = params.get("seller");
  const productImg = params.get("img");

  const nameEl = document.querySelector(".product-name");
  const priceEl = document.querySelector(".product-price");
  const sellerEl = document.querySelector(".product-seller");
  const imgContainer = document.querySelector(".product-img-container");

  if (productName && priceEl) {
    nameEl.textContent = productName;
    priceEl.textContent = `${productPrice}원`;
  }

  if (productSeller) {
    sellerEl.textContent = productSeller;
  }

  if (productImg && imgContainer) {
    imgContainer.style.backgroundImage = `url('${productImg}')`;
  }
});
