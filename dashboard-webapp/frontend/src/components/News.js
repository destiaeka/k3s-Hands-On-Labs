import { useEffect, useState } from "react";
import axios from "axios";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("http://103.160.37.103:5000/api/news")
      .then(res => setNews(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Latest News</h2>
      <ul className="list-disc pl-5">
        {news.map((n, i) => (
          <li key={i}>
            <a 
              href={n.link || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {n.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
