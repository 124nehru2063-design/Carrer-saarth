export async function generateFromBackend(prompt: string) {
  const res = await fetch("http://localhost:4000/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch from backend");
  }

  const data = await res.json();
  return data;
}
