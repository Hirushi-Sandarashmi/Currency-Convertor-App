const validateJson = (req, res, next) => {
    try {
      JSON.parse(JSON.stringify(req.body));
      next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid JSON' });
    }
  };
  
  module.exports = validateJson;
  