// Declare and initialize variables
var rows, cols;
var img = ["black.png", "white.png", "kingBlack.png", "kingWhite.png"];
var turn = 'x'; // Variable to keep track of whose turn it is

// Initial setup of the game board
function initializeBoard() {
    return [
        ['o', ' ', 'o', ' ', 'o', ' ', 'o', ' '],
        [' ', 'o', ' ', 'o', ' ', 'o', ' ', 'o'],
        ['o', ' ', 'o', ' ', 'o', ' ', 'o', ' '],
        [' ', '_', ' ', '_', ' ', '_', ' ', '_'],
        ['_', ' ', '_', ' ', '_', ' ', '_', ' '],
        [' ', 'x', ' ', 'x', ' ', 'x', ' ', 'x'],
        ['x', ' ', 'x', ' ', 'x', ' ', 'x', ' '],
        [' ', 'x', ' ', 'x', ' ', 'x', ' ', 'x']
    ];
}

var pieces = initializeBoard();

// Call the function to build the game board
BuildBoard();

// Function to reset the game
function resetGame() {
    // Set the turn back to 'x'
    turn = 'x'
    // Reset the game board
    pieces = initializeBoard();
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
            if ((r + c) % 2 == 0)
                strToShow += "<td class = 'blackSquares' id=" + numToShow.toString() + "  ondrop='drop(event)' ondragover='allowDrop(event)'>";
            else
                strToShow += "<td class = 'whiteSquares' id=" + numToShow.toString() + " ondrop='drop(event)' ondragover='allowDrop(event)'>";
            // Add the pieces to the board
            if (pieces[r][c] == 'o')
                strToShow += "<img src ='" + img[0].toString() + "' draggable='true' ondragstart='drag(event)' class = 'blackPiece' id='drag" + numToShow.toString() + "'>";
            if (pieces[r][c] == 'x') 
                strToShow += "<img src ='" + img[1].toString() + "' draggable='true' ondragstart='drag(event)' class = 'whitePiece' id='drag" + numToShow.toString() + "'>";
            if(pieces[r][c] == 'O') 
                strToShow += "<img src ='" + img[2].toString() + "' draggable='true' ondragstart='drag(event)' class = 'blackPiece' id='drag" + numToShow.toString() + "'>";
            if(pieces[r][c] == 'X')
                strToShow += "<img src ='" + img[3].toString() + "' draggable='true' ondragstart='drag(event)' class = 'whitePiece' id='drag" + numToShow.toString() + "'>";
            strToShow += "</td>";
            numToShow++;
        }
    }
    strToShow += "</tr></table>";
    // Update the game board display
    document.getElementById("gameboard").innerHTML = strToShow;
    // Check if the game is over
    checkWin();
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

    // Get the length of the image source
    var start = imgSrc.length;
    for(var i = imgSrc.length - 1; i >= 0; i--) {
        if(imgSrc[i] == '/') {
            start = i + 1;
            break;
        }
    }
    imgSrc = imgSrc.substring(start, imgSrc.length);

    console.log(num, id, imgSrc)

    // Check if it's 'x' turn and the piece is white
    if(turn == 'x' && imgSrc == 'kingWhite.png') {
        // Check if the move is valid
        var rowEnd = Math.floor(id / 8);
        var colEnd = id % 8;
        var curRow = Math.floor(num / 8);
        var curCol = num % 8;
        var originalRow = Math.floor(num / 8);
        var originalCol = num % 8;
        // Make sure the king moves diagonally (rowEnd - curRow == colEnd - curCol == 1)
        if(Math.abs(rowEnd - curRow) == Math.abs(colEnd - curCol)) {
            // Move the piece
            while(curRow != rowEnd && curCol != colEnd) {
                if(pieces[curRow][curCol] == 'o' || pieces[curRow][curCol] == 'O') {
                    pieces[curRow][curCol] = '_';
                }
                curRow = (curRow < rowEnd) ? curRow + 1 : curRow - 1;
                curCol = (curCol < colEnd) ? curCol + 1 : curCol - 1;
            }
            pieces[rowEnd][colEnd] = 'X';
            pieces[originalRow][originalCol] = '_';
            turn = 'o'
        }
    }
    else if(turn == 'o' && imgSrc == 'kingBlack.png') {
        // Check if the move is valid
        var rowEnd = Math.floor(id / 8);
        var colEnd = id % 8;
        var curRow = Math.floor(num / 8);
        var curCol = num % 8;
        var originalRow = Math.floor(num / 8);
        var originalCol = num % 8;
        // Make sure the king moves diagonally (rowEnd - curRow == colEnd - curCol == 1)
        if(Math.abs(rowEnd - curRow) == Math.abs(colEnd - curCol)) {
            // Move the piece
            while(curRow != rowEnd && curCol != colEnd) {
                if(pieces[curRow][curCol] == 'x' || pieces[curRow][curCol] == 'X') {
                    pieces[curRow][curCol] = '_';
                }
                curRow = (curRow < rowEnd) ? curRow + 1 : curRow - 1;
                curCol = (curCol < colEnd) ? curCol + 1 : curCol - 1;
            }
            pieces[rowEnd][colEnd] = 'O';
            pieces[originalRow][originalCol] = '_';
            turn = 'x'
        }
    }
    else if (turn == 'x' && imgSrc == 'white.png') {
        // Check if the move is valid
        if (num - id == 9 || num - id == 7) {
            // Move the piece
            var rowEnd = Math.floor(id / 8);
            var colEnd = id % 8;
            var curRow = Math.floor(num / 8);
            var curCol = num % 8;
            console.log(rowEnd, colEnd, curRow, curCol)
            if (imgSrc == "white.png") pieces[rowEnd][colEnd] = 'x';
            else { pieces[rowEnd][colEnd] = 'o' }
            pieces[curRow][curCol] = '_';
            turn = 'o'
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
            if ((pieces[rowInBetween][colInBetween] == 'o' || pieces[rowInBetween][colInBetween] == 'O') && pieces[rowEnd][colEnd] == '_' && pieces[curRow][curCol] == 'x') {
                pieces[rowInBetween][colInBetween] = '_';
                pieces[rowEnd][colEnd] = 'x';
                pieces[curRow][curCol] = '_';
                turn = 'o'
            }
        }
    }
    // Check if it's 'O' turn and the piece is black
    else if (turn == 'o' && imgSrc == "black.png") {
        // Check if the move is valid
        if (num - id == -9 || num - id == -7) {
            // Move the piece
            var rowEnd = Math.floor(id / 8);
            var colEnd = id % 8;
            var curRow = Math.floor(num / 8);
            var curCol = num % 8;
            if (imgSrc == "white.png") pieces[rowEnd][colEnd] = 'x';
            else { pieces[rowEnd][colEnd] = 'o' }
            pieces[curRow][curCol] = '_';
            turn = 'x'
        }
        // Check if the move is a jump
        else if (Math.abs(num - id) == 14 || Math.abs(num - id) == 18) {
            var rowInBetween = Math.floor((id + num) / 2 / 8);
            var colInBetween = (id + num) / 2 % 8;
            var rowEnd = Math.floor(id / 8);
            var colEnd = id % 8;
            var curRow = Math.floor(num / 8);
            var curCol = num % 8;
            // Check if the jump is valid
            if ((pieces[rowInBetween][colInBetween] == 'x' || pieces[rowInBetween][colInBetween] == 'X') && pieces[rowEnd][colEnd] == '_' && pieces[curRow][curCol] == 'o') {
                pieces[rowInBetween][colInBetween] = '_';
                pieces[rowEnd][colEnd] = 'o';
                pieces[curRow][curCol] = '_';
                turn = 'x'
            }
        }
    }
    else {
        return;
    }
    // Rebuild the game board
    promoteToKing()
    BuildBoard()
}

function promoteToKing() {
    for(let i = 0; i < 8; i++) {
        if(pieces[0][i] == 'x') {
            pieces[0][i] = 'X';
        }
        if(pieces[7][i] == 'o') {
            pieces[7][i] = 'O';
        }
    }
}

// Function to check if a piece has reached the end of the board
function pieceFinished() {
    for (var i = 0; i < 8; i++) {
        if (pieces[0][i] == 'x' || pieces[7][i] == 'o') {
            return true;
        }
    }
    return false;
}

// Function to check if the game is over
function checkWin() {
    // Check if there are no more black pieces
    var blackPieces = 0;
    var whitePieces = 0;

    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            if (pieces[r][c] == 'x' || pieces[r][c] == 'X') {
                whitePieces++;
            }
            if (pieces[r][c] == 'o' || pieces[r][c] == 'O') {
                blackPieces++;
            }
        }
    }
    // Check if there are no more white pieces
    if (blackPieces == 0) {
        alert("White wins!");
        resetGame();
    }
    if (whitePieces == 0) {
        alert("Black wins!");
        resetGame();
    }
}

function switchTheme()
{
    var stylesheet = document.getElementById("style");
    
    if(stylesheet.getAttribute("href") == "style.css")
    {
        stylesheet.setAttribute("href", "darkTheme.css");
    }
    else
    {
        stylesheet.setAttribute("href", "style.css");
    }
}