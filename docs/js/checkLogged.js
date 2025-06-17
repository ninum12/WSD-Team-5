const loggedInUserData = localStorage.getItem("loggedInUserId");

if (loggedInUserData) {
  const user = JSON.parse(loggedInUserData);
  const topNav = document.getElementById("topNav");

  const loginItem = document.getElementById("loginItem");
  const signupItem = document.getElementById("signupItem");
  if (loginItem) loginItem.remove();
  if (signupItem) signupItem.remove();

  const welcomeItem = document.createElement("li");
  welcomeItem.id = "welcomeUser";
  welcomeItem.innerHTML = `<div>${
    defaultUsers.find((u) => u.id === user.username).name
  }</div>님 환영합니다!`;
  topNav.insertBefore(welcomeItem, topNav.firstChild);

  const logoutItem = document.createElement("li");
  const logoutBtn = document.createElement("button");
  logoutBtn.id = "logOutBtn";
  logoutBtn.textContent = "로그아웃";
  logoutBtn.style.cursor = "pointer";
  logoutBtn.onclick = function () {
    localStorage.removeItem("loggedInUserId");
    location.reload();
  };
  logoutItem.appendChild(logoutBtn);
  topNav.appendChild(logoutItem);
}
