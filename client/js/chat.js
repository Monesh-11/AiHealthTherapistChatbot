async function send() {
  const msg = document.getElementById("msg");
  const chat = document.getElementById("chat");

  if (!msg.value.trim()) {
    return;
  }

  // Display user message
  chat.innerHTML += `<div class="message user">${msg.value}</div>`;

  const res = await fetch("http://localhost:4000/api/chat/message", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: msg.value })
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Error from server:", data);
    chat.innerHTML += `<div class="message bot" style="color: #ff6b6b;">Error: ${data.error || "Unknown error"}</div>`;
    msg.value = "";
    return;
  }

  console.log("Response data:", data);
  const reply = data.reply || "No reply received";
  chat.innerHTML += `<div class="message bot">${marked.parse(reply)}</div>`;
  msg.value = "";

  // Auto-scroll to bottom
  chat.scrollTop = chat.scrollHeight;
}

function logout() {
  localStorage.removeItem("token");
  window.location = "index.html";
}

function logout() {
  localStorage.removeItem("token");
  window.location = "index.html";
}

function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Load theme on startup
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
  }
});
