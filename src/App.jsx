import { useState } from 'react'

import './App.css'
//router-dom
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//react-toastify
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
//react component
import Header from './components/Header';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
 return(
  <>
  <ToastContainer/>
<Router>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  </>
 );
}

export default App
