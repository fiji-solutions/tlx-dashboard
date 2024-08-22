import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const NavTabs = () => {
    const location = useLocation();
    const [value, setValue] = React.useState(location.pathname);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="navigation tabs">
                <Tab label="TLX & Toros" value="/" component={Link} to="/" />
                <Tab label="Solindex" value="/solana" component={Link} to="/solana" />
                <Tab label="Solana" value="/coingecko-sol" component={Link} to="/coingecko-sol" />
                <Tab label="Solana Memes" value="/coingecko-sol-memes" component={Link} to="/coingecko-sol-memes" />
                <Tab label="Liquidity" value="/liquidity" component={Link} to="/liquidity" />
                <Tab label="Liquidity" value="/liquidity-test" component={Link} to="/liquidity-test" />
            </Tabs>
        </Box>
    );
};

export default NavTabs;
