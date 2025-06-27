
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

function choiceRustling() {
  const story = document.getElementById('story');
  player.health -= 30;
  story.innerHTML = `
    <p>You step toward the rustling. A gnarled creature leaps from the shadows, one large eye gleaming. It overpowers you. This is the end... this time.</p>
    <button onclick="recordEnding('ambushed')">Try Again</button>
  `;
  updateStats();
}

function cautiousLeave() {
  const story = document.getElementById('story');
  player.health -= 10;
  story.innerHTML = `
    <p>You cautiously move past the noise, your axe ready. You make it home, but you feel watched. That night, something scratches the walls of your cabin.</p>
    <button onclick="recordEnding('haunted')">Try Again</button>
  `;
  updateStats();
}

function headHome() {
  const story = document.getElementById('story');
  player.health -= 15;
  story.innerHTML = `
    <p>You run. You trip, nearly lose the compass, but you find your way. You bolt the door behind you. You're safe... for now.</p>
    <button onclick="recordEnding('fled')">Try Again</button>
  `;
  updateStats();
}

function drawOut() {
  const story = document.getElementById('story');
  if (player.inventory.includes("Axe")) {
    story.innerHTML = `
      <p>You call out, drawing the beast into the open. You fight with everything—your axe, your instincts. Wounded, it flees. You've survived. For now.</p>
      <button onclick="recordEnding('survived')">See Results</button>
    `;
  } else {
    story.innerHTML = `
      <p>You try to lure the creature but lack a weapon. It doesn't go well. Your screams echo through the forest. A chilling end.</p>
      <button onclick="recordEnding('unarmed')">Try Again</button>
    `;
  }
  player.health -= 40;
  updateStats();
}

function recordEnding(ending) {
  if (!player.endingsSeen.includes(ending)) {
    player.endingsSeen.push(ending);
  }
  localStorage.setItem('cabinRPG', JSON.stringify(player));

  const story = document.getElementById('story');
  if (player.endingsSeen.length >= 4) {
    story.innerHTML = `
      <p>You've seen the tale from all sides. With each run, you learned more. Now you understand the forest, the beast... and yourself.</p>
      <p><strong>TRUE ENDING UNLOCKED.</strong></p>
      <button onclick="resetGame()">Play Again</button>
    `;
  } else {
    resetForRetry();
  }
}

function resetForRetry() {
  player.health = 100;
  player.inventory = ['Firewood', 'Rabbit Meat', 'Axe', 'Compass'];
  updateStats();
  location.reload();
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
