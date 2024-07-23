const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./utils/errorHandler');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const todoRoutes = require('./routes/todoRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const socialMediaRoutes = require('./routes/socialMediaRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/social-media-posts', socialMediaRoutes);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
