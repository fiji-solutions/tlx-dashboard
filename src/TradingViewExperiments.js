import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Grid, Button, Snackbar, TextField } from '@mui/material';
import './App.css';

const TradingViewExperiments = () => {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [indicator, setIndicator] = useState('');
    const [experiment, setExperiment] = useState('');
    const [password, setPassword] = useState('');

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'indicator', headerName: 'Indicator', width: 200 },
        { field: 'experiment', headerName: 'Experiment', width: 200 },
        { field: 'parameters', headerName: 'Parameters', width: 255 },
        { field: 'dd', headerName: 'Drawdown (DD)', width: 150 },
        { field: 'intra_dd', headerName: 'Intra-day DD', width: 150 },
        { field: 'sortino', headerName: 'Sortino Ratio', width: 150 },
        { field: 'sharpe', headerName: 'Sharpe Ratio', width: 150 },
        { field: 'profit_factor', headerName: 'Profit Factor', width: 150 },
        { field: 'profitable', headerName: 'Profitable (%)', width: 150 },
        { field: 'trades', headerName: 'Trades', width: 150 },
        { field: 'omega', headerName: 'Omega Ratio', width: 150 },
        { field: 'net_profit', headerName: 'Net Profit', width: 150 },
        { field: 'net_profit_ratio', headerName: 'Net Profit Ratio', width: 150 },
    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (indicator) queryParams.append('indicator', indicator);
            if (experiment) queryParams.append('experiment', experiment);
            if (password) queryParams.append('password', password);

            const response = await fetch(`https://api.fijisolutions.net/trading-view-experiments?${queryParams.toString()}`);
            const data = await response.json();
            // Assuming the API response provides a flat array of records
            setRows(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setSnackbarMessage('Failed to fetch data. Please try again later.');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div className="App">
            <h1>Trading View Experiments</h1>

            <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '20px' }}>
                <Grid item>
                    <TextField
                        label="Indicator"
                        variant="outlined"
                        value={indicator}
                        onChange={(e) => setIndicator(e.target.value)}
                        disabled={loading}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Experiment"
                        variant="outlined"
                        value={experiment}
                        onChange={(e) => setExperiment(e.target.value)}
                        disabled={loading}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={fetchData}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Fetch Data'}
                    </Button>
                </Grid>
            </Grid>

            {loading ? (
                <CircularProgress />
            ) : (
                <div style={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                    />
                </div>
            )}

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </div>
    );
};

export default TradingViewExperiments;
