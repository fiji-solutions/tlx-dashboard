import React from 'react';
import {
    Tabs,
    Tab,
    Box,
    Grid,
    Paper,
    Avatar,
    Typography,
    useTheme,
    alpha,
    Chip,
    useMediaQuery
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import "./NavTabs.css";

const NavTabs = () => {
    const theme = useTheme();
    const location = useLocation();
    const [value, setValue] = React.useState(location.pathname);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabData = [
        {
            label: "Toros Finance",
            value: "/toros",
            icon: <TrendingUpIcon sx={{ fontSize: 20, mr: 1 }} />,
            description: "Leveraged Token Analysis"
        },
        {
            label: "Liquidity Analysis",
            value: "/",
            icon: <AnalyticsIcon sx={{ fontSize: 20, mr: 1 }} />,
            description: "TGA & Market Liquidity"
        },
        {
            label: "Valuation Indicators",
            value: "/liquidity-valuation-indicators",
            icon: <AccountBalanceIcon sx={{ fontSize: 20, mr: 1 }} />,
            description: "Advanced Metrics"
        }
    ];

    return (
        <Paper
            elevation={2}
            sx={{
                borderRadius: 0,
                borderBottom: `3px solid ${theme.palette.primary.main}`,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                // position: 'sticky',
                // top: 0,
                zIndex: 1000,
                backdropFilter: 'blur(10px)'
            }}
        >
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: { xs: 2, md: 4 }, py: 2 }}
            >
                <Grid item xs={12} md={8}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="navigation tabs"
                            variant={useMediaQuery(theme.breakpoints.down(1024)) ? "scrollable" : "standard"}
                            scrollButtons={useMediaQuery(theme.breakpoints.down(1024)) ? "auto" : false}
                            sx={{
                                '& .MuiTab-root': {
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    minHeight: 64,
                                    px: 3,
                                    borderRadius: 2,
                                    mx: 0.5,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                        transform: 'translateY(-2px)'
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: alpha(theme.palette.primary.main, 0.12),
                                        color: theme.palette.primary.main,
                                        fontWeight: 700
                                    }
                                },
                                '& .MuiTabs-indicator': {
                                    visibility: "hidden"
                                }
                            }}
                        >
                            {tabData.map((tab) => (
                                <Tab
                                    key={tab.value}
                                    label={
                                        <Box display="flex" alignItems="center" flexDirection="column">
                                            <Box display="flex" alignItems="center">
                                                {tab.icon}
                                                {tab.label}
                                            </Box>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    opacity: 0.7,
                                                    fontSize: '0.75rem',
                                                    mt: 0.5
                                                }}
                                            >
                                                {tab.description}
                                            </Typography>
                                        </Box>
                                    }
                                    value={tab.value}
                                    component={Link}
                                    to={tab.value}
                                />
                            ))}
                        </Tabs>
                    </Box>
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'flex-end' },
                        mt: { xs: 2, md: 0 }
                    }}
                >
                    <Paper
                        elevation={1}
                        className="creator-section"
                        component="a"
                        href="https://www.fijisolutions.net/en"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 2,
                            borderRadius: 3,
                            cursor: 'pointer',
                            textDecoration: 'none',
                            color: 'inherit',
                            transition: 'all 0.3s ease',
                            background: alpha(theme.palette.primary.main, 0.05),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: theme.shadows[8],
                                background: alpha(theme.palette.primary.main, 0.1)
                            }
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                mr: 2,
                                fontWeight: 500,
                                color: theme.palette.text.secondary
                            }}
                        >
                            Created by
                        </Typography>

                        <Avatar
                            src="https://d2l35o8v06vi7z.cloudfront.net/fiji/fiji2.png"
                            alt="Fiji Solutions - Software Company"
                            sx={{
                                width: 40,
                                height: 40,
                                mr: 1,
                                border: `2px solid ${theme.palette.primary.main}`,
                                boxShadow: theme.shadows[3]
                            }}
                        />

                        <Box>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.primary.main,
                                    lineHeight: 1.2
                                }}
                            >
                                Fiji Solutions
                            </Typography>
                            <Chip
                                label="Software Company"
                                size="small"
                                variant="outlined"
                                color="primary"
                                sx={{
                                    height: 20,
                                    fontSize: '0.7rem',
                                    mt: 0.5
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default NavTabs;
