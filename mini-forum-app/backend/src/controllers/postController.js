import fs from "fs";
import path from "path";

const dataPath = path.resolve("./src/data/posts.json");

export const getPosts = (req, res) => {
  const posts = JSON.parse(fs.readFileSync(dataPath));
  res.json(posts);
};

export const createPost = (req, res) => {
  const posts = JSON.parse(fs.readFileSync(dataPath));
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  posts.push(newPost);
  fs.writeFileSync(dataPath, JSON.stringify(posts, null, 2));
  res.status(201).json(newPost);
};
