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
    TextField
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "./App.css";
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import BarChart from "./components/BarChart";

const Solana = () => {
    const [datasets, setDatasets] = useState([]);
    const [metrics, setMetrics] = useState([]);

    const [solEssential, setSolEssential] = useState(false);
    const [solEssential1, setSolEssential1] = useState(false);
    const [solEssential2, setSolEssential2] = useState(false);
    const [memes, setMemes] = useState(false);
    const [memes1, setMemes1] = useState(false);
    const [memes2, setMemes2] = useState(false);
    const [dogs, setDogs] = useState(false);
    const [dogs1, setDogs1] = useState(false);
    const [dogs2, setDogs2] = useState(false);
    const [cats, setCats] = useState(false);
    const [cats1, setCats1] = useState(false);
    const [cats2, setCats2] = useState(false);

    const [array, setArray] = useState([]);
    const [tabValue, setTabValue] = useState('2');
    const [granularity, setGranularity] = useState("DAYS");
    const [interval, setInterval] = useState("1d");
    const [granularityUnit, setGranularityUnit] = useState(1);
    const [fromDate, setFromDate] = useState(dayjs("2024-07-27"));
    const [toDate, setToDate] = useState(dayjs(undefined));
    const [initialInvestment, setInitialInvestment] = useState(1000);
    const [riskFreeRate, setRiskFreeRate] = useState(0);
    const [loading, setLoading] = useState(false);

    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const domain = "https://np40nkw6be.execute-api.us-east-1.amazonaws.com/Prod/solindex/";

    const checkboxClick = (asset) => {
        let boolValue = false;
        switch (asset) {
            case "sol-essentials":
                boolValue = !solEssential;
                setSolEssential(!solEssential);
                break;
            case "sol-essentials1":
                boolValue = !solEssential1;
                setSolEssential1(!solEssential1);
                break;
            case "sol-essentials2":
                boolValue = !solEssential2;
                setSolEssential2(!solEssential2);
                break;
            case "memes":
                boolValue = !memes;
                setMemes(!memes);
                break;
            case "memes1":
                boolValue = !memes1;
                setMemes1(!memes1);
                break;
            case "memes2":
                boolValue = !memes2;
                setMemes2(!memes2);
                break;
            case "dogs":
                boolValue = !dogs;
                setDogs(!dogs);
                break;
            case "dogs1":
                boolValue = !dogs1;
                setDogs1(!dogs1);
                break;
            case "dogs2":
                boolValue = !dogs2;
                setDogs2(!dogs2);
                break;
            case "cats":
                boolValue = !cats;
                setCats(!cats);
                break;
            case "cats1":
                boolValue = !cats1;
                setCats1(!cats1);
                break;
            case "cats2":
                boolValue = !cats2;
                setCats2(!cats2);
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

        const arrayPromises = array.map(asset =>
            fetch(domain + `?index=${asset}&fromDate=${dayjs(fromDate).format("YYYY-MM-DD")}&toDate=${dayjs(toDate).add(1, "day").format("YYYY-MM-DD")}&granularity=${granularity}&granularityUnit=${granularityUnit}&initialInvestment=${initialInvestment}&riskFreeRate=${riskFreeRate}`).then(response => response.json())
        );

        const results = await Promise.all(arrayPromises);

        const processData = (data) => {
            const df = data.data.map(item => ({
                timestamp: new Date(item.timestamp).toISOString(), // Ensure ISO string format
                marketcap: item.MarketCap,
                portfolioValue: item.portfolio_value,
                capitalGains: item.capital_gains
            }));

            // Calculate returns
            const returns = df.map((item, index) => {
                if (index === 0) return 0;
                return (item.marketcap - df[index - 1].marketcap) / df[index - 1].marketcap;
            });

            // Calculate cumulative returns
            const cumulativeReturns = returns.reduce((acc, current, index) => {
                acc.push((acc[index - 1] || 1) * (1 + current));
                return acc;
            }, []);

            // Calculate investment value
            const investmentValue = cumulativeReturns.map(value => value * initialInvestment);

            // Calculate volatility
            const volatility = Math.sqrt(returns.reduce((acc, r) => acc + Math.pow(r - (returns.reduce((a, b) => a + b, 0) / returns.length), 2), 0) / returns.length);

            // Calculate sharpe ratio
            const sharpeRatio = (returns.reduce((a, b) => a + b, 0) / returns.length - (riskFreeRate / 100)) / volatility;

            // Calculate sortino ratio
            const downsideRisk = Math.sqrt(returns.filter(r => r < 0).reduce((acc, r) => acc + Math.pow(r, 2), 0) / returns.filter(r => r < 0).length);
            const sortinoRatio = (returns.reduce((a, b) => a + b, 0) / returns.length - (riskFreeRate / 100)) / downsideRisk;

            return {
                data: df.map((item) => ({ timestamp: item.timestamp, marketcap: item.marketcap, portfolioValue: item.portfolioValue, capitalGains: item.capitalGains })), // Ensure correct data structure
                returns,
                cumulativeReturns,
                investmentValue,
                volatility,
                sharpeRatio,
                sortinoRatio
            };
        };

        const processedResults = results.map(result => processData(result));

        const combinedData = processedResults.map((result, index) => ({
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
                fetch(domain + `?index=${asset}&fromDate=${dayjs(fromDate).format("YYYY-MM-DD")}&toDate=${dayjs(toDate).add(1, "day").format("YYYY-MM-DD")}&granularity=${granularity}&granularityUnit=${granularityUnit}&initialInvestment=${initialInvestment}&riskFreeRate=${riskFreeRate}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'text/csv'
                    }
                }).then(response => response.blob())
            );

            const results = await Promise.all(arrayPromises);

            for (let i = 0; i < results.length; i++) {
                const blob = results[i];
                const index = results.indexOf(blob);
                // Create a link element
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `${array[index]}-${dayjs(fromDate).format("YYYY-MM-DD")}-${interval}.csv`;

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

    // New function to generate Pine Script
    const generatePineScript = (assetName) => {
        const assetData = datasets.find(dataset => dataset.label === assetName);
        if (!assetData) return;

        const firstDate = new Date(assetData.data[0].timestamp).toISOString().split('T')[0];

        let pineScript = `//@version=5
indicator("${assetName} Data Plot", overlay=true)

var customValues = array.new_float()
bump = input(true, '', inline = '1') // Enable/Disable offset of origin bar.
date = input.time(timestamp("${firstDate} 00:00 +0000"), "Shift Origin To", tooltip = 'When enabled use this offset for origin bar of data range.', inline = '1')

indx = not bump ? 0 : ta.valuewhen(time == date, bar_index, 0) // Origin bar index.

if bar_index == indx
    customValues := array.from(
     `;

        assetData.data.forEach((item, index) => {
            pineScript += `${item.marketcap}${index < assetData.data.length - 1 ? ', ' : `
 `}`;
        });

        pineScript += `    )`;

 //        assetData.data.forEach((item, index) => {
 //            pineScript += `"${item.timestamp}"${index < assetData.data.length - 1 ? ', ' : `
 // `}`;
 //        });

        pineScript += `

plot(array.size(customValues) < 1 ? na : array.pop(customValues), 'csv', #ffff00) // Plot and shrink dataset for bars within data range.
`;

        navigator.clipboard.writeText(pineScript).then(() => {
            setOpenSnackbar(true);
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
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

    const copyButton = (asset) => {
        return (
            <>
                <Tooltip title="Copy Market Cap Pine Script">
                    <span>
                        <Button
                            onClick={() => generatePineScript(asset)}
                            disabled={!datasets.some(dataset => dataset.label === asset) || loading}
                        >
                            <ContentCopyIcon />
                        </Button>
                    </span>
                </Tooltip>
            </>
        );
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    return (
        <div className="App">
            <h1>
                Solana Index Market Caps
            </h1>

            <span><strong>Disclaimer</strong>: Due to lack of time, not much brain power has been put into the math behind Investment Value.</span>
            <br/>
            <br/>

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
                                maxDate={toDate}
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
                        style={{"width": "unset"}}
                    >
                        <TextField
                            label="Initial Investment"
                            type="number"
                            value={initialInvestment}
                            onChange={(e) => setInitialInvestment(e.target.value)}
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
                            label="Risk Free Rate (%)"
                            type="number"
                            value={riskFreeRate}
                            onChange={(e) => setRiskFreeRate(e.target.value)}
                            disabled={loading}
                        />
                    </Grid>
                </Grid>

                <Grid
                    item
                    container
                    justifyContent={"center"}
                >
                    <Grid
                        item
                        container
                        md={8}
                        justifyContent={"space-around"}
                    >
                        <Grid
                            item
                            style={{"text-align": "center"}}
                        >
                            <h2>Solindex</h2>
                        </Grid>
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
                            checked={solEssential1}
                            onChange={() => checkboxClick("sol-essentials1")}
                            disabled={loading}
                        />
                        <span>Sol Essentials TOP 10</span>
                        {copyButton("sol-essentials1")}
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={solEssential2}
                            onChange={() => checkboxClick("sol-essentials2")}
                            disabled={loading}
                        />
                        <span>Sol Essentials TOP 11-20</span>
                        {copyButton("sol-essentials2")}
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={solEssential}
                            onChange={() => checkboxClick("sol-essentials")}
                            disabled={loading}
                        />
                        <span>Sol Essentials TOP 20</span>
                        {copyButton("sol-essentials")}
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
                            checked={memes1}
                            onChange={() => checkboxClick("memes1")}
                            disabled={loading}
                        />
                        <span>Memes TOP 10</span>
                        {copyButton("memes1")}
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={memes2}
                            onChange={() => checkboxClick("memes2")}
                            disabled={loading}
                        />
                        <span>Memes TOP 11-20</span>
                        {copyButton("memes2")}
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={memes}
                            onChange={() => checkboxClick("memes")}
                            disabled={loading}
                        />
                        <span>Memes TOP 20</span>
                        {copyButton("memes")}
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
                            checked={dogs1}
                            onChange={() => checkboxClick("dogs1")}
                            disabled={loading}
                        />
                        <span>Dogs TOP 10</span>
                        {copyButton("dogs1")}
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={dogs2}
                            onChange={() => checkboxClick("dogs2")}
                            disabled={loading}
                        />
                        <span>Dogs TOP 11-20</span>
                        {copyButton("dogs2")}
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={dogs}
                            onChange={() => checkboxClick("dogs")}
                            disabled={loading}
                        />
                        <span>Dogs TOP 20</span>
                        {copyButton("dogs")}
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
                            checked={cats1}
                            onChange={() => checkboxClick("cats1")}
                            disabled={loading}
                        />
                        <span>Cats TOP 10</span>
                        {copyButton("cats1")}
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={cats2}
                            onChange={() => checkboxClick("cats2")}
                            disabled={loading}
                        />
                        <span>Cats TOP 11-20</span>
                        {copyButton("cats2")}
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={cats}
                            onChange={() => checkboxClick("cats")}
                            disabled={loading}
                        />
                        <span>Cats TOP 20</span>
                        {copyButton("cats")}
                    </Grid>
                </Grid>
            </Grid>
            <br/>

            <Button onClick={onSearch} variant="contained"
                    disabled={loading || array.length === 0}>
                {loading ? (
                    <CircularProgress size={25} color={"grey"}/>
                ) : (
                    "Fetch data"
                )}
            </Button>
            <Button style={{marginLeft: "8px"}} onClick={onExport} variant="contained"
                    // disabled={loading || array.length === 0}>
                    disabled={true}>
                {loading ? (
                    <CircularProgress size={25} color={"grey"}/>
                ) : (
                    "Export raw data CSV"
                )}
            </Button>
            <br/>

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
                    <CryptoChart datasets={datasets} title="Market Cap" metric="marketcap"
                                 showDatesOnly={granularity === "DAYS"}/>
                </Grid>

                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <CryptoChart datasets={datasets} title="Investment Value" metric="portfolioValue"
                                 showDatesOnly={granularity === "DAYS"}/>
                </Grid>

                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <CryptoChart datasets={datasets} title="Capital Gains" metric="capitalGains"
                                 showDatesOnly={granularity === "DAYS"}/>
                </Grid>

                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <BarChart metrics={metrics} title="Volatility" metric="volatility"/>
                </Grid>

                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <BarChart metrics={metrics} title="Sharpe Ratio" metric="sharpe_ratio"/>
                </Grid>

                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <BarChart metrics={metrics} title="Sortino Ratio" metric="sortino_ratio"/>
                </Grid>

                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <BarChart metrics={metrics} title="CDF-based Omega Ratio" metric="omega_ratio"/>
                    <p>This chart displays the Omega ratio calculated using probability-weighted gains and losses
                        derived from the Cumulative Distribution Function (CDF) of the returns.</p>
                </Grid>

                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <BarChart metrics={metrics} title="Simple Sum-Based Omega Ratio" metric="simple_omega_ratio"/>
                    <p>This chart shows the Omega ratio calculated using the straightforward sum of gains and absolute
                        sum of losses without considering probability weights.</p>
                </Grid>
            </Grid>
            <p>You can view my backend source code for more info on how I perform the calculations here:</p>
            <p><a
                href="https://github.com/fiji-solutions/tlx/blob/main/solindex_cron/app.py">https://github.com/fiji-solutions/tlx/blob/main/solindex_cron/app.py</a>
            </p>
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

export default Solana;
