import { useEffect, useState } from 'react';
import axios from 'axios';

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/news')
      .then(res => setNews(res.data));
  }, []);

  return (
    <div className="bg-yellow-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
      <h2 className="font-bold text-xl mb-2">Latest News</h2>
      <ul className="list-disc pl-5 text-gray-800">
        {news.map((item, idx) => (
          <li key={idx}><a href={item.link} className="underline text-blue-700">{item.title}</a></li>
        ))}
      </ul>
    </div>
  );
}
