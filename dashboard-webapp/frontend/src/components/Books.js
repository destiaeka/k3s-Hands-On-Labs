import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(res => setBooks(res.data));
  }, []);

  return (
    <div className="bg-green-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
      <h2 className="font-bold text-xl mb-2">Book Recommendations</h2>
      <ul className="list-disc pl-5 text-gray-800">
        {books.map((book, idx) => (
          <li key={idx}>{book.title} - {book.author}</li>
        ))}
      </ul>
    </div>
  );
}
