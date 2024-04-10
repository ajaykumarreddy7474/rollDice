const boardSize = 100;
const boardElement = document.getElementById('board');
const cells = [];
const endBox=document.querySelector('.ending');

// Create the board
for (let i = 0; i < 10; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        const num = (i % 2 === 0) ? (i * 10) + j + 1 : (i * 10) + 10 - j;
        cell.textContent = num;
        row.appendChild(cell);
        cells.push(cell);
 
        if(num%2===0){
            cell.style.backgroundColor="#e75480";
        }
    }
    boardElement.appendChild(row);
}

// Define snakes and ladders
const boardValue = {
    16: 6, 49: 11, 47: 26, 56: 53, 62: 19,
    64: 60, 71: 91, 80: 100, 87: 24, 93: 73,
    95: 75, 98: 78
};

// Function to roll dice
function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice1').innerText = dice1;
    document.getElementById('dice2').innerText = dice2;
    const totalSteps = dice1 + dice2;
    movePlayer(totalSteps);
}

// Function to move player
function movePlayer(steps) {
    let currentPlayerCell = cells.find(cell => cell.querySelector('.player'));
    if (currentPlayerCell) {
        currentPlayerCell.removeChild(currentPlayerCell.querySelector('.player'));
    }
    let newPosition = currentPlayerCell ? Number(currentPlayerCell.textContent) - 1 + steps : steps - 1;
    if (newPosition >= boardSize) {
        endBox.style.display='block';
       
    }
    
    newPosition = boardValue[newPosition + 1] || newPosition;
    const newCell = cells[newPosition];
    const player = document.createElement('div');
    player.classList.add('player');
    newCell.appendChild(player);
}
movePlayer(0);