const API_URL = "https://surakshitfasal-ai.onrender.com";

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

  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  return await response.json();
}
