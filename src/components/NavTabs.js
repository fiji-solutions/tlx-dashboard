import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import LinkComp from '@mui/material/Link';

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
                <Tab label="Liquidity" value="/liquidity" component={Link} to="/liquidity" />
                <Tab label="Liquidity Valuation Indicators" value="/liquidity-valuation-indicators" component={Link} to="/liquidity-valuation-indicators" />
            </Tabs>
        </Box>
    );
};

export default NavTabs;
