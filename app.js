require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./utils/errorHandler');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // Use the PORT from the .env file


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
