document.addEventListener("DOMContentLoaded", function () {
  /* REGISTER (SIGN UP) */
  const regForm = document.getElementById("registerForm");

  if (regForm) {
    regForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = document.getElementById("regEmail");
      const usernameInput = document.getElementById("regUsername");
      const passwordInput = document.getElementById("regPassword");
      const confirmInput = document.getElementById("regConfirmPassword");
      const termsCheck = document.getElementById("regTermsCheck");

      // SAFETY CHECK
      if (
        !emailInput ||
        !usernameInput ||
        !passwordInput ||
        !confirmInput ||
        !termsCheck
      ) {
        alert("Form elements not found. Check IDs.");
        return;
      }

      const email = emailInput.value.trim();
      const username = usernameInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmInput.value;
      const terms = termsCheck.checked;

      if (!terms) {
        alert("You must agree to the Terms and Conditions.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      if (localStorage.getItem(username)) {
        alert("Username already exists.");
        return;
      }

      const user = {
        email: email,
        username: username,
        password: password,
      };

      localStorage.setItem(username, JSON.stringify(user));

      alert("Sign up successful! Please sign in.");
      window.location.href = "index.html";
    });
  }

  /* LOGIN (SIGN IN) */
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const usernameInput = document.getElementById("logUsername");
      const passwordInput = document.getElementById("logPassword");

      if (!usernameInput || !passwordInput) return;

      const username = usernameInput.value.trim();
      const password = passwordInput.value;

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
  }

  /* NAVBAR */
  const loggedInUser = localStorage.getItem("loggedInUser");
  const authNav = document.getElementById("authNav");
  const userNav = document.getElementById("userNav");
  const userId = document.getElementById("userid");
  const logout = document.getElementById("logout");

  if (loggedInUser && userNav && userId) {
    userNav.classList.remove("d-none");
    userId.textContent = loggedInUser;
  }

  if (logout) {
    logout.addEventListener("click", function () {
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    });
  }
});
console.log("userNav:", userNav);
console.log("userId:", userId);
console.log("loggedInUser:", loggedInUser);
const userNav = document.getElementById("userNav");
const userId = document.getElementById("userid");

userNav.classList.remove("d-none");
userId.textContent = "TestUser";
