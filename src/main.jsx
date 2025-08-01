import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Container, Typography, Link as MuiLink, Divider, alpha } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './index.css';
import App from './App';
import NavTabs from './components/NavTabs';
import CoingeckoSolMemes from "./CoingeckoSolMemes";
import TGA1 from "./TGA1";
import Jupiter from "./Jupiter";
import LiquidityValuationIndicator from "./LVI";
import AddDataForm from "./LVIForm";
import TradingViewExperiments from "./TradingViewExperiments";
import { Analytics } from "@vercel/analytics/react"

// Create a modern theme
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
        },
        secondary: {
            main: '#9c27b0',
            light: '#ba68c8',
            dark: '#7b1fa2',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#1a202c',
            secondary: '#4a5568',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.25rem',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1.125rem',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                    fontWeight: 600,
                    padding: '10px 24px',
                },
                contained: {
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                    '&:hover': {
                        boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    '&:hover': {
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
    },
});

const Footer = () => {
    const currentTheme = theme;

    const contributors = [
        'Professor Adam', 'JayWolf', 'Cedric', 'Calypso',
        'Cryptosaurus Max ₿', 'OG_Simba'
    ];

    return (
        <Box
            component="footer"
            sx={{
                mt: 8,
                py: 6,
                px: 4,
                background: `linear-gradient(135deg, ${alpha(currentTheme.palette.primary.main, 0.05)} 0%, ${alpha(currentTheme.palette.secondary.main, 0.02)} 100%)`,
                borderTop: `1px solid ${alpha(currentTheme.palette.primary.main, 0.1)}`,
            }}
        >
            <Container maxWidth="lg">
                <Box textAlign="center" mb={4}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: currentTheme.palette.primary.main,
                            fontWeight: 600
                        }}
                    >
                        <FavoriteIcon sx={{ mr: 1, color: '#e91e63' }} />
                        Special Thanks
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        paragraph
                        sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}
                    >
                        Huge thanks to everyone who helped make this platform possible:
                    </Typography>

                    <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="center"
                        gap={1}
                        mb={4}
                    >
                        {contributors.map((name, index) => (
                            <Box
                                key={index}
                                sx={{
                                    px: 2,
                                    py: 1,
                                    borderRadius: 2,
                                    background: alpha(currentTheme.palette.primary.main, 0.1),
                                    color: currentTheme.palette.primary.main,
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    border: `1px solid ${alpha(currentTheme.palette.primary.main, 0.2)}`,
                                }}
                            >
                                {name}
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Divider sx={{ my: 3, opacity: 0.3 }} />

                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                >
                    <Box display="flex" alignItems="center" gap={2}>
                        <GitHubIcon sx={{ color: currentTheme.palette.text.secondary }} />
                        <Typography variant="body2" color="text.secondary">
                            View source code:{' '}
                            <MuiLink
                                href="https://github.com/fiji-solutions"
                                target="_blank"
                                sx={{
                                    color: currentTheme.palette.primary.main,
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                github.com/fiji-solutions
                            </MuiLink>
                        </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                        For feedback or ideas, tag me in TRW:
                        <Box
                            component="span"
                            sx={{
                                ml: 1,
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 1,
                                background: alpha(currentTheme.palette.secondary.main, 0.1),
                                color: currentTheme.palette.secondary.main,
                                fontFamily: 'monospace',
                                fontSize: '0.8rem'
                            }}
                        >
                            {"<@01HK0BGJQMWXQC26SRG2W46TET>"}
                        </Box>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

const Root = () => {
    const location = useLocation();
    const showFooter = location.pathname !== '/solana-lst' && location.pathname !== '/trading-view-experiments';

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                {/* Conditionally render NavTabs based on the current path */}
                {location.pathname !== '/solana-lst' && <NavTabs />}

                <Box sx={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<TGA1 />} />
                        <Route path="/toros" element={<App />} />
                        <Route path="/coingecko-sol-memes" element={<CoingeckoSolMemes />} />
                        <Route path="/liquidity" element={<TGA1 />} />
                        <Route path="/solana-lst" element={<Jupiter />} />
                        <Route path="/lst" element={<Jupiter />} />
                        <Route path="/liquidity-valuation-indicators" element={<LiquidityValuationIndicator />} />
                        <Route path="/liquidity-valuation-indicators-form" element={<AddDataForm />} />
                        <Route path="/trading-view-experiments" element={<TradingViewExperiments />} />
                    </Routes>
                </Box>

                {showFooter && <Footer />}
            </Box>
        </ThemeProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Root />
        </Router>
        <Analytics />
    </React.StrictMode>
);
