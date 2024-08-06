require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session); // Session store for MySQL
const cookieParser = require('cookie-parser'); // Cookie parser middleware

// Import error handling middleware
const errorHandler = require('./utils/errorHandler');

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(cookieParser()); // Parse cookies from HTTP requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Session setup
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.use(session({
  secret: process.env.DEFAULT_SESSION_KEY || 'your-secret-key', // Secret key for signing the session ID cookie
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't save uninitialized sessions
  store: sessionStore, // Store sessions in MySQL
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24 // Session expiry time (1 day)
  }
}));

// Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const todoRoutes = require('./routes/todoRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const userRelationshipRoutes = require('./routes/userRelationshipRoutes');

// Route setup
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/projects', projectRoutes); // Project routes
app.use('/api/todos', todoRoutes); // Todo routes
app.use('/api/notifications', notificationRoutes); // Notification routes
app.use('/api/relationship', userRelationshipRoutes); // User relationship routes

// Error handling middleware
app.use(errorHandler);

// Set port and start server
const PORT = process.env.PORT || 5000; // Use the PORT from the .env file
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
