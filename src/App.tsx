import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Navigate from './components/Navigate';

function App() {
  const [toggled, setToggled] = useState(false);
  return (
    <div className="App">
      <div className="flex w-screen">
        <div className={toggled ? 'fixed' : 'hidden'}>
          <Navigate setToggled={setToggled} />
        </div>
        <div
          className={
            toggled
              ? 'hidden'
              : `fixed flex min-h-screen w-8 border border-stone-500  bg-stone-300 text-stone-500 hover:bg-stone-200`
          }
          onClick={() => setToggled(true)}
        >
          開
        </div>
        <div
          className={`w-full overflow-x-hidden ${toggled ? 'ml-48' : 'ml-8'}`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
