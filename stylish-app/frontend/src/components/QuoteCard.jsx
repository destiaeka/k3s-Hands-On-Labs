export default function QuoteCard({ text }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-2 max-w-md mx-auto">
      <p className="text-gray-800 font-semibold">{text}</p>
    </div>
  );
}
