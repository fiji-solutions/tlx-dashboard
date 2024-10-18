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
                <p style={{marginLeft: "8px"}}>Join <LinkComp href={"https://jointherealworld.com/?a=rz8pp6ccdq"} target={"_blank"}>The Real World</LinkComp> before you miss out on the next Crypto Bull Run!</p>
            </Tabs>
        </Box>
    );
};

export default NavTabs;
