const buttons = document.querySelectorAll('.btn');
const resultText = document.querySelector('.result');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Winning combinations
const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Function to handle player's move
function handleMove(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        buttons[index].value = currentPlayer;
        buttons[index].classList.add(currentPlayer);

        // Check for a win
        for (const combo of winCombinations) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                resultText.textContent = `Player ${currentPlayer} wins!`;
                resetButton.disabled = false;
                return; // Exit the function early when a win is detected
            }
        }

        // Check for a draw
        if (!gameBoard.includes('') && gameActive) {
            resultText.textContent = "It's a draw!";
            resetButton.disabled = false;
            return; // Exit the function early when it's a draw
        }

        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        resultText.textContent = `Player ${currentPlayer} Turn`;
    }
}

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    buttons.forEach((button) => {
        button.value = '';
        button.classList.remove('X', 'O');
        button.removeAttribute('disabled');
    });
    resultText.textContent = `Player X Turn`;
    currentPlayer = 'X';
    gameActive = true;
    resetButton.disabled = true;
}

// Add click event listeners to buttons
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        handleMove(index);
        button.setAttribute('disabled', 'true');
    });
});

// Add click event listener to reset button
resetButton.addEventListener('click', () => {
    resetGame();
});

// Initialize the game
resetGame();