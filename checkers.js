// Declare and initialize variables
var rows, cols, tor = 0, win = false;
var a;
var Player1Name, Player2Name;
var img = ["black.png", "white.png"] // Array of image file names for the pieces

var color = 0;
var colors = ["violet", "green", "red"];
var turn = 'x'; // Variable to keep track of whose turn it is

// Initial setup of the game board
var pieces = [
    ['O', ' ', 'O', ' ', 'O', ' ', 'O', ' '],
    [' ', 'O', ' ', 'O', ' ', 'O', ' ', 'O'],
    ['O', ' ', 'O', ' ', 'O', ' ', 'O', ' '],
    [' ', '', ' ', '', ' ', '', ' ', ''],
    ['', ' ', '', ' ', '', ' ', '', ' '],
    [' ', 'x', ' ', 'x', ' ', 'x', ' ', 'x'],
    ['x', ' ', 'x', ' ', 'x', ' ', 'x', ' '],
    [' ', 'x', ' ', 'x', ' ', 'x', ' ', 'x']
];

// Call the function to build the game board
BuildBoard();

// Function to reset the game
function resetGame() {
    // Set the turn back to 'x'
    turn = 'x'
    // Reset the game board
    pieces = [
        ['O', ' ', 'O', ' ', 'O', ' ', 'O', ' '],
        [' ', 'O', ' ', 'O', ' ', 'O', ' ', 'O'],
        ['O', ' ', 'O', ' ', 'O', ' ', 'O', ' '],
        [' ', '', ' ', '', ' ', '', ' ', ''],
        ['', ' ', '', ' ', '', ' ', '', ' '],
        [' ', 'x', ' ', 'x', ' ', 'x', ' ', 'x'],
        ['x', ' ', 'x', ' ', 'x', ' ', 'x', ' '],
        [' ', 'x', ' ', 'x', ' ', 'x', ' ', 'x']
    ];

    // Rebuild the game board
    BuildBoard();
}

// Function to build the game board
function BuildBoard() {
    var numToShow = 0;
    rows = 8; // Set the number of rows
    cols = 8; // Set the number of columns

    // Determine the current player based on whose turn it is
    var currentPlayer = (turn == 'x') ? "white" : "black"
    // Update the player display
    document.getElementById("player").innerHTML = currentPlayer

    // Start building the HTML for the game board
    var strToShow = "<table border='1'  align='center'>";
    for (var r = 0; r < rows; r++) {
        strToShow += "<tr>";
        for (var c = 0; c < cols; c++) {
            // Alternate the cell color
            if ((r + c) % 2 == 0) {
                strToShow += "<td style='background-color:black'  width='60' height='60' id=" +
                    numToShow.toString() + "  ondrop='drop(event)' ondragover='allowDrop(event)'>";
            } else {
                strToShow += "<td style='background-color:white'  width='60' height='60' id=" +
                    numToShow.toString() + " ondrop='drop(event)' ondragover='allowDrop(event)'>";
            }
            // Add the pieces to the board
            if (pieces[r][c] == 'O') {
                strToShow += "<img src ='" + img[0].toString() + "' draggable='true' ondragstart='drag(event)' id='drag" + numToShow.toString() + "'>";
            }
            if (pieces[r][c] == 'x') {
                strToShow += "<img src ='" + img[1].toString() + "' draggable='true' ondragstart='drag(event)' id='drag" + numToShow.toString() + "'>";
            }
            strToShow += "</td>";
            numToShow++;
        }
    }
    strToShow += "</tr></table>";
    strToShow += "<div id = \"Reset-Button-Container\">";
    strToShow += "<div id = \"Center\">";
    strToShow += "<button onclick=\"resetGame()\" id = \"Reset-Game\">Reset Game</button>"
    strToShow += "</div>"
    strToShow += "</div>"
    // Update the game board display
    document.getElementById("gameboard").innerHTML = strToShow;
    // Check if the game is over
    if (checkWin() == true) {
        alert("Game Over")
        resetGame()
    }
}

// Function to handle the drag event
function drag(e) {
    // Set the data to be transferred during the drag
    e.dataTransfer.setData("text", e.target.id);
}

// Function to allow the drop event
function allowDrop(e) {
    // Prevent the default handling of the event
    e.preventDefault();
}

// Function to handle the drop event
function drop(e) {
    console.log(pieces)
    // Prevent the default handling of the event
    e.preventDefault();
    // Get the data that was transferred during the drag
    var data = e.dataTransfer.getData("text");

    // Get the number at the end of 'data'
    var num = parseInt(data.substring(4));
    var id = parseInt(e.target.id);
    // Get the number at the end of 'e.target.id'

    // Get the image source of the piece that is being dragged (brown or black)
    var imgSrc = document.getElementById(data).src;

    // Now we got the entire source, we only need the last part of it
    imgSrc = imgSrc.substring(imgSrc.length - 9);

    console.log(num, id, imgSrc)

    // Check if it's 'x' turn and the piece is white
    if (turn == 'x' && imgSrc == "white.png") {
        // Check if the move is valid
        if (num - id == 9 || num - id == 7) {
            // Move the piece
            var rowEnd = Math.floor(id / 8);
            var colEnd = id % 8;
            var curRow = Math.floor(num / 8);
            var curCol = num % 8;
            console.log(rowEnd, colEnd, curRow, curCol)
            if (imgSrc == "white.png") pieces[rowEnd][colEnd] = 'x';
            else { pieces[rowEnd][colEnd] = 'O' }
            pieces[curRow][curCol] = '_';
            turn = 'O'
        }
        // Check if the move is a jump
        else if (num - id == 14 || num - id == 18) {
            var rowInBetween = Math.floor((id + num) / 2 / 8);
            var colInBetween = (id + num) / 2 % 8;
            var rowEnd = Math.floor(id / 8);
            var colEnd = id % 8;
            var curRow = Math.floor(num / 8);
            var curCol = num % 8;
            // Check if the jump is valid
            if (pieces[rowInBetween][colInBetween] == 'O' && pieces[rowEnd][colEnd] == '_' && pieces[curRow][curCol] == 'x') {
                pieces[rowInBetween][colInBetween] = '_';
                pieces[rowEnd][colEnd] = 'x';
                pieces[curRow][curCol] = '_';
                turn = 'O'
            }
        }
    }
    // Check if it's 'O' turn and the piece is black
    else if (turn == 'O' && imgSrc == "black.png") {
        // Check if the move is valid
        if (num - id == -9 || num - id == -7) {
            // Move the piece
            var rowEnd = Math.floor(id / 8);
            var colEnd = id % 8;
            var curRow = Math.floor(num / 8);
            var curCol = num % 8;
            if (imgSrc == "white.png") pieces[rowEnd][colEnd] = 'x';
            else { pieces[rowEnd][colEnd] = 'O' }
            pieces[curRow][curCol] = '_';
            turn = 'x'
        }
        // Check if the move is a jump
        else if (num - id == -14 || num - id == -18) {
            var rowInBetween = Math.floor((id + num) / 2 / 8);
            var colInBetween = (id + num) / 2 % 8;
            var rowEnd = Math.floor(id / 8);
            var colEnd = id % 8;
            var curRow = Math.floor(num / 8);
            var curCol = num % 8;
            // Check if the jump is valid
            if (pieces[rowInBetween][colInBetween] == 'x' && pieces[rowEnd][colEnd] == '_' && pieces[curRow][curCol] == 'O') {
                pieces[rowInBetween][colInBetween] = '_';
                pieces[rowEnd][colEnd] = 'O';
                pieces[curRow][curCol] = '_';
                turn = 'x'
            }
        }
    }
    else {
        return;
    }
    // Rebuild the game board
    BuildBoard()
}

// Function to check if a piece has reached the end of the board
function pieceFinished() {
    for (var i = 0; i < 8; i++) {
        if (pieces[0][i] == 'x' || pieces[7][i] == 'O') {
            return true;
        }
    }
    return false;
}

// Function to check if the game is over
function checkWin() {
    if (pieceFinished() == false)
        return false;

    var xAmount = 0;
    var OAmount = 0;

    // Count the number of each piece
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (pieces[i][j] == 'x') {
                xAmount++;
            }
            else if (pieces[i][j] == 'O') {
                OAmount++;
            }
        }
    }

    // Determine the winner
    if (OAmount > xAmount) {
        alert("Black Wins")
    }
    else if (xAmount > OAmount) {
        alert("White Wins")
    }
    else {
        alert("It's a tie")
    }
    return true;
}