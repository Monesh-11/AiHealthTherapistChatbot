async function send() {
  const msg = document.getElementById("msg");
  const chat = document.getElementById("chat");
  
  if (!msg.value.trim()) {
    return;
  }
  
  // Display user message
  chat.innerHTML += `<p><strong>You:</strong> ${msg.value}</p>`;
  
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
    chat.innerHTML += `<p><strong>Error:</strong> ${data.error || "Unknown error"}</p>`;
    msg.value = "";
    return;
  }
  
  console.log("Response data:", data);
  const reply = data.reply || "No reply received";
  chat.innerHTML += `<p><strong>AI:</strong> ${reply}</p>`;
  msg.value = "";
}

function logout() {
  localStorage.removeItem("token");
  window.location = "index.html";
}
