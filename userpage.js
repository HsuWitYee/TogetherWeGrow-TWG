document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("loggedInUser");

  if (!username) {
    window.location.href = "index.html";
    return;
  }

  const userData = localStorage.getItem(username);

  if (!userData) {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
    return;
  }

  const user = JSON.parse(userData);

  document.getElementById("userid").textContent = user.username;
  document.getElementById("profileUsername").textContent = user.username;
  document.getElementById("profileEmail").textContent = user.email;

  const logoutElements = document.querySelectorAll("#logout, #logoutButton");

  logoutElements.forEach((el) => {
    el.addEventListener("click", function () {
      localStorage.removeItem("loggedInUser");
      alert("Logged out");
      window.location.href = "index.html";
    });
  });
});
