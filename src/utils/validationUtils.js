export const validateLogin = (username, password) => {
  if (!username) return 'Username is required';
  if (!password) return 'Password is required';
  // Add more validation rules if needed
  return null;
};
  

  export const validateRegistration = (username, email, password, confirmPassword) => {

    if (!username || !email || !password || !confirmPassword) {
      if (username.length < 3) {
        return 'Username must be at least 3 characters long';
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        return 'Email is invalid';
      }

      if (password.length < 6) {
        return 'Password must be at least 6 characters long';
      }

      if (password !== confirmPassword) {
        return 'Passwords do not match';
      }

      return null;
    }
  }