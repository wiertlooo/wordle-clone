import { createContext, useState } from "react";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [tryCount, setTryCount] = useState(0);

  return (
    <GameContext.Provider value={{ tryCount, setTryCount }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, GameContext };
