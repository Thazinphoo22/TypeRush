const easyWords = [
  "cat",
  "dog",
  "sun",
  "book",
  "tree",
  "ball",
  "fish",
  "shoe",
  "car",
  "hat",
  "bird",
  "star",
  "milk",
  "cake",
  "desk",
  "pen",
  "cup",
  "door",
  "house",
  "apple",
];

const mediumWords = [
  "garden",
  "pencil",
  "window",
  "flower",
  "animal",
  "summer",
  "orange",
  "purple",
  "planet",
  "rocket",
  "school",
  "friend",
  "butter",
  "forest",
  "guitar",
  "puzzle",
  "pirate",
  "jungle",
  "mountain",
  "castle",
];

const hardWords = [
  "chocolate",
  "strawberry",
  "airplane",
  "telephone",
  "umbrella",
  "mischievous",
  "television",
  "bicycle",
  "computer",
  "elephant",
  "adventure",
  "lightning",
  "restaurant",
  "vegetable",
  "alligator",
  "astronaut",
  "invisible",
  "nightmare",
  "whisper",
];

let currentWord = "";
let score = 0;
let mistakes = 0;
let timeLeft = 0;
let timer;
let gameMode = "";

const button = document
  .getElementById("myButton")
  .addEventListener("click", randomWord);
document
  .getElementById("easy-mode")
  .addEventListener("click", () => startGame("easy"));
document
  .getElementById("medium-mode")
  .addEventListener("click", () => startGame("medium"));
document
  .getElementById("hard-mode")
  .addEventListener("click", () => startGame("hard"));
document.getElementById("myText").addEventListener("input", checkInputText);

function randomWord() {
  let wordList = [];
  if (gameMode === "easy") {
    wordList = easyWords;
  } else if (gameMode === "medium") {
    wordList = mediumWords;
  } else if (gameMode === "hard") {
    wordList = hardWords;
  }

  currentWord = wordList[Math.floor(Math.random() * wordList.length)];
  document.getElementById("words").textContent = currentWord;
  document.getElementById("myText").value = "";
}

function startGame(mode) {
  gameMode = mode;
  score = 0;
  mistakes = 0;
  document.getElementById("score").innerText = `Score: ${score}`;
  document.getElementById("mistakes").innerText = `Mistakes: ${mistakes}`;
  document.getElementById("game-over").style.display = "none";
  randomWord();
  setInitialTimer();
  startTimer();
  document.getElementById("myText").focus(); // Focus on the input field so straight away typing not move mouse.
}

function checkInputText() {
  const input = document.getElementById("myText").value;
  if (input === currentWord) {
    score++;
    document.getElementById("score").innerText = `Score: ${score}`;
    randomWord();
  } else if (input.length >= currentWord.length) {
    mistakes++;
    document.getElementById("mistakes").innerText = `Mistakes: ${mistakes}`;
    randomWord(); // randomWord() parenthesis invoke function, execute the code if without() just a function reference
    // no parameter,empty space between ()
  }
}

function setInitialTimer() {
  if (gameMode === "easy") {
    timeLeft = 20;
  } else if (gameMode === "medium") {
    timeLeft = 15;
  } else if (gameMode === "hard") {
    timeLeft = 10;
  }
  document.getElementById("time-left").innerText = `Time left: ${timeLeft} sec`;
  // backticks template literal and ${ } meaning embed value of timeLeft variables within a string
}

// function startTimer() meaning no arguments function's operation does not depend on external input provided at the time of the call.
function startTimer() {
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  document.getElementById("time-left").innerText = `Time left: ${timeLeft} sec`;
  if (timeLeft <= 0) {
    setTimeout(endGame, 500);
    // endGame(); wait half a second before prompt appears so timeLeft is 0
  }
}

function endGame() {
  clearInterval(timer);
  document.getElementById("game-over").style.display = "block";
  // display element visible, behave like block level element, start on a new line and stretch to fill the available width
  document.getElementById("words").textContent = "";
  updateLeaderboard();
}
// document.getElementById = " " reset or clear the contents of HTML elements=> no text will be displayed inside the element, clearing existing text

// prompt  ||"Anonymous" the code assign Anonymous to playerName if the prompt appears undefined, null, or empty string.
function updateLeaderboard() {
  const playerName =
    prompt("Enter your name for the leaderboard") || "Anonymous";
  const leaderboard = document.getElementById("leaderboard");
  const newEntry = document.createElement("li");
  newEntry.innerText = `${playerName}: ${score}`;
  leaderboard.appendChild(newEntry); // add child node to existing parent node;

  // Sort the leaderboard entries based on scores
  const entries = [...leaderboard.children];
  entries.sort((a, b) => {
    const scoreA = parseInt(a.innerText.split(":")[1]);
    const scoreB = parseInt(b.innerText.split(":")[1]);
    return scoreB - scoreA;
  });
  // parseInt converts first argument to a string, parse that strings, then returns an integar.
  //  a.innerText=> playerName: score [1] index 0 1 arr

  // Clear and re-append sorted entries
  leaderboard.innerHTML = "";
  // entries.forEach((entry) => leaderboard.appendChild(entry));
  for (let i = 0; i < entries.length; i++) {
    leaderboard.appendChild(entries[i]);
  }
}
