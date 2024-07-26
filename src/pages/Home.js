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
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
      {/* Light beam effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-40 animate-light-beam"></div>
      
      {/* Header */}
      <header className="relative z-10 text-center">
        <h1 className="mb-6 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-600 sm:text-4xl md:text-5xl lg:text-6xl animate-fade-in animate-delay-1000">
          Welcome to <span className="text-white animate-typing animate-cursor">YOUDO</span>
        </h1>

        <button
          onClick={handleGettingStartedClick}
          className="relative w-full max-w-xs px-6 py-3 mt-6 text-white transition-transform transform rounded-full shadow-lg bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 sm:max-w-sm md:max-w-md lg:max-w-lg hover:scale-105 animate-fade-in animate-delay-2000"
        >
          Getting Started
        </button>
      </header>

      {/* Features Section */}
      <div
        className={`relative z-10 w-full max-w-4xl px-4 mt-12 mb-12 transition-transform ${isAnimating ? 'opacity-0' : 'opacity-100'} ${showFeatures ? styles.slideIn : styles.slideOut}`}
      >
        {showFeatures && (
          <div>
            {/* Features Header */}
            <h2 className="mb-12 text-2xl font-bold text-center text-white sm:text-3xl lg:text-4xl">
              Features
            </h2>

            {/* Features List */}
            <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
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
                  <span className="text-sm text-gray-900 md:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scroll Buttons */}
      <div className="fixed flex flex-col space-y-4 bottom-4 right-4">
        {!showFeatures && (
          <button
            onClick={handleScrollDownClick}
            className="relative w-full max-w-xs px-6 py-3 mt-6 text-white transition-transform transform rounded-full shadow-lg bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 sm:max-w-sm md:max-w-md lg:max-w-lg hover:scale-105 animate-fade-in animate-delay-2000"
          >
            <ChevronDownIcon className="w-6 h-6" />
          </button>
        )}
        {showFeatures && (
          <button
            onClick={handleScrollUpClick}
            className="relative w-full max-w-xs px-6 py-3 mt-6 mb-20 text-white transition-transform transform rounded-full shadow-lg bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 sm:max-w-sm md:max-w-md lg:max-w-lg hover:scale-105 animate-fade-in animate-delay-2000"
          >
            <ChevronUpIcon className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
