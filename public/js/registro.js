const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("registerNombre").value;
  const apellido = document.getElementById("registerApellido").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const messageDiv = document.getElementById("registerMessage");

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, apellido, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      messageDiv.className = "message success";
      messageDiv.textContent = "¡Registro exitoso!";
      messageDiv.style.display = "block";

      registerForm.reset();

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      messageDiv.className = "message error";
      messageDiv.textContent = data.error || "Error al registrarse";
      messageDiv.style.display = "block";
    }
  } catch (error) {
    messageDiv.className = "message error";
    messageDiv.textContent = "Error de conexión con el servidor";
    messageDiv.style.display = "block";
  }
});
