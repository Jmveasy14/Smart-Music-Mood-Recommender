const express = require('express');
const router = express.Router();

// Import OpenAI-based mood analysis function
const { analyzeMood } = require('../services/openai');

// Route: POST /api/mood/analyze
// Purpose: Analyze playlist data and return mood + recommendations
router.post('/analyze', async (req, res) => {
  try {
    const { playlistData } = req.body;
    const moodProfile = await analyzeMood(playlistData);
    res.json(moodProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
