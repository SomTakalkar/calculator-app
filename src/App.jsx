import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Calculator from './Calculator/Calculator';
import BodmasCalculator from './bodmas/BodmasCalculator';
const Button = ({ value, onClick, customClass }) => {
    return (
        <button
            className={`btn ${customClass}`}
            onClick={() => onClick(value)}
        >
            {value}
        </button>
    );
};
const App = () => {
    return (
        <Router>
            <div className="App">
                <h1>Calculator</h1>
                <div>
                    <nav>
                        <Link to="/Calculator" className="btn-nav-link">Basic Calculator</Link>
                        <Link to="/bodmas" className="btn-nav-link">Scientific Calculator</Link>
                    </nav>
                </div>


                <Routes>
                    <Route path="/Calculator" element={<Calculator/>}/>
                    <Route path="/bodmas" element={<BodmasCalculator/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
