import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../style/settings.module.css";
import { FaSearch, FaChevronDown, FaBell, FaCommentDots } from "react-icons/fa";
import { tasks, projects, notifications, chats } from "../data/DashboardDummy";

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
    syncSettings: false,
    backupData: false,
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

  useEffect(() => {
    document.body.classList.toggle(styles.darkTheme, theme === "Dark");
    document.body.classList.toggle(styles.lightTheme, theme === "Light");
  }, [theme]);

  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
  };

  const handleSettingChange = (setting) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
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
                {searchQuery.trim() === "" ? null : searchResults.tasks.length === 0 &&
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
              chats.map(chat => (
                <li key={chat.id} className={styles.chatItem}>
                  {chat.name}
                  <br/>
                   <button><a href={"/chat"}>read more</a></button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
      <main className={styles.main}>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
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
                  onChange={handleThemeChange}
                  className={styles.settingsDropdown}
                >
                  <option value="Light">Light</option>
                  <option value="Dark">Dark</option>
                </select>
              </div>
              {/* Settings List */}
              <ul className={styles.settingsList}>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={() => handleSettingChange("notifications")}
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
                      onChange={() => handleSettingChange("privacyMode")}
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
                      onChange={() => handleSettingChange("autoUpdates")}
                      className={styles.settingsCheckbox}
                    />
                    Automatic Updates
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.syncSettings}
                      onChange={() => handleSettingChange("syncSettings")}
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
                      onChange={() => handleSettingChange("backupData")}
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
                      onChange={() => handleSettingChange("emailAlerts")}
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
                      onChange={() => handleSettingChange("customShortcuts")}
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
                      onChange={() =>
                        handleSettingChange("accessibilityFeatures")
                      }
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
