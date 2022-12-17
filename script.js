//GAME BOARD RENDER

const gameBoard = (() => {
    let wholeBoard = document.querySelector('#gameboard'); //full game board container
    
    let displayGame = [];       //9 sections display of tic tac toe board
    for(let i = 0; i < 9; i++) {
        displayGame.push('');
        let piece = document.createElement('div');
        piece.className = `square-${[i]}`;
        wholeBoard.appendChild(piece);
    }

    function changeDisplay() {     //loops through display array to change text content of item in array
        for(let i = 0; i < 9; i++) {
            let square = document.querySelector(`#gameboard > div:nth-child(${i + 1})`);
            displayGame[i] = square.textContent;
        }
    }

    return {displayGame, changeDisplay};
})();

//GAME OBJECT

const gameFlow = (() => {       //determines whose turn on the board it is; Player One: 'x' or Player Two: 'o'
    let sections = document.querySelectorAll('#gameboard > div');

    for (const section of sections) {
        section.addEventListener('click', function onClick() {
            if (section.textContent === '') {       //only changes board section content if blank
                if (getOccurance() === 'x') {
                    section.textContent = `${playerTwo.type}`;
                } else if (getOccurance() === 'o') {
                    section.textContent = `${playerOne.type}`;
                } else if(getOccurance() === 'tied'){
                    section.textContent = `${playerOne.type}`;
                }
            }
            gameBoard.changeDisplay();
        });
    };
    
    function getOccurance() {       //Determines whether 'x' or 'o' is dominated in displayGame array in gameBoard
        let x = 0;
        let o = 0;
        gameBoard.displayGame.forEach((item) => (item === 'x' && x++));
        gameBoard.displayGame.forEach((item) => (item === 'o' && o++));

        if(x > o) {
            return 'x';
        } else if (o > x) {
            return 'o';
        } else {
            return 'tied';
        }
    };
    
    const winningCombo = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ];

    let playerOneIndex = [];
    let playerTwoIndex = [];
    for (const section of sections) {           //checks the board if either player has won the game
        section.addEventListener('click', function checkWin() {
            for (let i = 0; i < gameBoard.displayGame.length; i++) { //gameBoard.displayGame in first IIFE
                if(gameBoard.displayGame[i] === 'x') {
                    switch(playerOneIndex.includes(i)) {
                        case false:
                            playerOneIndex.push(i);
                            break;
                        case true:
                            break;
                    }
                }
                else if(gameBoard.displayGame[i] === 'o') {
                    switch(playerTwoIndex.includes(i)) {
                        case false:
                            playerTwoIndex.push(i);
                            break;
                        case true:
                            break;
                    }
                }
            };
            checkWinner();
        });
    };

    const resetButton = document.querySelector('#reset'); //Resets board and indexes of players
    resetButton.addEventListener('click', () => {
        playerOneIndex = [];
        playerTwoIndex = [];
        displayWinner.textContent = undefined;

        for (const section of sections) {
            section.textContent = '';
            gameBoard.changeDisplay();
        }
    });

    const checkWinner = () => {
        let winningPlayer;
        winningCombo.forEach((key) => {
            switch(key.every(key => playerOneIndex.includes(key))) {
                case false:
                    break;
                case true:
                    if(winningPlayer === undefined) { //If winningPlayer is already defined, then switch breaks
                        winningPlayer = playerOne.name;
                        displayWinner.textContent = `${winningPlayer} wins`;  //Adds name of winning player visually to page using #winner
                    }else {
                        break;
                    }
            };
            switch(key.every(key => playerTwoIndex.includes(key))) {
                case false:
                    break;
                case true:
                    if(winningPlayer === undefined) {
                        winningPlayer = playerTwo.name;
                        displayWinner.textContent = `${winningPlayer} wins`;
                    } else {
                        break;
                    }
            };
        });
        return winningPlayer;
    };

    const displayWinner = document.querySelector('#winner'); //displays winner on page using #winner div

    return {playerOneIndex, playerTwoIndex, checkWinner}
})();

//PLAYER FACTORY

let Player = (type, name) => {
    return {type, name};
};

const playerOne = Player('x', 'Jeff');
const playerTwo = Player('o', 'Jeffica');
