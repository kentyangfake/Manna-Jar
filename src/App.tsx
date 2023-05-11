import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import { useAppSelector } from './redux/hooks';
import { selectIsToggleMenu } from './redux/userSlice';

function App() {
  const toggled = useAppSelector(selectIsToggleMenu);

  return (
    <div className="App">
      <div className="relative flex w-screen h-full bg-stone-300">
        <NavBar />
        <div
          className={`grow ${
            toggled ? 'ml-48' : 'ml-7'
          } transition-all lg:ml-0 lg:mt-12`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
