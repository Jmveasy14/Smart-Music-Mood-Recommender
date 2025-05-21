// Entry point for the backend server
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import route handlers
const spotifyRoutes = require('./routes/spotifyRoutes');
const moodRoutes = require('./routes/moodRoutes');

dotenv.config(); // Load environment variables

const app = express();

// Enable CORS for cross-origin requests from client
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// Setup routes
app.use('/api/spotify', spotifyRoutes);
app.use('/api/mood', moodRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
