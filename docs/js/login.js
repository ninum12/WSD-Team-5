if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(defaultUsers));
}

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
  const matchedUser = users.find((user) => user.id === id && user.pw === pw);

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

  // 로그인한 사용자 ID 저장
  localStorage.setItem(
    "loggedInUserId",
    JSON.stringify({ username: `${matchedUser.id}` })
  );

  alert(`${matchedUser.name}님, 로그인 성공!`);

  // 페이지 이동
  if (isAdmin) {
    location.href = "./manager.html";
  } else {
    location.href = "./mypage.html";
  }
}
