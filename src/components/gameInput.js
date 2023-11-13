import { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/game";

function GameInput({ updateBoard, setGameWon, setGameLost, keyWord }) {
  const { tryCount, setTryCount } = useContext(GameContext);

  const [userInput, setUserInput] = useState("");

  const [notEnoughLetters, setNotEnoughLetters] = useState(false);

  //monitoring tryCount on every tryCount change
  useEffect(() => {
    if (tryCount >= 5) {
      setGameLost(true);
    }
  }, [tryCount, setGameLost]);

  //updating gameBoard onSubmit
  const handleFormSubmit = (event) => {
    event.preventDefault(); //prevent page refresh
    //swapping current userInput to array so I can map it

    if (userInput.length === 5) {
      //hiding not enough letters error
      setNotEnoughLetters(false);
      //spliting both userInput word and keyWord to arrays
      const userWord = userInput.toUpperCase().split("");
      const gameWord = keyWord.toUpperCase().split("");

      //if keyWord === userInput game is won!
      if (keyWord === userInput) {
        userWord.map((letter, index) => {
          updateBoard(tryCount, index, letter, "green");
          return letter;
        });
        setGameWon(true);
      } else {
        //mapping every letter to call updateBoard function passed from
        //App.js and changing if the box behind should be red/green/blue
        userWord.map((letter, index) => {
          if (gameWord[index] === letter) {
            updateBoard(tryCount, index, letter, "green");
          } else if (gameWord.includes(letter)) {
            updateBoard(tryCount, index, letter, "yellow");
          } else {
            updateBoard(tryCount, index, letter, "red");
          }
          return letter;
        });
        //changing tryCount to update row for next word, and
        //monitoring game status (is lost?)
        setTryCount(tryCount + 1);
      }
      //setting userInput to blank after Submit
      setUserInput("");
    } else {
      //showing not enough letters error
      setNotEnoughLetters(true);
    }
  };

  //input onChange handler, nothing interesting right now, just linking
  //input with state, so it is controlled by react, not browser
  const handleInputChange = (event) => {
    setUserInput(event.target.value);

    const inputText = event.target.value.toUpperCase();

    //loop reesponsible for setting board while typing
    // i < 5 - 5 is wordLength
    for (let i = 0; i < 5; i++) {
      //if i < input length updateBoard to letter
      if (i < inputText.length) {
        updateBoard(tryCount, i, inputText[i], "white");
      } else {
        //set remaining tiles as blank
        updateBoard(tryCount, i, "", "white");
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="form">
      {notEnoughLetters && (
        <h2 className="error">The word should be 5 letters long</h2>
      )}
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className="input"
      />
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
}
export default GameInput;
