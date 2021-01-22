const GameModule = (() => {
  const board = [null, null, null, null, null, null, null, null, null];

  let winner = null;
  let isGameOver = false;
  let turn = 'X';

  const resetWinner = () => {
    winner = null;
  };

  const setWinner = (player) => {
    winner = player;
    setWinState();
  };

  const createWinMessage = () => {
    const endDiv = document.createElement('div');
    endDiv.classList.add('end-message');
    if (winner) {
      const winMsg = `${turn}'s won!`;
      const congrats = document.createElement('h3');
      congrats.textContent = 'Congratulations!';
      const winningPara = document.createElement('p');
      winningPara.textContent = winMsg;
      endDiv.appendChild(congrats);
      endDiv.appendChild(winningPara);
    } else {
      const drawMsg = "It's a draw!";
      const draw = document.createElement('h3');
      draw.textContent = drawMsg;
      endDiv.appendChild(draw);
    }
    const resetBtn = document.createElement('button');
    resetBtn.classList.add('reset-btn');
    resetBtn.textContent = 'Play again?';
    resetBtn.addEventListener('click', resetGame);
    endDiv.appendChild(resetBtn);
    const main = document.querySelector('main');
    main.appendChild(endDiv);
  };

  const removeEmptyCellClasses = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.classList.remove('cell-empty');
    });
  };

  const addEmptyCellClasses = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.classList.add('cell-empty');
    });
  };

  const setWinState = () => {
    removeEmptyCellClasses();
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

  const hideEndMsg = () => {
    const main = document.querySelector('main');
    const endDiv = document.querySelector('.end-message');
    main.removeChild(endDiv);
  };

  const resetGame = () => {
    hideEndMsg();
    resetBoardArray();
    clearGameBoard();
    setTurn('X');
    resetWinner();
    setGameOver(false);
    addEmptyCellClasses();
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
      // newCell.classList.add(`cell-${idx}`);
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

  const startGame = () => {
    const body = document.body;
    const instructions = document.querySelector('#instructions');
    body.removeChild(instructions);
    createGameBoard();
  };

  const startBtn = document.querySelector('.start-btn');
  startBtn.addEventListener('click', startGame);

  return {
    setTurn,
    checkBoard,
    createGameBoard,
  };
})();
