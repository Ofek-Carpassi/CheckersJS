// main.js

// Add event listener to the start game button
document.getElementById('start-game').addEventListener('click', startGame);

function startGame() {
    const gameMode = document.querySelector('input[name="game-mode"]:checked').value;
    if (gameMode === 'local') {
        // Start local game
        window.location.href = 'game.html';
    } else if (gameMode === 'ai') {
        // Start AI game
        window.location.href = 'game.html';
        // Initiate the AI game logic
        initAIGame();
    }
    // Hide the game mode selection
    document.getElementById('game-mode-container').style.display = 'none';
}

function initAIGame() {
    // Initialize the AI game logic
    // Call functions from game-logic.js to set up the AI player
}