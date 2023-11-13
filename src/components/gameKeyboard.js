import { useContext, useEffect, useRef } from "react";
import { GameContext } from "../context/game";

function GameKeyboard({ updateBoard }) {
  const { userInput, setUserInput, tryCount } = useContext(GameContext);

  const keyLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
    ["BACKSPACE", "ENTER"],
  ];
  const keyboardRef = useRef(null);

  //hook responsible for focusing keyboard by default
  useEffect(() => {
    if (keyboardRef.current) {
      keyboardRef.current.focus();
    }
  }, []);

  //hook resposnible for updating tiles
  useEffect(() => {
    const inputText = userInput;

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
  }, [tryCount, userInput, updateBoard]);

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    handleKeyPress(key);
  };

  const handleKeyPress = (key) => {
    //im flatting the 2d array so i can easily check all things I need
    const keys = keyLayout.flat();
    if (keys.includes(key)) {
      if (key === "BACKSPACE") {
        setUserInput((prevInput) => prevInput.slice(0, -1));
      } else if (key === "ENTER") {
        console.log("formSubmitFunction");
      } else {
        setUserInput((prevInput) => prevInput + key);
      }
    }
    console.log(`Pressed key: ${key}`);
  };

  //function responsible for mapping keyboard,
  // and giving every letter properties
  const keyboard = keyLayout.map((keyRow, keyRowIndex) => {
    return (
      <div key={keyRowIndex} className="keyRow">
        {keyRow.map((key, keyIndex) => {
          return (
            <div
              key={keyIndex}
              className="keyTile"
              data-key={key}
              onClick={() => handleKeyPress(key)}
            >
              {key}
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div tabIndex="0" onKeyDown={handleKeyDown} ref={keyboardRef}>
      {keyboard}
    </div>
  );
}

export default GameKeyboard;
