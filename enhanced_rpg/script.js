
let player = {
  health: 100,
  inventory: ['Firewood', 'Rabbit Meat', 'Axe', 'Compass'],
  endingsSeen: []
};

function updateStats() {
  document.getElementById('health').innerText = player.health;
  document.getElementById('inventory').innerText = player.inventory.join(', ');
  localStorage.setItem('cabinRPG', JSON.stringify(player));
}

function renderReturnHome() {
  return '<button onclick="goHome()">Return Home</button>';
}

function goHome() {
  window.location.href = '../index.html';
}

function choiceRustling() {
  player.health -= 30;
  player.inventory = [];  // Simulate dropping everything
  showStory(
    "You step toward the rustling. A gnarled creature leaps from the shadows, one large eye gleaming. It overpowers you. This is the end... this time.",
    'ambushed'
  );
}

function cautiousLeave() {
  player.health -= 10;
  showStory(
    "You cautiously move past the noise, your axe ready. You make it home, but you feel watched. That night, something scratches the walls of your cabin.",
    'haunted'
  );
}

function headHome() {
  player.health -= 15;
  showStory(
    "You run. You trip, nearly lose the compass, but you find your way. You bolt the door behind you. You're safe... for now.",
    'fled'
  );
}

function drawOut() {
  if (player.inventory.includes("Axe")) {
    player.health -= 40;
    player.inventory.push("Trophy Fang");
    showStory(
      "You call out, drawing the beast into the open. You fight with everything—your axe, your instincts. Wounded, it flees. You've survived. For now.",
      'survived',
      true
    );
  } else {
    player.health -= 50;
    player.inventory = [];
    showStory(
      "You try to lure the creature but lack a weapon. It doesn't go well. Your screams echo through the forest. A chilling end.",
      'unarmed'
    );
  }
}

function showStory(text, endingKey, checkTrueEnding = false) {
  const story = document.getElementById('story');

  if (!player.endingsSeen.includes(endingKey)) {
    player.endingsSeen.push(endingKey);
  }

  localStorage.setItem('cabinRPG', JSON.stringify(player));

  const buttons = `
    <button onclick="resetForRetry()">Try Again</button>
    ${renderReturnHome()}
  `;

  if (checkTrueEnding && player.endingsSeen.includes('ambushed') &&
      player.endingsSeen.includes('haunted') &&
      player.endingsSeen.includes('fled') &&
      player.endingsSeen.includes('unarmed')) {
    story.innerHTML = `
      <p>${text}</p>
      <p><strong>TRUE ENDING UNLOCKED.</strong> The cabin stands firm against the snow. You now know what lurks out there—and how to stop it.</p>
      <button onclick="resetGame()">Play Again</button>
      ${renderReturnHome()}
    `;
  } else {
    story.innerHTML = `<p>${text}</p>${buttons}`;
  }

  updateStats();
}

function resetForRetry() {
  player.health = 100;
  player.inventory = ['Firewood', 'Rabbit Meat', 'Axe', 'Compass'];
  updateStats();
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
  player = {
    health: 100,
    inventory: ['Firewood', 'Rabbit Meat', 'Axe', 'Compass'],
    endingsSeen: []
  };
  localStorage.removeItem('cabinRPG');
  location.reload();
}

window.onload = () => {
  const saved = localStorage.getItem('cabinRPG');
  if (saved) {
    player = JSON.parse(saved);
  }
  updateStats();
};
