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
    Tooltip,
    Snackbar
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import RefreshIcon from '@mui/icons-material/Refresh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import "./App.css";

// Apply UTC plugin to dayjs
dayjs.extend(utc);

const TGA1 = () => {
    const theme = useTheme();
    
    // State for all data sources
    const [tgaData, setTgaData] = useState([]);
    const [rrpData, setRrpData] = useState([]);
    const [wlcData, setWlcData] = useState([]);
    const [h4Data, setH4Data] = useState([]);
    const [walData, setWalData] = useState([]);
    
    // UI state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorSource, setErrorSource] = useState("");
    const [startDate, setStartDate] = useState(dayjs().utc().add(-2, "M"));
    const [endDate, setEndDate] = useState(dayjs().utc());
    const [tabValue, setTabValue] = useState('2');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    const domain = "https://api.fijisolutions.net";

    // Fetch TGA data
    const fetchTgaData = async () => {
        setError(false);
        setErrorSource("");
        setLoading(true);
        try {
            const response = await fetch(`${domain}/tga1?start_date=${startDate.format('YYYY-MM-DD')}&end_date=${endDate.format('YYYY-MM-DD')}`);
            const result = await response.json();

            const normalizedData = result.map(item => {
                const normalizedDate = dayjs(item.record_date).utc().format('YYYY-MM-DD');
                return {
                    ...item,
                    record_date: normalizedDate
                };
            });
            setTgaData(normalizedData);
        } catch (error) {
            console.error('Error fetching TGA data:', error);
            setError(true);
            setErrorSource("TGA");
        }
        setLoading(false);
    };

    // Fetch FRED data for all other indicators
    const fetchFredData = async () => {
        const rrpBody = {
            "hostName": "fred.stlouisfed.org",
            "series": {},
            "chart": {
                "labels": {
                    "title": "Overnight Reverse Repurchase Agreements: Treasury Securities Sold by the Federal Reserve in the Temporary Open Market Operations",
                    "subtitle": "Source: Federal Reserve Bank of New York"
                }
            },
            "seriesObjects": [
                {
                    "type": "time-series",
                    "graph_series_ids": ["RRPONTSYD"]
                }
            ]
        };

        const wlcBody = {
            "hostName": "fred.stlouisfed.org",
            "series": {},
            "chart": {
                "labels": {
                    "title": "Assets: Liquidity and Credit Facilities: Loans: Primary Credit: Wednesday Level"
                }
            },
            "seriesObjects": [
                {
                    "type": "time-series",
                    "graph_series_ids": ["WLCFLPCL"]
                }
            ]
        };

        const h4Body = {
            "hostName": "fred.stlouisfed.org",
            "series": {},
            "chart": {
                "labels": {
                    "title": "Assets: Liquidity and Credit Facilities: Loans: Bank Term Funding Program, Net: Wednesday Level"
                }
            },
            "seriesObjects": [
                {
                    "type": "time-series",
                    "graph_series_ids": ["H41RESPPALDKNWW"]
                }
            ]
        };

        const walBody = {
            "hostName": "fred.stlouisfed.org",
            "series": {},
            "chart": {
                "labels": {
                    "title": "Assets: Total Assets: Total Assets (Less Eliminations from Consolidation): Wednesday Level"
                }
            },
            "seriesObjects": [
                {
                    "type": "time-series",
                    "graph_series_ids": ["WALCL"]
                }
            ]
        };

        let count = 0;
        try {
            // Fetch RRP data
            const response1 = await fetch(`https://cors.fijisolutions.net:8082/https://fred.stlouisfed.org/graph/api/series/?obs=true&sid=RRPONTSYD`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rrpBody),
            });
            const result1 = await response1.json();
            const normalizedData1 = result1.observations[0].map(([timestamp, value]) => {
                const date = dayjs(timestamp).utc().format('YYYY-MM-DD');
                return [date, value ? value * 1000 : value];
            });
            setRrpData(normalizedData1);
            count = 1;

            // Fetch WLC data
            const response2 = await fetch(`https://cors.fijisolutions.net:8082/https://fred.stlouisfed.org/graph/api/series/?obs=true&sid=WLCFLPCL`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(wlcBody),
            });
            const result2 = await response2.json();
            const normalizedData2 = result2.observations[0].map(([timestamp, value]) => {
                const date = dayjs(timestamp).utc().format('YYYY-MM-DD');
                return [date, value];
            });
            setWlcData(normalizedData2);
            count = 2;

            // Fetch H4 data
            const response3 = await fetch(`https://cors.fijisolutions.net:8082/https://fred.stlouisfed.org/graph/api/series/?obs=true&sid=H41RESPPALDKNWW`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(h4Body),
            });
            const result3 = await response3.json();
            const normalizedData3 = result3.observations[0].map(([timestamp, value]) => {
                const date = dayjs(timestamp).utc().format('YYYY-MM-DD');
                return [date, value];
            });
            setH4Data(normalizedData3);
            count = 3;

            // Fetch WAL data
            const response4 = await fetch(`https://cors.fijisolutions.net:8082/https://fred.stlouisfed.org/graph/api/series/?obs=true&sid=WALCL`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(walBody),
            });
            const result4 = await response4.json();
            const normalizedData4 = result4.observations[0].map(([timestamp, value]) => {
                const date = dayjs(timestamp).utc().format('YYYY-MM-DD');
                return [date, value];
            });
            setWalData(normalizedData4);
            count = 4;

            setLastUpdated(new Date());
        } catch (error) {
            console.error('Error fetching FRED data:', error);
            setError(true);
            setErrorSource(count === 0 ? "RRP" : (count === 1 ? "WLC" : (count === 2 ? "H4" : (count === 3 ? "WAL" : "Exception"))));
        }
    };

    // Filter data by date range
    const filterDataByDate = (data, startDate, endDate) => {
        const startTimestamp = startDate.utc().valueOf();
        const endTimestamp = endDate.utc().valueOf();

        return data.filter(([dateString]) => {
            const timestamp = dayjs(dateString).utc().valueOf();
            return timestamp >= startTimestamp && timestamp <= endTimestamp;
        });
    };

    // Process TGA chart data
    const processTgaChartData = () => {
        const validData = tgaData
            .filter(item => item.open_today_bal !== null && !isNaN(parseFloat(item.open_today_bal)))
            .sort((a, b) => dayjs(a.record_date).utc().toDate() - dayjs(b.record_date).utc().toDate());

        if (validData.length === 0) {
            return {
                labels: [],
                datasets: [{
                    label: 'TGA Closing Balance',
                    data: [],
                    borderColor: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                }],
                minValue: 0,
                maxValue: 0,
                latestDate: "N/A"
            };
        }

        const data = validData.map(item => ({
            timestamp: dayjs(item.record_date).format('YYYY-MM-DD'),
            balance: parseFloat(item.open_today_bal)
        }));

        const balances = data.map(item => item.balance);
        const minValue = Math.min(...balances);
        const maxValue = Math.max(...balances);
        const latestDate = data[data.length - 1]?.timestamp || "N/A";

        return {
            labels: data.map(item => item.timestamp),
            datasets: [{
                label: 'TGA Closing Balance',
                data: data,
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 6,
                tension: 0.1,
                fill: true
            }],
            minValue,
            maxValue,
            latestDate
        };
    };

    // Process individual FRED data charts
    const processChartData = (data, label, color) => {
        const filteredData = filterDataByDate(data, startDate, endDate);
        const validData = filteredData.filter(([, value]) => value !== null);

        if (validData.length === 0) {
            return {
                labels: [],
                datasets: [{
                    label: label,
                    data: [],
                    borderColor: color,
                    backgroundColor: alpha(color, 0.1),
                }],
                minValue: 0,
                maxValue: 0,
                latestDate: "N/A"
            };
        }

        const chartData = validData.map(([date, value]) => ({
            timestamp: date,
            value: value
        }));

        const values = chartData.map(item => item.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const latestDate = chartData[chartData.length - 1]?.timestamp || "N/A";

        return {
            labels: chartData.map(item => item.timestamp),
            datasets: [{
                label: label,
                data: chartData,
                borderColor: color,
                backgroundColor: alpha(color, 0.1),
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 6,
                tension: 0.1,
                fill: true
            }],
            minValue,
            maxValue,
            latestDate
        };
    };

    // Process combined formula chart
    const processCombinedChartData = () => {
        let startString = startDate.utc().format('YYYY-MM-DD');
        const endString = endDate.utc().format('YYYY-MM-DD');

        // Extract all dates from each dataset and convert them to timestamps
        const walDates = walData.map(([date]) => dayjs(date).utc().toDate().getTime());
        const tgaDates = tgaData.map(item => dayjs(item.record_date).utc().toDate().getTime());
        const rrpDates = rrpData.map(([date]) => dayjs(date).utc().toDate().getTime());
        const h4Dates = h4Data.map(([date]) => dayjs(date).utc().toDate().getTime());
        const wlcDates = wlcData.map(([date]) => dayjs(date).utc().toDate().getTime());

        // Convert start and end strings to timestamps
        const startTimestamp = dayjs(startString).utc().toDate().getTime();
        const endTimestamp = dayjs(endString).utc().toDate().getTime();

        // Find the latest common start date across all datasets
        const latestCommonStartDateTimestamp = Math.max(
            Math.min(...walDates.filter(date => date >= startTimestamp && date <= endTimestamp)),
            Math.min(...tgaDates.filter(date => date >= startTimestamp && date <= endTimestamp)),
            Math.min(...rrpDates.filter(date => date >= startTimestamp && date <= endTimestamp)),
            Math.min(...h4Dates.filter(date => date >= startTimestamp && date <= endTimestamp)),
            Math.min(...wlcDates.filter(date => date >= startTimestamp && date <= endTimestamp))
        );

        // Update startString to this latest common start date
        startString = dayjs(latestCommonStartDateTimestamp).utc().format('YYYY-MM-DD');

        // Synchronize the dates and filter based on start and end dates
        const dates = Array.from(new Set([
            ...walData.map(([date]) => date),
            ...tgaData.map(item => item.record_date),
            ...rrpData.map(([date]) => date),
            ...h4Data.map(([date]) => date),
            ...wlcData.map(([date]) => date),
        ])).filter(date => date >= startString && date <= endString)
            .sort((a, b) => dayjs(a).utc().toDate() - dayjs(b).utc().toDate());

        let lastWalValue = 0;
        let lastTgaValue = 0;
        let lastRrpValue = 0;
        let lastH4Value = 0;
        let lastWlcValue = 0;

        const combinedData = dates.map(date => {
            const walValue = walData.find(([d]) => d === date)?.[1] || lastWalValue;
            const tgaValue = tgaData.find(item => item.record_date === date)?.open_today_bal || lastTgaValue;
            const rrpValue = rrpData.find(([d]) => d === date)?.[1] || lastRrpValue;
            const h4Value = h4Data.find(([d]) => d === date)?.[1] || lastH4Value;
            const wlcValue = wlcData.find(([d]) => d === date)?.[1] || lastWlcValue;

            // Update the last known values
            lastWalValue = walValue;
            lastTgaValue = tgaValue;
            lastRrpValue = rrpValue;
            lastH4Value = h4Value;
            lastWlcValue = wlcValue;

            // Apply the formula: WALCL - TGA - RRPONTSYD + H41RESPPALDKNWW + WLCFLPCL
            return walValue - tgaValue - rrpValue + h4Value + wlcValue;
        });

        const filteredData = [];
        const filteredDates = [];

        for (let i = 1; i < combinedData.length; i++) {
            if (combinedData[i] !== 0) {
                filteredData.push(combinedData[i]);
                filteredDates.push(dates[i]);
            }
        }

        const chartData = filteredDates.map((date, index) => ({
            timestamp: date,
            liquidity: filteredData[index]
        }));

        const minValue = filteredData.length > 0 ? Math.min(...filteredData) : 0;
        const maxValue = filteredData.length > 0 ? Math.max(...filteredData) : 0;
        const latestDate = filteredDates[filteredDates.length - 1] || "N/A";

        return {
            labels: filteredDates,
            datasets: [{
                label: 'NET FED Liquidity Formula',
                data: chartData,
                borderColor: theme.palette.secondary.main,
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 6,
                tension: 0.1,
                fill: true
            }],
            minValue,
            maxValue,
            latestDate
        };
    };

    // Generate Pine Script for TradingView
    const generatePineScript = (chartData, title) => {
        const values = chartData.datasets[0].data;
        const dates = chartData.labels;

        if (!values || values.length === 0) return;

        const filledDates = [];
        const filledValues = [];
        let lastKnownValue = null;
        let currentIndex = 0;

        for (let d = new Date(dates[0]); d <= new Date(dates[dates.length - 1]); d.setDate(d.getDate() + 1)) {
            const currentDateString = d.toISOString().split('T')[0];

            if (dates[currentIndex] === currentDateString) {
                lastKnownValue = Array.isArray(values[currentIndex]) ? values[currentIndex].liquidity || values[currentIndex].balance || values[currentIndex].value : values[currentIndex];
                filledDates.push(currentDateString);
                filledValues.push(lastKnownValue);
                currentIndex++;
            } else {
                filledDates.push(currentDateString);
                filledValues.push(lastKnownValue);
            }
        }

        filledDates.reverse();
        filledValues.reverse();

        const mostRecentDate = filledDates[filledDates.length - 1];

        let pineScript = `//@version=5
indicator("${title} Data Plot", overlay=true)

var customValues = array.new_float()
bump = input(true, '', inline = '1') // Enable/Disable offset of origin bar.
date = input.time(timestamp("${mostRecentDate} 00:00 +0000"), "Shift Origin To", tooltip = 'When enabled use this offset for origin bar of data range.', inline = '1')

indx = not bump ? 0 : ta.valuewhen(time == date, bar_index, 0) // Origin bar index.

if bar_index == indx
    customValues := array.from(
     `;

        for (let i = 0; i < filledDates.length; i++) {
            const multiplier = title.includes('Formula') ? 1000000 : 1;
            pineScript += `${filledValues[i] * multiplier}${i < filledValues.length - 1 ? ', ' : `
 `}`;
        }

        pineScript += `    )`;
        pineScript += `

plot(array.size(customValues) < 1 ? na : array.pop(customValues), 'csv', #ffff00) // Plot and shrink dataset for bars within data range.
`;

        navigator.clipboard.writeText(pineScript).then(() => {
            setOpenSnackbar(true);
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
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

    const onRefresh = () => {
        fetchTgaData();
        fetchFredData();
    };

    useEffect(() => {
        fetchTgaData();
        fetchFredData();
    }, [startDate, endDate]);

    const chartIcons = [
        { icon: <ViewAgendaOutlinedIcon />, value: "1", tooltip: "Single Column" },
        { icon: <ViewQuiltOutlinedIcon />, value: "1.3", tooltip: "Compact Grid" },
        { icon: <GridViewOutlinedIcon />, value: "2", tooltip: "Two Columns" }
    ];

    // Chart configurations
    const charts = [
        {
            title: "Formula #1: NET FED Liquidity",
            subtitle: "WALCL - TGA - RRPONTSYD + H41RESPPALDKNWW + WLCFLPCL (Millions)",
            data: processCombinedChartData(),
            metric: "liquidity"
        },
        {
            title: "Treasury General Account (TGA) Closing Balance",
            subtitle: "TGA Closing Balance Over Time (Millions)",
            data: processTgaChartData(),
            metric: "balance"
        },
        {
            title: "Total Assets Supplying Reserve Funds (WALCL)",
            subtitle: "WALCL on Wednesdays (Millions)",
            data: processChartData(walData, 'WALCL', theme.palette.success.main),
            metric: "value"
        },
        {
            title: "Treasury Securities Sold by Fed (RRPONTSYD)",
            subtitle: "Overnight Reverse Repurchase Agreements (Millions)",
            data: processChartData(rrpData, 'RRPONTSYD', theme.palette.error.main),
            metric: "value"
        },
        {
            title: "Liquidity and Credit Facilities Loans (H41RESPPALDKNWW)",
            subtitle: "Bank Term Funding Program, Net on Wednesdays (Millions)",
            data: processChartData(h4Data, 'H41RESPPALDKNWW', theme.palette.warning.main),
            metric: "value"
        },
        {
            title: "Loans Held by Federal Reserve (WLCFLPCL)",
            subtitle: "Primary Credit on Wednesdays (Millions)",
            data: processChartData(wlcData, 'WLCFLPCL', theme.palette.info.main),
            metric: "value"
        }
    ];

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
                                NET FED Liquidity Analysis
                            </Typography>
                        </Box>

                        <Typography variant="h6" color="text.secondary" sx={{ mb: 3, maxWidth: '800px' }}>
                            Comprehensive analysis of Federal Reserve liquidity using the formula: WALCL - TGA - RRPONTSYD + H41RESPPALDKNWW + WLCFLPCL. 
                            Track all components that affect market liquidity and monetary conditions.
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
                                            value={startDate}
                                            onChange={(newValue) => setStartDate(dayjs(newValue).utc())}
                                            disabled={loading}
                                            maxDate={endDate}
                                            minDate={dayjs("2023-03-16").utc()}
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
                                            value={endDate}
                                            onChange={(newValue) => setEndDate(dayjs(newValue).utc())}
                                            disabled={loading}
                                            minDate={startDate}
                                            maxDate={dayjs().utc()}
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
                                        onClick={onRefresh}
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
                    {!loading && (
                        <Fade in timeout={1000}>
                            <Grid container spacing={3}>
                                {charts.map((chart, index) => (
                                    <Grid key={index} item xs={12 / parseFloat(tabValue)}>
                                        <Card
                                            elevation={3}
                                            sx={{
                                                borderRadius: 3,
                                                overflow: 'hidden',
                                                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                                                mb: 2
                                            }}
                                        >
                                            <CardContent sx={{ p: 0 }}>
                                                <Box sx={{ p: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                                        <Box>
                                                            <Typography variant="h6" fontWeight="bold" color="primary">
                                                                {chart.title}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {chart.subtitle}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Latest: {chart.data.latestDate}
                                                            </Typography>
                                                        </Box>
                                                        <Tooltip title="Copy Pine Script">
                                                            <IconButton
                                                                onClick={() => generatePineScript(chart.data, chart.title)}
                                                                disabled={!chart.data.datasets[0].data.length}
                                                                color="primary"
                                                            >
                                                                <ContentCopyIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </Box>
                                                <CryptoChart
                                                    datasets={chart.data.datasets}
                                                    title=""
                                                    metric={chart.metric}
                                                    showDatesOnly={true}
                                                />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Fade>
                    )}

                    {loading && (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
                            <CircularProgress size={60} />
                        </Box>
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
                            About NET FED Liquidity Formula
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            <strong>Formula:</strong> WALCL - TGA - RRPONTSYD + H41RESPPALDKNWW + WLCFLPCL
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            <strong>Components:</strong>
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, m: 0 }}>
                            <Typography component="li" variant="body2" color="text.secondary">
                                <strong>WALCL:</strong> Total assets supplying reserve funds (adds liquidity)
                            </Typography>
                            <Typography component="li" variant="body2" color="text.secondary">
                                <strong>TGA:</strong> Treasury General Account balance (removes liquidity when high)
                            </Typography>
                            <Typography component="li" variant="body2" color="text.secondary">
                                <strong>RRPONTSYD:</strong> Reverse repo operations (removes liquidity)
                            </Typography>
                            <Typography component="li" variant="body2" color="text.secondary">
                                <strong>H41RESPPALDKNWW:</strong> Bank Term Funding Program (adds liquidity)
                            </Typography>
                            <Typography component="li" variant="body2" color="text.secondary">
                                <strong>WLCFLPCL:</strong> Primary credit loans (adds liquidity)
                            </Typography>
                        </Box>
                    </Paper>

                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                        message="Pine Script copied to clipboard!"
                    />

                    <Snackbar
                        open={error}
                        message={`Error loading data: ${errorSource}. Try reloading the page.`}
                    />
                </Box>
            </Fade>
        </Container>
    );
};

export default TGA1;