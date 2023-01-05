// GAME BOARD RENDER

const gameBoard = (() => {
  const wholeBoard = document.querySelector("#gameboard"); // full game board container
  const form = document.getElementById("player-form");
  const changeNames = document.querySelectorAll(".change");

  const displayGame = []; // 9 sections display of tic tac toe board
  for (let i = 0; i < 9; i++) {
    displayGame.push("");
    const piece = document.createElement("div");
    piece.className = `square-${[i]}`;
    wholeBoard.appendChild(piece);
  }

  function changeDisplay() {
    // loops through display array to change text content of item in array
    for (let i = 0; i < 9; i++) {
      const square = document.querySelector(
        `#gameboard > div:nth-child(${i + 1})`
      );
      displayGame[i] = square.textContent;
    }
  }

  changeNames.forEach((button) =>
    button.addEventListener("click", (event) => {
      gameBoard.form.style.display = "";
    })
  );

  return {
    displayGame,
    changeDisplay,
    wholeBoard,
    changeNames,
    form,
  };
})();

// GAME OBJECT

const gameFlow = (() => {
  // determines whose turn on the board it is; Player One: 'x' or Player Two: 'o'
  const sections = document.querySelectorAll("#gameboard > div");

  for (const section of sections) {
    section.addEventListener("click", () => {
      if (section.textContent === "") {
        // only changes board section content if blank
        if (getOccurance() === "x") {
          section.textContent = `${playerSubmit.playerTwo.type}`; // PlayerOne and Two type below after form submit
        } else if (getOccurance() === "o") {
          section.textContent = `${playerSubmit.playerOne.type}`;
        } else if (getOccurance() === "tied") {
          section.textContent = `${playerSubmit.playerOne.type}`;
        }
      }
      gameBoard.changeDisplay();
    });
  }

  function getOccurance() {
    // Determines whether 'x' or 'o' is dominated in displayGame array in gameBoard
    let x = 0;
    let o = 0;
    gameBoard.displayGame.forEach((item) => item === "X" && x++);
    gameBoard.displayGame.forEach((item) => item === "O" && o++);

    if (x > o) {
      return "x";
    }
    if (o > x) {
      return "o";
    }
    return "tied";
  }

  const winningCombo = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  let playerOneIndex = [];
  let playerTwoIndex = [];
  for (const section of sections) {
    // checks the board if either player has won the game
    section.addEventListener("click", () => {
      for (let i = 0; i < gameBoard.displayGame.length; i++) {
        // gameBoard.displayGame in first IIFE
        if (gameBoard.displayGame[i] === "X") {
          switch (playerOneIndex.includes(i)) {
            case false:
              playerOneIndex.push(i);
              break;
            case true:
              break;
          }
        } else if (gameBoard.displayGame[i] === "O") {
          switch (playerTwoIndex.includes(i)) {
            case false:
              playerTwoIndex.push(i);
              break;
            case true:
              break;
          }
        }
      }
      checkWinner();
    });
  }

  // WIN COUNT DISPLAY UPDATE

  const playerOneWins = document.querySelector(".wins-one");
  const playerTwoWins = document.querySelector(".wins-two");

  let winCountOne = 0;
  let winCountTwo = 0;

  let winningPlayer;

  const checkWinner = () => {
    // Checks array for win
    winningCombo.forEach((key) => {
      switch (key.every((key) => playerOneIndex.includes(key))) {
        case false:
          break;
        case true:
          if (winningPlayer === undefined) {
            // If winningPlayer is already defined, then switch breaks
            winningPlayer = playerSubmit.playerOne.name;
            displayWinner.textContent = `${winningPlayer} wins`; // Adds name of winning player visually to page
            winCountOne++;
            playerOneWins.textContent = `wins: ${winCountOne}`;
            break;
          }
      }
      switch (key.every((key) => playerTwoIndex.includes(key))) {
        case false:
          break;
        case true:
          if (winningPlayer === undefined) {
            winningPlayer = playerSubmit.playerTwo.name;
            displayWinner.textContent = `${winningPlayer} wins`;
            winCountTwo++;
            playerTwoWins.textContent = `wins: ${winCountTwo}`;
          }
      }
    });

    return winningPlayer;
  };

  const resetButton = document.querySelector("#reset"); // Resets board and indexes of players
  resetButton.addEventListener("click", () => {
    playerOneIndex = [];
    playerTwoIndex = [];
    displayWinner.textContent = undefined;

    for (const section of sections) {
      section.textContent = "";
      gameBoard.changeDisplay();
    }

    winningPlayer = undefined; // Resets winningPlayer variable (line 129) so checkWinner and win counts can reset
  });

  const displayWinner = document.querySelector("#winner"); // displays winner on page using #winner div

  return {
    playerOneIndex,
    playerTwoIndex,
    checkWinner,
    getOccurance,
  };
})();

// PLAYER SUBMIT FORM

const playerSubmit = (() => {
  const Player = (type, name) => ({ type, name });

  const firstPlayerInput = document.getElementById("player-one"); // Form input of player names
  const secondPlayerInput = document.getElementById("player-two");

  const playerOne = Player("X", firstPlayerInput.value);
  const playerTwo = Player("O", secondPlayerInput.value);

  const firstPlayerName = document.querySelector(".player:first-child > .name"); // Display of player names on page
  const secondPlayerName = document.querySelector(
    ".player:nth-child(2) > .name"
  );

  const addPlayers = () => {
    if (firstPlayerInput.value === "" || secondPlayerInput.value === "") {
      alert("please fill in all player names");
    } else {
      playerSubmit.playerOne = Player("X", firstPlayerInput.value); // 'This' changes so must use playerSubmit.playerOne
      playerSubmit.playerTwo = Player("O", secondPlayerInput.value);

      firstPlayerName.textContent = playerSubmit.playerOne.name;
      secondPlayerName.textContent = playerSubmit.playerTwo.name;

      gameBoard.form.style.display = "none";
      gameBoard.changeNames.forEach(
        (button) => (button.style.pointerEvents = "auto")
      );
      gameBoard.wholeBoard.style.pointerEvents = "auto";
    }
  };

  const submitButton = document.querySelector("#confirm"); // Form submit button
  submitButton.addEventListener("click", addPlayers);
  firstPlayerInput.addEventListener("keydown", (event) => {
    // Submits form when enter key is hit while focused on input
    if (event.key === "Enter") {
      addPlayers();
    }
  });
  secondPlayerInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addPlayers();
    }
  });

  return { playerOne, playerTwo, addPlayers };
})();
