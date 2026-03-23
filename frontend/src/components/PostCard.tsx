type Props = {
  post: any;
};

function PostCard({ post }: Props) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: 15,
      borderRadius: 10,
      marginBottom: 20
    }}>
      <h3>{post.title || "No title"}</h3>

      <p style={{ fontSize: 12 }}>{post.description}</p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="post"
          style={{ width: "100%", borderRadius: 10 }}
        />
      )}
    </div>
  );
}

export default PostCard;
