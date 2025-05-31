import { serviceContent } from "./aboutContent/aboutService.js";
import { sellerContent } from "./aboutContent/aboutSeller.js";
import { buyerContent } from "./aboutContent/aboutBuyer.js";

const tabContentMap = {
  service: serviceContent,
  seller: sellerContent,
  buyer: buyerContent,
};

const tabs = document.querySelectorAll(".tab");
const content = document.getElementById("tabContent");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.style.borderBottom = "2px solid var(--gray-light)";
      t.style.fontWeight = "normal";
    });

    tab.style.borderBottom = "2px solid black";
    tab.style.fontWeight = "bold";

    const tabKey = tab.dataset.tab;
    content.innerHTML =
      tabContentMap[tabKey] || "<p>내용을 불러올 수 없습니다.</p>";
  });
});

document.querySelector(".tab[data-tab='service']").click();
