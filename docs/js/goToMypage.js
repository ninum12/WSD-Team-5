function goToMypageWithTab(tabName) {
  localStorage.setItem("mypageTab", tabName);
  window.location.href = "mypage.html";
}
