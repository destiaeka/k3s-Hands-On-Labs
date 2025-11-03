import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Quotes() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/quotes')
      .then(res => {
        const random = res.data[Math.floor(Math.random() * res.data.length)];
        setQuote(random);
      });
  }, []);

  return (
    <div className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
      <h2 className="font-bold text-xl mb-2">Quote of the Day</h2>
      <p className="italic text-gray-700">"{quote}"</p>
    </div>
  );
}
