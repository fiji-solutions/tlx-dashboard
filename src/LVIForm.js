import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';

const AddDataForm = () => {
    const [date, setDate] = useState('');
    const [globalLiquidity, setGlobalLiquidity] = useState('');
    const [bitcoinPrice, setBitcoinPrice] = useState('');
    const [goldPrice, setGoldPrice] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

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
            } else {
                setMessage(`Error: ${result.error}`);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
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
                {message && (
                    <Grid item xs={12}>
                        <Typography variant="body1">{message}</Typography>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default AddDataForm;
