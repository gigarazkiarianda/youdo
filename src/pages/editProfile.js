import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../style/editProfile.module.css";
import { FaChevronDown, FaBell, FaEnvelope, FaSearch } from "react-icons/fa";
import { notifications, chats, profile } from "../data/DashboardDummy"; // Import dummy data
import { getUserById, updateUser } from "../services/userService"; // Import services

const EditProfile = () => {
  const { userId } = useParams(); // Get userId from URL parameters
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ tasks: [], projects: [] });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isChatsOpen, setIsChatsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    number_phone: '',
    deskripsi: '',
    email: '',
    password: '',
    photo: '',
  });
  const [originalData, setOriginalData] = useState(formData);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserById(userId);
        setFormData({
          username: data.username || '',
          fullname: data.fullname || '',
          number_phone: data.number_phone || '',
          deskripsi: data.deskripsi || '',
          email: data.email || '',
          password: data.password || '',
          photo: data.photo || '',
        });
        setOriginalData({
          username: data.username || '',
          fullname: data.fullname || '',
          number_phone: data.number_phone || '',
          deskripsi: data.deskripsi || '',
          email: data.email || '',
          password: data.password || '',
          photo: data.photo || '',
        });
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Check if there are unsaved changes
  const hasChanges = () => {
    return (
      formData.username !== originalData.username ||
      formData.fullname !== originalData.fullname ||
      formData.number_phone !== originalData.number_phone ||
      formData.deskripsi !== originalData.deskripsi ||
      formData.email !== originalData.email ||
      formData.password !== originalData.password ||
      formData.photo !== originalData.photo
    );
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      await updateUser(userId, formData);
      setOriginalData(formData); // Update originalData to current formData
      console.log("Changes saved:", formData);
    } catch (error) {
      console.error("Failed to save changes", error);
    }
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
            <FaEnvelope
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
          <div className={styles.cardProfile}>
            <div className={styles.card}>
              <h1 className={styles.editProfileTitle}>Edit Profile</h1>
              <div className={styles.profilePhoto}>
                <img
                  src={formData.photo}
                  alt="Profile"
                  className={styles.profileImage}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
              </div>
              <div className={styles.profileInfo}>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Username"
                />
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  name="number_phone"
                  value={formData.number_phone}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Phone Number"
                />
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Description"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Email"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Password"
                />
              </div>
              <button
                className={styles.saveChangesButton}
                onClick={handleSaveChanges}
                disabled={!hasChanges()}
              >
                Save Changes
              </button>
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

EditProfile.propTypes = {
  username: PropTypes.string.isRequired,
};

export default EditProfile;
