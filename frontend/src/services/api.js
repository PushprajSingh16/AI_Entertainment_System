const API_BASE = "http://localhost:8001";

const getAuthToken = () => localStorage.getItem("token");

const fetchWithAuth = async (url, options = {}) => {
  const token = getAuthToken();
  const fullUrl = `${API_BASE}${url}`;

  console.log(`[API] ${options.method || "GET"} ${fullUrl}`);

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    console.log(`[API] Response status: ${response.status}`);

    if (!response.ok) {
      const text = await response.text();
      console.error(`[API] Error: ${text}`);
      throw new Error(text || "Request failed");
    }

    const data = await response.json();
    console.log(`[API] Success:`, data);
    return data;
  } catch (error) {
    console.error(`[API] Network error:`, error);
    throw error;
  }
};

// ================= AUTH =================
export const authService = {
  login: async (email, password) => {
    console.log("[AUTH] Logging in:", email);
    const data = await fetchWithAuth("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    console.log("[AUTH] Login successful");
    return data;
  },

  signup: async (name, email, password) => {
    console.log("[AUTH] Signing up:", email);
    const data = await fetchWithAuth("/api/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    console.log("[AUTH] Signup successful");
    return data;
  },

  logout: () => {
    console.log("[AUTH] Logging out");
    localStorage.clear();
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

// ================= CHAT =================
export const chatService = {
  sendMessage: async (message) => {
    console.log("[CHAT] Sending message:", message);
    const data = await fetchWithAuth("/api/agent", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
    console.log("[CHAT] Received response:", data);
    return data.response;
  },
};

// ================= HEALTH =================
export const apiService = {
  health: async () => {
    console.log("[HEALTH] Checking health");
    return fetchWithAuth("/api/health");
  },
};