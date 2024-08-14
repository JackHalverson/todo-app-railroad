import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos on component mount
  useEffect(() => {
    axios.get('https://todo-backend-production-2ac8.up.railway.app')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Add a new todo
  const addTodo = () => {
    axios.post('https://todo-backend-production-2ac8.up.railway.app', { number: todos.length + 1, description: newTodo })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo("");  // Clear input after submission
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  return (
    <div className='list'>
      <h1>Todo List</h1>
      <div className='listings'>
      {todos.map(todo => (
        <div key={todo.id}>{todo.number}. {todo.description}</div>
      ))}
      </div>
      <input
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};

export default TodoApp;
