import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style/projects.module.css"; // Adjust the stylesheet path
import { FaSearch, FaChevronDown, FaBell, FaCommentDots } from "react-icons/fa";
import { getAllProjects, createProject, updateProject, deleteProject, getProjectsByUserId } from '../services/projectService';
import { logout } from '../services/authServices';
import { notifications, chats } from '../data/DashboardDummy';

const Projects = ({ username }) => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    category: "",
  });
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isChatsOpen, setIsChatsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const projectsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const searchProjects = projects.filter(project =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(searchProjects);
  }, [searchQuery, projects]);

  const fetchProjects = async () => {
    try {
      const userId = localStorage.getItem("userId"); 
      const projects = await getProjectsByUserId(userId);
      setProjects(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleAddProject = async () => {
    if (project.name.trim() === "") {
      setError("Name cannot be empty");
      return;
    }

    const newProject = {
      ...project,
    };

    try {
      const createdProject = await createProject(newProject);
      setProjects((prevProjects) => [...prevProjects, createdProject]);
      setProject({
        name: "",
        description: "",
        category: "",
      });
      setError(null);
    } catch (error) {
      setError("Failed to add project");
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
      handleClosePopup(); 
    } catch (error) {
      console.error(`Failed to delete project with id ${id}:`, error);
    }
  };

  const handleEditProject = async () => {
    if (project.name.trim() === "") {
      setError("Name cannot be empty");
      return;
    }

    try {
      await updateProject(isEditing, project);
      setProjects((prevProjects) =>
        prevProjects.map((p) => (p.id === isEditing ? { ...p, ...project } : p))
      );
      setProject({
        name: "",
        description: "",
        category: "",
      });
      setIsEditing(null);
      setError(null);
    } catch (error) {
      setError("Failed to save project");
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedProject(null);
    setProject({
      name: "",
      description: "",
      category: "",
    });
    setIsEditing(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(projects.length / projectsPerPage); i++) {
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
                    <h3>Projects</h3>
                    <ul className={styles.searchList}>
                      {searchResults.map((project) => (
                        <li key={project.id} className={styles.searchItem}>{project.name}</li>
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
              <div className={styles.dropdownItem} onClick={() => navigate("/projects")}>My Projects</div>
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
          <div className={`${styles.card} ${styles.cardProjectManager}`}>
            <h2 className={styles.projectsTitle}>Projects</h2>
            <div className={styles.inputGroup}>
              <input
                type="text"
                className={styles.input}
                value={project.name}
                onChange={(e) => setProject({ ...project, name: e.target.value })}
                placeholder="Name"
              />
              <textarea
                className={styles.input}
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
                placeholder="Description"
              />
              <input
                type="text"
                className={styles.input}
                value={project.category}
                onChange={(e) => setProject({ ...project, category: e.target.value })}
                placeholder="Category"
              />
            </div>
            <button
              className={styles.addButton}
              onClick={isEditing ? handleEditProject : handleAddProject}
            >
              {isEditing ? 'Save' : 'Add Project'}
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
        <div className={styles.projectsContainer}>
          {currentProjects.map((project) => (
            <div key={project.id} className={styles.projectItem}>
              <div className={styles.projectContent}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <p className={styles.projectCategory}>{project.category}</p>
              </div>
              <div className={styles.projectActions}>
                <button 
                  className={styles.viewButton} 
                  onClick={() => handleProjectClick(project)}
                >
                  View
                </button>
                <button 
                  className={styles.editButton} 
                  onClick={() => {
                    setIsEditing(project.id);
                    setProject({
                      name: project.name,
                      description: project.description,
                      category: project.category,
                    });
                  }}
                >
                  Edit
                </button>
                <button 
                  className={styles.deleteButton} 
                  onClick={() => handleProjectClick(project)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={styles.pageButton}
            >
              {number}
            </button>
          ))}
        </div>
      </main>
      <footer className={styles.footer}>
        &copy; 2024 YOUDO. All rights reserved.
      </footer>
      {isPopupOpen && selectedProject && (
        <div className={styles.popupOverlay}>
        <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={handleClosePopup}>Close</button>
          <h3 className={styles.popupTitle}><strong>name project: </strong>{selectedProject.name}</h3>
          <p>Description: {selectedProject.description}</p>
          <p>Category: {selectedProject.category}</p>

            
            <button className={styles.deleteButton} onClick={() => handleDeleteProject(selectedProject.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
