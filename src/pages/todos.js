import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style/todos.module.css";
import { FaSearch, FaChevronDown, FaBell, FaCommentDots } from "react-icons/fa";
import { getAllTodos, createTodo, updateTodo, deleteTodo, getTodosByUserId } from '../services/todoService';
import { logout } from '../services/authServices';
import { notifications, chats } from '../data/DashboardDummy';

const Todos = ({ username }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    deadline: "",
    status: "pending"
  });
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isChatsOpen, setIsChatsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const tasksPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const searchTasks = tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(searchTasks);
  }, [searchQuery, tasks]);

  const fetchTodos = async () => {
    try {
      const data = await getTodosByUserId();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const handleAddTask = async () => {
    if (task.title.trim() === "") {
      setError("Title cannot be empty");
      return;
    }

    const newTask = {
      ...task,
    };

    try {
      const createdTask = await createTodo(newTask);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setTask({
        title: "",
        description: "",
        category: "",
        deadline: "",
        status: "pending"
      });
      setError(null);
    } catch (error) {
      setError("Failed to add task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTodo(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      handleClosePopup(); 
    } catch (error) {
      console.error(`Failed to delete task with id ${id}:`, error);
    }
  };

  const handleEditTask = async () => {
    if (task.title.trim() === "") {
      setError("Title cannot be empty");
      return;
    }

    try {
      await updateTodo(isEditing, task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === isEditing ? { ...t, ...task } : t))
      );
      setTask({
        title: "",
        description: "",
        category: "",
        deadline: "",
        status: "pending"
      });
      setIsEditing(null);
      setError(null);
    } catch (error) {
      setError("Failed to save task");
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedTask(null);
    setTask({
      title: "",
      description: "",
      category: "",
      deadline: "",
      status: "pending"
    });
    setIsEditing(null);
  };
  const handleLogout = async () => {
    await logout();
    navigate("/login");
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
          <h1 className={styles.title}><a href="/dashboard">YOUDO</a></h1>
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
            <FaSearch className={styles.searchIcon} size={20} />
            {isSearchOpen && (
              <div className={styles.searchDropdown}>
                {searchQuery.trim() === '' ? null : searchResults.length === 0 ? (
                  <div className={styles.noResultsMessage}>No results found</div>
                ) : (
                  <div className={styles.searchSection}>
                    <h3>Tasks</h3>
                    <ul className={styles.searchList}>
                      {searchResults.map((task) => (
                        <li key={task.id} className={styles.searchItem}>{task.title}</li>
                      ))}
                    </ul>
                  </div>
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
              <div className={styles.dropdownItem} onClick={() => navigate("/profile")}>Profile</div>
              <div className={styles.dropdownItem} onClick={() => navigate("/todos")}>MyTodo</div>
              <div className={styles.dropdownItem} onClick={() => navigate("/settings")}>Settings</div>
              <div className={styles.dropdownItem} onClick={handleLogout}>Logout</div>
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
                  <button><a href={`/chat/${chat.id}`}>Read more</a></button>
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
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                placeholder="Title"
              />
              <textarea
                className={styles.input}
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                placeholder="Description"
              />
              <input
                type="text"
                className={styles.input}
                value={task.category}
                onChange={(e) => setTask({ ...task, category: e.target.value })}
                placeholder="Category"
              />
              <input
                type="date"
                className={styles.input}
                value={task.deadline}
                onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                placeholder="Deadline"
              />
              <select
                className={styles.input}
                value={task.status}
                onChange={(e) => setTask({ ...task, status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
              </select>
              {isEditing ? (
                <button onClick={handleEditTask} className={styles.addButton}>
                  Save
                </button>
              ) : (
                <button onClick={handleAddTask} className={styles.addButton}>
                  Add
                </button>
              )}
            </div>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <div className={styles.scrollView}>
              {currentTasks.length === 0 ? (
                <p className={styles.noTasksMessage}>No tasks available</p>
              ) : (
                <ul className={styles.taskList}>
                  {currentTasks.map((task) => (
                    <li key={task.id} className={styles.taskItem}>
                      <div>
                        <span className={styles.taskTitle}>{task.title}</span>
                        <span className={styles.taskDate}>{task.deadline}</span>
                      </div>
                      <div className={styles.taskActions}>
                        <button onClick={() => handleTaskClick(task)} className={styles.viewButton}>View</button>
                        <button onClick={() => { 
                          setTask(task);
                          setIsEditing(task.id);
                        }} className={styles.editButton}>Edit</button>
                        <button onClick={() => handleDeleteTask(task.id)} className={styles.deleteButton}>Delete</button>
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
      {isPopupOpen && selectedTask && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={handleClosePopup}>Close</button>
            <h3 className={styles.popupTitle}>{selectedTask.title}</h3>
            <p><strong>Description:</strong> {selectedTask.description}</p>
            <p><strong>Status:</strong> {selectedTask.status}</p>
            <p><strong>Deadline:</strong> {selectedTask.deadline}</p>
            <p><strong>Category:</strong> {selectedTask.category}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todos;
