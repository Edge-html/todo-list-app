import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import connect from "./database/mongodb-connect.js";
import todosRouter from "./routes/todos.js";
import usersRouter from "./routes/users.js";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, ".."); 

// Connect to MongoDB
connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(projectRoot, "frontend")));

// API route handlers
app.use("/api", todosRouter);
app.use("/api", usersRouter);

// Serve index.html for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(projectRoot, "frontend", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
