import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style/todos.module.css";
import { FaSearch, FaChevronDown, FaBell, FaEnvelope } from "react-icons/fa";

const Dashboard = ({ username }) => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Number of tasks to display per page
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handlemyTodos = () => {
    navigate("/todos")
  }

  const handleAddTask = () => {
    if (task.trim() === "") {
      setError("Task cannot be empty");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: task,
      date: new Date().toLocaleDateString(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTask("");
    setError(null);
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setTask(taskToEdit.title);
      setIsEditing(id);
    }
  };

  const handleSaveTask = () => {
    if (task.trim() === "") {
      setError("Task cannot be empty");
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === isEditing ? { ...t, title: task } : t))
    );
    setTask("");
    setIsEditing(null);
    setError(null);
  };

  // Pagination Logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tasks.length / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoSearchContainer}>
          <h1 className={styles.title}>YOUDO</h1>
          <div
            className={`${styles.searchContainer} ${
              isSearchOpen ? styles.active : ""
            }`}
          >
            {isSearchOpen && (
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search..."
              />
            )}
            <FaSearch
              className={styles.searchIcon}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              size={20}
            />
          </div>
        </div>
        <div className={styles.dropdownContainer}>
          <div className={styles.iconContainer}>
            <FaBell className={styles.icon} />
            <FaEnvelope className={styles.icon} />
          </div>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={styles.dropdownButton}
          >
            {username} <FaChevronDown />
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownItem} onClick={handleProfile}>
                Profile
              </div>
              <div className={styles.dropdownItem} onClick={handlemyTodos}>
                myTodo
              </div>
              <div className={styles.dropdownItem} onClick={handleSettings}>
                Settings
              </div>
              <div className={styles.dropdownItem} onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.flexContainer}>
          <div className={`${styles.card} ${styles.cardTaskManager}`}>
            <h2 className={styles.tasksTitle}>Tasks</h2>
            <div className={styles.inputGroup}>
              <input
                type="text"
                className={styles.input}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task..."
              />
              {isEditing ? (
                <button onClick={handleSaveTask} className={styles.addButton}>
                  Save
                </button>
              ) : (
                <button onClick={handleAddTask} className={styles.addButton}>
                  Add
                </button>
              )}
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className={styles.scrollView}>
              {currentTasks.length === 0 ? (
                <p className={styles.noTasksMessage}>No tasks available</p>
              ) : (
                <ul className={styles.taskList}>
                  {currentTasks.map((task) => (
                    <li key={task.id} className={styles.taskItem}>
                      <div>
                        <span className={styles.taskTitle}>{task.title}</span>
                        <span className={styles.taskDate}>{task.date}</span>
                      </div>
                      <div className={styles.taskActions}>
                        <button
                          onClick={() => handleEditTask(task.id)}
                          className={styles.editButton}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={styles.pagination}>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`${styles.pageButton} ${
                    currentPage === number ? styles.activePage : ""
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        &copy; 2024 YOUDO. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
