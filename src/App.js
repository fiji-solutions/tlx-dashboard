// src/App.js
import React, {useEffect, useState} from 'react';
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
    Tab,
    Tabs,
    TextField
} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import BarChart from "./components/BarChart";
import "./App.css";
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';

const App = () => {
    const [datasets, setDatasets] = useState([]);
    const [metrics, setMetrics] = useState([]);

    const [btc1l, setBtc1l] = useState(false);
    const [btc2l, setBtc2l] = useState(false);
    const [btc3l, setBtc3l] = useState(false);
    const [btc4l, setBtc4l] = useState(false);
    const [btc5l, setBtc5l] = useState(false);

    const [eth1l, setEth1l] = useState(false);
    const [eth2l, setEth2l] = useState(false);
    const [eth3l, setEth3l] = useState(false);
    const [eth4l, setEth4l] = useState(false);
    const [eth5l, setEth5l] = useState(false);

    const [sol1l, setSol1l] = useState(false);
    const [sol2l, setSol2l] = useState(false);
    const [sol3l, setSol3l] = useState(false);
    const [sol4l, setSol4l] = useState(false);
    const [sol5l, setSol5l] = useState(false);

    const [doge2l, setDoge2l] = useState(false);
    const [doge5l, setDoge5l] = useState(false);

    const [btc3xpol, setBtc3xpol] = useState(false);
    const [btc2xopt, setBtc2xopt] = useState(false);
    const [btc3xopt, setBtc3xopt] = useState(false);
    const [btc3xarb, setBtc3xarb] = useState(false);

    const [eth3xpol, setEth3xpol] = useState(false);
    const [eth2xopt, setEth2xopt] = useState(false);
    const [eth3xopt, setEth3xopt] = useState(false);
    const [eth3xarb, setEth3xarb] = useState(false);

    const [sol2xopt, setSol2xopt] = useState(false);
    const [sol3xopt, setSol3xopt] = useState(false);

    const [array,setArray] = useState([]);
    const [torosArray,setTorosArray] = useState([]);

    const [tabValue, setTabValue] = React.useState('2');
    const [granularity, setGranularity] = useState("DAYS");
    const [interval, setInterval] = useState("1d");
    const [granularityUnit, setGranularityUnit] = useState(1);
    const [fromDate, setFromDate] = useState(dayjs("2024-05-01"));
    const [initialCapital, setInitialCapital] = useState(1000);
    const [riskFreeRate, setRiskFreeRate] = useState(0);
    const [loading, setLoading] = useState(false);

    const domain = "https://np40nkw6be.execute-api.us-east-1.amazonaws.com/Prod/";

    const checkboxClick = (asset) => {
        let boolValue = false;
        switch (asset) {
            case "BTC1L":
                boolValue = !btc1l;
                setBtc1l(!btc1l);
                break;
            case "BTC2L":
                boolValue = !btc2l;
                setBtc2l(!btc2l);
                break;
            case "BTC3L":
                boolValue = !btc3l;
                setBtc3l(!btc3l);
                break;
            case "BTC4L":
                boolValue = !btc4l;
                setBtc4l(!btc4l);
                break;
            case "BTC5L":
                boolValue = !btc5l;
                setBtc5l(!btc5l);
                break;

            case "ETH1L":
                boolValue = !eth1l;
                setEth1l(!eth1l);
                break;
            case "ETH2L":
                boolValue = !eth2l;
                setEth2l(!eth2l);
                break;
            case "ETH3L":
                boolValue = !eth3l;
                setEth3l(!eth3l);
                break;
            case "ETH4L":
                boolValue = !eth4l;
                setEth4l(!eth4l);
                break;
            case "ETH5L":
                boolValue = !eth5l;
                setEth5l(!eth5l);
                break;

            case "SOL1L":
                boolValue = !sol1l;
                setSol1l(!sol1l);
                break;
            case "SOL2L":
                boolValue = !sol2l;
                setSol2l(!sol2l);
                break;
            case "SOL3L":
                boolValue = !sol3l;
                setSol3l(!sol3l);
                break;
            case "SOL4L":
                boolValue = !sol4l;
                setSol4l(!sol4l);
                break;
            case "SOL5L":
                boolValue = !sol5l;
                setSol5l(!sol5l);
                break;

            case "DOGE2L":
                boolValue = !doge2l;
                setDoge2l(!doge2l);
                break;

            case "DOGE5L":
                boolValue = !doge5l;
                setDoge5l(!doge5l);
                break;
            default:
                break;
        }

        if (boolValue) {
            setArray([...array, asset]);
        } else {
            setArray(array.filter(str => str !== asset));
        }
    };

    const torosCheckboxClick = (asset) => {
        let boolValue = false;
        switch (asset) {
            case "BTC3XPOL":
                boolValue = !btc3xpol;
                setBtc3xpol(!btc3xpol);
                break;
            case "BTC2XOPT":
                boolValue = !btc2xopt;
                setBtc2xopt(!btc2xopt);
                break;
            case "BTC3XOPT":
                boolValue = !btc3xopt;
                setBtc3xopt(!btc3xopt);
                break;
            case "BTC3XARB":
                boolValue = !btc3xarb;
                setBtc3xarb(!btc3xarb);
                break;
            case "ETH3XPOL":
                boolValue = !eth3xpol;
                setEth3xpol(!eth3xpol);
                break;
            case "ETH2XOPT":
                boolValue = !eth2xopt;
                setEth2xopt(!eth2xopt);
                break;
            case "ETH3XOPT":
                boolValue = !eth3xopt;
                setEth3xopt(!eth3xopt);
                break;
            case "ETH3XARB":
                boolValue = !eth3xarb;
                setEth3xarb(!eth3xarb);
                break;
            case "SOL2XOPT":
                boolValue = !sol2xopt;
                setSol2xopt(!sol2xopt);
                break;
            case "SOL3XOPT":
                boolValue = !sol3xopt;
                setSol3xopt(!sol3xopt);
                break;
            default:
                break;
        }

        if (boolValue) {
            setTorosArray([...torosArray, asset]);
        } else {
            setTorosArray(torosArray.filter(str => str !== asset));
        }
    }

    const fetchData = async () => {
        setLoading(true);

        const arrayPromises = array.map(asset =>
            fetch(domain + "hello/?coin=" + asset + "&granularity=" + granularity + "&granularityUnit=" + granularityUnit + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&initialInvestment=" + initialCapital + "&riskFreeRate=" + riskFreeRate).then(response => response.json())
        );

        const torosArrayPromises = torosArray.map(asset =>
            fetch(domain + "toros/?coin=" + asset + "&interval=" + interval + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&initialInvestment=" + initialCapital + "&riskFreeRate=" + riskFreeRate).then(response => response.json())
        );

        const results = await Promise.all([...arrayPromises, ...torosArrayPromises]);

        const combinedData = results.map((result, index) => ({
            label: index < array.length ? array[index] : torosArray[index - array.length],
            data: result.data,
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
        }));

        const assetMetrics = results.map((result, index) => ({
            label: index < array.length ? array[index] : torosArray[index - array.length],
            volatility: result.volatility,
            sharpe_ratio: result.sharpe_ratio,
            sortino_ratio: result.sortino_ratio,
            omega_ratio: result.omega_ratio
        }));

        setDatasets(combinedData);
        setMetrics(assetMetrics);
        setLoading(false);
    };

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const downloadData = async () => {
        try {
            setLoading(true);
            const arrayPromises = array.map(asset =>
                fetch(domain + "tlx-export/?coin=" + asset + "&granularity=" + granularity + "&granularityUnit=" + granularityUnit + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&initialInvestment=" + initialCapital + "&riskFreeRate=" + riskFreeRate, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'text/csv'
                    }
                }).then(response => response.blob())
            );

            const torosArrayPromises = torosArray.map(asset =>
                fetch(domain + "toros-export/?coin=" + asset + "&interval=" + interval + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&initialInvestment=" + initialCapital + "&riskFreeRate=" + riskFreeRate, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'text/csv'
                    }
                }).then(response => response.blob())
            );

            const results = await Promise.all([...arrayPromises, ...torosArrayPromises]);

            for (let i = 0; i < results.length; i++) {
                const blob = results[i];
                const index = results.indexOf(blob);
                // Create a link element
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = index < array.length ? `${array[index]}-${dayjs(fromDate).format("YYYY-MM-DD")}-${interval}.csv` : `${torosArray[index - array.length]}-${dayjs(fromDate).format("YYYY-MM-DD")}-${interval}.csv`;

                // Append the link to the body
                document.body.appendChild(link);

                // Programmatically click the link to trigger the download
                link.click();

                // Remove the link from the document
                document.body.removeChild(link);
                await delay(150);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error downloading CSV files:', error);
            setLoading(false);
        }
    };


    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const onSearch = () => {
        fetchData();
    }

    const onExport = () => {
        downloadData();
    }

    const handleIntervalChange = (event) => {
        let value = event.target.value;
        setInterval(value);
    }

    useEffect(() => {
        switch (interval) {
            case "1h":
                setGranularity("HOURS");
                setGranularityUnit(1);
                break;
            case "4h":
                setGranularity("HOURS");
                setGranularityUnit(4);
                break;
            case "1d":
                setGranularity("DAYS");
                setGranularityUnit(1);
                break;
            case "1w":
                setGranularity("DAYS");
                setGranularityUnit(7);
                break;
            default:
                break;
        }
    }, [interval]);

    return (
        <div className="App">
            <Tabs style={{position: "absolute", right: 0, top: 0}} value={tabValue} onChange={handleTabChange}>
                <h4>Change charts size</h4>
                <Tab label={(<ViewAgendaOutlinedIcon />)} value={"1"} />
                <Tab label={(<ViewQuiltOutlinedIcon />)} value={"1.3"} />
                <Tab label={(<GridViewOutlinedIcon />)} value={"2"} />
            </Tabs>
            <h1>
                TLX & Toros Performance Analysis
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
                    <Grid
                        item
                        container
                        direction={"column"}
                        style={{"width": "unset"}}
                    >
                        <FormControl>
                            <InputLabel id="interval">Interval</InputLabel>

                            <Select
                                id="interval"
                                labelId="interval"
                                value={interval}
                                label="Interval"
                                onChange={handleIntervalChange}
                                disabled={loading}
                            >
                                <MenuItem value={"1h"}>1 Hour</MenuItem>
                                <MenuItem value={"4h"}>4 Hours</MenuItem>
                                <MenuItem value={"1d"}>1 Day</MenuItem>
                                <MenuItem value={"1w"}>1 Week</MenuItem>
                            </Select>
                        </FormControl>
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
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                        style={{"width": "unset"}}
                    >
                        <TextField
                            label="Initial invest capital"
                            type="number"
                            InputProps={{ inputProps: { min: 1 } }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={initialCapital}
                            onChange={(event) => setInitialCapital(event.target.value)}
                            disabled={loading}
                        />
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                        style={{"width": "unset", "minWidth": "200px"}}
                    >
                        <TextField
                            label="Risk free rate percentage"
                            type="number"
                            InputProps={{ inputProps: { min: 0, max: 100 } }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={riskFreeRate}
                            onChange={(event) => setRiskFreeRate(event.target.value)}
                            disabled={loading}
                        />
                    </Grid>
                </Grid>


                <Grid
                    item
                    container
                    direction={"column"}
                    style={{"width": "unset"}}
                >
                    <Grid item>
                        <Checkbox
                            checked={btc1l}
                            onChange={() => checkboxClick("BTC1L")}
                            disabled={loading}
                        />
                        <span>BTC1L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc2l}
                            onChange={() => checkboxClick("BTC2L")}
                            disabled={loading}
                        />
                        <span>BTC2L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc3l}
                            onChange={() => checkboxClick("BTC3L")}
                            disabled={loading}
                        />
                        <span>BTC3L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc4l}
                            onChange={() => checkboxClick("BTC4L")}
                            disabled={loading}
                        />
                        <span>BTC4L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc5l}
                            onChange={() => checkboxClick("BTC5L")}
                            disabled={loading}
                        />
                        <span>BTC5L</span>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{"width": "unset"}}
                >
                    <Grid item>
                        <Checkbox
                            checked={eth1l}
                            onChange={() => checkboxClick("ETH1L")}
                            disabled={loading}
                        />
                        <span>ETH1L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth2l}
                            onChange={() => checkboxClick("ETH2L")}
                            disabled={loading}
                        />
                        <span>ETH2L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth3l}
                            onChange={() => checkboxClick("ETH3L")}
                            disabled={loading}
                        />
                        <span>ETH3L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth4l}
                            onChange={() => checkboxClick("ETH4L")}
                            disabled={loading}
                        />
                        <span>ETH4L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth5l}
                            onChange={() => checkboxClick("ETH5L")}
                            disabled={loading}
                        />
                        <span>ETH5L</span>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{"width": "unset"}}
                >
                    <Grid item>
                        <Checkbox
                            checked={sol1l}
                            onChange={() => checkboxClick("SOL1L")}
                            disabled={loading}
                        />
                        <span>SOL1L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={sol2l}
                            onChange={() => checkboxClick("SOL2L")}
                            disabled={loading}
                        />
                        <span>SOL2L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={sol3l}
                            onChange={() => checkboxClick("SOL3L")}
                            disabled={loading}
                        />
                        <span>SOL3L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={sol4l}
                            onChange={() => checkboxClick("SOL4L")}
                            disabled={loading}
                        />
                        <span>SOL4L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={sol5l}
                            onChange={() => checkboxClick("SOL5L")}
                            disabled={loading}
                        />
                        <span>SOL5L</span>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{"width": "unset"}}
                >
                    <Grid item>
                        <Checkbox
                            checked={doge2l}
                            onChange={() => checkboxClick("DOGE2L")}
                            disabled={loading}
                        />
                        <span>DOGE2L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={doge5l}
                            onChange={() => checkboxClick("DOGE5L")}
                            disabled={loading}
                        />
                        <span>DOGE5L</span>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{"width": "unset", "borderRight": "1px solid"}}
                >
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{"width": "unset"}}
                >
                    <Grid item>
                        <Checkbox
                            checked={btc2xopt}
                            onChange={() => torosCheckboxClick("BTC2XOPT")}
                            disabled={loading}
                        />
                        <span>BTC2XOPT</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc3xopt}
                            onChange={() => torosCheckboxClick("BTC3XOPT")}
                            disabled={loading}
                        />
                        <span>BTC3XOPT</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc3xpol}
                            onChange={() => torosCheckboxClick("BTC3XPOL")}
                            disabled={loading}
                        />
                        <span>BTC3XPOL</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc3xarb}
                            onChange={() => torosCheckboxClick("BTC3XARB")}
                            disabled={loading}
                        />
                        <span>BTC3XARB</span>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{"width": "unset"}}
                >
                    <Grid item>
                        <Checkbox
                            checked={eth2xopt}
                            onChange={() => torosCheckboxClick("ETH2XOPT")}
                            disabled={loading}
                        />
                        <span>ETH2XOPT</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth3xopt}
                            onChange={() => torosCheckboxClick("ETH3XOPT")}
                            disabled={loading}
                        />
                        <span>ETH3XOPT</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth3xpol}
                            onChange={() => torosCheckboxClick("ETH3XPOL")}
                            disabled={loading}
                        />
                        <span>ETH3XPOL</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth3xarb}
                            onChange={() => torosCheckboxClick("ETH3XARB")}
                            disabled={loading}
                        />
                        <span>ETH3XARB</span>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{"width": "unset"}}
                >
                    <Grid item>
                        <Checkbox
                            checked={sol2xopt}
                            onChange={() => torosCheckboxClick("SOL2XOPT")}
                            disabled={loading}
                        />
                        <span>SOL2XOPT</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={sol3xopt}
                            onChange={() => torosCheckboxClick("SOL3XOPT")}
                            disabled={loading}
                        />
                        <span>SOL3XOPT</span>
                    </Grid>
                </Grid>
            </Grid>
            <br />
            <Button onClick={onSearch} variant="contained" disabled={loading || (array.length === 0 && torosArray.length === 0)}>
                {loading ? (
                    <CircularProgress size={25} color={"grey"} />
                ) : (
                    "Fetch data"
                )}
            </Button>
            <Button style={{marginLeft: "8px"}} onClick={onExport} variant="contained" disabled={loading || (array.length === 0 && torosArray.length === 0)}>
                {loading ? (
                    <CircularProgress size={25} color={"grey"} />
                ) : (
                    "Export raw data"
                )}
            </Button>
            <br />
            <Grid
                container
                direction={"row"}
                justifyContent={"space-evenly"}
            >
                <Grid
                    item
                    xs={11/parseFloat(tabValue)}
                >
                    <CryptoChart datasets={datasets} title="Price" metric="price" showDatesOnly={granularity === "DAYS"} />
                </Grid>

                <Grid
                    item
                    xs={11/parseFloat(tabValue)}
                >
                    <CryptoChart datasets={datasets} title="Returns" metric="returns" showDatesOnly={granularity === "DAYS"} />
                </Grid>

                <Grid
                    item
                    xs={11/parseFloat(tabValue)}
                >
                    <CryptoChart datasets={datasets} title="Investment Value" metric="investment-value" showDatesOnly={granularity === "DAYS"} />
                </Grid>

                <Grid
                    item
                    xs={11/parseFloat(tabValue)}
                >
                    <BarChart metrics={metrics} title="Volatility" metric="volatility" />
                </Grid>

                <Grid
                    item
                    xs={11/parseFloat(tabValue)}
                >
                    <BarChart metrics={metrics} title="Sharpe Ratio" metric="sharpe_ratio" />
                </Grid>

                <Grid
                    item
                    xs={11/parseFloat(tabValue)}
                >
                    <BarChart metrics={metrics} title="Sortino Ratio" metric="sortino_ratio" />
                </Grid>

                <Grid
                    item
                    xs={11/parseFloat(tabValue)}
                >
                    <BarChart metrics={metrics} title="Omega Ratio" metric="omega_ratio" />
                </Grid>
            </Grid>
            <p>If you have any feedback or ideas on how to extend the website, tag me in TRW: @01HK0BGJQMWXQC26SRG2W46TET</p>
        </div>
    );
};

export default App;
