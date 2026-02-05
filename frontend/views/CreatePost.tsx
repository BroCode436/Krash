import React, { useState, useRef } from "react";

interface CreatePostProps {
  onBack: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onBack }) => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    console.log("POST CLICKED");

    if (!content && !file) {
      alert("Add text or file");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("UPLOAD SUCCESS:", data);
      alert("Post uploaded 🎉");
      setContent("");
      setFile(null);
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={onBack}>⬅ Back</button>

      <h2>Create Post</h2>

      <textarea
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: 100 }}
      />

      <br /><br />

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <br /><br />

      <button onClick={handleSubmit}>POST</button>
    </div>
  );
};

export default CreatePost;
