// middleware/verifySession.js
module.exports = (req, res, next) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }
    next();
  };
  