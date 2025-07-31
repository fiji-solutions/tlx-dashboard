import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import App from './App';
import NavTabs from './components/NavTabs';
import CoingeckoSolMemes from "./CoingeckoSolMemes";
import TGA1 from "./TGA1";
import Jupiter from "./Jupiter";
import LiquidityValuationIndicator from "./LVI";
import AddDataForm from "./LVIForm";
import TradingViewExperiments from "./TradingViewExperiments";

const Root = () => {
    const location = useLocation();

    return (
        <>
            {/* Conditionally render NavTabs based on the current path */}
            {location.pathname !== '/solana-lst' && <NavTabs/>}
            <Routes>
                <Route path="/" element={<TGA1/>}/>
                <Route path="/toros" element={<App/>}/>
                <Route path="/coingecko-sol-memes" element={<CoingeckoSolMemes/>}/>
                <Route path="/liquidity" element={<TGA1/>}/>
                <Route path="/solana-lst" element={<Jupiter/>}/>
                <Route path="/lst" element={<Jupiter/>}/>
                <Route path="/liquidity-valuation-indicators" element={<LiquidityValuationIndicator/>}/>
                <Route path="/liquidity-valuation-indicators-form" element={<AddDataForm/>}/>
                <Route path="/trading-view-experiments" element={<TradingViewExperiments/>}/>
            </Routes>

            {location.pathname !== '/solana-lst' && location.pathname !== '/trading-view-experiments' && (
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