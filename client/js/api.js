// client/js/api.js

const API_BASE_URL = "http://localhost:4000/api";

async function apiRequest(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

/* ---------- AUTH ---------- */

export function loginUser(email, password) {
  return apiRequest("/auth/login", "POST", { email, password });
}

export function registerUser(email, password) {
  return apiRequest("/auth/register", "POST", { email, password });
}

/* ---------- CHAT ---------- */

export function sendChatMessage(message) {
  return apiRequest("/chat/message", "POST", { message });
}
