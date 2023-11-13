import { useEffect, useRef } from "react";

function GameKeyboard() {
  const keyLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
    ["BACKSPACE", "ENTER"],
  ];
  const keyboardRef = useRef(null);

  useEffect(() => {
    if (keyboardRef.current) {
      keyboardRef.current.focus();
    }
  }, []);

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    console.log(key);
  };

  const handleKeyPress = (key) => {
    console.log(`Pressed key: ${key}`);
  };

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
              tabIndex="0"
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
