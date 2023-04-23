import React, { useState } from "react";
import "./styles.css";

const EMPTY_CELL = "";

export default function TicTacToe() {
  const [cells, setCells] = useState(Array(9).fill(EMPTY_CELL));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(cells);

  const handleClick = (index) => {
    if (winner || cells[index]) {
      return;
    }
    const newCells = [...cells];
    newCells[index] = isXNext ? "X" : "O";
    setCells(newCells);
    setIsXNext(!isXNext);
  };

  const renderCell = (index) => {
    return (
      <button className="cell" onClick={() => handleClick(index)}>
        {cells[index]}
      </button>
    );
  };

  const renderStatus = () => {
    if (winner) {
      return (
        <div className="status">
          <h2>Winner: {winner}</h2>
          <button onClick={startNewGame}>New Game</button>
        </div>
      );
    } else if (cells.every((cell) => cell)) {
      return (
        <div className="status">
          <h2>Draw!</h2>
          <button onClick={startNewGame}>New Game</button>
        </div>
      );
    } else {
      return <h2>Next player: {isXNext ? "X" : "O"}</h2>;
    }
  };

  const startNewGame = () => {
    setCells(Array(9).fill(EMPTY_CELL));
    setIsXNext(true);
  };
  
  const renderBoard = () => {
    return (
      <div className="board">
        <div className="row">
          {renderCell(0)}
          {renderCell(1)}
          {renderCell(2)}
        </div>
        <div className="row">
          {renderCell(3)}
          {renderCell(4)}
          {renderCell(5)}
        </div>
        <div className="row">
          {renderCell(6)}
          {renderCell(7)}
          {renderCell(8)}
        </div>
      </div>
    );
  };

  return (
    <div className="game">
    <h1>Tic-Tac-Toe</h1>
    {renderBoard()}
    <div className="status">
      {renderStatus()}
    </div>
  </div>
  );
}

function calculateWinner(cells) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}
