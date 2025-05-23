document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".menu-tabs .tab");
  const sections = document.querySelectorAll(".tab-section");

  const initialTab = localStorage.getItem("mypageTab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-tab");

      sections.forEach((section) => section.classList.add("hidden"));

      document.getElementById(targetId).classList.remove("hidden");

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  if (initialTab) {
    const targetTab = document.querySelector(
      `.menu-tabs .tab[data-tab="${initialTab}"]`
    );
    if (targetTab) {
      targetTab.click();
    }
    localStorage.removeItem("mypageTab");
  } else {
    tabs[0]?.click();
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const loggedInUserId = localStorage.getItem("loggedInUserId");

  const currentUser = users.find((u) => u.id === loggedInUserId);

  if (currentUser) {
    document.querySelector(".nickname").textContent = currentUser.name;
    document.querySelector(".student-id").textContent = currentUser.studentId;

    const accountSection = document.getElementById("account");
    accountSection.innerHTML = `
      <div class="info-row">아이디: ${currentUser.id}</div>
      <div class="info-row">이름: ${currentUser.name}</div>
      <div class="info-row">학번: ${currentUser.studentId}</div>
      <div class="info-row">전공: ${currentUser.major}</div>
    `;

    const activityEl = document.getElementById("activity");
    activityEl.innerHTML = `
      <p><strong>📦 판매 내역</strong></p>
      <ul>${currentUser.activities.sold
        .map((item) => `<li>${item}</li>`)
        .join("")}</ul>
      <p><strong>🛒 구매 내역</strong></p>
      <ul>${currentUser.activities.bought
        .map((item) => `<li>${item}</li>`)
        .join("")}</ul>
    `;

    const likeEl = document.getElementById("like");
    likeEl.innerHTML = `
      <p><strong>💖 찜한 항목</strong></p>
      <ul>${currentUser.liked.map((item) => `<li>${item}</li>`).join("")}</ul>
    `;

    const draftEl = document.getElementById("draft");
    draftEl.innerHTML = `
      <p><strong>📝 임시 저장 글</strong></p>
      <ul>${currentUser.drafts.map((item) => `<li>${item}</li>`).join("")}</ul>
    `;
  }
});
