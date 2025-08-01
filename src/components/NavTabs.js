import React from 'react';
import {Tabs, Tab, Box, Grid} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import "./NavTabs.css";

const NavTabs = () => {
    const location = useLocation();
    const [value, setValue] = React.useState(location.pathname);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const openNewSite = () => {
        window.open("https://finance.fijisolutions.net/", "_blank");
    };

    return (
        <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
        >
            <Grid item>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="navigation tabs">
                        <Tab label="Toros" value="/toros" component={Link} to="/toros" />
                        <Tab label="Liquidity" value="/" component={Link} to="/" />
                        <Tab label="Liquidity Valuation Indicators" value="/liquidity-valuation-indicators" component={Link} to="/liquidity-valuation-indicators" />
                        <Tab
                            label="New website here!"
                            sx={{
                                color: '#ff5722',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 87, 34, 0.08)'
                                }
                            }}
                            onClick={openNewSite}
                        />
                    </Tabs>
                </Box>
            </Grid>
            <Grid
                item
                className="creator-section"
                onClick={() => window.open("https://linktr.ee/fiji_solutions", "_blank")}
            >
                <span>Created by</span>
                <img
                    src="https://d2l35o8v06vi7z.cloudfront.net/fiji/fiji2.png"
                    alt="Fiji Icon"
                    className="creator-icon"
                />
                <span className="creator-name">Fiji</span>
            </Grid>

        </Grid>
    );
};

export default NavTabs;
