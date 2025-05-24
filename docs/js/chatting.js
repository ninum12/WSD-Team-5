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
