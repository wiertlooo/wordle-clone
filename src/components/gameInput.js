import { useState } from "react";

function GameInput({ updateBoard }) {
  const [userInput, setUserInput] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const word = userInput.split("");

    word.map((letter, index) => {
      updateBoard(0, index, letter);
      return letter;
    });

    setUserInput("");
  };

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
