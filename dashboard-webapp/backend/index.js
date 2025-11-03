const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

// Dummy data
const quotes = [
  "The best way to get started is to quit talking and begin doing.",
  "Don’t let yesterday take up too much of today.",
  "It’s not whether you get knocked down, it’s whether you get up."
];

const books = [
  { title: "Atomic Habits", author: "James Clear" },
  { title: "Deep Work", author: "Cal Newport" },
  { title: "The Alchemist", author: "Paulo Coelho" }
];

const news = [
  { title: "Tech News Today", link: "#" },
  { title: "AI is changing the world", link: "#" },
  { title: "New React Version Released", link: "#" }
];

const schedule = [
  { time: "08:00", task: "Breakfast & News" },
  { time: "09:00", task: "Study / Work" },
  { time: "12:00", task: "Lunch" },
  { time: "14:00", task: "Project / Coding" }
];

// Routes
app.get('/api/quotes', (req, res) => res.json(quotes));
app.get('/api/books', (req, res) => res.json(books));
app.get('/api/news', (req, res) => res.json(news));
app.get('/api/schedule', (req, res) => res.json(schedule));

app.listen(port, () => console.log(`Backend running on port ${port}`));
