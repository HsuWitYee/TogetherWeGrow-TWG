document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("logUsername").value.trim();
  const password = document.getElementById("logPassword").value;

  const userData = localStorage.getItem(username);

  if (!userData) {
    alert("User not found.");
    return;
  }

  const user = JSON.parse(userData);

  if (user.password !== password) {
    alert("Incorrect password.");
    return;
  }

  localStorage.setItem("loggedInUser", username);
  window.location.href = "index2.html";
});
