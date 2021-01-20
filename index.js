const GameModule = (() => {
  const board = [null, null, null, null, null, null, null, null, null];

  let isGameOver = false;
  let turn = 'X';

  const setGameOver = (boolean) => {
    isGameOver = boolean;
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = null;
    }
  };

  const resetGame = () => {
    resetBoard();
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

  const checkBoard = () => {
    if (checkRows() || checkColumns() || checkDiagonals()) {
      setGameOver(true);
    }
  };

  const checkRows = () => {
    if (board[0] && board[0] === board[1] && board[1] === board[2]) {
      return board[0];
    } else if (board[3] && board[3] === board[4] && board[4] === board[5]) {
      return board[3];
    } else if (board[6] && board[6] === board[7] && board[7] === board[8]) {
      return board[6];
    }
    return false;
  };

  const checkColumns = () => {
    if (board[0] && board[0] === board[3] && board[3] === board[6]) {
      return board[0];
    } else if (board[1] && board[1] === board[4] && board[4] === board[7]) {
      return board[1];
    } else if (board[2] && board[2] === board[5] && board[5] === board[8]) {
      return board[2];
    }
    return false;
  };

  const checkDiagonals = () => {
    if (board[0] && board[0] === board[4] && board[4] === board[8]) {
      return board[0];
    } else if (board[2] && board[2] === board[4] && board[4] === board[6]) {
      return board[2];
    }
    return false;
  };

  const createGameBoard = () => {
    const main = document.querySelector('main');
    board.forEach((cell, idx) => {
      let newCell = document.createElement('div');
      newCell.classList.add('cell');
      newCell.classList.add('cell-empty');
      newCell.classList.add(`cell-${idx}`);
      main.appendChild(newCell);
    });
  };

  return {
    swapTurn,
    checkBoard,
    createGameBoard,
  };
})();

const Player = (marker) => {
  const takeTurn = (marker) => {
    // ADD MARKER TO DIV
    GameModule.swapTurn();
  };
};

GameModule.createGameBoard();
