import "./style.css";
import React from "react";
import App from './App';
import ReactDOM from 'react-dom/client';
import { GameEngineProvider } from "./hooks/useGameEngine";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameEngineProvider>
      <App/>
    </GameEngineProvider>
  </React.StrictMode>
)