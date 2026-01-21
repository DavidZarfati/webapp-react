import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import Header from '../components/Header';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';

import './App.css'
import FilmPage from './pages/FilmPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <BrowserRouter >
        <Routes>
          <Route element={<AppLayout />}>
            <Route element={<Home />} path='/' />
            <Route element={<FilmPage />} path='/films' />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
