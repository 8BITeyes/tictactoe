//GAME BOARD RENDER

const gameBoard = (() => {
    let wholeBoard = document.querySelector('#gameboard'); //full game board container
    
    let display = [];       //9 sections display of tic tac toe board
    for(let i = 0; i < 9; i++) {
        display.push('');
    };

    display.forEach(item => {
        let piece = document.createElement('div');
        piece.className = "square";
        wholeBoard.appendChild(piece);
    });

    let game = ['x','o','x','o','x','o','x','o','x'];
    const changeDisplay = () => function() {     //changes text of display sections to associated game content (i.e."x" or "o")
        for(let i = 0; i < 9; i++) {
            display[i] = game[i];
            let x = document.querySelector(`#gameboard > div:nth-child(${[i] + 1})`);
            console.log(x);
            x.textContent = display[i];
        }
    };

    return {changeDisplay}
})();

//GAME OBJECT

/*const gameFlow = (() => {

})();*/

//PLAYER FACTORY

let Player = (type, name) => {
    return {type, name};
};

gameBoard.changeDisplay();