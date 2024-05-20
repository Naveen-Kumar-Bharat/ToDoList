import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme) {
            setDarkMode(JSON.parse(savedTheme));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const handleDeleteTask = (index) => {
        const newTasks = tasks.filter((task, taskIndex) => taskIndex !== index);
        setTasks(newTasks);
    };

    const handleToggleComplete = (index) => {
        const newTasks = tasks.map((task, taskIndex) =>
            taskIndex === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
    };

    const handleEditTask = (index, newText) => {
        const newTasks = tasks.map((task, taskIndex) =>
            taskIndex === index ? { ...task, text: newText } : task
        );
        setTasks(newTasks);
    };
    const handleClearAll = () => {
      setTasks([]);
  };

  const toggleDarkMode = () => {
      setDarkMode(!darkMode);
  };

  return (
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
          <header>
              <h1>To-Do List</h1>
              <button className="theme-toggle" onClick={toggleDarkMode}>
                  {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
          </header>
          <div className="input-container">
              <input
                  type="text"
                  value={newTask}
                  onChange={handleInputChange}
                  placeholder="Add a new task"
              />
              <button onClick={handleAddTask}>Add</button>
          </div>
          <ul className="task-list">
              {tasks.map((task, index) => (
                  <li key={index} className={task.completed ? 'completed' : ''}>
                      <input
                          type="text"
                          value={task.text}
                          onChange={(e) => handleEditTask(index, e.target.value)}
                          className="task-input"
                      />
                      <button onClick={() => handleToggleComplete(index)}>
                          {task.completed ? 'Undo' : 'Complete'}
                      </button>
                      <button onClick={() => handleDeleteTask(index)}>Delete</button>
                  </li>
              ))}
          </ul>
          {tasks.length > 0 && (
              <button className="clear-all" onClick={handleClearAll}>Clear All</button>
          )}
      </div>
  );
}

export default App;

