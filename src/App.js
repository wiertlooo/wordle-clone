import { useEffect, useState } from "react";
import GameBoard from "./components/gameBoard";
import GameInput from "./components/gameInput";
import wordList from "./words.json";

function App() {
  //using useState to create initial board that will change during game
  const [board, setBoard] = useState(() => {
    //using loop to create 5 rows, 5 cells gameboard
    const initialBoard = [];
    for (let i = 0; i < 5; i++) {
      initialBoard.push(Array(5).fill({ letter: "", color: "white" }));
    }
    return initialBoard;
  });
  const [keyWord, setKeyWord] = useState("");
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  //choosing random word from words.json file
  useEffect(() => {
    setKeyWord(wordList[Math.floor(Math.random() * wordList.length)]);
  }, []);
  //function used to update cells in gameboard,
  // you need to pass row number, then cell number, and value
  //prevBoard is used bcs otherwise it would update only last index when
  //called in g ameInput due to board rendering issues
  const updateBoard = (rowNumber, cellNumber, value, color) => {
    setBoard((prevBoard) => {
      const updatedBoard = prevBoard.map((row, rowIndex) => {
        if (rowIndex === rowNumber) {
          return row.map((cell, cellIndex) => {
            if (cellIndex === cellNumber) {
              return { letter: value.toUpperCase(), color: color };
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

  return (
    <div>
      {gameWon && <div>You won the game!</div>}
      {gameLost && <div>You lost the game! The word is: {keyWord}</div>}
      <div className="game">
        <GameBoard board={board} />
        {!gameWon && !gameLost && (
          <GameInput
            updateBoard={updateBoard}
            setGameWon={setGameWon}
            setGameLost={setGameLost}
            keyWord={keyWord}
          />
        )}
      </div>
    </div>
  );
}

export default App;
