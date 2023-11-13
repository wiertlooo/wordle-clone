import { createContext, useState } from "react";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [tryCount, setTryCount] = useState(0);
  const [userInput, setUserInput] = useState("");

  const values = { tryCount, setTryCount, userInput, setUserInput };

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export { GameProvider, GameContext };
