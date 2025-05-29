const crypto = require('crypto');

// Generates a random code verifier
function generateCodeVerifier(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

// Generates a code challenge (SHA256 base64-url)
function generateCodeChallenge(codeVerifier) {
  return crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest()
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

module.exports = { generateCodeVerifier, generateCodeChallenge };
