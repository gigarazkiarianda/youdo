export const validateLogin = (email, password) => {
    if (!email || !password) return 'Email and password are required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid';
    return null;
  };
  