import { useEffect, useState } from "react";

function GameInput({ updateBoard, setGameWon, setGameLost }) {
  const [userInput, setUserInput] = useState("");

  const [tryCount, setTryCount] = useState(0);

  const keyWord = "wiert";

  useEffect(() => {
    if (tryCount >= 5) {
      setGameLost(true);
      return;
    }
  }, [tryCount, setGameLost]);

  //updating gameBoard onSubmit
  const handleFormSubmit = (event) => {
    event.preventDefault(); //prevent page refresh
    //swapping current userInput to array so I can map it
    const userWord = userInput.split("");
    const gameWord = keyWord.split("");

    if (userInput.length === 5) {
      if (keyWord === userInput) {
        userWord.map((letter, index) => {
          updateBoard(tryCount, index, letter, "green");
          return letter;
        });
        setGameWon(true);
      } else {
        //mapping every letter to call updateBoard function passed from
        //App.js
        userWord.map((letter, index) => {
          if (gameWord[index] === letter) {
            console.log("The letter is in the right place " + letter);
            updateBoard(tryCount, index, letter, "green");
          } else if (gameWord.includes(letter)) {
            console.log("Main word contains letter: " + letter);
            updateBoard(tryCount, index, letter, "yellow");
          } else {
            console.log("main word does not contain this letter: " + letter);
            updateBoard(tryCount, index, letter, "red");
          }
          return letter;
        });
        setTryCount(tryCount + 1);
      }
      //setting userInput to blank after Submit
      setUserInput("");
    } else {
      alert("The word should be 5 letters");
    }
  };

  //input onChange handler, nothing interesting right now, just linking
  //input with state, so it is controlled by react, not browser
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" value={userInput} onChange={handleInputChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
export default GameInput;
