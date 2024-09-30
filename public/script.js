// public/script.js
document
  .getElementById("registrationForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const street = document.getElementById("street").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, street, city, state, zip }),
    });

    const result = await response.json();

    const messageDiv = document.getElementById("message");
    if (response.status === 201) {
      messageDiv.style.color = "green";
      messageDiv.innerText = result.message;
      document.getElementById("registrationForm").reset();
    } else {
      messageDiv.style.color = "red";
      messageDiv.innerText = result.message || "An error occurred.";
    }
  });
