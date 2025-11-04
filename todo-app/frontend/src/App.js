import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  const addTodo = () => {
    if (!newTodo) return;
    axios.post('http://localhost:3000/todos', { text: newTodo })
      .then(res => {
        setTodos([...todos, res.data]);
        setNewTodo('');
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">📝 Todo App</h1>

      <div className="flex items-center space-x-2 mb-6">
        <input
          type="text"
          placeholder="Tulis kegiatan..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          <FaPlus className="mr-1" /> Tambah
        </button>
      </div>

      <ul className="space-y-2 w-72">
        {todos.map((todo, index) => (
          <li key={index} className="bg-white shadow p-3 rounded-lg border-l-4 border-blue-500">
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
