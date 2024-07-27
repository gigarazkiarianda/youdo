import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authServices'; // Update this path as needed
import { validateRegistration } from '../utils/validationUtils'; // Update this path as needed
import styles from '../style/register.module.css'; // Import the CSS module

// Import images if needed
import googleIcon from '../assets/google.png';
import appleIcon from '../assets/apple.png';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationError = validateRegistration(username, email, password, confirmPassword);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      await register(username, email, password);
      navigate('/home');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleGoogleRegister = () => {
    // Handle Google registration logic here
    console.log('Google register');
  };

  const handleAppleRegister = () => {
    // Handle Apple registration logic here
    console.log('Apple register');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <form onSubmit={handleRegister} className={styles.formWrapper}>
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
          <label htmlFor="email" className={styles.label}>Email</label>
          <input 
            type="email" 
            id="email"
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
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
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword"
            placeholder="Confirm your password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className={styles.inputField}
            required
          />
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        
        <button type="submit" className={styles.submitButton}>Register</button>
        
        <div className={styles.signInContainer}>
          <p className={styles.signInText}>
            Already have an account?{' '}
            <a href="/login" className={styles.signInLink}>
              Login
            </a>
          </p>
        </div>
      </form>

      <div className={styles.alternativeRegisterContainer}>
        <button className={styles.googleButton} onClick={handleGoogleRegister}>
          <img src={googleIcon} alt="Google Icon" className={styles.icon} />
          Register with Google
        </button>
        <button className={styles.appleButton} onClick={handleAppleRegister}>
          <img src={appleIcon} alt="Apple Icon" className={styles.icon} />
          Register with Apple ID
        </button>
      </div>
    </div>
  );
};

export default Register;
