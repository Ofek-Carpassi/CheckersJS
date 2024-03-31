# CheckersJS
This is a very simple implementation of the classic "Checkers" game. <br>
It is written in JavaScript and uses the HTML5 canvas for rendering. <br>

## How to play
The game is played by two players on a board of 8x8 squares. <br>
The goal is to get to the opponent's side when you have the most pieces on the board. <br>
The game ends when one checker has reached the opponent's side. <br>
The player with the most pieces on the board wins. <br>
Each player starts with 12 pieces on the dark squares of the three rows closest to them. <br>
The white player starts the game. Each player can move one piece per turn. <br>
Pieces can only move diagonally. <br>

## Features
- Drag and drop functionality to move pieces instead of using onclick events.
- Automatic detection of valid moves.
- Automatic detection of when a player has won.

## How to run
Just open the `index.html` file in your browser. <br>

## Code structure
The games logic is implemented in the `game.js` file. <br>
This file includes the intialization of the game board, the logic for moving and capturing pieces, and the logic for determining when a player has won. <br>
The `BuildBoard` function is used to draw the board on the canvas. <br>
The `drag`, `allowDrop`, and `drop` functions are used to implement the drag and drop functionality. <br>
The `checkWin` function is used to determine when a player has won. <br>

## Future improvements
- Add multiplayer online functionality.
- Add an AI to play against.
- Add a scoring system.
- Improve the UI.
- Add options to save and load games.
- Add move history and undo functionality.
- Add animations for moving pieces.
- Add sound effects.
- Add a timer for each player's turn.
- Add a tutorial for new players.

## Contributing
Feel free to contribute to this project. <br>
Please open an issue if you have any suggestions or find any bugs. <br>

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.