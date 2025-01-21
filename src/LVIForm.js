import React, { useState } from 'react';
import {TextField, Button, Grid, Typography, CircularProgress, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import {DataGrid} from "@mui/x-data-grid";

const AddDataForm = () => {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [date, setDate] = useState('');
    const [globalLiquidity, setGlobalLiquidity] = useState('');
    const [bitcoinPrice, setBitcoinPrice] = useState('');
    const [goldPrice, setGoldPrice] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDateToDelete, setSelectedDateToDelete] = useState(null);

    const columns = [
        { field: 'date', headerName: 'Date', width: 400 },
        { field: 'bitcoin_price', headerName: 'Bitcoin Price', width: 400 },
        { field: 'global_liquidity', headerName: 'Global Liquidity', width: 400 },
        { field: 'gold_price', headerName: 'Gold Price', width: 400 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => confirmDelete(params.row.date)}
                >
                    Delete
                </Button>
            )
        }
    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (password) queryParams.append('password', password);

            const response = await fetch(`https://api.fijisolutions.net/get-data?${queryParams.toString()}`);
            const data = await response.json();
            // Assuming the API response provides a flat array of records
            setRows(data["data"]);
        } catch (error) {
            console.error('Error fetching data:', error);
            setSnackbarMessage('Failed to fetch data. Please try again later.');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            date,
            global_liquidity: parseFloat(globalLiquidity),
            bitcoin_price: parseFloat(bitcoinPrice),
            gold_price: parseFloat(goldPrice),
            password
        };

        try {
            const response = await fetch('https://api.fijisolutions.net/add-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('Data added successfully!');
                // Clear the form fields
                setDate('');
                setGlobalLiquidity('');
                setBitcoinPrice('');
                setGoldPrice('');
                setPassword('');
                fetchData(); // Refresh the data grid
            } else {
                setMessage(`Error: ${result.error}`);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    const confirmDelete = (dateToDelete) => {
        setSelectedDateToDelete(dateToDelete);
        setOpenDialog(true);
    };

    const handleDelete = async () => {
        setOpenDialog(false);
        try {
            const response = await fetch('https://api.fijisolutions.net/delete-data', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: selectedDateToDelete,
                    password,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setSnackbarMessage('Data deleted successfully!');
                setOpenSnackbar(true);
                fetchData(); // Refresh the data grid
            } else {
                setSnackbarMessage(`Error: ${result.error}`);
                setOpenSnackbar(true);
            }
        } catch (error) {
            setSnackbarMessage('An error occurred while deleting the data. Please try again.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div className="App">
            <Typography variant="h4">Add New Data</Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <TextField
                        label="Date (YYYY-MM-DD)"
                        variant="outlined"
                        fullWidth
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Global Liquidity"
                        variant="outlined"
                        fullWidth
                        value={globalLiquidity}
                        onChange={(e) => setGlobalLiquidity(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Bitcoin Price"
                        variant="outlined"
                        fullWidth
                        value={bitcoinPrice}
                        onChange={(e) => setBitcoinPrice(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Gold Price"
                        variant="outlined"
                        fullWidth
                        value={goldPrice}
                        onChange={(e) => setGoldPrice(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={fetchData}>
                        Fetch Data
                    </Button>
                </Grid>
                {message && (
                    <Grid item xs={12}>
                        <Typography variant="body1">{message}</Typography>
                    </Grid>
                )}
            </Grid>

            {loading ? (
                <CircularProgress />
            ) : (
                <div style={{ height: 600, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row.date}
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

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the data for date {selectedDateToDelete}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddDataForm;
