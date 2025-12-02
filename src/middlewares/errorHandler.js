// src/middlewares/errorHandler.js
module.exports = (err, _req, res, _next) => {
  console.error(err.stack || err);
  if (err.isJoi) {
    return res.status(400).json({ error: err.details[0].message });
  }
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
};
