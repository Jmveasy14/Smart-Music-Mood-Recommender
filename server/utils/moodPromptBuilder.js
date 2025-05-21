function buildPrompt(data) {
    let songsList = data.map(song => (
      `- ${song.name} by ${song.artist}, Lyrics: "${song.lyrics}", Features: tempo ${song.tempo}, valence ${song.valence}, energy ${song.energy}`
    )).join('\n');
  
    return `
    Here's a playlist:
    ${songsList}
  
    Based on this, summarize the overall mood in 2-3 words and suggest 3 real-world activities or locations that match the vibe. Keep it concise.
    `;
  }
  
  module.exports = buildPrompt;
  