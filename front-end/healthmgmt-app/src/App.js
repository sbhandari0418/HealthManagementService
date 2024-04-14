import React from 'react';
import './App.css';
import PatientSearch from './PatientSearch';
import Dashboard from "./Dashboard";
import Signup from "./Signup";
import Login from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";



const App = () => {

    return (
        <BrowserRouter>
            <div>
                <NavBar/>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Signup />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;