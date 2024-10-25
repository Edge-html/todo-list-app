// routes/todos.js
import express from "express";
import Todo from "../models/todo.js";

const router = express.Router();

router.get("/todos", async (req, res) => {
  // Fetch all todos and populate the 'user' field to include user details
  const todos = await Todo.find().populate('user');
  res.json(todos);
});

router.get("/todos/:id", async (req, res) => {
  // Fetch a single todo by id and populate the 'user' field
  const todo = await Todo.findById(req.params.id).populate('user');
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send("Todo not found");
  }
});

router.post("/todos", async (req, res) => {
  const { user, title, description } = req.body;

  // Check for required fields
  if (!user || !title) {
    return res.status(400).json({ message: "User and title are required." });
  }

  try {
    // Create and save the new todo
    const todo = new Todo({ user, title, description });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    // Handle any other errors
    res.status(500).json({ message: error.message });
  }
});

router.put("/todos/:id", async (req, res) => {
  const { title, description } = req.body;

  try {
    // Update the todo by id
    const todo = await Todo.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    // Delete the todo by id
    const result = await Todo.findByIdAndDelete(req.params.id);
    if (result) {
      res.send(`Deleted Todo with id ${req.params.id}`);
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

export default router;
