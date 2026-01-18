async function register() {
  const errorEl = document.getElementById("error");
  errorEl.textContent = "";
  
  try {
    const res = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await res.json();
    
    if (!res.ok) {
      errorEl.textContent = data.error || "Registration failed";
      return;
    }
    
    errorEl.style.color = "green";
    errorEl.textContent = "Registration successful! Now login.";
  } catch (error) {
    errorEl.textContent = "Error: " + error.message;
  }
}

async function login() {
  const errorEl = document.getElementById("error");
  errorEl.textContent = "";
  
  try {
    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await res.json();
    
    if (!res.ok) {
      errorEl.textContent = data.error || "Login failed";
      return;
    }
    
    if (!data.token) {
      errorEl.textContent = "No token received";
      return;
    }
    
    localStorage.setItem("token", data.token);
    window.location = "chat.html";
  } catch (error) {
    errorEl.textContent = "Error: " + error.message;
  }
}
