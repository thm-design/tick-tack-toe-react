import React, { useState } from "react";
import "./styles.css";

const EMPTY = "";

export default function App() {
  // create board
  const [squares, setSquares] = useState(Array(9).fill(EMPTY));
  // X goes first
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (i) => {
    // bail right away if we have a
    // winner or the spot on the board is taken
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // get ready to update the board
    const newSquares = [...squares];
    // set the square on the board that was clicked
    newSquares[i] = isXNext ? "X" : "O";
    // update the board state
    setSquares(newSquares);
    // turn is over
    setIsXNext(!isXNext);
  };

  const cellRenderer = (i) => {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        {squares[i]}
      </button>
    );
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner!: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {cellRenderer(0)}
        {cellRenderer(1)}
        {cellRenderer(2)}
      </div>
      <div className="board-row">
        {cellRenderer(3)}
        {cellRenderer(4)}
        {cellRenderer(5)}
      </div>
      <div className="board-row">
        {cellRenderer(6)}
        {cellRenderer(7)}
        {cellRenderer(8)}
      </div>
    </div>
  );
}

const winSequences = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function calculateWinner(squares) {
  // ['O', 'X', 'X']
  // ['X', 'X', 'X']
  // ['O', 'O', 'X']
  for (let winSequence of winSequences) {
    const [spot1, spot2, spot3] = winSequence;

    if (
      squares[spot1] &&
      squares[spot1] === squares[spot2] &&
      squares[spot1] === squares[spot3]
    ) {
      console.log({
        winSequences,
        squares,
        "squares[spot1]": squares[spot1],
        "squares[spot2]": squares[spot2],
        "squares[spot3]": squares[spot3]
      });
      return squares[spot1];
    }
  }
  return null;
}
