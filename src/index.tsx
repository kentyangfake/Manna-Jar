import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import Editor from './pages/Editor/Editor';
import GraphView from './pages/GraphView/GraphView';
import Landing from './pages/Landing/Landing';
import Note from './pages/Note/Note';
import { store } from './redux/store';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />} />
          <Route path="graphview" element={<GraphView />} />
          <Route path="editor/:id" element={<Editor />} />
          <Route path="note/:id" element={<Note />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
