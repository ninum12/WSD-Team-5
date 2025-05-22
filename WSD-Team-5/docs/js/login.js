const defaultUsers = [
  { id: "admin", pw: "admin123", name: "관리자", role: "admin" },
  { id: "user1", pw: "user123", name: "눈송이", role: "user" },
  { id: "user2", pw: "abcd", name: "눈결이", role: "user" }
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(defaultUsers));
}

// 로그인 (isAdmin = true: 관리자 로그인 버튼을 누른 경우)
function login(isAdmin = false) {
  const id = document.getElementById("userId").value.trim();
  const pw = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");
  errorMsg.textContent = "";

  if (!id || !pw) {
    errorMsg.textContent = "아이디와 비밀번호를 모두 입력해주세요.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const matchedUser = users.find(user => user.id === id && user.pw === pw);

  if (!matchedUser) {
    errorMsg.textContent = "아이디 또는 비밀번호가 올바르지 않습니다.";
    return;
  }

  if (isAdmin && matchedUser.role !== "admin") {
    errorMsg.textContent = "관리자 계정으로 로그인해야 합니다.";
    return;
  }

  if (!isAdmin && matchedUser.role !== "user") {
    errorMsg.textContent = "일반 회원 계정으로 로그인해야 합니다.";
    return;
  }

  alert(`${matchedUser.name}님, 로그인 성공!`);
  // 로그인 성공 후 페이지 이동
  // location.href = matchedUser.role === "admin" ? "./admin.html" : "./mypage.html";
}
