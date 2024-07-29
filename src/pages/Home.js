import React, { useState } from 'react';
import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import styles from '../style/home.module.css';

const Home = () => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleScrollDownClick = () => {
    setShowFeatures(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500); 
  };

  const handleScrollUpClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowFeatures(false);
      setIsAnimating(false);
    }, 500); 
  };

  const handleGettingStartedClick = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.lightBeam}></div>
      
      <header className={styles.header}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.titleHighlight}>YOUDO</span>
        </h1>

        <button
          onClick={handleGettingStartedClick}
          className={styles.gettingStartedButton}
        >
          Getting Started
        </button>
      </header>

      <div
        className={`${styles.featuresSection} ${isAnimating ? 'opacity-0' : 'opacity-100'} ${showFeatures ? styles.slideIn : styles.slideOut}`}
      >
        {showFeatures && (
          <div>
            <h2 className={styles.featuresHeader}>Features</h2>
            <div className={styles.featuresList}>
              {[
                'CRUD',
                'Login Multi - Akun',
                'Follow Users',
                'Project Group',
                'To - Do - List',
                'Sosial Media',
                'Email Verification',
                'Notifikasi Email',
                'Password Reset',
                'User Profiles',
                'Search Functionality',
                'Comments and Likes',
                'Attachments',
                'Push Notifications',
                'Chatting',
              ].map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <CheckCircleIcon className={styles.featureIcon} />
                  <span className={styles.featureText}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.scrollButtons}>
        {!showFeatures && (
          <button
            onClick={handleScrollDownClick}
            className={styles.scrollButton}
          >
            <ChevronDownIcon className={styles.featureIcon} />
          </button>
        )}
        {showFeatures && (
          <button
            onClick={handleScrollUpClick}
            className={styles.scrollButton}
          >
            <ChevronUpIcon className={styles.featureIcon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
