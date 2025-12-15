// Profile Statisitcs 
  const counter = document.querySelectorAll(".counter");
  counter.forEach(myCounter);

  function myCounter(Cvalue){
      Cvalue.innerText = "0";

      function incrementCounter(){
          let currentNum = +Cvalue.innerText;
          let dataCeil = Cvalue.getAttribute("data_ceil");
          let increment = dataCeil / 15;
          currentNum = Math.ceil(currentNum + increment);

          if(currentNum < dataCeil){
              Cvalue.innerText = currentNum;
              setTimeout(incrementCounter, 100);
          } else {
              Cvalue.innerText = dataCeil;
          }
      }

      incrementCounter();
  }


// Form Validation 
function validateContactForm() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phoneNumber").value;
    let message = document.getElementById("message").value;
    let emailWarning = document.getElementById("emailWarning");
    let phoneWarning = document.getElementById("phoneWarning");
    let messageWarning = document.getElementById("messageWarning");

    // Reset warnings
    emailWarning.textContent = "";
    phoneWarning.textContent = "";
    messageWarning.textContent = "";

    // Check if all fields are filled
    if (!firstName || !lastName || !email || !phone || !message) {
        alert("Please fill all fields!");
        return false;
    }

    // Check email format
    if (!email.includes("@") || !email.includes(".")) {
        emailWarning.textContent = "✱ Please enter a valid email address.";
        return false;
    }

    // Phone must be digits only
    if (!/^\d+$/.test(phone)) {
        phoneWarning.textContent = "✱ Phone number must contain only numbers.";
        return false;
    }

    // Length rule
    if (phone.length < 8) {
        phoneWarning.textContent = "✱ Please enter a valid phone number.";
        return false;
    }

    if (message.trim().length < 10) {
        messageWarning.textContent = "✱ Please write a longer message.";
        return false;
    }

    alert("Message sent successfully!");
    location.reload();
    return true;
}

