const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const { generateCodeVerifier, generateCodeChallenge } = require('../utils/spotifyAuth');

const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
let codeVerifier; // Store in-memory for demo — in production use session/cookie

// 🔗 Step 1: Login Redirect
router.get('/login', (req, res) => {
  codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const scope = 'playlist-read-private playlist-read-collaborative user-read-email';

  const params = querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
});

// 🔁 Step 2: Handle Callback and Get Access Token
router.get('/callback', async (req, res) => {
  const code = req.query.code;

  const tokenRes = await axios.post('https://accounts.spotify.com/api/token',
    querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      code_verifier: codeVerifier,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  // Return the access token to the frontend (or store it)
  res.json(tokenRes.data); // Contains access_token, refresh_token, expires_in
});

module.exports = router;
