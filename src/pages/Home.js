import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import styles from '../style/home.module.css';
const Home = () => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleContinueClick = () => {
    setShowFeatures(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500); 
  };

  const handleHideClick = () => {
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
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-white opacity-30 animate-light-beam"></div>
      <header className="relative z-10 text-center">
        <h1 className="mb-6 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-600 sm:text-4xl md:text-5xl animate-fade-in animate-delay-1000">
          Welcome to <span className="text-white animate-typing animate-cursor">YOUDO</span>
        </h1>

        <button
          onClick={handleGettingStartedClick}
          className="relative w-full max-w-xs px-8 py-3 mt-6 text-white transition-transform transform rounded-full shadow-lg bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 sm:max-w-sm md:max-w-md lg:max-w-lg hover:scale-105 animate-fade-in animate-delay-2000"
        >
          Getting Started
        </button>

        <div className="relative mt-6">
          {!showFeatures && (
            <button
              onClick={handleContinueClick}
              className="relative z-10 px-6 py-3 text-white bg-teal-600 rounded-full shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 animate-fade-in animate-delay-1000"
            >
              Show Features
              <div className="absolute bottom-0 w-6 h-6 transform -translate-x-1/2 left-1/2">
                <div className="w-1 h-4 bg-white rounded-md animate-bounce"></div>
                <div className="w-1 h-4 bg-white rounded-md animate-bounce animate-delay-200"></div>
              </div>
            </button>
          )}
        </div>
      </header>

      <div
        className={`relative z-10 w-full max-w-4xl px-4 mt-12 mb-12 ${styles.transitionTransform} ${
          showFeatures ? 'transform translate-y-0' : 'transform translate-y-10 opacity-0'
        } ${isAnimating ? styles.transitionTransform : ''}`}
      >
        {showFeatures && (
          <>
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handleHideClick}
                className="px-4 py-2 text-white transition-transform transform bg-teal-700 rounded-lg shadow-md hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 hover:scale-105"
              >
                <span className="hidden md:inline">Hide Features</span>
                <span className="md:hidden">Hide</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <div key={index} className="flex items-start p-4 bg-white rounded-lg shadow-md">
                  <CheckCircleIcon className="w-6 h-6 mr-4 text-teal-500" />
                  <span className="text-gray-900">{feature}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
