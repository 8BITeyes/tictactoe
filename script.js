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
            if (section.textContent === '') {
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
    }
})();

//PLAYER FACTORY

let Player = (type, name) => {
    return {type, name};
};

const playerOne = Player('x', 'Jeff');
const playerTwo = Player('o', 'Jeffica');