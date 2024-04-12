// Declare and initialize variables
let rows, cols;
const images = ["../images/black.png", "../images/white.png", "../images/kingBlack.png", "../images/kingWhite.png"];
let turn = 'x'; // Variable to keep track of whose turn it is

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

let pieces = initializeBoard();

// Call the function to build the game board
buildBoard();

// Function to reset the game
function resetGame() {
    // Set the turn back to 'x'
    turn = 'x'
    // Reset the game board
    pieces = initializeBoard();
    // Rebuild the game board
    buildBoard();
}

// Function to build the game board
function buildBoard() {
    let numToShow = 0;
    rows = 8; // Set the number of rows
    cols = 8; // Set the number of columns

    // Determine the current player based on whose turn it is
    const currentPlayer = (turn === 'x') ? "white" : "black"
    // Update the player display
    document.getElementById("player").innerHTML = currentPlayer

    // Start building the HTML for the game board
    let strToShow = "<table border='1'  align='center'>";
    for (let r = 0; r < rows; r++) {
        strToShow += "<tr>";
        for (let c = 0; c < cols; c++) {
            // Alternate the cell color
            const cellColor = (r + c) % 2 === 0 ? 'blackSquares' : 'whiteSquares';
            strToShow += `<td class="${cellColor}" id="${numToShow}" ondrop="drop(event)" ondragover="allowDrop(event)">`;
            // Add the pieces to the board
            strToShow += getPieceHTML(pieces[r][c], numToShow);
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

// Function to get the HTML for a piece
function getPieceHTML(piece, numToShow) {
    switch (piece) {
        case 'o':
            return `<img src="${images[0]}" draggable="true" ondragstart="drag(event)" class="blackPiece" id="drag${numToShow}">`;
        case 'x':
            return `<img src="${images[1]}" draggable="true" ondragstart="drag(event)" class="whitePiece" id="drag${numToShow}">`;
        case 'O':
            return `<img src="${images[2]}" draggable="true" ondragstart="drag(event)" class="blackPiece" id="drag${numToShow}">`;
        case 'X':
            return `<img src="${images[3]}" draggable="true" ondragstart="drag(event)" class="whitePiece" id="drag${numToShow}">`;
        default:
            return '';
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
    // Prevent the default handling of the event
    e.preventDefault();
    // Get the data that was transferred during the drag
    const data = e.dataTransfer.getData("text");

    // Get the number at the end of 'data'
    const num = parseInt(data.substring(4));
    const id = parseInt(e.target.id);
    // Get the image source of the piece that is being dragged (brown or black)
    const imgSrc = document.getElementById(data).src;

    // Get the length of the image source
    const start = imgSrc.lastIndexOf('/') + 1;
    const pieceType = imgSrc.substring(start, imgSrc.length);

    console.log(num, id, pieceType)

    // Check if the move is valid and update the board
    handleMove(num, id, pieceType);

    // Rebuild the game board
    promoteToKing();
    buildBoard();
}

function handleMove(num, id, pieceType) {
    const rowEnd = Math.floor(id / 8);
    const colEnd = id % 8;
    const curRow = Math.floor(num / 8);
    const curCol = num % 8;
    const originalRow = Math.floor(num / 8);
    const originalCol = num % 8;

    // Check if it's 'x' turn and the piece is white
    if (turn === 'x' && pieceType === 'kingWhite.png') {
        // Check if the move is valid
        if (Math.abs(rowEnd - curRow) === Math.abs(colEnd - curCol)) {
            // Move the piece
            movePiece(curRow, curCol, rowEnd, colEnd);
            pieces[rowEnd][colEnd] = 'X';
            pieces[originalRow][originalCol] = '_';
            turn = 'o';
        }
    } else if (turn === 'o' && pieceType === 'kingBlack.png') {
        // Check if the move is valid
        if (Math.abs(rowEnd - curRow) === Math.abs(colEnd - curCol)) {
            // Move the piece
            movePiece(curRow, curCol, rowEnd, colEnd);
            pieces[rowEnd][colEnd] = 'O';
            pieces[originalRow][originalCol] = '_';
            turn = 'x';
        }
    } else if (turn === 'x' && pieceType === 'white.png') {
        // Check if the move is valid
        handlePawnMove(num, id, 'x');
    } else if (turn === 'o' && pieceType === 'black.png') {
        // Check if the move is valid
        handlePawnMove(num, id, 'o');
    }
}

function handlePawnMove(num, id, player) {
    const rowEnd = Math.floor(id / 8);
    const colEnd = id % 8;
    const curRow = Math.floor(num / 8);
    const curCol = num % 8;

    if (player === 'x') {
        // Check if the move is valid
        if (num - id === 9 || num - id === 7) {
            // Move the piece
            pieces[rowEnd][colEnd] = 'x';
            pieces[curRow][curCol] = '_';
            turn = 'o';
        } else if (num - id === 14 || num - id === 18) {
            const rowInBetween = Math.floor((id + num) / 2 / 8);
            const colInBetween = (id + num) / 2 % 8;
            // Check if the jump is valid
            if ((pieces[rowInBetween][colInBetween] === 'o' || pieces[rowInBetween][colInBetween] === 'O') && pieces[rowEnd][colEnd] === '_' && pieces[curRow][curCol] === 'x') {
                pieces[rowInBetween][colInBetween] = '_';
                pieces[rowEnd][colEnd] = 'x';
                pieces[curRow][curCol] = '_';
                turn = 'o';
            }
        }
    } else {
        // Check if the move is valid
        if (num - id === -9 || num - id === -7) {
            // Move the piece
            pieces[rowEnd][colEnd] = 'o';
            pieces[curRow][curCol] = '_';
            turn = 'x';
        } else if (Math.abs(num - id) === 14 || Math.abs(num - id) === 18) {
            const rowInBetween = Math.floor((id + num) / 2 / 8);
            const colInBetween = (id + num) / 2 % 8;
            // Check if the jump is valid
            if ((pieces[rowInBetween][colInBetween] === 'x' || pieces[rowInBetween][colInBetween] === 'X') && pieces[rowEnd][colEnd] === '_' && pieces[curRow][curCol] === 'o') {
                pieces[rowInBetween][colInBetween] = '_';
                pieces[rowEnd][colEnd] = 'o';
                pieces[curRow][curCol] = '_';
                turn = 'x';
            }
        }
    }
}

function movePiece(curRow, curCol, rowEnd, colEnd) {
    while (curRow !== rowEnd && curCol !== colEnd) {
        if (pieces[curRow][curCol] === 'o' || pieces[curRow][curCol] === 'O') {
            pieces[curRow][curCol] = '_';
        }
        curRow = (curRow < rowEnd) ? curRow + 1 : curRow - 1;
        curCol = (curCol < colEnd) ? curCol + 1 : curCol - 1;
    }
}

function promoteToKing() {
    for (let i = 0; i < 8; i++) {
        if (pieces[0][i] === 'x') {
            pieces[0][i] = 'X';
        }
        if (pieces[7][i] === 'o') {
            pieces[7][i] = 'O';
        }
    }
}

// Function to check if the game is over
function checkWin() {
    // Check if there are no more black pieces
    let blackPieces = 0;
    let whitePieces = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (pieces[r][c] === 'x' || pieces[r][c] === 'X') {
                whitePieces++;
            }
            if (pieces[r][c] === 'o' || pieces[r][c] === 'O') {
                blackPieces++;
            }
        }
    }
    // Check if there are no more white pieces
    if (blackPieces === 0) {
        alert("White wins!");
        resetGame();
    }
    if (whitePieces === 0) {
        alert("Black wins!");
        resetGame();
    }
}

function switchTheme() {
    const stylesheet = document.getElementById("style");
    
    if (stylesheet.getAttribute("href") === "../CSS/style.css") {
        stylesheet.setAttribute("href", "../CSS/darkTheme.css");
        document.getElementById("theme").innerHTML = "Light Mode";
    } else {
        stylesheet.setAttribute("href", "../CSS/style.css");
        document.getElementById("theme").innerHTML = "Dark Mode";
    }
}