import { useState } from "react";

function GameInput({ updateBoard }) {
  const [userInput, setUserInput] = useState("");

  //updating gameBoard onSubmit
  const handleFormSubmit = (event) => {
    event.preventDefault(); //prevent page refresh
    //swapping current userInput to array so I can map it
    const word = userInput.split("");

    //mapping every letter to call updateBoard function passed from
    //App.js
    word.map((letter, index) => {
      updateBoard(0, index, letter);
      return letter;
    });

    //setting userInput to blank after Submit
    setUserInput("");
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
