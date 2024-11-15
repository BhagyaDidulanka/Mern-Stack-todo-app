import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

 
  const handleCheckboxChange = (id) => {
    const updatedTodos = todos.map(todo =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

   
    const todoToUpdate = updatedTodos.find(todo => todo._id === id);
    axios.put(`http://localhost:3001/update/${id}`, { completed: todoToUpdate.completed })
      .catch(err => console.log(err));
  };

  return (
    <div className='home'>
      <h2>ToDo List</h2>
      <Create />
      {
        todos.length === 0
          ? <div><h2>No Record</h2></div>
          : todos.map(todo => (
              <div className="todo-item" key={todo._id}>
                <input
                  type="checkbox"
                  checked={todo.completed} 
                  onChange={() => handleCheckboxChange(todo._id)}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.task}
                </span>
                <button className="delete-btn" onClick={() => handleDelete(todo._id)}>🗑️</button>
              </div>
            ))
      }
    </div>
  );
}

export default Home;
