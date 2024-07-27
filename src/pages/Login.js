import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../services/authServices'; // Import logout
import { validateLogin } from '../utils/validationUtils'; // Ensure this function is updated for username
import styles from '../style/login.module.css'; 

import googleIcon from '../assets/google.png';
import appleIcon from '../assets/apple.png';

const Login = () => {
  const [username, setUsername] = useState(''); // Updated state for username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationError = validateLogin(username, password); 
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      await login(username, password, rememberMe); 
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log('Google login');
  };

  const handleAppleLogin = () => {
    // Handle Apple login logic here
    console.log('Apple login');
  };

  const handleLogout = () => {
    logout(); // Clear token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleLogin} className={styles.formWrapper}>
        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input 
            type="text" 
            id="username"
            placeholder="Enter your username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className={styles.inputField}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input 
            type="password" 
            id="password"
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className={styles.inputField}
            required
          />
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        
        <div className={styles.rememberMeContainer}>
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className={styles.checkbox}
          />
          <label htmlFor="rememberMe" className={styles.rememberMeLabel}>
            Remember me
          </label>
        </div>
        
        <button type="submit" className={styles.submitButton}>Login</button>
        
        <div className={styles.signUpContainer}>
          <p className={styles.signUpText}>
            Don't have an account?{' '}
            <a href="/register" className={styles.signUpLink}>
              Sign up
            </a>
          </p>
        </div>
      </form>

      <div className={styles.alternativeLoginContainer}>
        <button className={styles.googleButton} onClick={handleGoogleLogin}>
          <img src={googleIcon} alt="Google Icon" className={styles.icon} />
          Login with Google
        </button>
        <button className={styles.appleButton} onClick={handleAppleLogin}>
          <img src={appleIcon} alt="Apple Icon" className={styles.icon} />
          Login with Apple ID
        </button>
      </div>
    </div>
  );
};

export default Login;
