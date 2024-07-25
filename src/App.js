// src/App.js
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
    Tab,
    Tabs,
    TextField
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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

    const [steth2x, setSteth2x] = useState(false);
    const [steth3x, setSteth3x] = useState(false);
    const [steth4x, setSteth4x] = useState(false);

    const [sol2xopt, setSol2xopt] = useState(false);
    const [sol3xopt, setSol3xopt] = useState(false);

    const [array, setArray] = useState([]);
    const [torosArray, setTorosArray] = useState([]);
    const [selectedSolindexCoins, setSelectedSolindexCoins] = useState([]);
    const [solindexCoins, setSolindexCoins] = useState({});

    const [tabValue, setTabValue] = React.useState('2');
    const [granularity, setGranularity] = useState("DAYS");
    const [interval, setInterval] = useState("1d");
    const [granularityUnit, setGranularityUnit] = useState(1);
    const [fromDate, setFromDate] = useState(dayjs("2024-05-01"));
    const [toDate, setToDate] = useState(dayjs(undefined));
    const [initialCapital, setInitialCapital] = useState(1000);
    const [riskFreeRate, setRiskFreeRate] = useState(0);
    const [loading, setLoading] = useState(false);

    const domain = "https://np40nkw6be.execute-api.us-east-1.amazonaws.com/Prod/";

    const checkboxClick = (asset, setAsset, assetState) => {
        setAsset(!assetState);
        let boolValue = !assetState;

        if (boolValue) {
            setArray([...array, asset]);
        } else {
            setArray(array.filter(str => str !== asset));
        }
    };

    const solindexCheckboxClick = (coin) => {
        let boolValue = !selectedSolindexCoins.includes(coin);

        if (boolValue) {
            setSelectedSolindexCoins([...selectedSolindexCoins, coin]);
        } else {
            setSelectedSolindexCoins(selectedSolindexCoins.filter(str => str !== coin));
        }
    };

    const torosCheckboxClick = (asset, setAsset, assetState) => {
        setAsset(!assetState);
        let boolValue = !assetState;

        if (boolValue) {
            setTorosArray([...torosArray, asset]);
        } else {
            setTorosArray(torosArray.filter(str => str !== asset));
        }
    };

    const maxDates = {
        "BTC1L": "2024-05-14",
        "BTC2L": "2024-05-14",
        "BTC3L": "2024-05-24",
        "BTC4L": "2024-05-24",
        "BTC5L": "2024-05-14",
        "ETH1L": "2024-05-14",
        "ETH2L": "2024-05-14",
        "ETH3L": "2024-05-24",
        "ETH4L": "2024-05-24",
        "ETH5L": "2024-05-14",
        "SOL1L": "2024-05-14",
        "SOL2L": "2024-05-14",
        "SOL3L": "2024-05-24",
        "SOL4L": "2024-05-24",
        "SOL5L": "2024-05-14",
        "DOGE2L": "2024-06-13",
        "DOGE5L": "2024-06-13",
        "BTC2XOPT": "2023-10-10",
        "BTC3XOPT": "2024-03-13",
        "BTC3XPOL": "2023-06-27",
        "BTC3XARB": "2024-02-22",
        "ETH2XOPT": "2023-10-10",
        "ETH3XOPT": "2024-03-12",
        "ETH3XPOL": "2023-06-27",
        "ETH3XARB": "2024-02-22",
        "STETH2X": "2024-06-14",
        "STETH3X": "2024-06-14",
        "STETH4X": "2024-06-14",
        "SOL2XOPT": "2024-05-27",
        "SOL3XOPT": "2024-05-27",
    };

    const fetchData = async () => {
        setLoading(true);

        const arrayPromises = array.map(asset =>
            fetch(domain + "hello/?coin=" + asset + "&granularity=" + granularity + "&granularityUnit=" + granularityUnit + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&toDate=" + getToDateString(asset) + "&initialInvestment=" + initialCapital + "&riskFreeRate=" + riskFreeRate).then(response => response.json())
        );

        const torosArrayPromises = torosArray.map(asset =>
            fetch(domain + "toros/?coin=" + asset + "&interval=" + interval + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&toDate=" + getToDateString(asset) + "&initialInvestment=" + initialCapital + "&riskFreeRate=" + riskFreeRate).then(response => response.json())
        );

        const solindexArrayPromises = selectedSolindexCoins.map(coin =>
            fetch(domain + "solindex/?coin=" + coin + "&granularity=" + granularity + "&granularityUnit=" + granularityUnit + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&toDate=" + dayjs(toDate).add(1, "day").format("YYYY-MM-DD") + "&initialInvestment=" + initialCapital + "&riskFreeRate=" + riskFreeRate).then(response => response.json())
        );

        const results = await Promise.all([...arrayPromises, ...torosArrayPromises, ...solindexArrayPromises]);

        const combinedData = results.map((result, index) => ({
            label: index < array.length ? array[index] : (index < array.length + torosArray.length ? torosArray[index - array.length] : selectedSolindexCoins[index - array.length - torosArray.length]),
            data: result.data,
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
        }));

        const assetMetrics = results.map((result, index) => ({
            label: index < array.length ? array[index] : (index < array.length + torosArray.length ? torosArray[index - array.length] : selectedSolindexCoins[index - array.length - torosArray.length]),
            volatility: result.volatility,
            sharpe_ratio: result.sharpe_ratio,
            sortino_ratio: result.sortino_ratio,
            omega_ratio: result.omega_ratio,
            simple_omega_ratio: result.simple_omega_ratio
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
                fetch(domain + "tlx-export/?coin=" + asset + "&granularity=" + granularity + "&granularityUnit=" + granularityUnit + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&toDate=" + getToDateString(asset) + "&initialInvestment=" + initialCapital + "&riskFreeRate=" + riskFreeRate, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'text/csv'
                    }
                }).then(response => response.blob())
            );

            const torosArrayPromises = torosArray.map(asset =>
                fetch(domain + "toros-export/?coin=" + asset + "&interval=" + interval + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&toDate=" + getToDateString(asset) + "&initialInvestment=" + initialCapital + "&riskFreeRate=" + riskFreeRate, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'text/csv'
                    }
                }).then(response => response.blob())
            );

            const solindexArrayPromises = selectedSolindexCoins.map(coin =>
                fetch(domain + "solindex-export/?coin=" + coin + "&granularity=" + granularity + "&granularityUnit=" + granularityUnit + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&toDate=" + dayjs(toDate).format("YYYY-MM-DD") + "&initialInvestment=" + initialCapital + "&riskFreeRate=" + riskFreeRate, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'text/csv'
                    }
                }).then(response => response.blob())
            );

            const results = await Promise.all([...arrayPromises, ...torosArrayPromises, ...solindexArrayPromises]);

            for (let i = 0; i < results.length; i++) {
                const blob = results[i];
                const index = results.indexOf(blob);
                const assetLabel = index < array.length ? array[index] : (index < array.length + torosArray.length ? torosArray[index - array.length] : selectedSolindexCoins[index - array.length - torosArray.length]);

                // Create a link element
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `${assetLabel}-${dayjs(fromDate).format("YYYY-MM-DD")}-${interval}.csv`;

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
    };

    const onExport = () => {
        downloadData();
    };

    const handleIntervalChange = (event) => {
        let value = event.target.value;
        setInterval(value);
    };

    const maxOfTwoDays = (date1, date2) => {
        const dateObject1 = new Date(date1);
        const dateObject2 = new Date(date2);

        return dateObject1.getTime() > dateObject2.getTime() ? date1 : date2;
    };

    const getToDateString = (asset) => {
        const assetDateString = maxDates[asset];
        const toDateString = dayjs(toDate).format("YYYY-MM-DD");

        return maxOfTwoDays(assetDateString, toDateString);
    };

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

    useEffect(() => {
        const fetchSolindexSources = async () => {
            const response = await fetch(domain + "solindex-sources");
            const data = await response.json();
            setSolindexCoins(data);
        };

        fetchSolindexSources();
    }, []);

    return (
        <div className="App">
            <h1>
                Leveraged & Small Cap Token Performance Analysis
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
                        style={{ "width": "unset" }}
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
                        style={{ "width": "unset" }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start date"
                                value={fromDate}
                                onChange={(newValue) => setFromDate(newValue)}
                                disabled={loading}
                                maxDate={toDate}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                        style={{ "width": "unset" }}
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
                        style={{ "width": "unset" }}
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
                        style={{ "width": "unset", "minWidth": "200px" }}
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
                    xs={6}
                >
                    <h2 style={{ "margin-bottom": "0"}}>TLX Coins</h2>
                </Grid>

                <Grid
                    item
                    xs={6}
                >
                    <h2 style={{ "margin-bottom": "0"}}>Toros coins</h2>
                </Grid>

                {/* TLX checkboxes */}
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{ "width": "unset" }}
                >
                    <Grid item>
                        <Checkbox
                            checked={btc1l}
                            onChange={() => checkboxClick("BTC1L", setBtc1l, btc1l)}
                            disabled={loading}
                        />
                        <span>BTC1L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc2l}
                            onChange={() => checkboxClick("BTC2L", setBtc2l, btc2l)}
                            disabled={loading}
                        />
                        <span>BTC2L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc3l}
                            onChange={() => checkboxClick("BTC3L", setBtc3l, btc3l)}
                            disabled={loading}
                        />
                        <span>BTC3L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc4l}
                            onChange={() => checkboxClick("BTC4L", setBtc4l, btc4l)}
                            disabled={loading}
                        />
                        <span>BTC4L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc5l}
                            onChange={() => checkboxClick("BTC5L", setBtc5l, btc5l)}
                            disabled={loading}
                        />
                        <span>BTC5L</span>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{ "width": "unset" }}
                >
                    <Grid item>
                        <Checkbox
                            checked={eth1l}
                            onChange={() => checkboxClick("ETH1L", setEth1l, eth1l)}
                            disabled={loading}
                        />
                        <span>ETH1L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth2l}
                            onChange={() => checkboxClick("ETH2L", setEth2l, eth2l)}
                            disabled={loading}
                        />
                        <span>ETH2L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth3l}
                            onChange={() => checkboxClick("ETH3L", setEth3l, eth3l)}
                            disabled={loading}
                        />
                        <span>ETH3L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth4l}
                            onChange={() => checkboxClick("ETH4L", setEth4l, eth4l)}
                            disabled={loading}
                        />
                        <span>ETH4L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth5l}
                            onChange={() => checkboxClick("ETH5L", setEth5l, eth5l)}
                            disabled={loading}
                        />
                        <span>ETH5L</span>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{ "width": "unset" }}
                >
                    <Grid item>
                        <Checkbox
                            checked={sol1l}
                            onChange={() => checkboxClick("SOL1L", setSol1l, sol1l)}
                            disabled={loading}
                        />
                        <span>SOL1L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={sol2l}
                            onChange={() => checkboxClick("SOL2L", setSol2l, sol2l)}
                            disabled={loading}
                        />
                        <span>SOL2L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={sol3l}
                            onChange={() => checkboxClick("SOL3L", setSol3l, sol3l)}
                            disabled={loading}
                        />
                        <span>SOL3L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={sol4l}
                            onChange={() => checkboxClick("SOL4L", setSol4l, sol4l)}
                            disabled={loading}
                        />
                        <span>SOL4L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={sol5l}
                            onChange={() => checkboxClick("SOL5L", setSol5l, sol5l)}
                            disabled={loading}
                        />
                        <span>SOL5L</span>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{ "width": "unset" }}
                >
                    <Grid item>
                        <Checkbox
                            checked={doge2l}
                            onChange={() => checkboxClick("DOGE2L", setDoge2l, doge2l)}
                            disabled={loading}
                        />
                        <span>DOGE2L</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={doge5l}
                            onChange={() => checkboxClick("DOGE5L", setDoge5l, doge5l)}
                            disabled={loading}
                        />
                        <span>DOGE5L</span>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{ "width": "unset", "borderRight": "1px solid" }}
                >
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{ "width": "unset" }}
                >
                    <Grid item>
                        <Checkbox
                            checked={btc2xopt}
                            onChange={() => torosCheckboxClick("BTC2XOPT", setBtc2xopt, btc2xopt)}
                            disabled={loading}
                        />
                        <span>BTC2XOPT</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc3xopt}
                            onChange={() => torosCheckboxClick("BTC3XOPT", setBtc3xopt, btc3xopt)}
                            disabled={loading}
                        />
                        <span>BTC3XOPT</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc3xpol}
                            onChange={() => torosCheckboxClick("BTC3XPOL", setBtc3xpol, btc3xpol)}
                            disabled={loading}
                        />
                        <span>BTC3XPOL</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc3xarb}
                            onChange={() => torosCheckboxClick("BTC3XARB", setBtc3xarb, btc3xarb)}
                            disabled={loading}
                        />
                        <span>BTC3XARB</span>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{ "width": "unset" }}
                >
                    <Grid item>
                        <Checkbox
                            checked={eth2xopt}
                            onChange={() => torosCheckboxClick("ETH2XOPT", setEth2xopt, eth2xopt)}
                            disabled={loading}
                        />
                        <span>ETH2XOPT</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth3xopt}
                            onChange={() => torosCheckboxClick("ETH3XOPT", setEth3xopt, eth3xopt)}
                            disabled={loading}
                        />
                        <span>ETH3XOPT</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth3xpol}
                            onChange={() => torosCheckboxClick("ETH3XPOL", setEth3xpol, eth3xpol)}
                            disabled={loading}
                        />
                        <span>ETH3XPOL</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth3xarb}
                            onChange={() => torosCheckboxClick("ETH3XARB", setEth3xarb, eth3xarb)}
                            disabled={loading}
                        />
                        <span>ETH3XARB</span>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{ "width": "unset" }}
                >
                    <Grid item>
                        <Checkbox
                            checked={steth2x}
                            onChange={() => torosCheckboxClick("STETH2X", setSteth2x, steth2x)}
                            disabled={loading}
                        />
                        <span>STETH2X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={steth3x}
                            onChange={() => torosCheckboxClick("STETH3X", setSteth3x, steth3x)}
                            disabled={loading}
                        />
                        <span>STETH3X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={steth4x}
                            onChange={() => torosCheckboxClick("STETH4X", setSteth4x, steth4x)}
                            disabled={loading}
                        />
                        <span>STETH4X</span>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{ "width": "unset" }}
                >
                    <Grid item>
                        <Checkbox
                            checked={sol2xopt}
                            onChange={() => torosCheckboxClick("SOL2XOPT", setSol2xopt, sol2xopt)}
                            disabled={loading}
                        />
                        <span>SOL2XOPT</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={sol3xopt}
                            onChange={() => torosCheckboxClick("SOL3XOPT", setSol3xopt, sol3xopt)}
                            disabled={loading}
                        />
                        <span>SOL3XOPT</span>
                    </Grid>
                </Grid>

                <Grid
                    item
                    xs={12}
                >
                    <h2 style={{ "margin-bottom": "0"}}>SOL Index coins</h2>
                </Grid>

                <Grid
                    xs={12}
                    item
                    container
                    direction={"row"}
                    style={{ "width": "unset" , "textAlign": "start"}}
                    alignItems={"normal"}
                    justifyContent={"center"}
                >
                    {Object.entries(solindexCoins).map(([source, coins]) => (
                        <Grid
                            item
                            key={source}
                        >
                            <h3>{source}</h3>
                            {coins.map(coin => (
                                <div key={coin}>
                                    <Checkbox
                                        checked={selectedSolindexCoins.includes(coin)}
                                        onChange={() => solindexCheckboxClick(coin)}
                                        disabled={loading}
                                    />
                                    <span>{coin}</span>
                                </div>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <br />
            <Button onClick={onSearch} variant="contained"
                    disabled={loading || (array.length === 0 && torosArray.length === 0 && selectedSolindexCoins.length === 0)}>
                {loading ? (
                    <CircularProgress size={25} color={"grey"} />
                ) : (
                    "Fetch data"
                )}
            </Button>
            <Button style={{ marginLeft: "8px" }} onClick={onExport} variant="contained"
                    disabled={loading || (array.length === 0 && torosArray.length === 0 && selectedSolindexCoins.length === 0)}>
                {loading ? (
                    <CircularProgress size={25} color={"grey"} />
                ) : (
                    "Export raw data CSV"
                )}
            </Button>
            <br />

            <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                direction={"column"}
            >
                <Grid item>
                    <h4>Change charts size</h4>
                </Grid>

                <Grid item>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label={(<ViewAgendaOutlinedIcon />)} value={"1"} />
                        <Tab label={(<ViewQuiltOutlinedIcon />)} value={"1.3"} />
                        <Tab label={(<GridViewOutlinedIcon />)} value={"2"} />
                    </Tabs>
                </Grid>
            </Grid>

            <Grid
                container
                direction={"row"}
                justifyContent={"space-evenly"}
            >
                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <CryptoChart datasets={datasets} title="Price" metric="price"
                                 showDatesOnly={granularity === "DAYS"} />
                </Grid>

                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <CryptoChart datasets={datasets} title="Returns" metric="returns"
                                 showDatesOnly={granularity === "DAYS"} />
                </Grid>

                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <CryptoChart datasets={datasets} title="Investment Value" metric="investment-value"
                                 showDatesOnly={granularity === "DAYS"} />
                </Grid>

                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <BarChart metrics={metrics} title="Volatility" metric="volatility" />
                </Grid>

                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <BarChart metrics={metrics} title="Sharpe Ratio" metric="sharpe_ratio" />
                </Grid>

                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <BarChart metrics={metrics} title="Sortino Ratio" metric="sortino_ratio" />
                </Grid>

                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <BarChart metrics={metrics} title="CDF-based Omega Ratio" metric="omega_ratio" />
                    <p>This chart displays the Omega ratio calculated using probability-weighted gains and losses
                        derived from the Cumulative Distribution Function (CDF) of the returns.</p>
                </Grid>

                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <BarChart metrics={metrics} title="Simple Sum-Based Omega Ratio" metric="simple_omega_ratio" />
                    <p>This chart shows the Omega ratio calculated using the straightforward sum of gains and absolute
                        sum of losses without considering probability weights.</p>
                </Grid>
            </Grid>
            <p>You can view my backend source code for more info on how I perform the calculations here:</p>
            <p><a
                href="https://github.com/fiji-solutions/tlx/blob/main/hello_world/app.py">https://github.com/fiji-solutions/tlx/blob/main/hello_world/app.py</a>
            </p>
            <p>If you have any feedback or ideas on how to extend the website, tag me in TRW:
                @01HK0BGJQMWXQC26SRG2W46TET</p>
        </div>
    );
};

export default App;
