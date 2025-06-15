document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("inquiryForm");
  const registerBtn = document.getElementById("registerBtn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("등록되었습니다");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  countWord("productDescription", "countWordDescription", 2000);
});
