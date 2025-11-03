import { useEffect, useState } from 'react';
import QuoteCard from './components/QuoteCard';
import NewsCard from './components/NewsCard';
import axios from 'axios';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('http://backend:3000/api/quotes').then(res => setQuotes(res.data));
    axios.get('http://backend:3000/api/news').then(res => setNews(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Stylish Quotes & News</h1>
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Quotes</h2>
        {quotes.map((q, idx) => <QuoteCard key={idx} text={q} />)}
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">News</h2>
        {news.map((n, idx) => <NewsCard key={idx} text={n} />)}
      </div>
    </div>
  );
}

export default App;
