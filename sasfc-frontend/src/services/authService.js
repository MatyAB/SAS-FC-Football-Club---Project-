const API_URL = "http://localhost:8080/api/auth/login"; // Adjust port if needed

export async function login(email, password) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, message: errorText };
    }

    const data = await response.json();

    // Remove old key if present
    localStorage.removeItem("token");
    // Map backend response to expected frontend keys
    const token = data.accessToken;
    const admin = data.user;

    // Store in localStorage for consistency
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminData", JSON.stringify(admin));

    return { success: true, token, admin };
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

export const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminData');
};

export const getCurrentAdmin = () => {
  const adminData = localStorage.getItem('adminData');
  if (!adminData || adminData === "undefined") return null;
  try {
    return JSON.parse(adminData);
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('adminToken');
};