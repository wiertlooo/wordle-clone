function GameKeyboard() {
  const keyLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
    ["↵", "⌫"],
  ];

  const keyboard = keyLayout.map((keyRow, keyRowIndex) => {
    return (
      <div key={keyRowIndex} className="keyRow">
        {keyRow.map((key, keyIndex) => {
          return (
            <div key={keyIndex} className="keyTile">
              {key}
            </div>
          );
        })}
      </div>
    );
  });

  return <div>{keyboard}</div>;
}

export default GameKeyboard;
