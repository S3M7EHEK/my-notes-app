const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connect to MongoDB Compass'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello from backend !');
});

// ✅ Add these two lines
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
