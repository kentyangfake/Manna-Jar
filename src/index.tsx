import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import Landing from './pages/Landing/Landing';
import SignUp from './pages/Landing/SignUp';
import GraphView from './pages/GraphView/GraphView';
import Editor from './pages/Editor/Editor';
import Note from './pages/Note/Note';
import { Provider } from 'react-redux';
import { store } from './app/store';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="graphview" element={<GraphView />} />
          <Route path="editor/:id" element={<Editor />} />
          <Route path="note/:id" element={<Note />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
