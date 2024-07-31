import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../style/followers.module.css";
import { FaSearch, FaChevronDown, FaBell, FaCommentDots } from "react-icons/fa";
import {
  tasks,
  projects,
  followers,
  notifications,
  chats,
} from "../data/DashboardDummy"; 
const ITEMS_PER_PAGE = 5;

const Dashboard = ({ username }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    tasks: [],
    projects: [],
    followers: [],
  });
  const [currentPageFollowers, setCurrentPageFollowers] = useState(1);
  const [currentPageTasks, setCurrentPageTasks] = useState(1); // Add this line
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isChatsOpen, setIsChatsOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(
    new Array(followers.length).fill(true)
  ); // Assuming all followers are initially followed
  const navigate = useNavigate();

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults({ tasks: [], projects: [], followers: [] });
      return;
    }

    const searchTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const searchProjects = projects.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const searchFollowers = followers.filter((follower) =>
      follower.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults({
      tasks: searchTasks,
      projects: searchProjects,
      followers: searchFollowers,
    });
  }, [searchQuery]);

  // Pagination handlers
  const handlePageChangeFollowers = (page) => {
    setCurrentPageFollowers(page);
  };

  const handlePageChangeTasks = (page) => {
    setCurrentPageTasks(page);
  };

  // Get paginated data
  const getPaginatedData = (data, currentPage) => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return data.slice(start, end);
  };

  // Toggle follow/unfollow status
  const handleFollowToggle = (index) => {
    setIsFollowing((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoSearchContainer}>
          <h1 className={styles.title}>
            <a href="/dashboard">YOUDO</a>
          </h1>
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
                {searchQuery.trim() === "" ? null : searchResults.tasks
                    .length === 0 &&
                  searchResults.projects.length === 0 &&
                  searchResults.followers.length === 0 ? (
                  <div className={styles.noResultsMessage}>
                    No results found
                  </div>
                ) : (
                  <>
                    {searchResults.tasks.length > 0 && (
                      <div className={styles.searchSection}>
                        <h3>Tasks</h3>
                        <ul className={styles.searchList}>
                          {searchResults.tasks.map((task) => (
                            <li key={task.id} className={styles.searchItem}>
                              {task.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {searchResults.projects.length > 0 && (
                      <div className={styles.searchSection}>
                        <h3>Projects</h3>
                        <ul className={styles.searchList}>
                          {searchResults.projects.map((project) => (
                            <li key={project.id} className={styles.searchItem}>
                              {project.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {searchResults.followers.length > 0 && (
                      <div className={styles.searchSection}>
                        <h3>Followers</h3>
                        <ul className={styles.searchList}>
                          {searchResults.followers.map((follower) => (
                            <li
                              key={follower.id}
                              className={styles.searchItem}
                            >
                              {follower.name}
                            </li>
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
              onClick={() =>
                setIsNotificationsOpen(!isNotificationsOpen)
              }
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
              <div
                className={styles.dropdownItem}
                onClick={() => handleNavigation("/profile")}
              >
                Profile
              </div>
              <div
                className={styles.dropdownItem}
                onClick={() => handleNavigation("/todos")}
              >
                MyTodo
              </div>
              <div
                className={styles.dropdownItem}
                onClick={() => handleNavigation("/settings")}
              >
                Settings
              </div>
              <div
                className={styles.dropdownItem}
                onClick={() => handleNavigation("/login")}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </header>
      {isNotificationsOpen && (
        <div className={styles.notificationsDropdown}>
          <h3>Notifications</h3>
          <ul className={styles.notificationsList}>
            {notifications.length === 0 ? (
              <p className={styles.noNotificationsMessage}>
                No notifications
              </p>
            ) : (
              notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={styles.notificationItem}
                >
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
              chats.map((chat) => (
                <li key={chat.id} className={styles.chatItem}>
                  {chat.name}
                  <br />
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
            {/* Followers Container */}
            <div
              className={`${styles.card} ${styles.cardFollowerManager}`}
            >
              <h2 className={styles.followersTitle}>Followers</h2>
              <ul className={styles.followerList}>
                {getPaginatedData(
                  followers,
                  currentPageFollowers
                ).length === 0 ? (
                  <p className={styles.noFollowersMessage}>
                    No followers available
                  </p>
                ) : (
                  getPaginatedData(followers, currentPageFollowers).map(
                    (follower, index) => (
                      <li
                        key={follower.id}
                        className={styles.followerItem}
                      >
                        <div>
                          <span className={styles.followerName}>
                            {follower.name}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            handleFollowToggle(index)
                          }
                          className={styles.followButton}
                        >
                          {isFollowing[index]
                            ? "Unfollow"
                            : "Follow"}
                        </button>
                      </li>
                    )
                  )
                )}
              </ul>
              <div className={styles.pagination}>
                <button
                  disabled={currentPageFollowers === 1}
                  onClick={() =>
                    handlePageChangeFollowers(currentPageFollowers - 1)
                  }
                >
                  Previous
                </button>
                <span>{currentPageFollowers}</span>
                <button
                  disabled={
                    getPaginatedData(
                      followers,
                      currentPageFollowers
                    ).length < ITEMS_PER_PAGE
                  }
                  onClick={() =>
                    handlePageChangeFollowers(currentPageFollowers + 1)
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className={styles.gridItem}>
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
