function GameBoard({ board }) {
  return (
    <div className="board">
      {/* mapping rows from board prop */}
      {board.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="row">
            {/* mapping cells */}
            {row.map((cell, cellIndex) => {
              return (
                <div key={cellIndex} className={`cell ${cell.color}`}>
                  {/* rendering cell value, works like board[rowIndex][cellIndex] */}
                  {cell.letter}
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
