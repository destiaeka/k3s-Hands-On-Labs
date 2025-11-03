import { useEffect, useState } from "react";
import axios from "axios";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://103.160.37.103:5000/api/books")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Book Recommendations</h2>
      <ul className="list-disc pl-5">
        {books.map((b, i) => (
          <li key={i}>{b.title} by {b.author}</li>
        ))}
      </ul>
    </div>
  );
}
