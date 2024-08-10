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
import TGA1 from "./TGA1";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <NavTabs/>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/solana" element={<Solana/>}/>
                <Route path="/coingecko-sol" element={<CoingeckoSol/>}/>
                <Route path="/coingecko-sol-memes" element={<CoingeckoSolMemes/>}/>
                <Route path="/rsps" element={<RSPS/>}/>
                <Route path="/liquidity" element={<TGA1/>}/>
            </Routes>

            <hr/>

            <p style={{marginLeft: "8px"}}>Huge thanks to everyone who helped make this website happen:
                Professor Adam, JayWolf, Cryptosaurus Max ₿, Calypso, Cedric, OG_Simba
                — </p>
            <p style={{marginLeft: "8px"}}>If you have any feedback or ideas on how to extend the website, tag me in TRW:
                @01HK0BGJQMWXQC26SRG2W46TET</p>
        </Router>
    </React.StrictMode>
);

reportWebVitals();
