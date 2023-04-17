import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Navigate from './components/Navigate';

function App() {
  return (
    <div className="App">
      <div className="flex w-screen">
        <Navigate />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
