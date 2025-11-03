const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());

const config = JSON.parse(fs.readFileSync('./config.json'));

app.get('/api/quotes', (req, res) => {
  res.json(config.quotes);
});

app.get('/api/news', (req, res) => {
  res.json(config.news);
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
