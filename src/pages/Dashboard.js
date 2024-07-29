// src/components/Dashboard.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../style/dashboard.module.css";
import { FaSearch, FaChevronDown, FaBell, FaEnvelope } from "react-icons/fa";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles
import { tasks, projects, followers } from '../data/DashboardDummy'; // Import dummy data

const ITEMS_PER_PAGE = 5;

const Dashboard = ({ username }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ tasks: [], projects: [], followers: [] });
  const [date, setDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Search functionality
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

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get paginated data
  const getPaginatedData = (data) => {
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
              <div className={styles.dropdownItem} onClick={() => handleNavigation("/profile")}>Profile</div>
              <div className={styles.dropdownItem} onClick={() => handleNavigation("/todos")}>MyTodo</div>
              <div className={styles.dropdownItem} onClick={() => handleNavigation("/settings")}>Settings</div>
              <div className={styles.dropdownItem} onClick={() => handleNavigation("/login")}>Logout</div>
            </div>
          )}
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.flexContainer}>
          <div className={styles.leftColumn}>
            {/* Tasks Container */}
            <div className={`${styles.card} ${styles.cardTaskManager}`}>
              <h2 className={styles.tasksTitle}>Tasks</h2>
              <ul className={styles.taskList}>
                {getPaginatedData(tasks).length === 0 ? (
                  <p className={styles.noTasksMessage}>No tasks available</p>
                ) : (
                  getPaginatedData(tasks).map((task) => (
                    <li key={task.id} className={styles.taskItem}>
                      <div>
                        <span className={styles.taskTitle}>{task.title}</span>
                        <span className={styles.taskDate}>{task.date}</span>
                      </div>
                    </li>
                  ))
                )}
              </ul>
              {/* Pagination Controls */}
              <div className={styles.paginationControls}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.paginationButton}
                >
                  Previous
                </button>
                <span className={styles.paginationInfo}>
                  Page {currentPage}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={getPaginatedData(tasks).length < ITEMS_PER_PAGE}
                  className={styles.paginationButton}
                >
                  Next
                </button>
              </div>
            </div>
            {/* Projects Container */}
            <div className={`${styles.card} ${styles.cardProjects}`}>
              <h2 className={styles.tasksTitle}>Projects</h2>
              <ul className={styles.taskList}>
                {getPaginatedData(projects).length === 0 ? (
                  <p className={styles.noTasksMessage}>No projects available</p>
                ) : (
                  getPaginatedData(projects).map((project) => (
                    <li key={project.id} className={styles.taskItem}>
                      <div>
                        <span className={styles.taskTitle}>{project.name}</span>
                        <span className={styles.taskDate}>{project.status}</span>
                      </div>
                    </li>
                  ))
                )}
              </ul>
              {/* Pagination Controls */}
              <div className={styles.paginationControls}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.paginationButton}
                >
                  Previous
                </button>
                <span className={styles.paginationInfo}>
                  Page {currentPage}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={getPaginatedData(projects).length < ITEMS_PER_PAGE}
                  className={styles.paginationButton}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className={styles.rightColumn}>
            {/* Followers Container */}
            <div className={`${styles.card} ${styles.cardFollowers}`}>
              <h2 className={styles.tasksTitle}>Followers</h2>
              <ul className={styles.taskList}>
                {getPaginatedData(followers).length === 0 ? (
                  <p className={styles.noTasksMessage}>No followers available</p>
                ) : (
                  getPaginatedData(followers).map((follower) => (
                    <li key={follower.id} className={styles.taskItem}>
                      <div>
                        <span className={styles.taskTitle}>{follower.name}</span>
                        <span className={styles.taskDate}>{follower.email}</span>
                      </div>
                    </li>
                  ))
                )}
              </ul>
              {/* Pagination Controls */}
              <div className={styles.paginationControls}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.paginationButton}
                >
                  Previous
                </button>
                <span className={styles.paginationInfo}>
                  Page {currentPage}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={getPaginatedData(followers).length < ITEMS_PER_PAGE}
                  className={styles.paginationButton}
                >
                  Next
                </button>
              </div>
            </div>
            {/* Calendar Container */}
            <div className={`${styles.card} ${styles.calendarContainer}`}>
              <h2 className={styles.calendarTitle}>Calendar</h2>
              <Calendar
                onChange={setDate}
                value={date}
                className={styles.calendar}
              />
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

Dashboard.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Dashboard;
