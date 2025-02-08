const filePath = 'highscore.json';
const leaderboardFilePath = 'leaderboard.json';

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var highScore = 0;

// Initialize Neutralino environment
Neutralino.init();

document.addEventListener('DOMContentLoaded', async () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    window.location.href = 'login.html';
    return;
  }
  await initializeHighScore();
});

async function initializeHighScore() {
  try {
    const data = await Neutralino.filesystem.readFile(filePath);
    const userHighScore = JSON.parse(data)[localStorage.getItem('username')] || 0;
    highScore = userHighScore;
  } catch (error) {
    console.error("Error retrieving high score from file:", error);
    highScore = 0;
  }
  document.getElementById("highscore-display").textContent = `High Score: ${highScore}`;
}

document.getElementById('logout-toggle').addEventListener('click', () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('username');
  window.location.href = 'login.html';
});

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    updateHighScore();
    endGame();
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
  const randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => $(`#${currentColor}`).removeClass("pressed"), 100);
}

function playSound(name) {
  new Audio(`sounds/${name}.mp3`).play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
 
async function saveHighScore(username, score) {
  try {
    const data = await Neutralino.filesystem.readFile(filePath);
    let highScores = JSON.parse(data);
    if (!highScores[username] || score > highScores[username]) {
      highScores[username] = score;
      await Neutralino.filesystem.writeFile(filePath, JSON.stringify(highScores, null, 2));
      console.log("High score saved!");
    }
  } catch (error) {
    console.error("Error saving high score:", error);
  }
}

function updateHighScore() {
  const username = localStorage.getItem('username') || 'Guest';
  if (level > highScore) {
    highScore = level;
    saveHighScore(username, highScore);
    document.getElementById("highscore-display").textContent = `High Score: ${highScore}`;
  }
}

document.getElementById("fullscreen-toggle").addEventListener("click", async () => {
  try {
    const isFullscreen = await Neutralino.window.isFullScreen();
    isFullscreen ? await Neutralino.window.exitFullScreen() : await Neutralino.window.setFullScreen(true);
  } catch (error) {
    console.error("Error toggling fullscreen state:", error);
  }
});

document.addEventListener("keydown", async event => {
  if (event.key === "Escape") {
    try {
      if (await Neutralino.window.isFullScreen()) await Neutralino.window.exitFullScreen();
    } catch (error) {
      console.error("Error exiting fullscreen with Escape:", error);
    }
  }
});

document.getElementById("exit-button").addEventListener("click", async () => {
  try {
    await Neutralino.app.exit();
  } catch (error) {
    console.error("Error exiting application:", error);
  }
});

async function updateGlobalLeaderboard(username, score) {
  try {
    const data = await Neutralino.filesystem.readFile('leaderboard.json');
    let leaderboard = JSON.parse(data || '[]');  // Ensure empty list instead of undefined
    leaderboard.push({ username, score });
    leaderboard.sort((a, b) => b.score - a.score);
    await Neutralino.filesystem.writeFile('leaderboard.json', JSON.stringify(leaderboard.slice(0, 5), null, 2));
  } catch (error) {
    console.error('Error updating leaderboard:', error);
  }
}



async function endGame() {
  const username = localStorage.getItem('username') || 'Guest';
  if (level > highScore) {
    await saveHighScore(username, level);
  }
}

