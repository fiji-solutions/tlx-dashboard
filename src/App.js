// src/App.js
import React, { useState } from 'react';
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

    const [tabValue, setTabValue] = React.useState('1');
    const [granularity, setGranularity] = useState("DAYS");
    const [granularityUnit, setGranularityUnit] = useState(1);
    const [fromDate, setFromDate] = useState(dayjs("2024-05-01"));
    const [initialCapital, setInitialCapital] = useState(1000);
    const [riskFreeRate, setRiskFreeRate] = useState(0);
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
            fetch(domain + "coin=" + asset + "&granularity=" + granularity + "&granularityUnit=" + granularityUnit + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&initialInvestment=" + initialCapital + "&riskFreeRate=" + riskFreeRate).then(response => response.json())
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

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const onSearch = () => {
        fetchData();
    }

    return (
        <div className="App">
            <Tabs style={{position: "absolute", right: 0, top: 0}} value={tabValue} onChange={handleTabChange}>
                <Tab label={(<ViewAgendaOutlinedIcon />)} value={"1"} />
                <Tab label={(<GridViewOutlinedIcon />)} value={"2"} />
            </Tabs>
            <h1>
                TLX Dashboard
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
                        <FormControl sx={{minWidth: 150}}>
                            <InputLabel id="granularity">Granularity</InputLabel>

                            <Select
                                id="granularity"
                                labelId="granularity"
                                value={granularity}
                                label="Granularity"
                                onChange={(event) => setGranularity(event.target.value)}
                                disabled={loading}
                            >
                                <MenuItem value={"MINUTES"}>Minutes</MenuItem>
                                <MenuItem value={"HOURS"}>Hours</MenuItem>
                                <MenuItem value={"DAYS"}>Days</MenuItem>
                            </Select>
                        </FormControl>
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
                            disabled={loading}
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
            </Grid>
            <br />
            <Button onClick={onSearch} variant="contained" disabled={loading}>
                {loading ? (
                    <CircularProgress size={25} color={"grey"} />
                ) : (
                    "Fetch data"
                )}
            </Button>
            <br />
            <Grid
                container
                direction={"row"}
            >
                <Grid
                    item
                    xs={12/parseInt(tabValue)}
                >
                    <CryptoChart datasets={datasets} title="Price" metric="price" />
                </Grid>

                <Grid
                    item
                    xs={12/parseInt(tabValue)}
                >
                    <CryptoChart datasets={datasets} title="Returns" metric="returns" />
                </Grid>

                <Grid
                    item
                    xs={12/parseInt(tabValue)}
                >
                    <CryptoChart datasets={datasets} title="Investment Value" metric="investment-value" />
                </Grid>

                <Grid
                    item
                    xs={12/parseInt(tabValue)}
                >
                    <BarChart metrics={metrics} title="Volatility" metric="volatility" />
                </Grid>

                <Grid
                    item
                    xs={12/parseInt(tabValue)}
                >
                    <BarChart metrics={metrics} title="Sharpe Ratio" metric="sharpe_ratio" />
                </Grid>

                <Grid
                    item
                    xs={12/parseInt(tabValue)}
                >
                    <BarChart metrics={metrics} title="Sortino Ratio" metric="sortino_ratio" />
                </Grid>

                <Grid
                    item
                    xs={12/parseInt(tabValue)}
                >
                    <BarChart metrics={metrics} title="Omega Ratio" metric="omega_ratio" />
                </Grid>
            </Grid>
        </div>
    );
};

export default App;
