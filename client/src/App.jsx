import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notes from './components/Notes';
import Login from './components/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div className="container">
                <h1>Notes</h1>
                <Routes>
                    <Route path="/" element={<Notes />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
