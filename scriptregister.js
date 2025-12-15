document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("regEmail").value.trim();
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;
    const terms = document.getElementById("regTermsCheck").checked;

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

    const user = { email, username, password };
    localStorage.setItem(username, JSON.stringify(user));

    alert("Sign up successful! Please sign in.");
    window.location.href = "index.html";
  });
