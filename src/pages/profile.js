import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../style/profile.module.css";
import { FaSearch, FaChevronDown, FaBell, FaCommentDots } from "react-icons/fa";
import { tasks, projects, notifications, chats, profile } from '../data/DashboardDummy'; // Import dummy data

const ITEMS_PER_PAGE = 5;

const Profile = ({ username }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ tasks: [], projects: [] });
  const [currentPageTasks, setCurrentPageTasks] = useState(1);
  const [currentPageProjects, setCurrentPageProjects] = useState(1);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isChatsOpen, setIsChatsOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
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

  // Edit and Save functionality
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleSaveTask = (taskId) => {
    // Implement save functionality here
    setEditingTask(null);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
  };

  const handleSaveProject = (projectId) => {
    // Implement save functionality here
    setEditingProject(null);
  };

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
              <div className={styles.dropdownItem} onClick={() => handleNavigation("/todos")}>MyTodo</div>
              <div className={styles.dropdownItem} onClick={() => handleNavigation("/settings")}>Settings</div>
              <div className={styles.dropdownItem} onClick={() => handleNavigation("/login")}>Logout</div>
              
            </div>
          )}
        </div>
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
            <ul className={styles.chatsList}>
              {chats.length > 0 ? (
                chats.map((chat) => (
                  <li key={chat.id} className={styles.chatItem}>
                  {chat.name}
                  <br/>
                  {chat.message}
                  <button><a href={"/chat"}>read more</a></button>
                </li>
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
          <div className={styles.cardProfile}>
            <div className={styles.card}>
              <div className={styles.profilePhoto}>
                <img src={profile.photo} alt="Profile" className={styles.profileImage} />
              </div>
              <div className={styles.profileInfo}>
                <div className={styles.profileStats}>
                  <div className={styles.profileStat}>
                    <span className={styles.profileStatCount}>2M</span>
                    <span className={styles.profileStatLabel}>
                    <a href="/followers">Followers</a>
                    </span>
                    
                  </div>
                  <div className={styles.profileStat}>
                    <span className={styles.profileStatCount}>180</span>
                    <span className={styles.profileStatLabel}>
                    <a href="/following">Following</a>
                    </span>
                    
                  </div>
                  <div className={styles.profileStat}>
                    <span className={styles.profileStatCount}>{projects.length}</span>
                    <span className={styles.profileStatLabel}>
                    <a href="/projects">Projects</a>
                    </span>
                  </div>
                </div>
                <div className={styles.profileUsername}>{profile.username}</div>
                <div className={styles.profileDescription}>{profile.deskripsi}</div>
              </div>
              <button className={styles.editProfileButton}><a href="/edit-profile">Edit Profile</a></button>
            </div>
          </div>
          <div className={styles.cardTaskManager}>
            <div className={styles.card}>
              <h2 className={styles.tasksTitle}>Task Manager</h2>
              <ul className={styles.taskList}>
                {getPaginatedData(tasks, currentPageTasks).map((task) => (
                  <li key={task.id} className={styles.taskItem}>
                    {task.title} - {task.date}
                    <button onClick={() => handleEditTask(task)}>Edit</button>
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
                <span>Page {currentPageTasks}</span>
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
                    {project.name} - {project.status}
                    <button onClick={() => handleEditProject(project)}>Edit</button>
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
                <span>Page {currentPageProjects}</span>
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
        <p>&copy; {new Date().getFullYear()} YOUDO. All rights reserved.</p>
      </footer>
    </div>
  );
};

Profile.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Profile;
