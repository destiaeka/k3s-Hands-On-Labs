import Quotes from './components/Quotes';
import Books from './components/Books';
import News from './components/News';
import Schedule from './components/Schedule';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">My Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Quotes />
        <Books />
        <News />
        <Schedule />
      </div>
    </div>
  );
}

export default App;
