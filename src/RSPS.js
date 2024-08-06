import React, { useEffect, useState } from 'react';
import {
    Button,
    CircularProgress,
    Grid, Snackbar,
    TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid } from '@mui/x-data-grid';
import dayjs from "dayjs";
import "./App.css";


const columns = [
    {
        field: 'icon',
        headerName: '',
        width: 100,
        renderCell: (params) => (
            <img src={params.value} alt={params.row.coin} style={{ height: '24px', width: '24px' }} />
        )
    },
    { field: 'coin', headerName: 'Coin', width: 200 },
    { field: 'mean', headerName: 'Mean Daily ROC', width: 150 },
    { field: 'std', headerName: 'Daily ROC Std', width: 150 },
    { field: 'relative_mean', headerName: 'Mean ROC relative to Total (Memes total)', width: 200 },
    { field: 'relative_volatility', headerName: 'Relative Volatility to Total (Memes total)', width: 200 },
];


const RSPS = () => {
    const [datasets, setDatasets] = useState([]);
    const [datasets2, setDatasets2] = useState([]);
    const [fromDate, setFromDate] = useState(dayjs("2023-09-20"));
    const [toDate, setToDate] = useState(dayjs("2023-10-20"));
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [minMarketCap, setMinMarketCap] = useState(250000);
    const [maxMarketCap, setMaxMarketCap] = useState(500000000);
    const [topResults, setTopResults] = useState(15);
    const [excludedCoins, setExcludedCoins] = useState("wownero,harrypottertrumphomersimpson777inu,cake-monster,curve-inu,robo-inu-finance,pepe-token");

    const domain = "https://api.fijisolutions.net";
    // const domain = "http://127.0.0.1:8000";

    const fetchData = async () => {
        setLoading(true);

        const response = await fetch(`${domain}/rsps?start_date=${dayjs(fromDate).format("YYYY-MM-DD")}&end_date=${dayjs(toDate).format("YYYY-MM-DD")}&min_market_cap=${minMarketCap}&max_market_cap=${maxMarketCap}&results=${topResults}&excluded=${excludedCoins}`);
        const result = await response.json();

        const tableData = result.map(item => ({
            id: item.coin_name,
            icon: datasets2.find((i) => i.id === item.coin_name).image,
            coin: item.coin_name,
            mean: item.mean,
            std: item.std,
            relative_mean: item.relative_mean,
            relative_mean_minus_10: item.relative_mean_minus_10,
            relative_volatility: item.relative_volatility,
            relative_volatility_minus_10: item.relative_volatility_minus_10,
        }));

        setDatasets(tableData);
        setLoading(false);
    };

    const fetchData2 = async () => {
        setLoading(true);

        const response = await fetch(`${domain}/coingecko-memes-all`);
        const result = await response.json();

        setDatasets2(result);
        setLoading(false);
    };

    const onSearch = () => {
        fetchData();
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const onCopy = () => {
        navigator.clipboard.writeText(datasets.map((item) => item.coin).join("\n")).then(() => {
            setOpenSnackbar(true);
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    }

    useEffect(() => {
        // let output = "[";
        // correlationCoins.map((item) => {
        //     output += '"' + item.id + '", ';
        // })
        // output += "]";
        // console.log(output);
        fetchData2();
    }, []);

    return (
        <div className="App">
            <h1>
                RSPS Memes finder
            </h1>

            <Grid
                container
                spacing={1}
                justifyContent={"center"}
            >

                <Grid
                    item
                    container
                    spacing={1}
                    justifyContent={"center"}
                >
                    <span>Time range to perform the analysis</span>
                    <Grid
                        item
                        container
                        direction={"column"}
                    >
                    </Grid>
                    <Grid
                        item
                        container
                        direction={"column"}
                        style={{"width": "unset"}}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start date"
                                value={fromDate}
                                onChange={(newValue) => setFromDate(newValue)}
                                disabled={loading}
                                maxDate={toDate}
                                minDate={dayjs("2023-01-01")}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                        style={{"width": "unset"}}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="End date"
                                value={toDate}
                                onChange={(newValue) => setToDate(newValue)}
                                disabled={loading}
                                minDate={fromDate}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                    >
                    </Grid>

                    <span>Exclude coins that are outside of market cap range</span>

                    <Grid
                        item
                        container
                        direction={"column"}
                    >
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                        style={{"width": "unset"}}
                    >
                        <TextField
                            label="Min Market Cap"
                            type="number"
                            value={minMarketCap}
                            onChange={(e) => setMinMarketCap(e.target.value)}
                            disabled={loading}
                        />
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                        style={{"width": "unset"}}
                    >
                        <TextField
                            label="Max Market Cap"
                            type="number"
                            value={maxMarketCap}
                            onChange={(e) => setMaxMarketCap(e.target.value)}
                            disabled={loading}
                        />
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                    >
                    </Grid>

                    <span>Define how many top results you want to get</span>

                    <Grid
                        item
                        container
                        direction={"column"}
                    >
                    </Grid>

                    <span>The top results are defined by their relative mean ROC and volatility against the TOTAL of meme coins.</span>

                    <Grid
                        item
                        container
                        direction={"column"}
                    >
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                        style={{"width": "unset"}}
                    >
                        <TextField
                            label="Top results"
                            type="number"
                            value={topResults}
                            onChange={(e) => setTopResults(e.target.value)}
                            disabled={loading}
                        />
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                    >
                    </Grid>

                    <span>Exclude specific coins, comma separated</span>

                    <Grid
                        item
                        container
                        direction={"column"}
                    >
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                        style={{"width": "400px"}}
                    >
                        <TextField
                            label="Exclude coins"
                            type="text"
                            value={excludedCoins}
                            onChange={(e) => setExcludedCoins(e.target.value)}
                            disabled={loading}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <br/>

            <Button onClick={onSearch} variant="contained" disabled={loading}>
                {loading ? (
                    <CircularProgress size={25} color={"grey"}/>
                ) : (
                    "Fetch data"
                )}
            </Button>

            <Button style={{"marginLeft": "8px"}} onClick={onCopy} variant="contained" disabled={loading}>
                {loading ? (
                    <CircularProgress size={25} color={"grey"}/>
                ) : (
                    "Copy names column"
                )}
            </Button>

            <Grid
                container
                direction={"row"}
                justifyContent={"space-evenly"}
            >
                <Grid
                    item
                    xs={11}
                >
                    <h1>Data</h1>
                    <div style={{height: 600, width: '100%'}}>
                        <DataGrid
                            rows={datasets}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                        />
                    </div>
                </Grid>
            </Grid>

            <hr style={{"marginTop": "160px"}}/>
            <p>If you have any feedback or ideas on how to extend the website, tag me in TRW:
                @01HK0BGJQMWXQC26SRG2W46TET</p>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Pine Script copied to clipboard!"
            />
        </div>
    );
};

export default RSPS;
