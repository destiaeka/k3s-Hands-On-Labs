import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";

const API_URL = "http://todo-service/todos"; // service name di K8s

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text.trim()) return;
    await axios.post(API_URL, { text });
    setText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  return (
    <div className="bg-white shadow-2xl rounded-3xl p-10 w-[400px] text-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">📝 Todo App</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="border rounded-lg p-2 w-full focus:outline-blue-400"
          placeholder="Tulis kegiatan..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
        >
          <FaPlus />
        </button>
      </div>
      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center bg-blue-50 p-3 rounded-xl"
          >
            <span className="text-gray-700">{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
