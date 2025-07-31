import React, { useEffect, useState } from 'react';
import CryptoChart from './components/CryptoChart';
import {
    Button,
    CircularProgress,
    Grid,
    Tab,
    Tabs,
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Paper,
    Container,
    Fade,
    useTheme,
    alpha,
    IconButton,
    Tooltip
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import RefreshIcon from '@mui/icons-material/Refresh';
import "./App.css";

const TGA1 = () => {
    const theme = useTheme();
    const [datasets, setDatasets] = useState([]);
    const [tabValue, setTabValue] = useState('2');
    const [fromDate, setFromDate] = useState(dayjs().add(-2, "month"));
    const [toDate, setToDate] = useState(dayjs().add(-1, "day"));
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    const domain = "https://api.fijisolutions.net";

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${domain}/tga1?start_date=${dayjs(fromDate).format("YYYY-MM-DD")}&end_date=${dayjs(toDate).format("YYYY-MM-DD")}`);
            const result = await response.json();

            if (!Array.isArray(result) || result.length === 0) {
                console.warn('No data received from API');
                setDatasets([]);
                return;
            }

            // Process the API response to create multiple chart datasets
            const validData = result.filter(item => {
                if (!item || !item.record_date) return false;
                const date = new Date(item.record_date);
                return !isNaN(date.getTime());
            });

            if (validData.length === 0) {
                console.warn('No valid data after filtering');
                setDatasets([]);
                return;
            }

            // Create multiple datasets for different balance types
            const processedData = [
                // TGA Opening Balance
                {
                    label: 'TGA Opening Balance',
                    data: validData.map(item => {
                        const timestamp = new Date(item.record_date);
                        const balance = parseFloat(item.open_today_bal) || 0;
                        return {
                            timestamp: timestamp.toISOString(),
                            balance: balance
                        };
                    }),
                    borderColor: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    tension: 0.1,
                    fill: false
                },
                // TGA Closing Balance (if available)
                {
                    label: 'TGA Closing Balance',
                    data: validData.map(item => {
                        const timestamp = new Date(item.record_date);
                        const balance = item.close_today_bal && item.close_today_bal !== "null" 
                            ? parseFloat(item.close_today_bal) 
                            : parseFloat(item.open_today_bal) || 0;
                        return {
                            timestamp: timestamp.toISOString(),
                            balance: balance
                        };
                    }),
                    borderColor: theme.palette.secondary.main,
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    tension: 0.1,
                    fill: false
                },
                // Monthly Opening Balance
                {
                    label: 'Monthly Opening Balance',
                    data: validData.map(item => {
                        const timestamp = new Date(item.record_date);
                        const balance = parseFloat(item.open_month_bal) || 0;
                        return {
                            timestamp: timestamp.toISOString(),
                            balance: balance
                        };
                    }),
                    borderColor: theme.palette.success.main,
                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    tension: 0.1,
                    fill: false
                },
                // Fiscal Year Opening Balance
                {
                    label: 'Fiscal Year Opening Balance',
                    data: validData.map(item => {
                        const timestamp = new Date(item.record_date);
                        const balance = parseFloat(item.open_fiscal_year_bal) || 0;
                        return {
                            timestamp: timestamp.toISOString(),
                            balance: balance
                        };
                    }),
                    borderColor: theme.palette.warning.main,
                    backgroundColor: alpha(theme.palette.warning.main, 0.1),
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    tension: 0.1,
                    fill: false
                }
            ];

            // Create separate datasets for individual charts
            const chartDatasets = {
                dailyBalances: [processedData[0], processedData[1]], // Opening and Closing
                monthlyComparison: [processedData[0], processedData[2]], // Daily vs Monthly
                fiscalYearComparison: [processedData[0], processedData[3]], // Daily vs Fiscal Year
                allBalances: processedData // All balances together
            };

            setDatasets(chartDatasets);
            setLastUpdated(new Date());
        } catch (error) {
            console.error('Error fetching data:', error);
            setDatasets({});
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const onSearch = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    const chartIcons = [
        { icon: <ViewAgendaOutlinedIcon />, value: "1", tooltip: "Single Column" },
        { icon: <ViewQuiltOutlinedIcon />, value: "1.3", tooltip: "Compact Grid" },
        { icon: <GridViewOutlinedIcon />, value: "2", tooltip: "Two Columns" }
    ];

    const hasData = datasets && Object.keys(datasets).length > 0;

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Fade in timeout={800}>
                <Box>
                    {/* Header Section */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            mb: 4,
                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                            borderRadius: 3,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                        }}
                    >
                        <Box display="flex" alignItems="center" mb={2}>
                            <TrendingUpIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                            <Typography
                                variant="h3"
                                component="h1"
                                fontWeight="bold"
                                sx={{
                                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                Treasury General Account Analysis
                            </Typography>
                        </Box>

                        <Typography variant="h6" color="text.secondary" sx={{ mb: 3, maxWidth: '800px' }}>
                            Comprehensive analysis of U.S. Treasury General Account balances including daily, monthly, and fiscal year comparisons. 
                            Track government cash flow and fiscal policy impacts on market liquidity.
                        </Typography>

                        {lastUpdated && (
                            <Chip
                                icon={<AnalyticsIcon />}
                                label={`Last updated: ${lastUpdated.toLocaleString()}`}
                                variant="outlined"
                                color="primary"
                                size="small"
                            />
                        )}
                    </Paper>

                    {/* Controls Section */}
                    <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <ShowChartIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                                Analysis Parameters
                            </Typography>

                            <Grid container spacing={3} alignItems="center">
                                <Grid item xs={12} sm={6} md={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Start Date"
                                            value={fromDate}
                                            onChange={(newValue) => setFromDate(newValue)}
                                            disabled={loading}
                                            maxDate={toDate}
                                            minDate={dayjs("2015-01-01")}
                                            sx={{ width: '100%' }}
                                            slotProps={{
                                                textField: {
                                                    variant: 'outlined',
                                                    size: 'medium'
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="End Date"
                                            value={toDate}
                                            onChange={(newValue) => setToDate(newValue)}
                                            disabled={loading}
                                            minDate={fromDate}
                                            sx={{ width: '100%' }}
                                            slotProps={{
                                                textField: {
                                                    variant: 'outlined',
                                                    size: 'medium'
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Button
                                        onClick={onSearch}
                                        variant="contained"
                                        disabled={loading}
                                        size="large"
                                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />}
                                        sx={{
                                            height: 56,
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            boxShadow: theme.shadows[4],
                                            '&:hover': {
                                                boxShadow: theme.shadows[8]
                                            }
                                        }}
                                        fullWidth
                                    >
                                        {loading ? 'Loading...' : 'Reload Charts'}
                                    </Button>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                            background: alpha(theme.palette.primary.main, 0.05)
                                        }}
                                    >
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Chart Layout
                                        </Typography>
                                        <Box display="flex" justifyContent="center">
                                            {chartIcons.map((item) => (
                                                <Tooltip key={item.value} title={item.tooltip}>
                                                    <IconButton
                                                        onClick={() => setTabValue(item.value)}
                                                        color={tabValue === item.value ? "primary" : "default"}
                                                        sx={{
                                                            mx: 0.5,
                                                            backgroundColor: tabValue === item.value ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                                            '&:hover': {
                                                                backgroundColor: alpha(theme.palette.primary.main, 0.1)
                                                            }
                                                        }}
                                                    >
                                                        {item.icon}
                                                    </IconButton>
                                                </Tooltip>
                                            ))}
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Charts Section */}
                    {hasData && (
                        <Fade in timeout={1000}>
                            <Grid container spacing={3}>
                                {/* Daily Opening vs Closing Balance */}
                                <Grid item xs={12 / parseFloat(tabValue)}>
                                    <Card
                                        elevation={3}
                                        sx={{
                                            borderRadius: 3,
                                            overflow: 'hidden',
                                            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
                                        }}
                                    >
                                        <CardContent sx={{ p: 0 }}>
                                            <CryptoChart
                                                datasets={datasets.dailyBalances || []}
                                                title="Daily TGA Balance - Opening vs Closing"
                                                metric="balance"
                                                showDatesOnly={true}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Daily vs Monthly Opening Balance */}
                                <Grid item xs={12 / parseFloat(tabValue)}>
                                    <Card
                                        elevation={3}
                                        sx={{
                                            borderRadius: 3,
                                            overflow: 'hidden',
                                            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
                                        }}
                                    >
                                        <CardContent sx={{ p: 0 }}>
                                            <CryptoChart
                                                datasets={datasets.monthlyComparison || []}
                                                title="Daily vs Monthly Opening Balance"
                                                metric="balance"
                                                showDatesOnly={true}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Daily vs Fiscal Year Opening Balance */}
                                <Grid item xs={12 / parseFloat(tabValue)}>
                                    <Card
                                        elevation={3}
                                        sx={{
                                            borderRadius: 3,
                                            overflow: 'hidden',
                                            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
                                        }}
                                    >
                                        <CardContent sx={{ p: 0 }}>
                                            <CryptoChart
                                                datasets={datasets.fiscalYearComparison || []}
                                                title="Daily vs Fiscal Year Opening Balance"
                                                metric="balance"
                                                showDatesOnly={true}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* All Balances Combined */}
                                <Grid item xs={12 / parseFloat(tabValue)}>
                                    <Card
                                        elevation={3}
                                        sx={{
                                            borderRadius: 3,
                                            overflow: 'hidden',
                                            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
                                        }}
                                    >
                                        <CardContent sx={{ p: 0 }}>
                                            <CryptoChart
                                                datasets={datasets.allBalances || []}
                                                title="All TGA Balance Types - Comprehensive View"
                                                metric="balance"
                                                showDatesOnly={true}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Fade>
                    )}

                    {/* Info Section */}
                    <Paper
                        elevation={1}
                        sx={{
                            mt: 4,
                            p: 3,
                            borderRadius: 3,
                            background: alpha(theme.palette.info.main, 0.02),
                            border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`
                        }}
                    >
                        <Typography variant="h6" gutterBottom color="info.main">
                            About Treasury General Account (TGA) Balance Types
                        </Typography>
                        
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    <strong>Daily Opening/Closing Balance:</strong> The TGA balance at the start and end of each business day. 
                                    This shows intraday government cash flow activities.
                                </Typography>
                                
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    <strong>Monthly Opening Balance:</strong> The TGA balance at the beginning of each month, 
                                    useful for tracking monthly fiscal patterns and seasonal variations.
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    <strong>Fiscal Year Opening Balance:</strong> The TGA balance at the start of the fiscal year (October 1st), 
                                    providing context for annual fiscal policy and budget cycles.
                                </Typography>
                                
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Market Impact:</strong> TGA balance changes directly affect banking system liquidity. 
                                    Increases remove liquidity (tightening), while decreases add liquidity (easing).
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Fade>
        </Container>
    );
};

export default TGA1;