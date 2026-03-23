import { useEffect, useState } from "react";

interface Post {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/upload")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (posts.length === 0) return <p>No posts yet</p>;

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <h2>Feed</h2>

      {posts.map(post => (
        <div
          key={post._id}
          style={{
            border: "1px solid #ddd",
            padding: 10,
            marginBottom: 20,
            borderRadius: 12,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
        >
          <img
            src={post.imageUrl}
            alt="post"
            style={{
              width: "100%",
              maxHeight: 300,
              objectFit: "cover",
              borderRadius: 10
            }}
          />

          <h3>{post.title}</h3>
          <p>{post.description}</p>

          <button
            onClick={() => {
              fetch(`http://localhost:5000/api/upload/${post._id}`, {
                method: "DELETE",
              }).then(() => window.location.reload());
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Feed;
