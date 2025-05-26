const inquiryTab = document.getElementById("inquiry");
const noticeTab = document.getElementById("notice");
const inquiryList = document.getElementById("inquiryList");
const noticeList = document.getElementById("noticeList");

inquiryTab.addEventListener("click", () => {
  inquiryTab.classList.add("active");
  noticeTab.classList.remove("active");

  inquiryList.style.display = "block";
  noticeList.style.display = "none";
});

noticeTab.addEventListener("click", () => {
  noticeTab.classList.add("active");
  inquiryTab.classList.remove("active");

  noticeList.style.display = "block";
  inquiryList.style.display = "none";
});

// document.querySelectorAll(".title").forEach((title) => {
//   title.addEventListener("click", () => {
//     const item = title.closest(".item");
//     const content = item.querySelector(".content");
//     const arrow = title.querySelector(".arrow");
//     const isOpen = item.classList.contains("open");

//     item.classList.toggle("open");

//     // 모든 항목 닫기
//     document.querySelectorAll(".item").forEach((el) => {
//       el.classList.remove("open");
//       el.querySelector(".content").style.display = "none";
//       el.querySelector(".arrow").textContent = "▼";
//     });

//     // 현재 항목 열기
//     if (!isOpen) {
//       item.classList.add("open");
//       content.style.display = "block";
//       arrow.textContent = "▲"; // 화살표 위로 변경
//     }
//   });
// });

document.querySelectorAll(".title").forEach((title) => {
  title.addEventListener("click", () => {
    const item = title.closest(".item");
    const content = item.querySelector(".content");
    const arrow = title.querySelector(".arrow");

    const isVisible = content.style.display === "block";

    if (isVisible) {
      content.style.display = "none";
      arrow.textContent = "▼";
    } else {
      content.style.display = "block";
      arrow.textContent = "▲";
    }
  });
});
