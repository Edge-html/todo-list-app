// models/todo.js
import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String } // Optional
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;
