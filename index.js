const GameModule = (() => {
  const board = [null, null, null, null, null, null, null, null, null];

  let winner = null;
  let isGameOver = false;
  let turn = 'X';

  const setWinner = (player) => {
    winner = player;
    setWinState();
  };

  const createWinMessage = () => {
    let winMsg = `${turn}'s won!`;
    let congrats = document.createElement('h3');
    congrats.textContent = 'Congratulations!';
    let winningPara = document.createElement('p');
    winningPara.textContent = winMsg;
    const winDiv = document.createElement('div');
    winDiv.classList.add('winning-message');
    winDiv.appendChild(congrats);
    winDiv.appendChild(winningPara);
    const main = document.querySelector('main');
    main.appendChild(winDiv);
  };

  const setWinState = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.classList.remove('cell-empty');
    });
    createWinMessage();
  };

  const setGameOver = (boolean) => {
    isGameOver = boolean;
  };

  const resetBoardArray = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = null;
    }
  };

  const clearGameBoard = () => {
    const cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
      cell.textContent = '';
      cell.classList.add('cell-empty');
    }
  };

  const resetGame = () => {
    resetBoardArray();
    clearGameBoard();
    setTurn('X');
    setWinner(null);
    setGameOver(false);
  };

  const swapTurn = () => {
    switch (turn) {
      case 'X':
        turn = 'O';
        break;
      case 'O':
        turn = 'X';
        break;
    }
  };

  const setTurn = (nextTurn) => {
    turn = nextTurn;
  };

  const checkBoard = () => {
    if (checkRows() || checkColumns() || checkDiagonals() || checkDraw()) {
      setGameOver(true);
    }
  };

  const checkRows = () => {
    if (board[0] && board[0] === board[1] && board[1] === board[2]) {
      setWinner(turn);
      return board[0];
    } else if (board[3] && board[3] === board[4] && board[4] === board[5]) {
      setWinner(turn);
      return board[3];
    } else if (board[6] && board[6] === board[7] && board[7] === board[8]) {
      setWinner(turn);
      return board[6];
    }
    return false;
  };

  const checkColumns = () => {
    if (board[0] && board[0] === board[3] && board[3] === board[6]) {
      setWinner(turn);
      return board[0];
    } else if (board[1] && board[1] === board[4] && board[4] === board[7]) {
      setWinner(turn);
      return board[1];
    } else if (board[2] && board[2] === board[5] && board[5] === board[8]) {
      setWinner(turn);
      return board[2];
    }
    return false;
  };

  const checkDiagonals = () => {
    if (board[0] && board[0] === board[4] && board[4] === board[8]) {
      setWinner(turn);
      return board[0];
    } else if (board[2] && board[2] === board[4] && board[4] === board[6]) {
      setWinner(turn);
      return board[2];
    }
    return false;
  };

  const checkDraw = () => {
    if (board.every((v) => !!v)) {
      setGameOver(true);
      setWinner(null);
    }
  };

  const createGameBoard = () => {
    const body = document.querySelector('body');
    const main = document.createElement('main');
    board.forEach((cell, idx) => {
      let newCell = document.createElement('div');
      newCell.classList.add('cell');
      newCell.classList.add('cell-empty');
      newCell.classList.add(`cell-${idx}`);
      main.appendChild(newCell);
    });
    body.appendChild(main);
    addBoardFunctionality();
  };

  function takeTurn(idx, e) {
    if (this.textContent === '' && board[idx] === null && !isGameOver) {
      this.textContent = turn;
      this.classList.remove('cell-empty');
      board[idx] = turn;
      checkBoard();
      swapTurn();
    }
  }

  const addBoardFunctionality = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(function (cell, idx) {
      cell.addEventListener('click', takeTurn.bind(cell, idx));
    });
  };

  return {
    setTurn,
    checkBoard,
    createGameBoard,
  };
})();

const Player = (marker) => {
  const takeTurn = (marker) => {
    // ADD MARKER TO DIV
    // setTurn to next marker
  };
};

GameModule.createGameBoard();
