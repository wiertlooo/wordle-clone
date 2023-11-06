import { useEffect, useState } from "react";
import GameBoard from "./components/gameBoard";

function App() {
  //using useState to create initial board that will change during game
  const [board, setBoard] = useState(() => {
    //using loop to create 5 rows, 5 cells gameboard
    const initialBoard = [];
    for (let i = 0; i < 5; i++) {
      initialBoard.push(Array(5).fill(""));
    }
    return initialBoard;
  });

  //function used to update cells in gameboard,
  // you need to pass row number, then cell number, and value
  const updateBoard = (rowNumber, cellNumber, value) => {
    const updatedBoard = board.map((row, rowIndex) => {
      if (rowIndex === rowNumber) {
        return row.map((cell, cellIndex) => {
          if (cellIndex === cellNumber) {
            return value;
          } else {
            return cell;
          }
        });
      } else {
        return row;
      }
    });
    return updatedBoard;
  };

  //temporarily using handleClick to test working of updateBoard function
  //It works :)
  const handleClick = () => {
    setBoard(updateBoard(0, 3, "A"));
  };
  //useEffect to see any changes after update
  useEffect(() => {
    console.log(board);
  }, [board]);

  return (
    <div>
      <button onClick={handleClick}>zmień pierwszy element na A</button>
      <GameBoard />
    </div>
  );
}

export default App;
