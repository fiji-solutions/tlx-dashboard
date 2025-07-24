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

    // const [btc1l, setBtc1l] = useState(false);
    // const [btc2l, setBtc2l] = useState(false);
    // const [btc3l, setBtc3l] = useState(false);
    // const [btc4l, setBtc4l] = useState(false);
    // const [btc5l, setBtc5l] = useState(false);
    // const [btc7l, setBtc7l] = useState(false);
    //
    // const [eth1l, setEth1l] = useState(false);
    // const [eth2l, setEth2l] = useState(false);
    // const [eth3l, setEth3l] = useState(false);
    // const [eth4l, setEth4l] = useState(false);
    // const [eth5l, setEth5l] = useState(false);
    // const [eth7l, setEth7l] = useState(false);
    //
    // const [sol1l, setSol1l] = useState(false);
    // const [sol2l, setSol2l] = useState(false);
    // const [sol3l, setSol3l] = useState(false);
    // const [sol4l, setSol4l] = useState(false);
    // const [sol5l, setSol5l] = useState(false);
    //
    // const [doge2l, setDoge2l] = useState(false);
    // const [doge5l, setDoge5l] = useState(false);
    //
    // const [ethbtc2l, setEthbtc2l] = useState(false);
    // const [ethbtc5l, setEthbtc5l] = useState(false);
    // const [ethbtc10l, setEthbtc10l] = useState(false);
    //
    // const [sui2l, setSui2l] = useState(false);
    // const [sui5l, setSui5l] = useState(false);

    const [btc1xpol, setBtc1xpol] = useState(false);
    const [btc1xbase, setBtc1xbase] = useState(false);
    const [btc1xopt, setBtc1xopt] = useState(false);
    const [btc1xarb, setBtc1xarb] = useState(false);
    const [btc2xbase, setBtc2xbase] = useState(false);
    const [btc2xopt, setBtc2xopt] = useState(false);
    const [btc2xarb, setBtc2xarb] = useState(false);
    const [btc3xpol, setBtc3xpol] = useState(false);
    const [btc3xbase, setBtc3xbase] = useState(false);
    const [btc3xopt, setBtc3xopt] = useState(false);
    const [btc3xarb, setBtc3xarb] = useState(false);
    const [btc4xopt, setBtc4xopt] = useState(false);
    const [btc4xarb, setBtc4xarb] = useState(false);
    const [btccvrd2xarb, setBtccvrd2xarb] = useState(false);
    const [btc1xprotected, setBtc1xprotected] = useState(false);
    const [btc2xprotected, setBtc2xprotected] = useState(false);
    const [btc3xprotected, setBtc3xprotected] = useState(false);

    const [eth1xpol, setEth1xpol] = useState(false);
    const [eth1xopt, setEth1xopt] = useState(false);
    const [eth1xarb, setEth1xarb] = useState(false);
    const [steth2x, setSteth2x] = useState(false);
    const [eth2xopt, setEth2xopt] = useState(false);
    const [eth2xarb, setEth2xarb] = useState(false);
    const [eth3xpol, setEth3xpol] = useState(false);
    const [steth3x, setSteth3x] = useState(false);
    const [eth3xopt, setEth3xopt] = useState(false);
    const [eth3xarb, setEth3xarb] = useState(false);
    const [eth4xarb, setEth4xarb] = useState(false);
    const [steth4x, setSteth4x] = useState(false);

    const [sol1xarb, setSol1xarb] = useState(false);
    const [sol2xopt, setSol2xopt] = useState(false);
    const [sol3xopt, setSol3xopt] = useState(false);
    const [sol1xxarb, setSol1xxarb] = useState(false);
    const [sol2xarb, setSol2xarb] = useState(false);
    const [sol3xarb, setSol3xarb] = useState(false);

    const [sui2xopt, setSui2xopt] = useState(false);
    const [sui1xxarb, setSui1xxarb] = useState(false);
    const [sui2xarb, setSui2xarb] = useState(false);

    const [doge2xopt, setDoge2xopt] = useState(false);

    const [spotBtc, setSpotBtc] = useState(false);
    const [spotBtc2, setSpotBtc2] = useState(false);
    const [spotBtc3, setSpotBtc3] = useState(false);
    const [spotBtc4, setSpotBtc4] = useState(false);
    const [spotBtc5, setSpotBtc5] = useState(false);
    const [spotEth, setSpotEth] = useState(false);
    const [spotEth2, setSpotEth2] = useState(false);
    const [spotEth3, setSpotEth3] = useState(false);
    const [spotEth4, setSpotEth4] = useState(false);
    const [spotEth5, setSpotEth5] = useState(false);
    const [spotSol, setSpotSol] = useState(false);
    const [spotSol2, setSpotSol2] = useState(false);
    const [spotSol3, setSpotSol3] = useState(false);
    const [spotSol4, setSpotSol4] = useState(false);
    const [spotSol5, setSpotSol5] = useState(false);
    const [spotSui, setSpotSui] = useState(false);
    const [spotSui2, setSpotSui2] = useState(false);
    const [spotSui3, setSpotSui3] = useState(false);
    const [spotSui4, setSpotSui4] = useState(false);
    const [spotSui5, setSpotSui5] = useState(false);
    const [spotDoge, setSpotDoge] = useState(false);
    const [spotDoge2, setSpotDoge2] = useState(false);
    const [spotDoge3, setSpotDoge3] = useState(false);
    const [spotDoge4, setSpotDoge4] = useState(false);
    const [spotDoge5, setSpotDoge5] = useState(false);

    const array = [];
    // const [array,setArray] = useState([]);
    const [torosArray,setTorosArray] = useState([]);
    const [spotArray,setSpotArray] = useState([]);

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

    // const checkboxClick = (asset) => {
    //     let boolValue = false;
    //     switch (asset) {
    //         case "BTC1L":
    //             boolValue = !btc1l;
    //             setBtc1l(!btc1l);
    //             break;
    //         case "BTC2L":
    //             boolValue = !btc2l;
    //             setBtc2l(!btc2l);
    //             break;
    //         case "BTC3L":
    //             boolValue = !btc3l;
    //             setBtc3l(!btc3l);
    //             break;
    //         case "BTC4L":
    //             boolValue = !btc4l;
    //             setBtc4l(!btc4l);
    //             break;
    //         case "BTC5L":
    //             boolValue = !btc5l;
    //             setBtc5l(!btc5l);
    //             break;
    //         case "BTC7L":
    //             boolValue = !btc7l;
    //             setBtc7l(!btc7l);
    //             break;
    //
    //         case "ETH1L":
    //             boolValue = !eth1l;
    //             setEth1l(!eth1l);
    //             break;
    //         case "ETH2L":
    //             boolValue = !eth2l;
    //             setEth2l(!eth2l);
    //             break;
    //         case "ETH3L":
    //             boolValue = !eth3l;
    //             setEth3l(!eth3l);
    //             break;
    //         case "ETH4L":
    //             boolValue = !eth4l;
    //             setEth4l(!eth4l);
    //             break;
    //         case "ETH5L":
    //             boolValue = !eth5l;
    //             setEth5l(!eth5l);
    //             break;
    //         case "ETH7L":
    //             boolValue = !eth7l;
    //             setEth7l(!eth7l);
    //             break;
    //
    //         case "SOL1L":
    //             boolValue = !sol1l;
    //             setSol1l(!sol1l);
    //             break;
    //         case "SOL2L":
    //             boolValue = !sol2l;
    //             setSol2l(!sol2l);
    //             break;
    //         case "SOL3L":
    //             boolValue = !sol3l;
    //             setSol3l(!sol3l);
    //             break;
    //         case "SOL4L":
    //             boolValue = !sol4l;
    //             setSol4l(!sol4l);
    //             break;
    //         case "SOL5L":
    //             boolValue = !sol5l;
    //             setSol5l(!sol5l);
    //             break;
    //
    //         case "DOGE2L":
    //             boolValue = !doge2l;
    //             setDoge2l(!doge2l);
    //             break;
    //
    //         case "DOGE5L":
    //             boolValue = !doge5l;
    //             setDoge5l(!doge5l);
    //             break;
    //
    //         case "ETHBTC2L":
    //             boolValue = !ethbtc2l;
    //             setEthbtc2l(!ethbtc2l);
    //             break;
    //
    //         case "ETHBTC5L":
    //             boolValue = !ethbtc5l;
    //             setEthbtc5l(!ethbtc5l);
    //             break;
    //
    //         case "ETHBTC10L":
    //             boolValue = !ethbtc10l;
    //             setEthbtc10l(!ethbtc10l);
    //             break;
    //
    //         case "SUI2L":
    //             boolValue = !sui2l;
    //             setSui2l(!sui2l);
    //             break;
    //
    //         case "SUI5L":
    //             boolValue = !sui5l;
    //             setSui5l(!sui5l);
    //             break;
    //         default:
    //             break;
    //     }
    //
    //     if (boolValue) {
    //         setArray([...array, asset]);
    //     } else {
    //         setArray(array.filter(str => str !== asset));
    //     }
    // };

    const torosCheckboxClick = (asset) => {
        let boolValue = false;
        switch (asset) {
            case "BTC1XPOL":
                boolValue = !btc1xpol;
                setBtc1xpol(!btc1xpol);
                break;
            case "BTC1XBASE":
                boolValue = !btc1xbase;
                setBtc1xbase(!btc1xbase);
                break;
            case "BTC1XOPT":
                boolValue = !btc1xopt;
                setBtc1xopt(!btc1xopt);
                break;
            case "BTC1XARB":
                boolValue = !btc1xarb;
                setBtc1xarb(!btc1xarb);
                break;
            case "BTC2XOPT":
                boolValue = !btc2xopt;
                setBtc2xopt(!btc2xopt);
                break;
            case "BTC2XBASE":
                boolValue = !btc2xbase;
                setBtc2xbase(!btc2xbase);
                break;
            case "BTC2XARB":
                boolValue = !btc2xarb;
                setBtc2xarb(!btc2xarb);
                break;
            case "BTC3XPOL":
                boolValue = !btc3xpol;
                setBtc3xpol(!btc3xpol);
                break;
            case "BTC3XBASE":
                boolValue = !btc3xbase;
                setBtc3xbase(!btc3xbase);
                break;
            case "BTC3XOPT":
                boolValue = !btc3xopt;
                setBtc3xopt(!btc3xopt);
                break;
            case "BTC3XARB":
                boolValue = !btc3xarb;
                setBtc3xarb(!btc3xarb);
                break;
            case "BTC4XOPT":
                boolValue = !btc4xopt;
                setBtc4xopt(!btc4xopt);
                break;
            case "BTC4XARB":
                boolValue = !btc4xarb;
                setBtc4xarb(!btc4xarb);
                break;
            case "BTCCVRD2XARB":
                boolValue = !btccvrd2xarb;
                setBtccvrd2xarb(!btccvrd2xarb);
                break;
            case "BTC1XPROTECTED":
                boolValue = !btc1xprotected;
                setBtc1xprotected(!btc1xprotected);
                break;
            case "BTC2XPROTECTED":
                boolValue = !btc2xprotected;
                setBtc2xprotected(!btc2xprotected);
                break;
            case "BTC3XPROTECTED":
                boolValue = !btc3xprotected;
                setBtc3xprotected(!btc3xprotected);
                break;
            case "ETH1XPOL":
                boolValue = !eth1xpol;
                setEth1xpol(!eth1xpol);
                break;
            case "ETH1XOPT":
                boolValue = !eth1xopt;
                setEth1xopt(!eth1xopt);
                break;
            case "ETH1XARB":
                boolValue = !eth1xarb;
                setEth1xarb(!eth1xarb);
                break;
            case "STETH2X":
                boolValue = !steth2x;
                setSteth2x(!steth2x);
                break;
            case "ETH2XOPT":
                boolValue = !eth2xopt;
                setEth2xopt(!eth2xopt);
                break;
            case "ETH2XARB":
                boolValue = !eth2xarb;
                setEth2xarb(!eth2xarb);
                break;
            case "ETH3XPOL":
                boolValue = !eth3xpol;
                setEth3xpol(!eth3xpol);
                break;
            case "STETH3X":
                boolValue = !steth3x;
                setSteth3x(!steth3x);
                break;
            case "ETH3XOPT":
                boolValue = !eth3xopt;
                setEth3xopt(!eth3xopt);
                break;
            case "ETH3XARB":
                boolValue = !eth3xarb;
                setEth3xarb(!eth3xarb);
                break;
            case "ETH4XARB":
                boolValue = !eth4xarb;
                setEth4xarb(!eth4xarb);
                break;
            case "STETH4X":
                boolValue = !steth4x;
                setSteth4x(!steth4x);
                break;
            case "SOL1XARB":
                boolValue = !sol1xarb;
                setSol1xarb(!sol1xarb);
                break;
            case "SOL2XOPT":
                boolValue = !sol2xopt;
                setSol2xopt(!sol2xopt);
                break;
            case "SOL3XOPT":
                boolValue = !sol3xopt;
                setSol3xopt(!sol3xopt);
                break;
            case "SOL1XXARB":
                boolValue = !sol1xxarb;
                setSol1xxarb(!sol1xxarb);
                break;
            case "SOL2XARB":
                boolValue = !sol2xarb;
                setSol2xarb(!sol2xarb);
                break;
            case "SOL3XARB":
                boolValue = !sol3xarb;
                setSol3xarb(!sol3xarb);
                break;
            case "SUI2XOPT":
                boolValue = !sui2xopt;
                setSui2xopt(!sui2xopt);
                break;
            case "SUI1XXARB":
                boolValue = !sui1xxarb;
                setSui1xxarb(!sui1xxarb);
                break;
            case "SUI2XARB":
                boolValue = !sui2xarb;
                setSui2xarb(!sui2xarb);
                break;
            case "DOGE2XOPT":
                boolValue = !doge2xopt;
                setDoge2xopt(!doge2xopt);
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

    const spotCheckboxClick = (asset) => {
        let boolValue = false;
        switch (asset) {
            case "btc-1":
                boolValue = !spotBtc;
                setSpotBtc(!spotBtc);
                break;
            case "btc-2":
                boolValue = !spotBtc2;
                setSpotBtc2(!spotBtc2);
                break;
            case "btc-3":
                boolValue = !spotBtc3;
                setSpotBtc3(!spotBtc3);
                break;
            case "btc-4":
                boolValue = !spotBtc4;
                setSpotBtc4(!spotBtc4);
                break;
            case "btc-5":
                boolValue = !spotBtc5;
                setSpotBtc5(!spotBtc5);
                break;
            case "eth-1":
                boolValue = !spotEth;
                setSpotEth(!spotEth);
                break;
            case "eth-2":
                boolValue = !spotEth2;
                setSpotEth2(!spotEth2);
                break;
            case "eth-3":
                boolValue = !spotEth3;
                setSpotEth3(!spotEth3);
                break;
            case "eth-4":
                boolValue = !spotEth4;
                setSpotEth4(!spotEth4);
                break;
            case "eth-5":
                boolValue = !spotEth5;
                setSpotEth5(!spotEth5);
                break;
            case "sol-1":
                boolValue = !spotSol;
                setSpotSol(!spotSol);
                break;
            case "sol-2":
                boolValue = !spotSol2;
                setSpotSol2(!spotSol2);
                break;
            case "sol-3":
                boolValue = !spotSol3;
                setSpotSol3(!spotSol3);
                break;
            case "sol-4":
                boolValue = !spotSol4;
                setSpotSol4(!spotSol4);
                break;
            case "sol-5":
                boolValue = !spotSol5;
                setSpotSol5(!spotSol5);
                break;
            case "sui-1":
                boolValue = !spotSui;
                setSpotSui(!spotSui);
                break;
            case "sui-2":
                boolValue = !spotSui2;
                setSpotSui2(!spotSui2);
                break;
            case "sui-3":
                boolValue = !spotSui3;
                setSpotSui3(!spotSui3);
                break;
            case "sui-4":
                boolValue = !spotSui4;
                setSpotSui4(!spotSui4);
                break;
            case "sui-5":
                boolValue = !spotSui5;
                setSpotSui5(!spotSui5);
                break;
            case "doge-1":
                boolValue = !spotDoge;
                setSpotDoge(!spotDoge);
                break;
            case "doge-2":
                boolValue = !spotDoge2;
                setSpotDoge2(!spotDoge2);
                break;
            case "doge-3":
                boolValue = !spotDoge3;
                setSpotDoge3(!spotDoge3);
                break;
            case "doge-4":
                boolValue = !spotDoge4;
                setSpotDoge4(!spotDoge4);
                break;
            case "doge-5":
                boolValue = !spotDoge5;
                setSpotDoge5(!spotDoge5);
                break;
            default:
                break;
        }

        if (boolValue) {
            setSpotArray([...spotArray, asset]);
        } else {
            setSpotArray(spotArray.filter(str => str !== asset));
        }
    };

    const maxDates = {
        "BTC1L": "2024-05-14",
        "BTC2L": "2024-05-14",
        "BTC3L": "2024-05-24",
        "BTC4L": "2024-05-24",
        "BTC5L": "2024-05-14",
        "BTC7L": "2024-06-25",
        "ETH1L": "2024-05-14",
        "ETH2L": "2024-05-14",
        "ETH3L": "2024-05-24",
        "ETH4L": "2024-05-24",
        "ETH5L": "2024-05-14",
        "ETH7L": "2024-07-11",
        "SOL1L": "2024-05-14",
        "SOL2L": "2024-05-14",
        "SOL3L": "2024-05-24",
        "SOL4L": "2024-05-24",
        "SOL5L": "2024-05-14",
        "DOGE2L": "2024-06-13",
        "DOGE5L": "2024-06-13",
        "ETHBTC2L": "2024-07-30",
        "ETHBTC5L": "2024-07-30",
        "ETHBTC10L": "2024-09-18",
        "SUI2L": "2024-08-16",
        "SUI5L": "2024-08-16",
        "BTC2XOPT": "2023-10-10",
        "BTC3XOPT": "2024-03-13",
        "BTC4XOPT": "2024-06-05",
        "BTC4XARB": "2025-03-19",
        "BTCCVRD2XARB": "2025-03-12",
        "BTC1XPROTECTED": "2025-06-12",
        "BTC2XPROTECTED": "2025-06-12",
        "BTC3XPROTECTED": "2025-06-12",
        "BTC3XPOL": "2023-06-27",
        "BTC2XARB": "2024-07-16",
        "BTC3XARB": "2024-02-22",
        "ETH2XOPT": "2023-10-10",
        "ETH3XOPT": "2024-03-12",
        "ETH3XPOL": "2023-06-27",
        "ETH2XARB": "2024-07-16",
        "ETH3XARB": "2024-02-22",
        "ETH4XARB": "2025-03-19",
        "STETH2X": "2024-06-14",
        "STETH3X": "2024-06-14",
        "STETH4X": "2024-06-14",
        "SOL1XARB": "2025-03-13",
        "SOL2XOPT": "2024-05-27",
        "SOL3XOPT": "2024-05-27",
        "SOL1XXARB": "2025-05-12",
        "SOL2XARB": "2025-03-13",
        "SOL3XARB": "2025-03-13",
        "SUI2XOPT": "2024-11-12",
        "SUI1XXARB": "2025-05-09",
        "SUI2XARB": "2025-04-28",
        "DOGE2XOPT": "2024-11-13",
        "BTC1XPOL": "2024-05-01",
        "BTC1XBASE": "2024-11-13",
        "BTC1XOPT": "2024-05-01",
        "BTC1XARB": "2024-07-16",
        "BTC2XBASE": "2024-11-13",
        "BTC3XBASE": "2024-11-13",
        "ETH1XPOL": "2024-05-01",
        "ETH1XOPT": "2024-05-01",
        "ETH1XARB": "2024-07-16",
        "btc": "2024-05-14",
        "eth": "2024-05-14",
        "sol": "2024-05-14",
        "sui": "2024-05-14",
        "doge": "2024-05-14",
    }

    const fetchData = async () => {
        setLoading(true);

        const arrayPromises = array.map(asset =>
            fetch(domain + "hello/?coin=" + asset + "&granularity=" + granularity + "&granularityUnit=" + granularityUnit + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&toDate=" + getToDateString(asset) + "&initialInvestment=" + initialCapital + "&riskFreeRate=" + riskFreeRate).then(response => response.json())
        );

        const torosArrayPromises = torosArray.map(asset =>
            fetch(domain + "toros/?coin=" + asset + "&interval=" + interval + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&toDate=" + getToDateString(asset) + "&initialInvestment=" + initialCapital + "&riskFreeRate=" + riskFreeRate).then(response => response.json())
        );

        // Fetch BTC Lambda function data

        const spotArrayPromises = spotArray.map(asset =>
            fetch(`${domain}spot?asset=${asset}&fromDate=${dayjs(fromDate).format("YYYY-MM-DD")}&toDate=${dayjs(toDate).format("YYYY-MM-DD")}&initialInvestment=${initialCapital}&riskFreeRate=${riskFreeRate}`).then(response => response.json())
        );
        const results = await Promise.all([...arrayPromises, ...torosArrayPromises, ...spotArrayPromises]);

        const combinedData = results.map((result, index) => ({
                label:
                    index < array.length
                        ? array[index]
                        : index < array.length + torosArray.length
                            ? torosArray[index - array.length]
                            : spotArray[index - array.length - torosArray.length],
            data: result.data,
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
        }));

        const assetMetrics = results.map((result, index) => ({
                label:
                    index < array.length
                        ? array[index]
                        : index < array.length + torosArray.length
                            ? torosArray[index - array.length]
                            : spotArray[index - array.length - torosArray.length],
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

    const maxOfTwoDays = (date1, date2) => {
        const dateObject1 = new Date(date1);
        const dateObject2 = new Date(date2);

        return dateObject1.getTime() > dateObject2.getTime() ? date1 : date2;
    }

    const getToDateString = (asset) => {
        const assetDateString = maxDates[asset];
        const toDateString = dayjs(toDate).format("YYYY-MM-DD");

        return maxOfTwoDays(assetDateString, toDateString);
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

    const snowflake = document.createElement('img');
    snowflake.src = '/snowflake.png';

    return (
        <div className="App">
            <h1>
                Toros Performance Analysis
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
                                variant="outlined"
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
                            label="Initial invest capital"
                            type="number"
                            InputProps={{inputProps: {min: 1}}}
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
                            InputProps={{inputProps: {min: 0, max: 100}}}
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
                            <h2>
                                <img
                                    style={{"height": "24px", "marginRight": "4px", "vertical-align": "bottom"}}
                                    src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/toros.jpg"}
                                    alt={"coin"}/>
                                Toros Coins
                            </h2>
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
                            checked={btc1xbase}
                            onChange={() => torosCheckboxClick("BTC1XBASE")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/base-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>BTC1XBASE BEAR</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc1xopt}
                            onChange={() => torosCheckboxClick("BTC1XOPT")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/optimism-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>BTC1XOPT BEAR</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc1xarb}
                            onChange={() => torosCheckboxClick("BTC1XARB")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/arbitrum-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>BTC1XARB BEAR</span>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{"width": "unset"}}
                >
                    <Grid
                        item
                        style={{"border-top": "1px"}}
                    >
                        <Checkbox
                            checked={btc3xpol}
                            onChange={() => torosCheckboxClick("BTC3XPOL")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/polygon-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>BTC3XPOL</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc2xbase}
                            onChange={() => torosCheckboxClick("BTC2XBASE")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/base-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>BTC2XBASE</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc3xbase}
                            onChange={() => torosCheckboxClick("BTC3XBASE")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/base-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>BTC3XBASE</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc2xopt}
                            onChange={() => torosCheckboxClick("BTC2XOPT")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/optimism-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>BTC2XOPT</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc3xopt}
                            onChange={() => torosCheckboxClick("BTC3XOPT")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/optimism-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>BTC3XOPT</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc4xopt}
                            onChange={() => torosCheckboxClick("BTC4XOPT")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/optimism-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>BTC4XOPT</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc2xarb}
                            onChange={() => torosCheckboxClick("BTC2XARB")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/arbitrum-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>BTC2XARB</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc3xarb}
                            onChange={() => torosCheckboxClick("BTC3XARB")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/arbitrum-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>BTC3XARB</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc4xarb}
                            onChange={() => torosCheckboxClick("BTC4XARB")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/arbitrum-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>BTC4XARB</span>
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
                            checked={btc1xprotected}
                            onChange={() => torosCheckboxClick("BTC1XPROTECTED")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/arbitrum-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>BTC Protected 1X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc2xprotected}
                            onChange={() => torosCheckboxClick("BTC2XPROTECTED")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/arbitrum-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>BTC Protected 2X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={btc3xprotected}
                            onChange={() => torosCheckboxClick("BTC3XPROTECTED")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/arbitrum-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>BTC Protected 3X</span>
                    </Grid>
                    <Grid item style={{"marginTop": "12px", "textAlign": "center", "borderTop": "1px solid #eaeaea", "paddingTop": "10px"}}>
                        <div style={{"marginBottom": "4px", "fontSize": "0.85rem", "color": "#666"}}>
                            Read more about
                        </div>
                        <a
                            href="https://x.com/torosfinance/status/1948284944880730309"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{"fontSize": "0.9rem", "fontWeight": "500", "color": "#1976d2", "textDecoration": "none"}}
                        >
                            Protected Leverage Vaults
                        </a>
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
                            checked={eth1xopt}
                            onChange={() => torosCheckboxClick("ETH1XOPT")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/optimism-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>ETH1XOPT BEAR</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth1xarb}
                            onChange={() => torosCheckboxClick("ETH1XARB")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/arbitrum-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>ETH1XARB BEAR</span>
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
                            checked={eth3xpol}
                            onChange={() => torosCheckboxClick("ETH3XPOL")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/polygon-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>ETH3XPOL</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={steth2x}
                            onChange={() => torosCheckboxClick("STETH2X")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/base-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>STETH2X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={steth3x}
                            onChange={() => torosCheckboxClick("STETH3X")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/base-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>STETH3X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={steth4x}
                            onChange={() => torosCheckboxClick("STETH4X")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/base-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>STETH4X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth2xopt}
                            onChange={() => torosCheckboxClick("ETH2XOPT")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/optimism-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>ETH2XOPT</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth3xopt}
                            onChange={() => torosCheckboxClick("ETH3XOPT")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/optimism-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>ETH3XOPT</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth2xarb}
                            onChange={() => torosCheckboxClick("ETH2XARB")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/arbitrum-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>ETH2XARB</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth3xarb}
                            onChange={() => torosCheckboxClick("ETH3XARB")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/arbitrum-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>ETH3XARB</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={eth4xarb}
                            onChange={() => torosCheckboxClick("ETH4XARB")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/arbitrum-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>ETH4XARB</span>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{"width": "unset"}}
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
                            checked={sol1xarb}
                            onChange={() => torosCheckboxClick("SOL1XARB")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px", "border-radius": "20px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/arbitrum-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>SOL1XARB BEAR</span>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    style={{"width": "unset"}}
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
                            checked={sol1xxarb}
                            onChange={() => torosCheckboxClick("SOL1XXARB")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px", "border-radius": "20px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/arbitrum-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>SOL1XARB</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={sol2xarb}
                            onChange={() => torosCheckboxClick("SOL2XARB")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px", "border-radius": "20px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/arbitrum-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>SOL2XARB</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={sol3xarb}
                            onChange={() => torosCheckboxClick("SOL3XARB")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px", "border-radius": "20px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/arbitrum-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>SOL3XARB</span>
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
                            checked={sui1xxarb}
                            onChange={() => torosCheckboxClick("SUI1XXARB")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/sui.png"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/optimism-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>SUI1XARB</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={sui2xarb}
                            onChange={() => torosCheckboxClick("SUI2XARB")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/sui.png"}
                                alt={"coin"}/>
                            <img style={{
                                "height": "12px",
                                "position": "absolute",
                                "top": 0,
                                "right": 0,
                                "border-radius": "20px"
                            }}
                                 src={"https://toros.finance/icons/optimism-network.svg"}
                                 alt={"coin"}/>
                        </div>
                        <span>SUI2XARB</span>
                    </Grid>
                </Grid>

                {/*<Grid*/}
                {/*    item*/}
                {/*    container*/}
                {/*    justifyContent={"center"}*/}
                {/*>*/}
                {/*    <Grid*/}
                {/*        item*/}
                {/*        container*/}
                {/*        md={8}*/}
                {/*        justifyContent={"space-around"}*/}
                {/*    >*/}
                {/*        <Grid*/}
                {/*            item*/}
                {/*            style={{"text-align": "center"}}*/}
                {/*        >*/}
                {/*            <h2>*/}
                {/*                <img*/}
                {/*                    style={{"height": "24px", "marginRight": "4px", "vertical-align": "bottom"}}*/}
                {/*                    src={"https://tlx.fi/favicon.ico"}*/}
                {/*                    alt={"coin"}/>*/}
                {/*                TLX Coins*/}
                {/*            </h2>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}

                {/*<Grid*/}
                {/*    item*/}
                {/*    container*/}
                {/*    direction={"column"}*/}
                {/*    style={{"width": "unset"}}*/}
                {/*>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={btc1l}*/}
                {/*            onChange={() => checkboxClick("BTC1L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>BTC1L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={btc2l}*/}
                {/*            onChange={() => checkboxClick("BTC2L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>BTC2L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={btc3l}*/}
                {/*            onChange={() => checkboxClick("BTC3L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>BTC3L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={btc4l}*/}
                {/*            onChange={() => checkboxClick("BTC4L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>BTC4L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={btc5l}*/}
                {/*            onChange={() => checkboxClick("BTC5L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>BTC5L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={btc7l}*/}
                {/*            onChange={() => checkboxClick("BTC7L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>BTC7L</span>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
                {/*<Grid*/}
                {/*    item*/}
                {/*    container*/}
                {/*    direction={"column"}*/}
                {/*    style={{"width": "unset"}}*/}
                {/*>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={eth1l}*/}
                {/*            onChange={() => checkboxClick("ETH1L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>ETH1L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={eth2l}*/}
                {/*            onChange={() => checkboxClick("ETH2L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>ETH2L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={eth3l}*/}
                {/*            onChange={() => checkboxClick("ETH3L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>ETH3L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={eth4l}*/}
                {/*            onChange={() => checkboxClick("ETH4L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>ETH4L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={eth5l}*/}
                {/*            onChange={() => checkboxClick("ETH5L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>ETH5L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={eth7l}*/}
                {/*            onChange={() => checkboxClick("ETH7L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>ETH7L</span>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
                {/*<Grid*/}
                {/*    item*/}
                {/*    container*/}
                {/*    direction={"column"}*/}
                {/*    style={{"width": "unset"}}*/}
                {/*>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={sol1l}*/}
                {/*            onChange={() => checkboxClick("SOL1L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px", "border-radius": "20px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>SOL1L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={sol2l}*/}
                {/*            onChange={() => checkboxClick("SOL2L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px", "border-radius": "20px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>SOL2L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={sol3l}*/}
                {/*            onChange={() => checkboxClick("SOL3L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px", "border-radius": "20px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>SOL3L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={sol4l}*/}
                {/*            onChange={() => checkboxClick("SOL4L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px", "border-radius": "20px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>SOL4L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={sol5l}*/}
                {/*            onChange={() => checkboxClick("SOL5L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px", "border-radius": "20px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>SOL5L</span>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
                {/*<Grid*/}
                {/*    item*/}
                {/*    container*/}
                {/*    direction={"column"}*/}
                {/*    style={{"width": "unset"}}*/}
                {/*>*/}
                {/*</Grid>*/}
                {/*<Grid*/}
                {/*    item*/}
                {/*    container*/}
                {/*    direction={"column"}*/}
                {/*    style={{"width": "unset"}}*/}
                {/*>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={sui2l}*/}
                {/*            onChange={() => checkboxClick("SUI2L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/sui.png"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>SUI2L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={sui5l}*/}
                {/*            onChange={() => checkboxClick("SUI5L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/sui.png"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>SUI5L</span>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
                {/*<Grid*/}
                {/*    item*/}
                {/*    container*/}
                {/*    direction={"column"}*/}
                {/*    style={{"width": "unset"}}*/}
                {/*>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={doge2l}*/}
                {/*            onChange={() => checkboxClick("DOGE2L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/dogecoin.png"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>DOGE2L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={doge5l}*/}
                {/*            onChange={() => checkboxClick("DOGE5L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/dogecoin.png"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>DOGE5L</span>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}

                {/*<Grid*/}
                {/*    item*/}
                {/*    container*/}
                {/*    direction={"column"}*/}
                {/*    style={{"width": "unset"}}*/}
                {/*>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={ethbtc2l}*/}
                {/*            onChange={() => checkboxClick("ETHBTC2L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://synthetixio.github.io/synthetix-assets/markets/ETHBTC.svg"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>ETHBTC2L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={ethbtc5l}*/}
                {/*            onChange={() => checkboxClick("ETHBTC5L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://synthetixio.github.io/synthetix-assets/markets/ETHBTC.svg"}*/}
                {/*                alt={"coin"}/>*/}
                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>ETHBTC5L</span>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Checkbox*/}
                {/*            checked={ethbtc10l}*/}
                {/*            onChange={() => checkboxClick("ETHBTC10L")}*/}
                {/*            disabled={loading}*/}
                {/*        />*/}
                {/*        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>*/}
                {/*            <img*/}
                {/*                style={{"height": "24px", "marginRight": "4px"}}*/}
                {/*                src={"https://synthetixio.github.io/synthetix-assets/markets/ETHBTC.svg"}*/}
                {/*                alt={"coin"}/>*/}

                {/*            <img style={{*/}
                {/*                "height": "12px",*/}
                {/*                "position": "absolute",*/}
                {/*                "top": 0,*/}
                {/*                "right": 0,*/}
                {/*                "border-radius": "20px"*/}
                {/*            }}*/}
                {/*                 src={"https://tlx.fi/favicon.ico"}*/}
                {/*                 alt={"coin"}/>*/}
                {/*        </div>*/}
                {/*        <span>ETHBTC10L</span>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
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
                        <h2>Spots and No-Fee Perps</h2>
                    </Grid>
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
                    direction={"column"}
                    style={{"width": "unset"}}
                >
                    <Grid item>
                        <Checkbox
                            checked={spotBtc}
                            onChange={() => spotCheckboxClick("btc-1")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                        </div>
                        <span>BTC</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotBtc2}
                            onChange={() => spotCheckboxClick("btc-2")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                        </div>
                        <span>BTC2X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotBtc3}
                            onChange={() => spotCheckboxClick("btc-3")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                        </div>
                        <span>BTC3X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotBtc4}
                            onChange={() => spotCheckboxClick("btc-4")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                        </div>
                        <span>BTC4X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotBtc5}
                            onChange={() => spotCheckboxClick("btc-5")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"}
                                alt={"coin"}/>
                        </div>
                        <span>BTC5X</span>
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
                            checked={spotEth}
                            onChange={() => spotCheckboxClick("eth-1")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}
                                alt={"coin"}/>
                        </div>
                        <span>ETH</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotEth2}
                            onChange={() => spotCheckboxClick("eth-2")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}
                                alt={"coin"}/>
                        </div>
                        <span>ETH2X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotEth3}
                            onChange={() => spotCheckboxClick("eth-3")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}
                                alt={"coin"}/>
                        </div>
                        <span>ETH3X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotEth4}
                            onChange={() => spotCheckboxClick("eth-4")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}
                                alt={"coin"}/>
                        </div>
                        <span>ETH4X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotEth5}
                            onChange={() => spotCheckboxClick("eth-5")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"}
                                alt={"coin"}/>
                        </div>
                        <span>ETH5X</span>
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
                            checked={spotSol}
                            onChange={() => spotCheckboxClick("sol-1")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px", "border-radius": "20px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"}
                                alt={"coin"}/>
                        </div>
                        <span>SOL</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotSol2}
                            onChange={() => spotCheckboxClick("sol-2")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px", "border-radius": "20px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"}
                                alt={"coin"}/>
                        </div>
                        <span>SOL2X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotSol3}
                            onChange={() => spotCheckboxClick("sol-3")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px", "border-radius": "20px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"}
                                alt={"coin"}/>
                        </div>
                        <span>SOL3X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotSol4}
                            onChange={() => spotCheckboxClick("sol-4")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px", "border-radius": "20px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"}
                                alt={"coin"}/>
                        </div>
                        <span>SOL4X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotSol5}
                            onChange={() => spotCheckboxClick("sol-5")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px", "border-radius": "20px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"}
                                alt={"coin"}/>
                        </div>
                        <span>SOL5X</span>
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
                            checked={spotSui}
                            onChange={() => spotCheckboxClick("sui-1")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/sui.png"}
                                alt={"coin"}/>
                        </div>
                        <span>SUI</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotSui2}
                            onChange={() => spotCheckboxClick("sui-2")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/sui.png"}
                                alt={"coin"}/>
                        </div>
                        <span>SUI2X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotSui3}
                            onChange={() => spotCheckboxClick("sui-3")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/sui.png"}
                                alt={"coin"}/>
                        </div>
                        <span>SUI3X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotSui4}
                            onChange={() => spotCheckboxClick("sui-4")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/sui.png"}
                                alt={"coin"}/>
                        </div>
                        <span>SUI4X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotSui5}
                            onChange={() => spotCheckboxClick("sui-5")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/sui.png"}
                                alt={"coin"}/>
                        </div>
                        <span>SUI5X</span>
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
                            checked={spotDoge}
                            onChange={() => spotCheckboxClick("doge-1")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/dogecoin.png"}
                                alt={"coin"}/>
                        </div>
                        <span>DOGE</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotDoge2}
                            onChange={() => spotCheckboxClick("doge-2")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/dogecoin.png"}
                                alt={"coin"}/>
                        </div>
                        <span>DOGE2X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotDoge3}
                            onChange={() => spotCheckboxClick("doge-3")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/dogecoin.png"}
                                alt={"coin"}/>
                        </div>
                        <span>DOGE3X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotDoge4}
                            onChange={() => spotCheckboxClick("doge-4")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/dogecoin.png"}
                                alt={"coin"}/>
                        </div>
                        <span>DOGE4X</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={spotDoge5}
                            onChange={() => spotCheckboxClick("doge-5")}
                            disabled={loading}
                        />
                        <div style={{"position": "relative", "display": "inline-block", "vertical-align": "middle", "margin-right": "4px"}}>
                            <img
                                style={{"height": "24px", "marginRight": "4px"}}
                                src={"https://d2l35o8v06vi7z.cloudfront.net/fiji/dogecoin.png"}
                                alt={"coin"}/>
                        </div>
                        <span>DOGE5X</span>
                    </Grid>
                </Grid>
            </Grid>
            <br/>

            <Button onClick={onSearch} variant="contained"
                    disabled={loading || (array.length === 0 && torosArray.length === 0 && spotArray.length === 0)}>
                {loading ? (
                    <CircularProgress size={25} color={"grey"}/>
                ) : (
                    "Fetch data"
                )}
            </Button>
            <Button style={{marginLeft: "8px"}} onClick={onExport} variant="contained"
                    disabled={loading || (array.length === 0 && torosArray.length === 0 && spotArray.length === 0)}>
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
                    <CryptoChart datasets={datasets} title="Price" metric="price"
                                 showDatesOnly={granularity === "DAYS"}/>
                </Grid>

                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <CryptoChart datasets={datasets} title="Returns" metric="returns"
                                 showDatesOnly={granularity === "DAYS"}/>
                </Grid>

                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <CryptoChart datasets={datasets} title="Investment Value" metric="investment-value"
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
                href="https://github.com/fiji-solutions/tlx/blob/main/hello_world/app.py">https://github.com/fiji-solutions/tlx/blob/main/hello_world/app.py</a>
            </p>
        </div>
    );
};

export default App;
