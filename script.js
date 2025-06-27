
let player = {
  health: 100,
  inventory: []
};

function updateStats() {
  document.getElementById('health').innerText = player.health;
  document.getElementById('inventory').innerText = player.inventory.length > 0 ? player.inventory.join(', ') : 'None';
  localStorage.setItem('cabinRPG', JSON.stringify(player));
}

function startAdventure() {
  const story = document.getElementById('story');
  player.inventory.push('Axe');
  player.health -= 10;
  story.innerHTML = `
    <p>You grab your old axe and step into the snow. The wind bites, and the trees creak like old bones. You hear a growl. Do you:</p>
    <button onclick="fight()">Fight</button>
    <button onclick="flee()">Flee</button>
  `;
  updateStats();
}

function fight() {
  const story = document.getElementById('story');
  player.health -= 20;
  story.innerHTML = `
    <p>You swing your axe into the darkness. A beast yelps and flees, leaving behind a glowing fang. You take it.</p>
    <button onclick="endDemo()">Return to Cabin</button>
  `;
  player.inventory.push('Glowing Fang');
  updateStats();
}

function flee() {
  const story = document.getElementById('story');
  player.health -= 5;
  story.innerHTML = `
    <p>You run back to the cabin, barely dodging sharp claws. You're safe, but rattled.</p>
    <button onclick="endDemo()">Sit by the Fire</button>
  `;
  updateStats();
}

function endDemo() {
  const story = document.getElementById('story');
  story.innerHTML = `
    <p>You rest inside the cabin, the warmth slowly returning to your bones. This is just the beginning.</p>
    <button onclick="resetGame()">Play Again</button>
  `;
  updateStats();
}

function resetGame() {
  player = {
    health: 100,
    inventory: []
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
