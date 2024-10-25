// routes/todos.js
import express from "express";
import Todo from "../models/todo.js";

const router = express.Router();

router.get("/todos", async (req, res) => {

  const todos = await Todo.find().populate('user');
  res.json(todos);
});

router.get("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id).populate('user');
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send("Todo not found");
  }
});

router.post("/todos", async (req, res) => {
  const { user, title, description } = req.body;

  if (!user || !title) {
    return res.status(400).json({ message: "User and title are required." });
  }

  try {
   
    const todo = new Todo({ user, title, description });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
 
    res.status(500).json({ message: error.message });
  }
});

router.put("/todos/:id", async (req, res) => {
  const { title, description } = req.body;

  try {
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
