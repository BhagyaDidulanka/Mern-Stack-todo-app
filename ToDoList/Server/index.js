const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});


app.post('/add', (req, res) => {
  const { task } = req.body;
  TodoModel.create({ task: task, completed: false })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});


app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
      .then(() => res.json({ message: "Task deleted successfully" }))
      .catch(err => res.status(500).json(err));
  });
  

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  TodoModel.findByIdAndUpdate(id, { completed: completed }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});


app.listen(3001, () => {
  console.log("Server is Running on http://localhost:3001");
});
