import { useState } from "react";

function UploadBox({ onUpload }: any) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file && !content) return;

    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("title", content);
    formData.append("description", content);

    await fetch("http://127.0.0.1:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    setContent("");
    setFile(null);
    onUpload();
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Write something"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <br /><br />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadBox;

