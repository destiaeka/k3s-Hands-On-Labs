import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postsRoute from "./routes/posts.js";
import usersRoute from "./routes/users.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Mini Forum Backend is running" });
});

app.use("/api/posts", postsRoute);
app.use("/api/users", usersRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
