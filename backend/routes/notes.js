const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const auth = require('../middleware/auth'); // Import JWT middleware

// Create a new note (protected)
router.post('/', auth, async (req, res) => {
  try {
    const note = new Note({
      ...req.body,
      user: req.user.id // Attach user ID from token
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
