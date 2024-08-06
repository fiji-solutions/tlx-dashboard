import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Solana from './Solana';
import CoingeckoSol from "./CoingeckoSol";
import NavTabs from './components/NavTabs';
import CoingeckoSolMemes from "./CoingeckoSolMemes";
import RSPS from "./RSPS";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <NavTabs />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/solana" element={<Solana />} />
                <Route path="/coingecko-sol" element={<CoingeckoSol />} />
                <Route path="/coingecko-sol-memes" element={<CoingeckoSolMemes />} />
                <Route path="/rsps" element={<RSPS />} />
            </Routes>
        </Router>
    </React.StrictMode>
);

reportWebVitals();
