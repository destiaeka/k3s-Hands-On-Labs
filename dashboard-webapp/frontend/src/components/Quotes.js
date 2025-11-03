import { useEffect, useState } from "react";
import axios from "axios";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    axios.get("http://103.160.37.103:5000/api/quotes")
      .then(res => setQuotes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Quote of the Day</h2>
      <ul className="list-disc pl-5">
        {quotes.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>
    </div>
  );
}
