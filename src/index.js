import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Solana from './Solana';
import CoingeckoSol from "./CoingeckoSol";
import NavTabs from './components/NavTabs';
import CoingeckoSolMemes from "./CoingeckoSolMemes";
import RSPS from "./RSPS";
import TGA1 from "./TGA1";
import Jupiter from "./Jupiter";

const Root = () => {
    const location = useLocation();

    return (
        <>
            {/* Conditionally render NavTabs based on the current path */}
            {location.pathname !== '/jupiter' && <NavTabs/>}
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/solana" element={<Solana/>}/>
                <Route path="/coingecko-sol" element={<CoingeckoSol/>}/>
                <Route path="/coingecko-sol-memes" element={<CoingeckoSolMemes/>}/>
                <Route path="/rsps" element={<RSPS/>}/>
                <Route path="/liquidity" element={<TGA1/>}/>
                <Route path="/jupiter" element={<Jupiter/>}/>
            </Routes>

            {location.pathname !== '/jupiter' && (
                <>
                    <hr/>
                    <p style={{marginLeft: "8px"}}>
                        Huge thanks to everyone who helped make this website happen:
                        Professor Adam, JayWolf, Cedric, Calypso, Cryptosaurus Max ₿, OG_Simba
                        —
                    </p>
                    <p style={{marginLeft: "8px"}}>
                        You can view my source code here: <a
                        href="https://github.com/fiji-solutions">https://github.com/fiji-solutions</a>
                    </p>
                    <p style={{marginLeft: "8px"}}>
                        If you have any feedback or ideas on how to extend the website, tag me in TRW:
                        @01HK0BGJQMWXQC26SRG2W46TET
                    </p>
                </>
            )}
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Root/>
        </Router>
    </React.StrictMode>
);

reportWebVitals();
