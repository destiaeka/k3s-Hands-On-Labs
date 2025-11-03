export default function NewsCard({ text }) {
  return (
    <div className="bg-blue-100 text-blue-900 rounded-lg p-4 m-2 max-w-md mx-auto">
      <p className="font-medium">{text}</p>
    </div>
  );
}
