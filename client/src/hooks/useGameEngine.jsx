import React from 'react';

const GameEngineContext = React.createContext();

// timers

export const GameEngineProvider = ({ children }) => {
  return (
    <GameEngineContext.Provider value={{}}>
      {children}
    </GameEngineContext.Provider>
  )
}

export const useGameEngine = () => {
  const context = React.useContext(GameEngineContext);
  if (context === undefined) {
    throw new Error("useGameEngine must be used within a GameengineProvider");
  }
  return context;
}