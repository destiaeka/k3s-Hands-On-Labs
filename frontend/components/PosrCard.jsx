export default function PostCard({ title, content }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "1rem",
      margin: "1rem 0",
      backgroundColor: "#fafafa"
    }}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}
