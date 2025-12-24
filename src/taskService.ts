async function callAPI() {
  const res = await fetch("http://localhost:4000/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: "Hello" }),
  });

  const data = await res.json();
  console.log(data);
}
