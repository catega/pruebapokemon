import React from 'react'
import ReactDOM from 'react-dom/client'
import Base from './pages/Base'
import Pokemon from './pages/Pokemon'
import Login from './pages/Login'
import Register from './pages/Register'
//import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {MainContextProvider} from './contexts/MainContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Base/>}>
            <Route path='pokemon' element={<Pokemon />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MainContextProvider>
  </React.StrictMode>
)
