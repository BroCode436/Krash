const form = document.getElementById("uploadForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const file = document.getElementById("file").files[0];

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("file", file);

  statusText.innerText = "Uploading...";

  try {
    const res = await fetch("http://localhost:5000/api/data", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      statusText.innerText = "Upload successful ✅";
      form.reset();
    } else {
      statusText.innerText = data.message || "Upload failed ❌";
    }
  } catch (err) {
    statusText.innerText = "Server error ❌";
  }
});
