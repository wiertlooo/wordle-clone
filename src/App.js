import { useState } from "react";
import GameBoard from "./components/gameBoard";
import GameInput from "./components/gameInput";

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
  //prevBoard is used bcs otherwise it would update only last index when
  //called in g ameInput due to board rendering issues
  const updateBoard = (rowNumber, cellNumber, value) => {
    setBoard((prevBoard) => {
      const updatedBoard = prevBoard.map((row, rowIndex) => {
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
    });
  };

  //temporarily using handleClick to test updateBoard function
  //It works :)
  const handleClick = () => {
    updateBoard(0, 3, "A");
  };

  return (
    <div>
      <button onClick={handleClick}>zmień pierwszy element na A</button>
      <GameInput updateBoard={updateBoard} />
      <GameBoard board={board} />
    </div>
  );
}

export default App;
