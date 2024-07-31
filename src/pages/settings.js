import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../style/settings.module.css"; // Ensure this path is correct
import { FaSearch, FaChevronDown, FaBell, FaCommentDots } from "react-icons/fa";
import { tasks, projects, notifications, chats } from "../data/DashboardDummy";

const ITEMS_PER_PAGE = 5;

const Settings = ({ username }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    tasks: [],
    projects: [],
  });
  const [currentPageTasks, setCurrentPageTasks] = useState(1);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isChatsOpen, setIsChatsOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("Light");
  const [settings, setSettings] = useState({
    notifications: true,
    privacyMode: false,
    autoUpdates: true,
    darkMode: false,
    syncSettings: false,
    backupData: false,
    displayDensity: "Comfortable",
    emailAlerts: true,
    customShortcuts: false,
    accessibilityFeatures: false,
  });

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults({ tasks: [], projects: [] });
      return;
    }

    const searchTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const searchProjects = projects.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults({
      tasks: searchTasks,
      projects: searchProjects,
    });
  }, [searchQuery]);

  const handlePageChangeTasks = (page) => {
    setCurrentPageTasks(page);
  };

  const getPaginatedData = (data, currentPage) => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return data.slice(start, end);
  };

  const toggleSetting = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
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
                  searchResults.projects.length === 0 ? (
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
            {/* Settings Container */}
            <div className={`${styles.card} ${styles.cardSettingsManager}`}>
              <h2 className={styles.settingsTitle}>Settings</h2>
              <div className={styles.settingsSection}>
                <h3>Language</h3>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={styles.settingsDropdown}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="Indonesia">Indonesia</option>
                </select>
              </div>
              <div className={styles.settingsSection}>
                <h3>Display Theme</h3>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className={styles.settingsDropdown}
                >
                  <option value="Light">Light</option>
                  <option value="Dark">Dark</option>
                </select>
              </div>
              <ul className={styles.settingsList}>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={() => toggleSetting("notifications")}
                      className={styles.settingsCheckbox}
                    />
                    Enable Notifications
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.privacyMode}
                      onChange={() => toggleSetting("privacyMode")}
                      className={styles.settingsCheckbox}
                    />
                    Privacy Mode
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.autoUpdates}
                      onChange={() => toggleSetting("autoUpdates")}
                      className={styles.settingsCheckbox}
                    />
                    Automatic Updates
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.darkMode}
                      onChange={() => toggleSetting("darkMode")}
                      className={styles.settingsCheckbox}
                    />
                    Dark Mode
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.syncSettings}
                      onChange={() => toggleSetting("syncSettings")}
                      className={styles.settingsCheckbox}
                    />
                    Sync Settings
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.backupData}
                      onChange={() => toggleSetting("backupData")}
                      className={styles.settingsCheckbox}
                    />
                    Backup Data
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.emailAlerts}
                      onChange={() => toggleSetting("emailAlerts")}
                      className={styles.settingsCheckbox}
                    />
                    Email Alerts
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.customShortcuts}
                      onChange={() => toggleSetting("customShortcuts")}
                      className={styles.settingsCheckbox}
                    />
                    Custom Shortcuts
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.accessibilityFeatures}
                      onChange={() => toggleSetting("accessibilityFeatures")}
                      className={styles.settingsCheckbox}
                    />
                    Accessibility Features
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.gridItem}></div>
        </div>
      </main>
      <footer className={styles.footer}>
        &copy; 2024 YOUDO. All rights reserved.
      </footer>
    </div>
  );
};

Settings.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Settings;
