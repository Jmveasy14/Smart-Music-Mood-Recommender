const express = require('express');
const router = express.Router();
const { getPlaylistData } = require('.../services/spotify');

router.post('/playlist', async (req, res) => {
    try {
      const { playlistId, accessToken } = req.body;
      const data = await getPlaylistData(playlistId, accessToken);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;

