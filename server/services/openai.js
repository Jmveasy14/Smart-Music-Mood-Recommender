// OpenAI integration for mood classification
const { OpenAI } = require('openai');
const buildPrompt = require('../utils/moodPromptBuilder');

// Initialize OpenAI with API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Function: Analyze mood of a playlist using lyrics + audio features
async function analyzeMood(playlistData) {
  // Convert playlist data into a natural language prompt
  const prompt = buildPrompt(playlistData);

  // Send prompt to OpenAI for classification + recommendations
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  // Return the raw message content from GPT
  return response.choices[0].message.content;
}

module.exports = { analyzeMood };
