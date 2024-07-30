import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../style/profile.module.css";
import { FaSearch, FaChevronDown, FaBell, FaCommentDots } from "react-icons/fa";
import { tasks, projects, notifications, chats } from '../data/DashboardDummy'; // Import dummy data

const ITEMS_PER_PAGE = 5;

const Dashboard = ({ username }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ tasks: [], projects: [] });
  const [currentPageTasks, setCurrentPageTasks] = useState(1);
  const [currentPageProjects, setCurrentPageProjects] = useState(1);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isChatsOpen, setIsChatsOpen] = useState(false);
  const navigate = useNavigate();

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults({ tasks: [], projects: [] });
      return;
    }

    const searchTasks = tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const searchProjects = projects.filter(project =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults({
      tasks: searchTasks,
      projects: searchProjects
    });
  }, [searchQuery]);

  // Pagination handlers
  const handlePageChangeTasks = (page) => {
    setCurrentPageTasks(page);
  };

  const handlePageChangeProjects = (page) => {
    setCurrentPageProjects(page);
  };

  // Get paginated data
  const getPaginatedData = (data, currentPage) => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return data.slice(start, end);
  };

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
                {searchQuery.trim() === '' ? null : searchResults.tasks.length === 0 && searchResults.projects.length === 0 ? (
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
            <FaChevronDown />
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownItem} onClick={() => handleNavigation("/profile")}>Profile</div>
              <div className={styles.dropdownItem} onClick={() => handleNavigation("/settings")}>Settings</div>
              <div className={styles.dropdownItem} onClick={() => handleNavigation("/logout")}>Logout</div>
            </div>
          )}
        </div>
        {isNotificationsOpen && (
          <div className={styles.notificationsDropdown}>
            <ul className={styles.notificationsList}>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <li key={notification.id} className={styles.notificationItem}>{notification.text}</li>
                ))
              ) : (
                <div className={styles.noNotificationsMessage}>No notifications</div>
              )}
            </ul>
          </div>
        )}
        {isChatsOpen && (
          <div className={styles.chatsDropdown}>
            <ul className={styles.chatsList}>
              {chats.length > 0 ? (
                chats.map((chat) => (
                  <li key={chat.id} className={styles.chatItem}>{chat.message}</li>
                ))
              ) : (
                <div className={styles.noChatsMessage}>No chats</div>
              )}
            </ul>
          </div>
        )}
      </header>
      <main className={styles.main}>
        <div className={styles.cardsContainer}>
          <div className={styles.cardTaskManager}>
            <div className={styles.card}>
              <h2 className={styles.tasksTitle}>Task Manager</h2>
              <ul className={styles.taskList}>
                {getPaginatedData(tasks, currentPageTasks).map((task) => (
                  <li key={task.id} className={styles.taskItem}>
                    <div className={styles.taskContent}>
                      <span className={styles.taskTitle}>{task.title}</span>
                      <br/>
                      <span className={styles.taskDate}>{task.date}</span>
                    </div>
                    <button className={styles.editButton}>Edit</button>
                  </li>
                ))}
              </ul>
              <div className={styles.pagination}>
                <button
                  onClick={() => handlePageChangeTasks(currentPageTasks - 1)}
                  disabled={currentPageTasks === 1}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChangeTasks(currentPageTasks + 1)}
                  disabled={currentPageTasks * ITEMS_PER_PAGE >= tasks.length}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className={styles.cardProjectManager}>
            <div className={styles.card}>
              <h2 className={styles.projectsTitle}>Project Manager</h2>
              <ul className={styles.projectList}>
                {getPaginatedData(projects, currentPageProjects).map((project) => (
                  <li key={project.id} className={styles.projectItem}>
                    <div className={styles.projectContent}>
                      <span className={styles.projectName}>{project.name}</span>
                      <br/>
                      <span className={styles.projectStatus}>{project.status}</span>
                    </div>
                    <button className={styles.editButton}>Edit</button>
                  </li>
                ))}
              </ul>
              <div className={styles.pagination}>
                <button
                  onClick={() => handlePageChangeProjects(currentPageProjects - 1)}
                  disabled={currentPageProjects === 1}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChangeProjects(currentPageProjects + 1)}
                  disabled={currentPageProjects * ITEMS_PER_PAGE >= projects.length}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        © 2024 YOUDO. All rights reserved.
      </footer>
    </div>
  );
};

Dashboard.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Dashboard;
