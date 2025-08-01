import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const Root = () => {

    // Add this effect to redirect to the new site
    useEffect(() => {
        // Replace the current URL with the new site URL
        window.location.replace('https://finance.fijisolutions.net/');
    }, []);

    // The rest of the component won't render because of the redirect
    return null;
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
