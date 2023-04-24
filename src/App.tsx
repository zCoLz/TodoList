import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className='bg-gradient-to-r from-indigo-500 from-20% via-purple-500 via-45% to-pink-500 to-96% h-screen flex items-center justify-center'>
      <TodoList />
    </div>
  );
}

export default App;
