$(document).ready(function () {
    // When the document/page has fully loaded, this code will run (jQuery)

    let currentPlayer = 'X'; // Initialize the current player
    let gameBoard = ['', '', '', '', '', '', '', '', '']; // Initialize the game board array for 9 cells
    let gameOver = false; // Initialize the game state as in play

    
    const cells = $('[cell]'); // jQuery is used to select the elements called 'cell'
    const alert = $('#alert'); // Selects the element with the ID 'alert'

     // Winning combination arrays
     // checkWin() and checkDraw() will iterate through to find a winning pattern or draw
    const combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // jQuery click event handler for each cell
    cells.on('click', cellClick); 

    // Cell click to check for winner and draw
    function cellClick() {

        const cell = $(this); // Get the clicked cell
        const cellIndex = cells.index(cell); // Get the index of clicked cell

        // If the cell is not empty or if the game is over (true), the game is over.
        if (gameBoard[cellIndex] !== '' || gameOver) return; 

        // If game still going, game board updates with the current player's symbol and displays X or O
        gameBoard[cellIndex] = currentPlayer; 
        cell.text(currentPlayer); 

        // After game continues, it continues to check for a winner or draw and ends the game 
        if (checkWin()) {
            endGame(false); 
        } else if (checkDraw()) {
            endGame(true);
        } else {
            // Switches to other player's turn if game is still in play. 
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'; 
        }
    }
    // Checks for a winner.
    function checkWin() {
        // Iterates through winning combinations and matches current player with winning combination from game board index
        return combinations.some(combo => { // .some() checks for a matching combination 
            return combo.every(index => gameBoard[index] === currentPlayer); // .every() checks each cell for combo
        });
    }
    // Checks for a draw when every cell is filled with and X or a O
    function checkDraw() {
        //.some() runs through cells on game board. If cell is empty, the game continues
        // If cells are full (!== 0), the game ends in a draw
        return gameBoard.every(cell => cell !== ''); 
    }
    // Ends the game and displays a bootstrap alert with the results of winner or draw
    function endGame(draw) {

        gameOver = true; // The game state is set to over
        if (draw) {
            alert.text("It's a Draw. Play again!"); // Displays an alert for a draw
        } else {
            alert.text(`${currentPlayer} is the winner!`); // Displays an alert for a winner
        }
        alert.css('display', 'block'); // Displays the bootstrap alert with the ID 'alert'
    }
});