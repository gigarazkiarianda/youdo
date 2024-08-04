require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Import error handling middleware
const errorHandler = require('./utils/errorHandler');

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // Use Express's built-in JSON parser
app.use(express.urlencoded({ extended: true })); // Use Express's built-in URL-encoded parser

// Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const todoRoutes = require('./routes/todoRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const userRelationshipRoutes = require('./routes/userRelationshipRoutes');

// Route setup
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/relationship', userRelationshipRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message, err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Set port and start server
const PORT = process.env.PORT || 5000; // Use the PORT from the .env file
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
