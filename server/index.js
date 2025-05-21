const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const spotifyRoutes = require('./routes/spotifyRoutes');
const moodRoutes = require('./routes/moodRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/spotify', spotifyRoutes);
app.use('/api/mood', moodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
