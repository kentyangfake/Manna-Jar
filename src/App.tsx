import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Navigate from './components/Navigate';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100%;
  gap: 80px;
`;

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Navigate />
        <Outlet />
      </Wrapper>
    </div>
  );
}

export default App;
