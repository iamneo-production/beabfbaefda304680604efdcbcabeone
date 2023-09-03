// Initial game state
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let result = document.querySelector('.result');
let btns = document.querySelectorAll('.cell');
let conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle player moves
const ticTacToe = (element, index) => {
    // Check if the clicked cell is empty
    if (cells[index] === '') {
        // Update the cell with the current player's symbol
        cells[index] = currentPlayer;
        element.textContent = currentPlayer;

        // Check for winning conditions
        for (const condition of conditions) {
            const [a, b, c] = condition;
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                // Display the winning message
                result.textContent = `${currentPlayer} wins!`;

                // Disable all cells
                btns.forEach((cell) => cell.style.pointerEvents = 'none');
                return; // Exit the function
            }
        }

        // Switch to the other player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        // Display the current player's turn
        result.textContent = `Current player: ${currentPlayer}`;
    }
};

// Reset Function
const resetGame = () => {
    // Reset game state
    cells = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';

    // Clear cell content
    btns.forEach((cell) => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
    });

    // Update result message
    result.textContent = 'Current player: X';
};

// Attach click event listeners
btns.forEach((cell, i) => {
    cell.addEventListener('click', () => ticTacToe(cell, i));
});

document.querySelector('#reset').addEventListener('click', resetGame);
