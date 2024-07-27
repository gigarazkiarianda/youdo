import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style/dashboard.module.css';
import { FaSearch, FaChevronDown } from 'react-icons/fa'; // Import icons

const Dashboard = ({ username }) => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu
  const navigate = useNavigate(); // Hook for navigation

  // Handle logout
  const handleLogout = () => {
    navigate('/login'); // Adjust the path to your login page
  };

  // Handle profile selection
  const handleProfile = () => {
    navigate('/profile'); // Adjust the path to your profile page
  };

  // Handle settings selection
  const handleSettings = () => {
    navigate('/settings'); // Adjust the path to your settings page
  };

  // Add a new task
  const handleAddTask = () => {
    if (task.trim() === '') {
      setError('Task cannot be empty');
      return;
    }

    const newTask = {
      id: Date.now(), // Simple unique ID based on timestamp
      title: task,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTask('');
    setError(null);
  };

  // Delete a task by ID
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>YOUDO</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
          />
          <FaSearch className={styles.searchIcon} />
        </div>
        <div className={styles.dropdownContainer}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={styles.dropdownButton}
          >
            {username} <FaChevronDown />
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <button onClick={handleProfile} className={styles.dropdownItem}>
                Profile
              </button>
              <button onClick={handleSettings} className={styles.dropdownItem}>
                Settings
              </button>
              <button onClick={handleLogout} className={styles.dropdownItem}>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <h2 className={styles.tasksTitle}>Tasks</h2>

          <div className={styles.inputGroup}>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className={styles.input}
              placeholder="Add a new task"
            />
            <button
              onClick={handleAddTask}
              className={styles.addButton}
            >
              Add Task
            </button>
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}

          {tasks.length > 0 ? (
            <ul className={styles.taskList}>
              {tasks.map((t) => (
                <li key={t.id} className={styles.taskItem}>
                  <span>{t.title}</span>
                  <button
                    onClick={() => handleDeleteTask(t.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noTasksMessage}>No tasks added yet.</p>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>&copy; 2024 YOUDO. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
