const { AppError } = require('../utils/errors');

module.exports = (err, req, res, next) => {
  console.error(err);
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};