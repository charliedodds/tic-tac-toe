const GameFlow = (() => {
  let _winner = null;
  let isGameOver = false;
  let turn = 'X';

  const _resetWinner = () => {
    _winner = null;
  };

  const setWinner = (player) => {
    _winner = player;
    _setWinState();
  };

  const _createWinMessage = () => {
    const endDiv = document.createElement('div');
    endDiv.classList.add('end-message');
    if (_winner) {
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

  const _setWinState = () => {
    GameBoard.removeEmptyCellClasses();
    _createWinMessage();
  };

  const setGameOver = (boolean) => {
    isGameOver = boolean;
  };

  const _hideEndMsg = () => {
    const main = document.querySelector('main');
    const endDiv = document.querySelector('.end-message');
    main.removeChild(endDiv);
  };

  const resetGame = () => {
    _hideEndMsg();
    GameBoard.resetBoardArray();
    GameBoard.clearGameBoard();
    setTurn('X');
    _resetWinner();
    setGameOver(false);
    GameBoard.addEmptyCellClasses();
  };

  const swapTurn = () => {
    if (GameFlow.turn === 'X') {
      GameFlow.turn = 'O';
    } else {
      GameFlow.turn = 'X';
    }
  };

  const setTurn = (nextTurn) => {
    turn = nextTurn;
  };

  const _startGame = () => {
    const body = document.body;
    const instructions = document.querySelector('#instructions');
    body.removeChild(instructions);
    GameBoard.createGameBoard();
  };

  const startBtn = document.querySelector('.start-btn');
  startBtn.addEventListener('click', _startGame);

  return {
    turn,
    setGameOver,
    isGameOver,
    setTurn,
    setWinner,
    swapTurn,
  };
})();

const GameBoard = (() => {
  const board = [null, null, null, null, null, null, null, null, null];

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

  const checkBoard = () => {
    if (checkRows() || checkColumns() || checkDiagonals() || checkDraw()) {
      GameFlow.setGameOver(true);
    }
  };

  const checkRows = () => {
    if (board[0] && board[0] === board[1] && board[1] === board[2]) {
      GameFlow.setWinner(GameFlow.turn);
      return board[0];
    } else if (board[3] && board[3] === board[4] && board[4] === board[5]) {
      GameFlow.setWinner(GameFlow.turn);
      return board[3];
    } else if (board[6] && board[6] === board[7] && board[7] === board[8]) {
      GameFlow.setWinner(GameFlow.turn);
      return board[6];
    }
    return false;
  };

  const checkColumns = () => {
    if (board[0] && board[0] === board[3] && board[3] === board[6]) {
      GameFlow.setWinner(GameFlow.turn);
      return board[0];
    } else if (board[1] && board[1] === board[4] && board[4] === board[7]) {
      GameFlow.setWinner(GameFlow.turn);
      return board[1];
    } else if (board[2] && board[2] === board[5] && board[5] === board[8]) {
      GameFlow.setWinner(GameFlow.turn);
      return board[2];
    }
    return false;
  };

  const checkDiagonals = () => {
    if (board[0] && board[0] === board[4] && board[4] === board[8]) {
      GameFlow.setWinner(GameFlow.turn);
      return board[0];
    } else if (board[2] && board[2] === board[4] && board[4] === board[6]) {
      GameFlow.setWinner(GameFlow.turn);
      return board[2];
    }
    return false;
  };

  const checkDraw = () => {
    if (board.every((v) => !!v)) {
      GameFlow.setGameOver(true);
      GameFlow.setWinner(null);
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

  const addBoardFunctionality = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(function (cell, idx) {
      cell.addEventListener('click', takeTurn.bind(cell, idx));
    });
  };

  function takeTurn(idx, e) {
    console.log(idx);
    console.log(e);
    if (
      this.textContent === '' &&
      board[idx] === null &&
      !GameFlow.isGameOver
    ) {
      this.textContent = GameFlow.turn;
      this.classList.remove('cell-empty');
      board[idx] = GameFlow.turn;
      checkBoard();
      GameFlow.swapTurn();
    }
  }

  return {
    board,
    removeEmptyCellClasses,
    addEmptyCellClasses,
    resetBoardArray,
    clearGameBoard,
    checkBoard,
    createGameBoard,
  };
})();
