import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../style/chat.module.css"; 
import {
  FaSearch,
  FaChevronDown,
  FaBell,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
import {
  tasks,
  projects,
  notifications,
  chats,
  followers,
  profile,
} from "../data/DashboardDummy";

const ITEMS_PER_PAGE = 5;

const ChatRoom = () => {
  const { chatId } = useParams(); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    tasks: [],
    projects: [],
    chats: [],
  });
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isChatsOpen, setIsChatsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null); 
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  const navigate = useNavigate();
  const messageEndRef = useRef(null);

  useEffect(() => {
    const chat = chats.find((chat) => chat.id === parseInt(chatId, 10));
    setSelectedChat(chat);
  }, [chatId]);

  useEffect(() => {
    if (selectedChat) {
      setChatMessages([
        {
          id: 1,
          user: "System",
          text: `You are now chatting with ${selectedChat.name}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        {
          id: 2,
          user: selectedChat.name,
          text: selectedChat.message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } else {
      setChatMessages([]); 
    }
  }, [selectedChat]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults({ tasks: [], projects: [], chats: [] });
      return;
    }

    const searchTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const searchProjects = projects.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const searchChats = chats.filter((chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults({
      tasks: searchTasks,
      projects: searchProjects,
      chats: searchChats,
    });
  }, [searchQuery]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date().toLocaleDateString());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          user: "You",
          text: message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h1 className={styles.title}>
          <a href="/dashboard">YOUDO</a>
        </h1>
        <div className={styles.sidebarContent}>
          <div className={styles.sidebarSection}>
            <h2>Chats</h2>
            <ul>
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  onClick={() => navigate(`/chat/${chat.id}`)}
                  className={
                    chat.id === parseInt(chatId, 10) ? styles.activeChat : ""
                  }
                >
                  {chat.name}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.sidebarSection}>
            <h2>Projects</h2>
            <ul>
              {projects.map((project) => (
                <li
                  key={project.id}
                  onClick={() => handleNavigation(`/project/${project.id}`)}
                >
                  {project.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
      <main className={styles.mainContent}>
      <header className={styles.header}>
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
              searchResults.chats.length === 0 ? (
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
                {searchResults.chats.length > 0 && (
                  <div className={styles.searchSection}>
                    <h3>Chats</h3>
                    <ul className={styles.searchList}>
                      {searchResults.chats.map((chat) => (
                        <li key={chat.id} className={styles.searchItem}>
                          {chat.name}
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
      <div className={styles.iconContainer}>
        <FaBell
          className={styles.icon}
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        />
        {isNotificationsOpen && (
          <div className={styles.notificationsDropdown}>
            <ul className={styles.notificationsList}>
              {notifications.length === 0 ? (
                <li className={styles.noNotificationsMessage}>
                  No new notifications
                </li>
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
        <FaEnvelope
          className={styles.icon}
          onClick={() => setIsChatsOpen(!isChatsOpen)}
        />
        {isChatsOpen && (
          <div className={styles.chatsDropdown}>
            <ul className={styles.chatsList}>
              {chats.length === 0 ? (
                <li className={styles.noChatsMessage}>
                  No new messages
                </li>
              ) : (
                chats.map((chat) => (
                  <li key={chat.id} className={styles.chatItem}>
                    {chat.name}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={styles.dropdownButton}
        >
          <FaChevronDown />
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
        <section className={styles.profileSection}>
          <div className={styles.profileHeader}>
            <img
              src={profile.photo} // Use a default image if profile photo is not found
              alt="Profile"
              className={styles.profilePicture}
            />
            <div className={styles.profileInfo}>
              <h2>{selectedChat ? selectedChat.name : "Profile"}</h2>
              <p>Online</p>
            </div>
          </div>
        </section>
        <div className={styles.chatRoom}>
          {selectedChat === null ? (
            <div className={styles.unavailableMessage}>
              <h2>Chat Unavailable</h2>
              <p>Please select a chat from the sidebar.</p>
            </div>
          ) : (
            <>
              <div className={styles.currentDate}>{currentDate}</div> {/* Display current date */}
              <div className={styles.chatMessages}>
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={
                      msg.user === "You"
                        ? styles.myMessage
                        : styles.theirMessage
                    }
                  >
                    <p>{msg.text}</p>
                    <span className={styles.timestamp}>{msg.timestamp}</span>
                  </div>
                ))}
                <div ref={messageEndRef} />
              </div>
              <div className={styles.messageInputContainer}>
                <input
                  type="text"
                  className={styles.messageInput}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                />
                <button
                  className={styles.sendButton}
                  onClick={handleSendMessage}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        &copy; 2024 YOUDO. All rights reserved.
      </footer>
    </div>
  );
};

ChatRoom.propTypes = {
  username: PropTypes.string,
};

export default ChatRoom;
