const loginForm = document.getElementById("loginForm");
const toggleLink = document.getElementById("toggleLink");
const toggleText = document.getElementById("toggleText");

// Manejar login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const messageDiv = document.getElementById("loginMessage");

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      messageDiv.className = "message success";
      messageDiv.textContent = "¡Login exitoso! Redirigiendo...";
      messageDiv.style.display = "block";

      // Guardar token en localStorage
      localStorage.setItem("session", JSON.stringify(data.session));

      // Redirigir al dashboard
      setTimeout(() => {
        window.location.href = "/dashboard.html";
      }, 1500);
    } else {
      messageDiv.className = "message error";
      messageDiv.textContent = data.error || "Error al iniciar sesión";
      messageDiv.style.display = "block";
    }
  } catch (error) {
    messageDiv.className = "message error";
    messageDiv.textContent = "Error de conexión con el servidor";
    messageDiv.style.display = "block";
  }
});

// Registro ahora se realiza en /registro.html
