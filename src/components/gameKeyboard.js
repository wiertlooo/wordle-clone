import { useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../context/game";

function GameKeyboard({ updateBoard, setGameLost, setGameWon, keyWord }) {
  const { userInput, setUserInput, tryCount, setTryCount } =
    useContext(GameContext);

  const [notEnoughLetters, setNotEnoughLetters] = useState(false);

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

  //monitoring tryCount on every tryCount change
  useEffect(() => {
    if (tryCount >= 5) {
      setGameLost(true);
    }
  }, [tryCount, setGameLost]);

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
        handleEnterSubmit();
      } else {
        setUserInput((prevInput) => prevInput + key);
      }
    }
    console.log(`Pressed key: ${key}`);
  };

  const handleEnterSubmit = () => {
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
    <div>
      {notEnoughLetters && (
        <h2 className="error">The word should be 5 letters long</h2>
      )}
      <div tabIndex="0" onKeyDown={handleKeyDown} ref={keyboardRef}>
        {keyboard}
      </div>
    </div>
  );
}

export default GameKeyboard;
