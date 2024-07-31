import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../style/dashboard.module.css";
import { FaSearch, FaChevronDown, FaBell, FaEnvelope, FaCommentDots } from "react-icons/fa";
import { tasks, projects, followers, notifications, chats } from '../data/DashboardDummy'; // Import dummy data

const ITEMS_PER_PAGE = 5;

const Dashboard = ({ username }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ tasks: [], projects: [], followers: [] });
  const [currentPageTasks, setCurrentPageTasks] = useState(1);
  const [currentPageProjects, setCurrentPageProjects] = useState(1);
  const [currentPageFollowers, setCurrentPageFollowers] = useState(1);
  const [currentPageChats, setCurrentPageChats] = useState(1);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isChatsOpen, setIsChatsOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editProjectId, setEditProjectId] = useState(null);
  const [isFollowing, setIsFollowing] = useState(new Array(followers.length).fill(true)); // Assuming all followers are initially followed
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
  const handlePageChangeTasks = (page) => {
    setCurrentPageTasks(page);
  };

  const handlePageChangeProjects = (page) => {
    setCurrentPageProjects(page);
  };

  const handlePageChangeFollowers = (page) => {
    setCurrentPageFollowers(page);
  };

  const handlePageChangeChats = (page) => {
    setCurrentPageChats(page);
  };

  // Get paginated data
  const getPaginatedData = (data, currentPage) => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return data.slice(start, end);
  };

  // Toggle follow/unfollow status
  const handleFollowToggle = (index) => {
    setIsFollowing(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  // Toggle edit mode for tasks and projects
  const handleEditToggle = (id, type) => {
    if (type === 'task') {
      setEditTaskId(editTaskId === id ? null : id);
    } else if (type === 'project') {
      setEditProjectId(editProjectId === id ? null : id);
    }
  };

  const handleSave = (id, type) => {
    // Save logic here
    handleEditToggle(id, type);
  };

  const handleDeleteTask = (id) => {
    console.log('Taks Deleted');
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
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            {/* Tasks Container */}
            <div className={`${styles.card} ${styles.cardTaskManager}`}>
              <h2 className={styles.tasksTitle}>Tasks</h2>
              <ul className={styles.taskList}>
                {getPaginatedData(tasks, currentPageTasks).length === 0 ? (
                  <p className={styles.noTasksMessage}>No tasks available</p>
                ) : (
                  getPaginatedData(tasks, currentPageTasks).map((task) => (
                    <li key={task.id} className={styles.taskItem}>
                      <div>
                        <span className={styles.taskTitle}>{task.title}</span>
                        <br/>
                        <span className={styles.taskDate}>{task.date}</span>
                      </div>
                      <button 
                        onClick={() => handleEditToggle(task.id, 'task')}
                        className={styles.editButton}
                      >
                        {editTaskId === task.id ? 'Save' : 'Edit'}
                      </button> 
                      <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                      {editTaskId === task.id && (
                        <input
                          type="text"
                          className={styles.editInput}
                          placeholder="Edit task"
                          defaultValue={task.title}
                          onBlur={(e) => handleSave(task.id, 'task')}
                        />
                      )}
                    </li>
                  ))
                )}
              </ul>
              <div className={styles.pagination}>
                <button 
                  disabled={currentPageTasks === 1}
                  onClick={() => handlePageChangeTasks(currentPageTasks - 1)}
                >
                  Previous
                </button>
                <span>{currentPageTasks}</span>
                <button
                  disabled={getPaginatedData(tasks, currentPageTasks).length < ITEMS_PER_PAGE}
                  onClick={() => handlePageChangeTasks(currentPageTasks + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className={styles.gridItem}>
            {/* Projects Container */}
            <div className={`${styles.card} ${styles.cardProjectManager}`}>
              <h2 className={styles.projectsTitle}>Projects</h2>
              <ul className={styles.projectList}>
                {getPaginatedData(projects, currentPageProjects).length === 0 ? (
                  <p className={styles.noProjectsMessage}>No projects available</p>
                ) : (
                  getPaginatedData(projects, currentPageProjects).map((project) => (
                    <li key={project.id} className={styles.projectItem}>
                      <div>
                        <span className={styles.projectName}>{project.name}</span>
                        <br/>
                        <span className={styles.projectStatus}>{project.status}</span>
                      </div>
                      <button 
                        onClick={() => handleEditToggle(project.id, 'project')}
                        className={styles.editButton}
                      >
                        {editProjectId === project.id ? 'Save' : 'Edit'}
                      </button>
                      {editProjectId === project.id && (
                        <input
                          type="text"
                          className={styles.editInput}
                          placeholder="Edit project"
                          defaultValue={project.name}
                          onBlur={(e) => handleSave(project.id, 'project')}
                        />
                      )}
                    </li>
                  ))
                )}
              </ul>
              <div className={styles.pagination}>
                <button 
                  disabled={currentPageProjects === 1}
                  onClick={() => handlePageChangeProjects(currentPageProjects - 1)}
                >
                  Previous
                </button>
                <span>{currentPageProjects}</span>
                <button
                  disabled={getPaginatedData(projects, currentPageProjects).length < ITEMS_PER_PAGE}
                  onClick={() => handlePageChangeProjects(currentPageProjects + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className={styles.gridItem}>
            {/* Followers Container */}
            <div className={`${styles.card} ${styles.cardFollowerManager}`}>
              <h2 className={styles.followersTitle}>Followers</h2>
              <ul className={styles.followerList}>
                {getPaginatedData(followers, currentPageFollowers).length === 0 ? (
                  <p className={styles.noFollowersMessage}>No followers available</p>
                ) : (
                  getPaginatedData(followers, currentPageFollowers).map((follower, index) => (
                    <li key={follower.id} className={styles.followerItem}>
                      <div>
                        <span className={styles.followerName}>{follower.name}</span>
                      </div>
                      <button 
                        onClick={() => handleFollowToggle(index)}
                        className={styles.followButton}
                      >
                        {isFollowing[index] ? 'Unfollow' : 'Follow'}
                      </button>
                    </li>
                  ))
                )}
              </ul>
              <div className={styles.pagination}>
                <button 
                  disabled={currentPageFollowers === 1}
                  onClick={() => handlePageChangeFollowers(currentPageFollowers - 1)}
                >
                  Previous
                </button>
                <span>{currentPageFollowers}</span>
                <button
                  disabled={getPaginatedData(followers, currentPageFollowers).length < ITEMS_PER_PAGE}
                  onClick={() => handlePageChangeFollowers(currentPageFollowers + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className={styles.gridItem}>
            {/* Chats Container */}
            <div className={`${styles.card} ${styles.cardChatManager}`}>
              <h2 className={styles.chatsTitle}>Chats</h2>
              <ul className={styles.chatList}>
                {getPaginatedData(chats, currentPageChats).length === 0 ? (
                  <p className={styles.noChatsMessage}>No chats available</p>
                ) : (
                  getPaginatedData(chats, currentPageChats).map((chat) => (
                    <li key={chat.id} className={styles.chatItem}>
                      <div>
                        <span className={styles.chatName}>{chat.name}</span>
                        <br/>
                        <span className={styles.chatLastMessage}>{chat.message}</span>
                        <br/>
                        <button>Read more</button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
              <div className={styles.pagination}>
                <button 
                  disabled={currentPageChats === 1}
                  onClick={() => handlePageChangeChats(currentPageChats - 1)}
                >
                  Previous
                </button>
                <span>{currentPageChats}</span>
                <button
                  disabled={getPaginatedData(chats, currentPageChats).length < ITEMS_PER_PAGE}
                  onClick={() => handlePageChangeChats(currentPageChats + 1)}
                >
                  Next
                </button>
              </div>
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
  username: PropTypes.string.isRequired
};

export default Dashboard;
