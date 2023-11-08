import { useState } from "react";

function GameInput({ updateBoard }) {
  const [userInput, setUserInput] = useState("");

  const keyWord = "wiert";

  //updating gameBoard onSubmit
  const handleFormSubmit = (event) => {
    event.preventDefault(); //prevent page refresh
    //swapping current userInput to array so I can map it
    const userWord = userInput.split("");
    const gameWord = keyWord.split("");

    if (userInput.length === 5) {
      if (keyWord === userInput) {
        console.log("you won the game! :D");
      } else {
        //mapping every letter to call updateBoard function passed from
        //App.js
        userWord.map((letter, index) => {
          if (gameWord[index] === letter) {
            console.log("The letter is in the right place " + letter);
          } else if (gameWord.includes(letter)) {
            console.log("Main word contains letter: " + letter);
          } else {
            console.log("main word does not contain this letter: " + letter);
          }
          updateBoard(0, index, letter);
          return letter;
        });
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
