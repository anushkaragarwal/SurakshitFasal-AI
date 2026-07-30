const API_URL = "http://127.0.0.1:8000";

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  return data;
}
export async function analyzeCrop(file: File, city: string) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("language", "en");
  formData.append("city", city);

  const response = await fetch("http://127.0.0.1:8000/analyze", {
    method: "POST",
    body: formData,
  });

  return await response.json();
}
