import React, { useEffect, useState } from 'react';
import CryptoChart from './components/CryptoChart';
import {
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    Tab,
    Tabs,
    TextField,
    Paper,
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    Divider,
    useTheme,
    alpha,
    Container,
    FormControlLabel,
    Switch
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid } from '@mui/x-data-grid';
import dayjs from "dayjs";
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SearchIcon from '@mui/icons-material/Search';
import GetAppIcon from '@mui/icons-material/GetApp';
import "./App.css";
import BarChart from "./components/BarChart";

const columns = [
    {
        field: 'icon',
        headerName: '',
        width: 80,
        renderCell: (params) => (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <img 
                    src={params.value} 
                    alt={params.row.asset_name} 
                    style={{ 
                        height: '32px', 
                        width: '32px',
                        borderRadius: '50%',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }} 
                />
            </Box>
        )
    },
    { 
        field: 'asset_name', 
        headerName: 'Asset Name', 
        width: 200,
        renderCell: (params) => (
            <Typography variant="body2" fontWeight={600} color="text.primary">
                {params.value}
            </Typography>
        )
    },
    { 
        field: 'apy', 
        headerName: 'APY (%)', 
        width: 120,
        renderCell: (params) => (
            <Chip 
                label={`${params.value?.toFixed(2)}%`}
                color={params.value > 0 ? 'success' : 'error'}
                variant="outlined"
                size="small"
            />
        )
    },
    { field: 'num_days', headerName: 'Days', width: 100 },
    { 
        field: 'variance', 
        headerName: 'Variance', 
        width: 120,
        renderCell: (params) => (
            <Typography variant="body2" color="text.secondary">
                {params.value?.toFixed(6)}
            </Typography>
        )
    },
    { 
        field: 'std_deviation', 
        headerName: 'Std Dev', 
        width: 120,
        renderCell: (params) => (
            <Typography variant="body2" color="text.secondary">
                {params.value?.toFixed(4)}
            </Typography>
        )
    },
    { field: 'downside_volatility', headerName: 'Downside Vol', width: 140 },
    { 
        field: 'rolling_apy_30d', 
        headerName: '30d APY (%)', 
        width: 130,
        renderCell: (params) => (
            <Chip 
                label={`${params.value?.toFixed(2)}%`}
                color={params.value > 0 ? 'success' : 'error'}
                variant="filled"
                size="small"
                sx={{ fontSize: '0.75rem' }}
            />
        )
    },
    { field: 'rolling_apy_60d', headerName: '60d APY (%)', width: 130 },
    { field: 'rolling_apy_90d', headerName: '90d APY (%)', width: 130 },
    { field: 'rolling_apy_120d', headerName: '120d APY (%)', width: 130 },
    { field: 'skewness', headerName: 'Skewness', width: 120 },
    { field: 'kurtosis', headerName: 'Kurtosis', width: 120 }
];

const App = () => {
    const theme = useTheme();
    const [assets, setAssets] = useState([]);
    const [selectedAssets, setSelectedAssets] = useState(['toros-btc-3x-long-token', 'toros-eth-3x-long-token']);
    const [chartData, setChartData] = useState([]);
    const [baseIndexedChartData, setBaseIndexedChartData] = useState([]);
    const [cumulativeYieldChartData, setCumulativeYieldChartData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tabValue, setTabValue] = useState('1');
    const [fromDate, setFromDate] = useState(dayjs().subtract(30, 'day'));
    const [toDate, setToDate] = useState(dayjs());
    const [initialInvestment, setInitialInvestment] = useState(1000);
    const [riskFreeRate, setRiskFreeRate] = useState(0);
    const [granularity, setGranularity] = useState("DAYS");
    const [interval, setInterval] = useState("1d");
    const [granularityUnit, setGranularityUnit] = useState(1);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

    const horizontalLinePlugin = {
        id: 'horizontalLine',
        beforeDraw: (chart) => {
            const ctx = chart.ctx;
            const chartArea = chart.chartArea;
            const yScale = chart.scales['y'];
            const yPosition = yScale.getPixelForValue(0);

            if (yPosition >= chartArea.top && yPosition <= chartArea.bottom) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(chartArea.left, yPosition);
                ctx.lineTo(chartArea.right, yPosition);
                ctx.lineWidth = 2;
                ctx.strokeStyle = alpha(theme.palette.text.secondary, 0.3);
                ctx.stroke();
                ctx.restore();
            }
        },
    };

    const fetchAssets = async () => {
        try {
            const response = await fetch('https://api.fijisolutions.net/toros-all');
            const data = await response.json();
            const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
            setAssets(sortedData);
        } catch (error) {
            console.error('Error fetching assets:', error);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const generateColor = () => {
                const colors = [
                    theme.palette.primary.main,
                    theme.palette.secondary.main,
                    theme.palette.success.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                    theme.palette.info.main,
                ];
                const color = colors[Math.floor(Math.random() * colors.length)];
                return {
                    borderColor: color,
                    backgroundColor: alpha(color, 0.1),
                };
            };

            const allAssets = selectedAssets.join(',');
            const response = await fetch(`https://api.fijisolutions.net/toros?ids=${encodeURIComponent(allAssets)}&start_date=${fromDate.format('YYYY-MM-DD')}&end_date=${toDate.format('YYYY-MM-DD')}&initial_investment=${initialInvestment}&risk_free_rate=${riskFreeRate}`);
            const results = await response.json();

            const colorMap = {};
            const combinedData = Object.keys(results.price_data || {}).map((assetName) => {
                if (!colorMap[assetName]) {
                    colorMap[assetName] = generateColor();
                }

                return {
                    label: assetName,
                    data: (results.price_data[assetName] || []).map(item => ({
                        timestamp: item.timestamp,
                        price: item.price,
                    })),
                    ...colorMap[assetName],
                };
            });

            const baseIndexedData = Object.keys(results.base_indexed_data || {}).map((assetName) => {
                const color = colorMap[assetName] || generateColor();
                return {
                    label: assetName,
                    data: (results.base_indexed_data[assetName] || []).map(item => ({
                        timestamp: item.timestamp,
                        indexed_price: item.indexed_price,
                    })),
                    ...color,
                };
            });

            const cumulativeYieldData = Object.keys(results.cumulative_yield_data || {}).map((assetName) => {
                const color = colorMap[assetName] || generateColor();
                return {
                    label: assetName,
                    data: (results.cumulative_yield_data[assetName] || []).map(item => ({
                        timestamp: item.timestamp,
                        cumulative_yield: item.cumulative_yield * 100,
                    })),
                    ...color,
                };
            });

            const combinedTableData = Object.keys(results.daily_changes || {}).map((assetName, index) => {
                const asset = assets.find(a => a.coingeckoId === assetName);
                const getValue = (value, decimalPlaces) => {
                    if (value === undefined || value === null || isNaN(value)) {
                        return null;
                    }
                    return parseFloat(value.toFixed(decimalPlaces));
                };

                return {
                    id: index,
                    asset_name: asset ? asset.name : assetName,
                    apy: getValue(results.daily_changes[assetName]?.apy * 100, 2),
                    num_days: results.daily_changes[assetName]?.num_days ?? 0,
                    variance: getValue(results.daily_changes[assetName]?.variance, 6),
                    std_deviation: getValue(results.daily_changes[assetName]?.std_deviation, 4),
                    downside_volatility: getValue(results.daily_changes[assetName]?.downside_volatility, 4),
                    rolling_apy_30d: getValue(results.daily_changes[assetName]?.rolling_apy_30d * 100, 2),
                    rolling_apy_60d: getValue(results.daily_changes[assetName]?.rolling_apy_60d * 100, 2),
                    rolling_apy_90d: getValue(results.daily_changes[assetName]?.rolling_apy_90d * 100, 2),
                    rolling_apy_120d: getValue(results.daily_changes[assetName]?.rolling_apy_120d * 100, 2),
                    skewness: getValue(results.daily_changes[assetName]?.skewness, 4),
                    kurtosis: getValue(results.daily_changes[assetName]?.kurtosis, 4),
                    icon: asset ? asset.logoURI : ''
                };
            });

            setChartData(combinedData);
            setBaseIndexedChartData(baseIndexedData);
            setCumulativeYieldChartData(cumulativeYieldData);
            setTableData(combinedTableData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    useEffect(() => {
        fetchAssets();
    }, []);

    useEffect(() => {
        if (assets.length > 0) {
            fetchData();
        }
    }, [assets.length]);

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        }}>
            <Container maxWidth="xl" sx={{ py: 4 }}>
                {/* Header Section */}
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        mb: 4,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                    }}
                >
                    <Box display="flex" alignItems="center" mb={2}>
                        <TrendingUpIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                        <Box>
                            <Typography variant="h3" component="h1" fontWeight={700} color="primary">
                                Toros Finance Analysis
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                                Advanced leveraged token performance metrics and analytics
                            </Typography>
                        </Box>
                    </Box>
                    
                    <Box display="flex" gap={1} flexWrap="wrap">
                        <Chip 
                            icon={<AnalyticsIcon />} 
                            label="Performance Analytics" 
                            color="primary" 
                            variant="outlined" 
                        />
                        <Chip 
                            label="Real-time Data" 
                            color="success" 
                            variant="outlined" 
                        />
                        <Chip 
                            label="Risk Metrics" 
                            color="warning" 
                            variant="outlined" 
                        />
                    </Box>
                </Paper>

                {/* Controls Section */}
                <Paper
                    elevation={2}
                    sx={{
                        p: 3,
                        mb: 4,
                        borderRadius: 2,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                    }}
                >
                    <Typography variant="h5" fontWeight={600} mb={3} color="text.primary">
                        Analysis Parameters
                    </Typography>

                    <Grid container spacing={3}>
                        {/* Asset Selection */}
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                                <Typography variant="h6" fontWeight={600} mb={2} color="primary">
                                    Asset Selection
                                </Typography>
                                <Box display="flex" flexWrap="wrap" gap={1}>
                                    {assets.slice(0, 6).map((asset) => (
                                        <FormControlLabel
                                            key={asset.coingeckoId}
                                            control={
                                                <Checkbox
                                                    checked={selectedAssets.includes(asset.coingeckoId)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedAssets([...selectedAssets, asset.coingeckoId]);
                                                        } else {
                                                            setSelectedAssets(selectedAssets.filter(id => id !== asset.coingeckoId));
                                                        }
                                                    }}
                                                    disabled={loading}
                                                />
                                            }
                                            label={
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <img 
                                                        src={asset.logoURI} 
                                                        alt={asset.name}
                                                        style={{ width: 20, height: 20, borderRadius: '50%' }}
                                                    />
                                                    <Typography variant="body2" fontWeight={500}>
                                                        {asset.name}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    ))}
                                </Box>
                            </Card>
                        </Grid>

                        {/* Date Range */}
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                                <Typography variant="h6" fontWeight={600} mb={2} color="primary">
                                    Date Range
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Start Date"
                                                value={fromDate}
                                                onChange={(newValue) => setFromDate(newValue)}
                                                disabled={loading}
                                                maxDate={toDate}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        size: 'small'
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="End Date"
                                                value={toDate}
                                                onChange={(newValue) => setToDate(newValue)}
                                                disabled={loading}
                                                minDate={fromDate}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        size: 'small'
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>

                        {/* Advanced Options */}
                        <Grid item xs={12}>
                            <Card variant="outlined" sx={{ p: 2 }}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                                    <Typography variant="h6" fontWeight={600} color="primary">
                                        Advanced Options
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={showAdvancedOptions}
                                                onChange={(e) => setShowAdvancedOptions(e.target.checked)}
                                            />
                                        }
                                        label="Show Advanced"
                                    />
                                </Box>
                                
                                {showAdvancedOptions && (
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                label="Initial Investment ($)"
                                                type="number"
                                                value={initialInvestment}
                                                onChange={(e) => setInitialInvestment(e.target.value)}
                                                disabled={loading}
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                label="Risk Free Rate (%)"
                                                type="number"
                                                value={riskFreeRate}
                                                onChange={(e) => setRiskFreeRate(e.target.value)}
                                                disabled={loading}
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Interval</InputLabel>
                                                <Select
                                                    value={interval}
                                                    label="Interval"
                                                    onChange={(e) => setInterval(e.target.value)}
                                                    disabled={loading}
                                                >
                                                    <MenuItem value="1h">1 Hour</MenuItem>
                                                    <MenuItem value="4h">4 Hours</MenuItem>
                                                    <MenuItem value="1d">1 Day</MenuItem>
                                                    <MenuItem value="1w">1 Week</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                )}
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Box display="flex" gap={2} mt={3} justifyContent="center">
                        <Button
                            onClick={fetchData}
                            variant="contained"
                            disabled={loading || selectedAssets.length === 0}
                            startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                            size="large"
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: 600,
                                boxShadow: theme.shadows[4],
                                '&:hover': {
                                    boxShadow: theme.shadows[8],
                                }
                            }}
                        >
                            {loading ? 'Analyzing...' : 'Analyze Performance'}
                        </Button>
                        
                        <Button
                            variant="outlined"
                            disabled={loading || chartData.length === 0}
                            startIcon={<GetAppIcon />}
                            size="large"
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: 600,
                            }}
                        >
                            Export Data
                        </Button>
                    </Box>
                </Paper>

                {/* Results Section */}
                {chartData.length > 0 && (
                    <>
                        {/* Chart Size Controls */}
                        <Paper
                            elevation={1}
                            sx={{
                                p: 2,
                                mb: 3,
                                borderRadius: 2,
                                background: alpha(theme.palette.background.paper, 0.8)
                            }}
                        >
                            <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                                <Typography variant="h6" fontWeight={600} color="text.primary">
                                    Chart Layout
                                </Typography>
                                <Tabs value={tabValue} onChange={handleTabChange}>
                                    <Tab 
                                        icon={<ViewAgendaOutlinedIcon />} 
                                        value="1" 
                                        label="Single Column"
                                        sx={{ minHeight: 48 }}
                                    />
                                    <Tab 
                                        icon={<ViewQuiltOutlinedIcon />} 
                                        value="1.3" 
                                        label="Compact"
                                        sx={{ minHeight: 48 }}
                                    />
                                    <Tab 
                                        icon={<GridViewOutlinedIcon />} 
                                        value="2" 
                                        label="Two Columns"
                                        sx={{ minHeight: 48 }}
                                    />
                                </Tabs>
                            </Box>
                        </Paper>

                        {/* Charts Grid */}
                        <Grid container spacing={3}>
                            {/* Data Table */}
                            <Grid item xs={12 / parseFloat(tabValue)}>
                                <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                                    <Box display="flex" alignItems="center" mb={3}>
                                        <AnalyticsIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                                        <Typography variant="h5" fontWeight={600} color="text.primary">
                                            Performance Metrics
                                        </Typography>
                                    </Box>
                                    <Box sx={{ height: 500, width: '100%' }}>
                                        <DataGrid
                                            rows={tableData}
                                            columns={columns}
                                            pageSize={10}
                                            rowsPerPageOptions={[5, 10, 25]}
                                            disableSelectionOnClick
                                            sx={{
                                                '& .MuiDataGrid-root': {
                                                    border: 'none',
                                                },
                                                '& .MuiDataGrid-cell': {
                                                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                                },
                                                '& .MuiDataGrid-columnHeaders': {
                                                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                                                },
                                                '& .MuiDataGrid-row:hover': {
                                                    backgroundColor: alpha(theme.palette.primary.main, 0.02),
                                                },
                                            }}
                                        />
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* Price Chart */}
                            <Grid item xs={12 / parseFloat(tabValue)}>
                                <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                    <CryptoChart 
                                        datasets={chartData} 
                                        title="Asset Prices" 
                                        metric="price" 
                                    />
                                </Paper>
                            </Grid>

                            {/* Base Indexed Chart */}
                            <Grid item xs={12 / parseFloat(tabValue)}>
                                <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                    <CryptoChart 
                                        datasets={baseIndexedChartData} 
                                        title="Base Indexed Performance" 
                                        metric="indexed_price" 
                                    />
                                </Paper>
                            </Grid>

                            {/* Cumulative Yield Chart */}
                            <Grid item xs={12 / parseFloat(tabValue)}>
                                <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                    <CryptoChart 
                                        datasets={cumulativeYieldChartData} 
                                        title="Cumulative Yield Over Time (%)" 
                                        metric="cumulative_yield" 
                                        plugins={[horizontalLinePlugin]} 
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    </>
                )}

                {/* Loading State */}
                {loading && (
                    <Paper
                        elevation={2}
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            borderRadius: 2,
                            background: alpha(theme.palette.background.paper, 0.9)
                        }}
                    >
                        <CircularProgress size={60} sx={{ mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            Analyzing performance data...
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            This may take a few moments
                        </Typography>
                    </Paper>
                )}

                {/* Empty State */}
                {!loading && chartData.length === 0 && assets.length > 0 && (
                    <Paper
                        elevation={1}
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            borderRadius: 2,
                            background: alpha(theme.palette.background.paper, 0.5),
                            border: `2px dashed ${alpha(theme.palette.primary.main, 0.2)}`
                        }}
                    >
                        <TrendingUpIcon sx={{ fontSize: 80, color: alpha(theme.palette.primary.main, 0.3), mb: 2 }} />
                        <Typography variant="h5" fontWeight={600} color="text.primary" mb={1}>
                            Ready to Analyze
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={3}>
                            Select your assets and date range, then click "Analyze Performance" to get started
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={fetchData}
                            disabled={selectedAssets.length === 0}
                            startIcon={<SearchIcon />}
                            size="large"
                        >
                            Start Analysis
                        </Button>
                    </Paper>
                )}
            </Container>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Operation completed successfully!"
            />
        </Box>
    );
};

export default App;