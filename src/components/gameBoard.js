import { useEffect, useState } from "react";

function GameBoard({ board }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => {
              return (
                <div key={cellIndex} className="cell">
                  {cell}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default GameBoard;
