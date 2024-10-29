import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connect from "./database/mongodb-connect.js";
import router from "./routes/todos.js";
import usersRouter from "./routes/users.js";
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Use body-parser middleware before routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Route handlers for API
app.use("/api", router);
app.use("/api", usersRouter);

// Catch-all route for SPA and to serve 404 page
// Ensures that any non-API call is redirected to the SPA's index.html
// Assuming you're using Express.js
app.use(express.static('frontend'));  // Serves all static files from 'frontend' directory

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Catch-all handler for SPA to handle client-side routing:
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get("*", (req, res) => {
  res.status(404).sendFile(join(__dirname, "frontend", "404.html"));
});


// Attempt connection to MongoDB
connect();

// Start the server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
