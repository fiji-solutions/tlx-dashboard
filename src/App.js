// src/App.js
import React, { useState } from 'react';
import CryptoChart from './components/CryptoChart';
import {Button, Checkbox, Grid, MenuItem, Select, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import BarChart from "./components/BarChart";

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

    const [array,setArray] = useState([]);

    const [granularity, setGranularity] = useState("DAYS");
    const [granularityUnit, setGranularityUnit] = useState(1);
    const [fromDate, setFromDate] = useState(dayjs("2024-05-01"));
    const [initialCapital, setInitialCapital] = useState(1000);
    const [loading, setLoading] = useState(false);

    const domain = "https://np40nkw6be.execute-api.us-east-1.amazonaws.com/Prod/hello/?";

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
            default:
                break;
        }

        if (boolValue) {
            setArray([...array, asset]);
        } else {
            setArray(array.filter(str => str !== asset));
        }
    };
    const fetchData = async () => {
        setLoading(true);
        const dataPromises = array.map(asset =>
            fetch(domain + "coin=" + asset + "&granularity=" + granularity + "&granularityUnit=" + granularityUnit + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&initial_investment=" + initialCapital).then(response => response.json())
        );

        const results = await Promise.all(dataPromises);
        const combinedData = results.map((result, index) => ({
            label: array[index],
            data: result.data,
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
        }));
        const assetMetrics = results.map((result, index) => ({
            label: array[index],
            volatility: result.volatility,
            sharpe_ratio: result.sharpe_ratio,
            sortino_ratio: result.sortino_ratio,
            omega_ratio: result.omega_ratio
        }));

        setDatasets(combinedData);
        setMetrics(assetMetrics);
        setLoading(false);
    };

    const onSearch = () => {
        fetchData();
    }

    return (
        <div className="App">
            <h1>TLX Dashboard</h1>
            <Grid
                container
                spacing={1}
            >
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
                    <Select
                        value={granularity}
                        label="Granularity"
                        onChange={(event) => setGranularity(event.target.value)}
                    >
                        <MenuItem value={"HOURS"}>Hours</MenuItem>
                        <MenuItem value={"DAYS"}>Days</MenuItem>
                        <MenuItem value={"MONTHS"}>Months</MenuItem>
                    </Select>
                </Grid>

                <Grid
                    item
                    container
                    direction={"column"}
                    style={{"width": "unset"}}
                >
                    <TextField
                        label="Granilarity unit"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={granularityUnit}
                        onChange={(event) => setGranularityUnit(event.target.value)}
                    />
                </Grid>

                <Grid
                    item
                    container
                    direction={"column"}
                    style={{"width": "unset"}}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Controlled picker"
                            value={fromDate}
                            onChange={(newValue) => setFromDate(newValue)}
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
                        label="Initial capital"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={initialCapital}
                        onChange={(event) => setInitialCapital(event.target.value)}
                    />
                </Grid>
            </Grid>
            <br />
            <Button onClick={onSearch} variant="contained">Fetch data</Button>
            <br />
            <CryptoChart datasets={datasets} title="Price" metric="price" />
            <CryptoChart datasets={datasets} title="Returns" metric="returns" />
            <CryptoChart datasets={datasets} title="Investment Value" metric="investment-value" />
            <BarChart metrics={metrics} title="Volatility" metric="volatility" />
            <BarChart metrics={metrics} title="Sharpe Ratio" metric="sharpe_ratio" />
            <BarChart metrics={metrics} title="Sortino Ratio" metric="sortino_ratio" />
            <BarChart metrics={metrics} title="Omega Ratio" metric="omega_ratio" />
        </div>
    );
};

export default App;
