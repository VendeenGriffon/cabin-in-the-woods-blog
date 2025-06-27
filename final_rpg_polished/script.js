
let player = {
  endingsSeen: []
};

function updateStats() {
  document.getElementById('inventory').innerText = "Axe, Firewood, Rabbit Meat, Compass";
  localStorage.setItem('cabinRPG_endings', JSON.stringify(player.endingsSeen));
}

function renderReturnHome() {
  return '<button onclick="goHome()">Return Home</button>';
}

function goHome() {
  localStorage.removeItem('cabinRPG_endings');
  window.location.href = '../index.html';
}

function choiceRustling() {
  showStory(
    "You step toward the rustling. A gnarled creature leaps from the shadows, one large eye gleaming. It overpowers you. This is the end... this time.",
    'ambushed'
  );
}

function cautiousLeave() {
  showStory(
    "You cautiously move past the noise, your axe ready. You make it home, but you feel watched. That night, something scratches the walls of your cabin.",
    'haunted'
  );
}

function headHome() {
  showStory(
    "You run. You trip, nearly lose the compass, but you find your way. You bolt the door behind you. You're safe... for now.",
    'fled'
  );
}

function drawOut() {
  if (player.endingsSeen.includes('ambushed') &&
      player.endingsSeen.includes('haunted') &&
      player.endingsSeen.includes('fled')) {
    showTrueEnding();
  } else {
    showStory(
      "You call out into the trees. A hulking shadow bursts through the snow. You raise your axe but it's too late. The forest claims another.",
      'unarmed'
    );
  }
}

function showStory(text, endingKey) {
  if (!player.endingsSeen.includes(endingKey)) {
    player.endingsSeen.push(endingKey);
  }

  updateStats();

  const story = document.getElementById('story');
  story.innerHTML = `
    <p>${text}</p>
    <button onclick="resetForRetry()">Try Again</button>
    ${renderReturnHome()}
  `;
}

function showTrueEnding() {
  const story = document.getElementById('story');
  story.innerHTML = `
    <p>You step into the clearing, steady and ready. The monster charges, but this time... you're prepared. You strike. The woods fall silent at last.</p>
    <p><strong>TRUE ENDING UNLOCKED.</strong> The cabin is finally safe. For now.</p>
    <button onclick="resetGame()">Play Again</button>
    ${renderReturnHome()}
  `;
}

function resetForRetry() {
  const story = document.getElementById('story');
  story.innerHTML = `
    <p>You’ve just left the village, rumors of a one-eyed monster gnawing at your mind. Snow crunches underfoot as you make your way back to your cabin, carrying firewood, rabbit meat, your axe, and a compass.</p>
    <p>Suddenly, you hear rustling from the trees.</p>
    <button onclick="choiceRustling()">Investigate</button>
    <button onclick="cautiousLeave()">Leave Cautiously</button>
    <button onclick="headHome()">Rush Home</button>
    <button onclick="drawOut()">Draw It Out</button>
    ${renderReturnHome()}
  `;
}

function resetGame() {
  player = { endingsSeen: [] };
  localStorage.removeItem('cabinRPG_endings');
  location.reload();
}

window.onload = () => {
  const saved = localStorage.getItem('cabinRPG_endings');
  if (saved) {
    player.endingsSeen = JSON.parse(saved);
  } else {
    player.endingsSeen = [];
  }
  updateStats();
};
