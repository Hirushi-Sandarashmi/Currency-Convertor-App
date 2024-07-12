require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Add this line
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3001;

const usersRoutes = require('./routes/user');
const transactionsRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
app.use(cors({
  allowedHeaders:"*",
  origin:"*"
}))
app.use(bodyParser.json()); // Add this line to parse JSON bodies

app.get('/api/get-from', (req, res) => {
  // Extract the "from" value from the query parameters
  const fromValue = req.query.from;
  
  // Check if "from" value is provided
  if (fromValue) {
      // Send a success response with the received "from" value
      res.status(200).send(`Received 'from' value: ${fromValue}`);
  } else {
      // Send an error response if "from" value is not provided
      res.status(400).send('No "from" value provided');
  }
});

app.use('/api/users', usersRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
