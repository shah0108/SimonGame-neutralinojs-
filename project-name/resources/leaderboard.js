async function updateLeaderboardUI() {
  const leaderboardContainer = document.getElementById('leaderboard-display');
  try {
    const data = await Neutralino.filesystem.readFile('highscore.json');
    if (!data || data.trim() === '{}') {
      throw new Error("No scores found.");
    }

    let highScores = JSON.parse(data);

    let sortedScores = Object.entries(highScores)
      .map(([username, score]) => ({ username, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    leaderboardContainer.innerHTML = sortedScores.length
      ? sortedScores.map(entry => `<li>${entry.username}: ${entry.score}</li>`).join('')
      : '<li>No high scores available</li>';

  } catch (error) {
    console.error("Error loading leaderboard:", error);
    leaderboardContainer.innerHTML = `<li>${error.message}</li>`;
  }
}
