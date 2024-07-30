import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style/todos.module.css";
import { FaSearch, FaChevronDown, FaBell, FaCommentDots } from "react-icons/fa";
import { tasks, projects, followers, notifications, chats } from '../data/DashboardDummy';

const Dashboard = ({ username }) => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ tasks: [], projects: [], followers: [] });
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isChatsOpen, setIsChatsOpen] = useState(false);
  const tasksPerPage = 5;
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults({ tasks: [], projects: [], followers: [] });
      return;
    }

    const searchTasks = tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const searchProjects = projects.filter(project =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const searchFollowers = followers.filter(follower =>
      follower.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults({
      tasks: searchTasks,
      projects: searchProjects,
      followers: searchFollowers
    });
  }, [searchQuery]);

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

  const handleMyTodos = () => {
    navigate("/todos");
  };

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
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchOpen(true)}
          onBlur={() => setTimeout(() => setIsSearchOpen(false), 100)}
        />
        <FaSearch
          className={styles.searchIcon}
          size={20}
        />
        {isSearchOpen && (
          <div className={styles.searchDropdown}>
            {searchQuery.trim() === '' ? null : searchResults.tasks.length === 0 && searchResults.projects.length === 0 && searchResults.followers.length === 0 ? (
              <div className={styles.noResultsMessage}>No results found</div>
            ) : (
              <>
                {searchResults.tasks.length > 0 && (
                  <div className={styles.searchSection}>
                    <h3>Tasks</h3>
                    <ul className={styles.searchList}>
                      {searchResults.tasks.map((task) => (
                        <li key={task.id} className={styles.searchItem}>{task.title}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {searchResults.projects.length > 0 && (
                  <div className={styles.searchSection}>
                    <h3>Projects</h3>
                    <ul className={styles.searchList}>
                      {searchResults.projects.map((project) => (
                        <li key={project.id} className={styles.searchItem}>{project.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {searchResults.followers.length > 0 && (
                  <div className={styles.searchSection}>
                    <h3>Followers</h3>
                    <ul className={styles.searchList}>
                      {searchResults.followers.map((follower) => (
                        <li key={follower.id} className={styles.searchItem}>{follower.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
    <div className={styles.dropdownContainer}>
      <div className={styles.iconContainer}>
        <FaBell 
          className={styles.icon} 
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} 
        />
        <FaCommentDots 
          className={styles.icon} 
          onClick={() => setIsChatsOpen(!isChatsOpen)} 
        />
      </div>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={styles.dropdownButton}
      >
        {username} <FaChevronDown />
      </button>
      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dropdownItem} onClick={() => handleNavigation("/profile")}>Profile</div>
          <div className={styles.dropdownItem} onClick={() => handleNavigation("/todos")}>MyTodo</div>
          <div className={styles.dropdownItem} onClick={() => handleNavigation("/settings")}>Settings</div>
          <div className={styles.dropdownItem} onClick={() => handleNavigation("/login")}>Logout</div>
        </div>
      )}
    </div>
  </header>
  {isNotificationsOpen && (
    <div className={styles.notificationsDropdown}>
      <h3>Notifications</h3>
      <ul className={styles.notificationsList}>
        {notifications.length === 0 ? (
          <p className={styles.noNotificationsMessage}>No notifications</p>
        ) : (
          notifications.map(notification => (
            <li key={notification.id} className={styles.notificationItem}>
              {notification.message}
            </li>
          ))
        )}
      </ul>
    </div>
  )}
  {isChatsOpen && (
    <div className={styles.chatsDropdown}>
      <h3>Chats</h3>
      <ul className={styles.chatsList}>
        {chats.length === 0 ? (
          <p className={styles.noChatsMessage}>No chats</p>
        ) : (
          chats.map(chat => (
            <li key={chat.id} className={styles.chatItem}>
              {chat.name}
              <br/>
              <button>read more</button>
            </li>
          ))
        )}
      </ul>
    </div>
  )}
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
